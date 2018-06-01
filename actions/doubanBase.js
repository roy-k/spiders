const Async = require('async')

const tasks = require('../config/target')

const {gapDoubanBase} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getDoubanBase = require('../spiders/douban/baseInfo')

// 接口
module.exports = function () {
    Async.mapSeries(tasks, async v => {

        const url = `https://movie.douban.com/celebrity/${v.doubanId}/`

        const res = await Promise.all([getDoubanBase(url), timeout(gapDoubanBase)])

        const data = res[0]

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}