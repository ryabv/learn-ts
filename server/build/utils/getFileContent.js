"use strict";
exports.__esModule = true;
var fs = require("fs");
function getFileContent(req, res, reposDir) {
    fs.readFile(reposDir + "/" + req.params.repositoryId + "/" + req.params.pathToFile, 'utf8', function (err, data) {
        res.json({
            fileData: data.split('\n')
        });
    });
}
exports["default"] = getFileContent;
