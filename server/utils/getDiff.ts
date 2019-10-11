import * as express from 'express';
import { exec, spawn } from 'child_process';

export default function getDiff(req: express.Request, res: express.Response, reposDir: string) {
    new Promise((resolve, reject) => {
            exec(`cd ${reposDir}/${req.params.repositoryId} && git cat-file -p ${req.params.commitHash}`, (err, out) => {
                if (err) {
                    reject(err);
                } else {
                    out = out.slice(out.indexOf('parent') + 7, out.indexOf('parent') + 47); //40 - длина SHA1-хеша
                    resolve(out);
                }
            });
        })
        .then((parentHash: string) => {

            let result = '';
            let commitsDiff = spawn(`cd ${reposDir}/${req.params.repositoryId} && git diff ${parentHash} ${req.params.commitHash}`, {
                shell: true
            });

            commitsDiff.stderr.on('data', (data: string) => {
                res.send(`STDERR: ${data.toString()}`);
            });

            commitsDiff.stdout.on('data', (data: string) => {
                data = data.toString();
                result += data;
            });

            commitsDiff.on('close', () => {
                res.json({ data: result });
            });
        })
        .catch(err => res.send(err));
}