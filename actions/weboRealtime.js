const Async = require('async')

const tasks = require('../config/target')

const {gapWeiboFans} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getWeiboRealtiem = require('../spiders/weibo/weiboRealtime')

module.exports = function () {
    getWeiboRealtiem(tasks)
}