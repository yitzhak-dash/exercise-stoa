import app from './app';
import fs from 'fs';
import bunyan from 'bunyan';
import config from 'config';

const {errorHandler} = require('express-api-error-handler');

export const logger = bunyan.createLogger({
    name: 'app'
});

app.use(errorHandler({
    log: ({err, req, res, body}) => {
        logger.error(err, `${body.status} ${req.method} ${req.url}`);
    },
    hideProdErrors: true,
}));

if (!fs.existsSync(config.get('downloadDir'))) {
    fs.mkdirSync(config.get('downloadDir'));
}

const server = app.listen(app.get('port'), () => {
    console.log(`  App is running at http://localhost:${app.get('port')} in ${app.get('env')} mode`);
    console.log(`  Press CTRL-C to stop\n`);
});


