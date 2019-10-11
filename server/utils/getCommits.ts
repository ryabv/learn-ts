import * as express from 'express';
import { spawn } from 'child_process';

export default function getCommits(req: express.Request, res: express.Response, reposDir: string) {
    let result: string[][] = [];
    let commits = spawn(`cd ${reposDir}/${req.params.repositoryId} && git checkout ${req.params.commitHash} -q && git --no-pager log --pretty=tformat:"%H--%s--%ad"`, {
        shell: true
    });

    commits.stderr.on('data', (data: string) => {
        res.send(`STDERR: ${data.toString()}`);
    });

    commits.stdout.on('data', (data: string | string[][]) => {
        data = data.toString().trim().split('\n').map(el => el.split('--'));
        result.push(...data);
    });

    commits.on('close', () => {
        res.json({ data: result });
    });
}