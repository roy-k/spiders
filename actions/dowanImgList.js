const Async = require('async')

// const tasks = require('../config/target')

const {gapDuowanList} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const readFile = require('../common/readFile')

const writeFile = require('../common/writeFile')

// const log = require('../config/log4js.config').default

const getDuowanImg = require('../spiders/duowan/xiaosigeList')

// 接口 https://baike.baidu.com/item/%E7%99%BD%E6%95%AC%E4%BA%AD
module.exports = async function () {

    const target = await readFile('../data/duowanList.json');

    Async.mapSeries(target, async url => {
    
    const res = await Promise.all([
        getDuowanList(url),
        timeout(gapDuowanList)
    ])

    const data = res[0]
    
    console.log('data', data);
    
    return data
}, (err, contents) => {
    if (err)
        throw err
    })
    console.log('arg', arguments)
    // console.log(contents.slice(-3, 0));
    // writeFile(contents, 'duowanList')
}


