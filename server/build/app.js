"use strict";
exports.__esModule = true;
var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var parseArgs = require("minimist");
var readline = require("readline");
var app = express();
var port = 3001;
var getRepos_1 = require("./utils/getRepos");
var getCommits_1 = require("./utils/getCommits");
var getDiff_1 = require("./utils/getDiff");
var getRepoContent_1 = require("./utils/getRepoContent");
var getFileContent_1 = require("./utils/getFileContent");
var getCommitsWithPagination_1 = require("./utils/getCommitsWithPagination");
var addRepo_1 = require("./utils/addRepo");
var deleteRepo_1 = require("./utils/deleteRepo");
var getSymbolsAmount_1 = require("./utils/getSymbolsAmount");
app.use(bodyParser.json());
app.use(express.static(__dirname + '../../../build'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    next();
});
app.listen(port);
console.log("\u0421\u0435\u0440\u0432\u0435\u0440 \u0437\u0430\u043F\u0443\u0449\u0435\u043D \u043D\u0430 \u043F\u043E\u0440\u0442\u0443 " + port);
// получение папки с репозиториями
// например, node app --repo=./repos
var argv = parseArgs(process.argv.slice(2));
var readlineInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
var reposDir = argv.repo;
if (!reposDir) { // если изначально в строке не ввели путь, то попросить ввести через REPL
    readlineInterface.question('Пожалуйста, введите путь к папке с репозиториями (например, ./repos): ', function (repo) {
        reposDir = repo;
        readlineInterface.close();
    });
}
// Индексная страница
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, '..build/index.html'));
});
app.get('/folderpage/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
app.get('/filepage/*', function (req, res) {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});
// Возвращает массив репозиториев, которые имеются в папке
app.get('/api/repos', function (req, res) {
    getRepos_1["default"](req, res, reposDir, __dirname);
});
// Возвращает массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания и названием
app.get('/api/repos/:repositoryId/commits/:commitHash', function (req, res) {
    getCommits_1["default"](req, res, reposDir);
});
// Возвращает diff коммита в виде строки
app.get('/api/repos/:repositoryId/commits/:commitHash/diff', function (req, res) {
    getDiff_1["default"](req, res, reposDir);
});
// Возвращает содержимое репозитория по названию ветки (или хэшу комита)
app.get('/api/repos/:repositoryId/tree/:commitHash/:path([a-zA-Z0-9\-\/\.]+)*|/api/repos/:repositoryId/tree/:commitHash([a-zA-Z0-9\.|\-|\_]+)*|/api/repos/:repositoryId', function (req, res) {
    getRepoContent_1["default"](req, res, reposDir, __dirname);
});
// Возвращает содержимое конкретного файла, находящегося по пути pathToFile в ветке (или по хэшу коммита)
app.get('/api/repos/:repositoryId/blob/:commitHash/:pathToFile([a-zA-Z0-9\-\/\.\_]+)*', function (req, res) {
    getFileContent_1["default"](req, res, reposDir);
});
// Безвозвратно удаляет репозиторий
app["delete"]('/api/repos/:repositoryId', function (req, res) {
    deleteRepo_1["default"](req, res, reposDir);
});
// Добавляет репозиторий в список, скачивает его по переданной в теле запроса ссылке и добавляет в папку со всеми репозиториями
app.post('/api/repos', function (req, res) {
    addRepo_1["default"](req, res, reposDir);
});
// BONUS Возвращает заданный через :range массив коммитов в данной ветке (или хэше коммита) вместе с датами их создания и названием
app.get('/api/repos/:repositoryId/commits/:commitHash/pagination/:range', function (req, res) {
    getCommitsWithPagination_1["default"](req, res, reposDir);
});
// SUPER BONUS HTTP-запрос для подсчета символов в репозитории, возвращает объект, в котором ключ - это символ, а значение - количество таких символов в репозитории
app.get('/api/repos/:repositoryId/symbols', function (req, res) {
    getSymbolsAmount_1["default"](req, res, reposDir, __dirname);
});
