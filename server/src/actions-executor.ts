import fs from 'fs';
import path from 'path';
import * as http from 'http';
import * as https from 'https';
import { URL } from 'url';
import config from 'config';
import { ActionRequest } from './models';
import { getActionsById, updateAction } from './db';
import { logger } from './server';

const parallel = require('parallel-stream');
const fromArray = require('from2-array');


const getHttpClient = (url): any => new URL(url).protocol === 'https:' ? https : http;

const getFileNameFromUrl = (url) => path.basename(url);

const getFilePath = (url) => path.join(config.get('downloadDir'), getFileNameFromUrl(url));

export function downloadFiles(actions: ActionRequest[]) {
    return fromArray
        .obj(actions)
        .pipe(parallel.transform((action: ActionRequest, enc, done) => {
            const filePath = getFilePath(action.url);
            updateAction(action._id, {status: 'inProgress'});
            getHttpClient(action.url).get(action.url, (response) => {
                const writeStream = fs.createWriteStream(filePath)
                    .on('finish', () => {
                        done();
                        updateAction(action._id, {status: 'completed', path: filePath});
                    }).on('error', err => {
                        logger.error(`error while writing to file: ${filePath}`, err);
                        done();
                        updateAction(action._id, {status: 'failed'});
                    });
                response.pipe(writeStream);
                response.on('error', err => {
                    logger.error('error on download file: ' + err);
                    updateAction(action._id, {status: 'failed'});
                    done();
                });
            });
        }, {objectMode: true, concurrency: config.get<number>('concurrency')}));
}

export function applyActions(requestId: string) {
    return getActionsById(requestId).then(actions => downloadFiles(actions));
}
