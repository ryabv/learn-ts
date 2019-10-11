"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
function getDiff(req, res, reposDir) {
    new Promise(function (resolve, reject) {
        child_process_1.exec("cd " + reposDir + "/" + req.params.repositoryId + " && git cat-file -p " + req.params.commitHash, function (err, out) {
            if (err) {
                reject(err);
            }
            else {
                out = out.slice(out.indexOf('parent') + 7, out.indexOf('parent') + 47); //40 - длина SHA1-хеша
                resolve(out);
            }
        });
    })
        .then(function (parentHash) {
        var result = '';
        var commitsDiff = child_process_1.spawn("cd " + reposDir + "/" + req.params.repositoryId + " && git diff " + parentHash + " " + req.params.commitHash, {
            shell: true
        });
        commitsDiff.stderr.on('data', function (data) {
            res.send("STDERR: " + data.toString());
        });
        commitsDiff.stdout.on('data', function (data) {
            data = data.toString();
            result += data;
        });
        commitsDiff.on('close', function () {
            res.json({ data: result });
        });
    })["catch"](function (err) { return res.send(err); });
}
exports["default"] = getDiff;
