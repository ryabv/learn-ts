"use strict";
exports.__esModule = true;
var child_process_1 = require("child_process");
function getCommitsWithPagination(req, res, reposDir) {
    var range = req.params.range.split('-'); // получаем диапазон
    if (range.length === 1) { // если указано одно число, то выдать список длинною в это число
        child_process_1.exec("cd " + reposDir + "/" + req.params.repositoryId + " && git checkout " + req.params.commitHash + " -q && git log -" + range[0] + " --pretty=tformat:\"%H--%s--%ad\"", function (err, out) {
            if (err) {
                res.send(err);
            }
            else {
                var commits = out.trim().split('\n').map(function (el) { return el.split('--'); });
                res.json({ data: commits });
            }
        });
    }
    else {
        new Promise(function (resolve, reject) {
            child_process_1.exec("cd " + reposDir + "/" + req.params.repositoryId + " && git checkout " + req.params.commitHash + " -q && git log -" + range[0] + " --pretty=tformat:\"%H--%s--%ad\"", function (err, out) {
                if (err)
                    throw err;
                var commits = out.trim().split('\n').map(function (el) { return el.split('--'); });
                resolve(commits);
            });
        })
            .then(function (firstList) {
            return new Promise(function (resolve, reject) {
                var secondList = [];
                child_process_1.exec("cd " + reposDir + "/" + req.params.repositoryId + " && git checkout " + req.params.commitHash + " -q && git log -" + range[1] + " --pretty=tformat:\"%H--%s--%ad\"", function (err, out) {
                    if (err)
                        throw err;
                    secondList = out.trim().split('\n').map(function (el) { return el.split('--'); });
                    var obj = { firstList: firstList, secondList: secondList };
                    resolve(obj);
                });
            });
        })
            .then(function (lists) {
            var commitsList = [];
            var lastHashInFirstList = lists.firstList[lists.firstList.length - 1][0];
            // во втором списке ищем номер массива, у которого хеш равен последнему хешу первого списка
            var startPos = lists.secondList.findIndex(function (el) {
                return el[0] === lastHashInFirstList;
            });
            // если параметры диапазона больше количества коммитов, то тогда выведется самый последний коммит
            commitsList = lists.secondList.slice(startPos, lists.secondList.length);
            res.json({ data: commitsList });
        })["catch"](function (err) { return res.send(err); });
    }
}
exports["default"] = getCommitsWithPagination;
