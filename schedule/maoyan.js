const schedule = require('node-schedule');

// 引入爬虫
const doubanBase = require('../actions/doubanBase')
// var {logN} = require('../common/log')

const {douban_base} = require('../config/schedule.config.js')

schedule.scheduleJob(douban_base, function () {
    // logN.info('日程已加入', Date())
    doubanBase()
});

// schedule.scheduleJob(nowRule, function () {

// });

// schedule.scheduleJob(nowRule, function () {

// });

