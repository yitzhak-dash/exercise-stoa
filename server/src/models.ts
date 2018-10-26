import { ObjectID } from 'bson';

export interface ActionRequest {
    _id?: ObjectID;
    requestId?: string;
    url?: string;
    status?: ActionStatus;
    dataType?: DataType;
    path?: string;
}

export interface RawRequest {
    propertyInfo: string;
    images: string[];
}

export type DataType = 'blob' | 'json';
export type ActionStatus = 'inProgress' | 'failed' | 'completed';