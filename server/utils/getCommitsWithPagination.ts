import * as express from 'express';
import { exec } from 'child_process';

type CommonList = {
    firstList: string[][],
    secondList: string[][]
}

export default function getCommitsWithPagination(req: express.Request, res: express.Response, reposDir: string) {
    let range = req.params.range.split('-'); // получаем диапазон

    if (range.length === 1) { // если указано одно число, то выдать список длинною в это число
        exec(`cd ${reposDir}/${req.params.repositoryId} && git checkout ${req.params.commitHash} -q && git log -${range[0]} --pretty=tformat:"%H--%s--%ad"`, (err, out) => {
            if (err) {
                res.send(err);
            } else {
                const commits = out.trim().split('\n').map(el => el.split('--'));
                res.json({ data: commits });
            }
        });

    } else {
        new Promise((resolve, reject) => { // получаем список коммитов по первому переданному числу
                exec(`cd ${reposDir}/${req.params.repositoryId} && git checkout ${req.params.commitHash} -q && git log -${range[0]} --pretty=tformat:"%H--%s--%ad"`, (err, out) => {
                    if (err) throw err;
                    const commits: string[][] = out.trim().split('\n').map(el => el.split('--'));
                    resolve(commits);
                });
            })
            .then((firstList: string[][]) => { // получаем список коммитов по второму переданному числу
                return new Promise((resolve, reject) => {
                    let secondList: string[] | string[][] = [];

                    exec(`cd ${reposDir}/${req.params.repositoryId} && git checkout ${req.params.commitHash} -q && git log -${range[1]} --pretty=tformat:"%H--%s--%ad"`, (err, out) => {
                        if (err) throw err;
                        secondList = out.trim().split('\n').map(el => el.split('--'));
                        const obj: CommonList = { firstList, secondList };
                        resolve(obj);
                    });
                });
            })
            .then((lists: CommonList) => {

                let commitsList: string[][] = [];
                let lastHashInFirstList = lists.firstList[lists.firstList.length - 1][0];

                // во втором списке ищем номер массива, у которого хеш равен последнему хешу первого списка
                let startPos = lists.secondList.findIndex(el => {
                    return el[0] === lastHashInFirstList;
                });

                // если параметры диапазона больше количества коммитов, то тогда выведется самый последний коммит
                commitsList = lists.secondList.slice(startPos, lists.secondList.length);

                res.json({ data: commitsList });

            })
            .catch(err => res.send(err));
    }
}