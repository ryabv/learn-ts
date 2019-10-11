import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as iconv from 'iconv-lite';

export default function getSymbolsAmount(req: express.Request, res: express.Response, reposDir: string, dirname: string) {
    let obj = {};

    new Promise((resolve, reject) => {
        checkRepo(obj, req.params.repositoryId, '', reposDir, dirname) // Заходим в папку
            .then(() => {
                resolve();
            });
    }).then(() => res.send(obj));
}


function countSymbols(text: string, objWithSymbs: {}) {
    for (let i = 0; i < text.length; i++) {
        text[i] in objWithSymbs ? objWithSymbs[text[i]]++ : objWithSymbs[text[i]] = 1;
    }
}


function checkRepo(obj: {}, repo: string, subPath: string, reposDir: string, dirname: string) {
    return new Promise((resolve, reject) => {
            // Читаем имена файлов и папок и записываем имена в объект
            fs.readdir(path.join(dirname, reposDir, repo, subPath), (err, files) => {
                if (err) {
                    reject(err);
                } else {
                    files.forEach(file => {
                        countSymbols(file, obj);
                    });

                    files = files.filter(el => el !== '.git');
                    resolve(files);
                }
            });
        })
        .then((files: string[]) => {
            let proms: [Promise<void | string>?] = [];

            files.forEach((file) => { // делаем из каждого файла промис и закидывем их в Promise.all
                proms.push(new Promise((resolve, reject) => {
                    fs.stat(path.join(dirname, reposDir, repo, subPath, file), (err, stats) => {
                        if (stats.isFile()) {
                            // Если это файл, то читаем его содержимое и записываем в объект
                            let readingProcess = fs.createReadStream(path.join(dirname, reposDir, repo, subPath, file));

                            readingProcess.on('data', chunk => {
                                let data = iconv.encode(chunk, 'utf-8').toString();
                                countSymbols(data, obj);
                            });

                            readingProcess.on('end', () => {
                                resolve('file');
                            });
                        } else {
                            // Если это папка, то рекурсивно вызываем эту же функцию
                            checkRepo(obj, repo, (subPath + '/' + file), reposDir, dirname).then(rs => {
                                resolve('dir');
                            });
                        }
                    });
                }));
            });

            return Promise.all(proms);
        })
        .catch(err => {
            throw new Error(err);
        });
}