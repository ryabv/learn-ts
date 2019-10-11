"use strict";
exports.__esModule = true;
var rimraf = require("rimraf");
function deleteRepo(req, res, reposDir) {
    rimraf(reposDir + "/" + req.params.repositoryId, function () { res.send(req.params.repositoryId + " deleted"); });
}
exports["default"] = deleteRepo;
