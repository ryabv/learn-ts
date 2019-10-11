import * as express from 'express';
import * as rimraf from 'rimraf';

export default function deleteRepo(req: express.Request, res: express.Response, reposDir: string) {
    rimraf(`${reposDir}/${req.params.repositoryId}`, function() { res.send(`${req.params.repositoryId} deleted`); });
}