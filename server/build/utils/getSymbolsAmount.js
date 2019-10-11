"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var iconv = require("iconv-lite");
function getSymbolsAmount(req, res, reposDir, dirname) {
    var obj = {};
    new Promise(function (resolve, reject) {
        checkRepo(obj, req.params.repositoryId, '', reposDir, dirname) // Заходим в папку
            .then(function () {
            resolve();
        });
    }).then(function () { return res.send(obj); });
}
exports["default"] = getSymbolsAmount;
function countSymbols(text, objWithSymbs) {
    for (var i = 0; i < text.length; i++) {
        text[i] in objWithSymbs ? objWithSymbs[text[i]]++ : objWithSymbs[text[i]] = 1;
    }
}
function checkRepo(obj, repo, subPath, reposDir, dirname) {
    return new Promise(function (resolve, reject) {
        // Читаем имена файлов и папок и записываем имена в объект
        fs.readdir(path.join(dirname, reposDir, repo, subPath), function (err, files) {
            if (err) {
                reject(err);
            }
            else {
                files.forEach(function (file) {
                    countSymbols(file, obj);
                });
                files = files.filter(function (el) { return el !== '.git'; });
                resolve(files);
            }
        });
    })
        .then(function (files) {
        var proms = [];
        files.forEach(function (file) {
            proms.push(new Promise(function (resolve, reject) {
                fs.stat(path.join(dirname, reposDir, repo, subPath, file), function (err, stats) {
                    if (stats.isFile()) {
                        // Если это файл, то читаем его содержимое и записываем в объект
                        var readingProcess = fs.createReadStream(path.join(dirname, reposDir, repo, subPath, file));
                        readingProcess.on('data', function (chunk) {
                            var data = iconv.encode(chunk, 'utf-8').toString();
                            countSymbols(data, obj);
                        });
                        readingProcess.on('end', function () {
                            resolve('file');
                        });
                    }
                    else {
                        // Если это папка, то рекурсивно вызываем эту же функцию
                        checkRepo(obj, repo, (subPath + '/' + file), reposDir, dirname).then(function (rs) {
                            resolve('dir');
                        });
                    }
                });
            }));
        });
        return Promise.all(proms);
    })["catch"](function (err) {
        throw new Error(err);
    });
}
