const Async = require('async')

// const tasks = require('../config/target')

const {gapDuowanList} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')
const writeFile = require('../common/writeFile')

// const log = require('../config/log4js.config').default

const getDuowanList = require('../spiders/duowan/xiaosigeList')

// 接口 https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD
module.exports = async function () {
    Async.mapSeries([1], async v => {
    
    const url = `http://bbs.duowan.com/thread-38745787-1-1.html`

    const res = await Promise.all([
        getDuowanList(url),
        timeout(gapDuowanList)
    ])

    const data = res[0]

    writeFile(data, 'duowanList')
    
    return data
}, (err, contents) => {
    if (err)
        throw err
    })
    console.log(arguments)
    // console.log(contents.slice(-3, 0));
    // writeFile(contents, 'duowanList')
}


