import * as fs from 'fs';
import * as path from 'path';
import * as express from 'express';

export default function getRepos(req: express.Request, res: express.Response, reposDir: string, dirname: string) {
    fs.readdir(reposDir, (err, files: string[]) => {
        if (err) {
            res.send(err);
        } else {
            let proms: [Promise<void | string>?] = [];

            files.forEach((file) => {
                proms.push( new Promise((resolve, reject) => {
                    fs.stat(path.join(dirname, reposDir, file), (err, stats) => {
                        if (stats.isDirectory()) {
                            resolve(file);
                        }
                        resolve();
                    });
                }));
            });

            Promise.all(proms).then(value => res.json({
                names: value
            }));
        }
    });
}