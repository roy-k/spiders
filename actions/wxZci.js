const Async = require('async')

const tasks = require('../config/target')

const {gapWxZci} = require('../config/timeGap.config')

const {timeout, getWxZciKey} = require('../common/utils')

const log = require('../config/log4js.config').default

const getWxZci = require('../spiders/weixin/zci')

// 接口

module.exports = function () {
    Async.mapSeries(tasks, async v => {
        const res = await Promise.all([getWxZci(v), timeout(getWxZciKey)])

        const data = res[0]

        log.info('ok', v.name, data.length);

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}
