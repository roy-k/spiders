const Async = require('async')

const tasks = require('../config/target')

const {gapBaiduTieba} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getBaiduTieba = require('../spiders/baidu/tieba')

// 接口
module.exports = function () {
    Async.mapSeries(tasks, async v => {

        const url = `http://tieba.baidu.com/f?kw=${encodeURIComponent(v.name)}&ie=utf-8&traceid=`

        // console.log('url', url);

        const res = await Promise.all([
            getBaiduTieba(url, v.name),
            timeout(gapBaiduTieba)
        ])

        const data = res[0]

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}