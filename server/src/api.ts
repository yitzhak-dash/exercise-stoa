import express from 'express';
import { body, query, validationResult } from 'express-validator/check';
import HTTPError from 'http-errors';
import { getActionsById, getUniqueId, storeRequest } from './db';
import { applyActions } from './actions-executor';


const router = express.Router();

const formatError = (errors: any[]) => errors.reduce((pre, curr) => `${pre}  ${curr.msg}.`, '');

router.get('/status',
    query('key', 'query param <key> may not be empty').not().isEmpty(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HTTPError.BadRequest(formatError(errors.array())));
        }
        const requestId = req.query['key'];
        getActionsById(requestId)
            .then(actions => actions.filter(action => action.status === 'completed'))
            .then(completedActions => res.json({
                result: completedActions.length,
                key: requestId
            }));
    });

router.post('/address',
    [
        body('propertyInfo', '<propertyInfo> should be URL').isURL(),
        body('images', '<images> may not be empty').isArray().not().isEmpty()
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new HTTPError.BadRequest(formatError(errors.array())));
        }
        const key = getUniqueId();
        storeRequest(key, req.body)
            .then(() => {
                applyActions(key);
                res.json({key});
            }).catch(err => next(new HTTPError.InternalServerError(err)));
    });

export default router;