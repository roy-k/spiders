const Async = require('async')

const tasks = require('../config/target')

const {gapWeiboFans} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getWeiboFans = require('../spiders/weibo/weiboFans')

// 接口
module.exports = function () {
    Async.mapSeries(tasks, async v => {

        const url = `https://weibo.com/u/${v.weiboId}?is_hot=1`

        const res = await Promise.all([getWeiboFans(url), timeout(gapWeiboFans)])

        const data = res[0]

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}
