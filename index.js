const EventEmitter = require('events');
const emitter = new EventEmitter();
emitter.setMaxListeners(25) 

const schedule = require('node-schedule');

const baiduBaike = require('./actions/baiduBaike')
const baiduTieba = require('./actions/baiduTieba')

const buluoFans = require('./actions/buluoFans')

const doubanBase = require('./actions/doubanBase')

const maoyanMovie = require('./actions/maoyanMovie')

const weboFans = require('./actions/weboFans')
const weboRealtime = require('./actions/weboRealtime')

const {
    baidu_baike,
    baidu_tieba,
    buluo_fans,
    douban_base,
    maoyan_movies,
    weibo_fans,
    weibo_Realtime
} = require('./config/schedule.config.js')

schedule.scheduleJob(baidu_baike, function () {
    baiduBaike()
});
schedule.scheduleJob(baidu_tieba, function () {
    baiduTieba()
});
schedule.scheduleJob(buluo_fans, function () {
    buluoFans()
});
schedule.scheduleJob(douban_base, function () {
    doubanBase()
});
schedule.scheduleJob(maoyan_movies, function () {
    maoyanMovie()
});
schedule.scheduleJob(weibo_fans, function () {
    weboFans()
});
schedule.scheduleJob(weibo_Realtime, function () {
    weboRealtime()
});
