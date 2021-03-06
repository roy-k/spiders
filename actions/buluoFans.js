const Async = require('async')

const tasks = require('../config/target')

const {gapBuluoFans} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getBuluoFans = require('../spiders/buluo/buluoFans')

// 接口
module.exports = function () {
    Async.mapSeries(tasks, async v => {

        const url = `https://buluo.qq.com/p/barindex.html?bid=${v.buluoId}`

        const res = await Promise.all([getBuluoFans(url), timeout(gapBuluoFans)])

        const data = res[0]

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}