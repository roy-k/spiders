const async = require('async')

const tasks = require('../config/target')

const {gapBaiduBaike} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const log = require('../config/log4js.config').default

const getBaiduBaike = require('../spiders/baidu/baseInfo')

// 接口 https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD

async.mapSeries(tasks, async v => {
    const url = ` https://baike.baidu.com/item/${encodeURIComponent(v.name)}`

    const res = await Promise.all([
        getBaiduBaike(url, v.name),
        timeout(gapBaiduBaike)
    ])

    const data = res[0]

    return data
}, (err, contents) => {
    if (err)
        throw err
        // console.log(contents)
    })
