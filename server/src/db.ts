import * as mongo from 'mongodb';
import { MongoClient, ObjectID } from 'mongodb';
import * as _ from 'lodash';
import config from 'config';
import { ActionRequest, RawRequest } from './models';


function createDbClient(): Promise<MongoClient> {
    return MongoClient.connect(config.get('dbUrl'), {useNewUrlParser: true});
}

function insertRequests(data: ActionRequest[]) {
    if (_.isEmpty(data)) {
        return Promise.reject('data is empty');
    }
    const client = createDbClient();
    return client.then(client => {
        const db = client.db(config.get('dbName'));
        return db.collection('actionRequests')
            .insertMany(data)
            .then(res => {
                client.close();
                return res;
            });
    });
}

export const getUniqueId = () => new mongo.ObjectID().toHexString();

function convertToDbObj(requestId: string, rawRequest: RawRequest): ActionRequest[] {
    const result: ActionRequest[] = [];
    result.push({
        requestId,
        url: rawRequest.propertyInfo,
        status: undefined,
        dataType: 'json',
        path: undefined
    });
    result.push(...rawRequest.images.map(url => ({
        requestId,
        url,
        status: undefined,
        dataType: 'blob',
        path: undefined
    } as ActionRequest)));

    return result;
}

export function getActionsById(requestId: string): Promise<ActionRequest[]> {
    const conn = createDbClient();
    return conn.then(client => {
        const db = client.db(config.get('dbName'));
        return db.collection('actionRequests')
            .find({requestId})
            .toArray()
            .then(res => {
                client.close();
                return res;
            });
    });
}

export function updateAction(itemId: ObjectID, action: ActionRequest): Promise<any> {
    const conn = createDbClient();
    return conn.then(client => {
        const db = client.db(config.get('dbName'));
        return db.collection('actionRequests')
            .updateOne({_id: itemId}, {$set: action})
            .then(res => {
                client.close();
                return res;
            });
    });
}

export function storeRequest(requestId: string, rawRequest: RawRequest) {
    const actions = convertToDbObj(requestId, rawRequest);
    return insertRequests(actions);
}