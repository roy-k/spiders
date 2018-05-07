var schedule = require('node-schedule');

// 改到 爬虫文件夹
var {logN} = require('../../comon/log')
logN.info('Cheese is Gouda.');
logN.error('Cheese is too ripe!');

// 引入爬虫 

const nowRule = {
    second: [
        5,
        15,
        25,
        35,
        45,
        55
    ],
    // minute: 50,
    // hour: 1,
}

schedule.scheduleJob(nowRule, function () {
    console.log('i run it every 10 sec');


});

// schedule.scheduleJob(nowRule, function () {

// });

// schedule.scheduleJob(nowRule, function () {

// });

