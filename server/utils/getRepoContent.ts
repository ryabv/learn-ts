import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';
import { exec } from 'child_process';

type FilesData = {
    name: string,
    type: string,
    link: string
}

export default function getRepoContent(req: express.Request, res: express.Response, reposDir: string, dirname: string) {
    let pathToFile = req.params.path ? `${req.params.path}` : ''; // проверка на существование path
    let hash = req.params.commitHash ? `${req.params.commitHash}` : 'master'; // проверка на существование hash

    new Promise((resolve, reject) => {
            exec(`cd ${reposDir}/${req.params.repositoryId} && git checkout ${hash}`, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        })
        .then(() => {
            fs.readdir(`${reposDir}/${req.params.repositoryId}/${pathToFile}`, (err, files) => {
                if (err) {
                    res.send(err);
                } else {
                    files = files.filter(file => file !== '.git');
                    let proms: [Promise<void | object>?] = [];

                    files.forEach((file) => {
                        proms.push(new Promise((resolve, reject) => {
                            fs.stat(path.join(dirname, reposDir, req.params.repositoryId, pathToFile, file), (err, stats) => {
                                const filesData: FilesData = {
                                    name: file,
                                    link: `${pathToFile}/${file}`,
                                    type: stats.isDirectory() ? 'folder' : 'file'
                                };

                                resolve(filesData);
                            });
                        }));
                    });

                    Promise.all(proms)
                        .then(value => {
                            value.sort((a: FilesData, b: FilesData) => { return a.type > b.type ? -1 : 1 });
                            res.json({
                                filesList: value,
                                pathToFile: pathToFile,
                                breadcrumbs: [
                                    { name: req.params.repositoryId },
                                    { name: `${reposDir}/${req.params.repositoryId}/${pathToFile}` }
                                ]
                            })
                        });
                }
            });
        })
        .catch(err => res.send(err));
}