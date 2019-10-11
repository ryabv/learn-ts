"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
var child_process_1 = require("child_process");
function getRepoContent(req, res, reposDir, dirname) {
    var pathToFile = req.params.path ? "" + req.params.path : ''; // проверка на существование path
    var hash = req.params.commitHash ? "" + req.params.commitHash : 'master'; // проверка на существование hash
    new Promise(function (resolve, reject) {
        child_process_1.exec("cd " + reposDir + "/" + req.params.repositoryId + " && git checkout " + hash, function (err, out) {
            if (err) {
                reject(err);
            }
            else {
                resolve();
            }
        });
    })
        .then(function () {
        fs.readdir(reposDir + "/" + req.params.repositoryId + "/" + pathToFile, function (err, files) {
            if (err) {
                res.send(err);
            }
            else {
                files = files.filter(function (file) { return file !== '.git'; });
                var proms_1 = [];
                files.forEach(function (file) {
                    proms_1.push(new Promise(function (resolve, reject) {
                        fs.stat(path.join(dirname, reposDir, req.params.repositoryId, pathToFile, file), function (err, stats) {
                            var filesData = {
                                name: file,
                                link: pathToFile + "/" + file,
                                type: stats.isDirectory() ? 'folder' : 'file'
                            };
                            resolve(filesData);
                        });
                    }));
                });
                Promise.all(proms_1)
                    .then(function (value) {
                    value.sort(function (a, b) { return a.type > b.type ? -1 : 1; });
                    res.json({
                        filesList: value,
                        pathToFile: pathToFile,
                        breadcrumbs: [
                            { name: req.params.repositoryId },
                            { name: reposDir + "/" + req.params.repositoryId + "/" + pathToFile }
                        ]
                    });
                });
            }
        });
    })["catch"](function (err) { return res.send(err); });
}
exports["default"] = getRepoContent;
