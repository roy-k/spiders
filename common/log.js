const log4js = require('log4js')
const path = require('path')

const config = {
    appenders: {
        now: {
            type: 'file',
            filename: path.join(__dirname, '../logs/douban_now.log'),
            maxLogSize: 10485760,
        }
    },
    categories: {
        default: {
            appenders: ['now'],
            level: 'all'
        }
    },
    pm2: true
}

log4js.configure(config);

module.exports = {
    logN: log4js.getLogger('now'),
}