"use strict";
exports.__esModule = true;
var fs = require("fs");
var path = require("path");
function getRepos(req, res, reposDir, dirname) {
    fs.readdir(reposDir, function (err, files) {
        if (err) {
            res.send(err);
        }
        else {
            var proms_1 = [];
            files.forEach(function (file) {
                proms_1.push(new Promise(function (resolve, reject) {
                    fs.stat(path.join(dirname, reposDir, file), function (err, stats) {
                        if (stats.isDirectory()) {
                            resolve(file);
                        }
                        resolve();
                    });
                }));
            });
            Promise.all(proms_1).then(function (value) { return res.json({
                names: value
            }); });
        }
    });
}
exports["default"] = getRepos;
