"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
function addRepo(req, res, reposDir) {
    child_process_1.exec("cd " + reposDir + " && git clone " + req.body.url, function (err, out) {
        if (err) {
            res.sendStatus(404);
        }
        else {
            res.send('Repo is downloaded');
        }
    });
}
exports["default"] = addRepo;
