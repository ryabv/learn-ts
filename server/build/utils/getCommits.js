"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
function getCommits(req, res, reposDir) {
    var result = [];
    var commits = child_process_1.spawn("cd " + reposDir + "/" + req.params.repositoryId + " && git checkout " + req.params.commitHash + " -q && git --no-pager log --pretty=tformat:\"%H--%s--%ad\"", {
        shell: true
    });
    commits.stderr.on('data', function (data) {
        res.send("STDERR: " + data.toString());
    });
    commits.stdout.on('data', function (data) {
        data = data.toString().trim().split('\n').map(function (el) { return el.split('--'); });
        result.push.apply(result, data);
    });
    commits.on('close', function () {
        res.json({ data: result });
    });
}
exports["default"] = getCommits;
