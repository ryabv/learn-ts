import * as fs from 'fs';
import * as express from 'express';

export default function getFileContent(req: express.Request, res:express.Response, reposDir: string) {
    fs.readFile(`${reposDir}/${req.params.repositoryId}/${req.params.pathToFile}`, 'utf8', (err, data) => {
        res.json({
            fileData: data.split('\n')
        });
    });
}