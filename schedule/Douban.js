const schedule = require('node-schedule');

// 引入爬虫
const doubanNowPlaying = require('../spiders/douban_nowPlaying')
var {logN} = require('../common/log')

const nowRule = {
    second: [
        25,
        55
    ],
    // minute: 50,
    // hour: 1,
}

schedule.scheduleJob(nowRule, function () {
    logN.info('日程已加入', Date())
    doubanNowPlaying()
});

// schedule.scheduleJob(nowRule, function () {

// });

// schedule.scheduleJob(nowRule, function () {

// });

