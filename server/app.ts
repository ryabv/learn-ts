import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as parseArgs from 'minimist';
import * as readline from 'readline';
const app = express();
const port = 3001;

import getRepos from './utils/getRepos';
import getCommits from './utils/getCommits';
import getDiff from './utils/getDiff';
import getRepoContent from './utils/getRepoContent';
import getFileContent from './utils/getFileContent';
import getCommitsWithPagination from './utils/getCommitsWithPagination';
import addRepo from './utils/addRepo';
import deleteRepo from './utils/deleteRepo';
import getSymbolsAmount from './utils/getSymbolsAmount';

app.use(bodyParser.json());
app.use(express.static(__dirname + '../../../build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});

app.listen(port);
console.log(`Сервер запущен на порту ${port}`);


// получение папки с репозиториями
// например, node app --repo=./repos
const argv = parseArgs(process.argv.slice(2));

const readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let reposDir = argv.repo;
if (!reposDir) { // если изначально в строке не ввели путь, то попросить ввести через REPL
    readlineInterface.question('Пожалуйста, введите путь к папке с репозиториями (например, ../repos): ', repo => {
        reposDir = repo;
        readlineInterface.close();
    });
}



// Индексная страница
app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '..build/index.html'));
});

app.get('/folderpage/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.get('/filepage/*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});



// Возвращает массив репозиториев, которые имеются в папке
app.get('/api/repos', (req: express.Request, res: express.Response) => {
    getRepos(req, res, reposDir, __dirname);
});


// Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания и названием
app.get('/api/repos/:repositoryId/commits/:commitHash', (req: express.Request, res: express.Response) => {
    getCommits(req, res, reposDir);
});


// Возвращает diff коммита в виде строки
app.get('/api/repos/:repositoryId/commits/:commitHash/diff', (req: express.Request, res: express.Response) => {
    getDiff(req, res, reposDir);
});


// Возвращает содержимое репозитория по названию ветки (или хэшу комита)
app.get('/api/repos/:repositoryId/tree/:commitHash/:path([a-zA-Z0-9\-\/\.]+)*|/api/repos/:repositoryId/tree/:commitHash([a-zA-Z0-9\.|\-|\_]+)*|/api/repos/:repositoryId', (req: express.Request, res: express.Response) => {
    getRepoContent(req, res, reposDir, __dirname);
});


// Возвращает содержимое конкретного файла, находящегося по пути pathToFile в ветке (или по хэшу коммита)
app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([a-zA-Z0-9\-\/\.\_]+)*', (req: express.Request, res: express.Response) => {
    getFileContent(req, res, reposDir);
});


// Безвозвратно удаляет репозиторий
app.delete('/api/repos/:repositoryId', (req: express.Request, res: express.Response) => {
    deleteRepo(req, res, reposDir);
});


// Добавляет репозиторий в список, скачивает его по переданной в теле запроса ссылке и добавляет в папку со всеми репозиториями
app.post('/api/repos', (req: express.Request, res: express.Response) => {
    addRepo(req, res, reposDir);
});


// BONUS Возвращает заданный через :range массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания и названием
app.get('/api/repos/:repositoryId/commits/:commitHash/pagination/:range', (req: express.Request, res: express.Response) => {
    getCommitsWithPagination(req, res, reposDir);
});


// SUPER BONUS HTTP-запрос для подсчета символов в репозитории, возвращает объект, в котором ключ - это символ, а значение - количество таких символов в репозитории
app.get('/api/repos/:repositoryId/symbols', (req: express.Request, res: express.Response) => {
    getSymbolsAmount(req, res, reposDir, __dirname);
});