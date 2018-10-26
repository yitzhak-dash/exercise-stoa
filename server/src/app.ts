import express from 'express';
import expressValidator from 'express-validator';
import bodyParser from 'body-parser';

import router from './api';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressValidator());
app.use(express.static('./../client/dist'));

app.use('/api', router);
export default app;