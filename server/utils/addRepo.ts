import * as express from 'express';
import { exec } from 'child_process';

export default function addRepo(req: express.Request, res: express.Response, reposDir: string) {
    exec(`cd ${reposDir} && git clone ${req.body.url}`, (err, out) => {
        if (err) {
            res.sendStatus(404);
        } else {
            res.send('Repo is downloaded');
        }
    });
}