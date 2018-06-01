// 'douban_base', 'maoyan_movies', 'baidu_base', 'baidu_tieba', 'weiboFans',
// 'weiboRealtime', 'buluoFans'

const templete = {
    second: [
        40, 55
    ],
    minute: 50,
    hour: 1,
    dayOfMonth: 1,
    month: 1,
    dayOfWeek: 1
}

// 百度
const baidu_baike = {
    second: 0,
    minute: 40,
    hour: 19
}
const baidu_tieba = {
    second: 10,
    minute: 40,
    hour: 19
}

// 部落
const buluo_fans = {
    second: 40,
    minute: 40,
    hour: 19
}

// 豆瓣
const douban_base = {
    second: 30,
    minute: 40,
    hour: 19
}

// 猫眼
const maoyan_movies = {
    second: 40,
    minute: 40,
    hour: 19
}

// 微博
const weibo_fans = {
    second: 50,
    minute: 40,
    hour: 19
}
const weibo_Realtime = {
    second: 55,
    minute: 40,
    hour: 19
}

module.exports = {
    baidu_baike,
    baidu_tieba,
    buluo_fans,
    douban_base,
    maoyan_movies,
    weibo_fans,
    weibo_Realtime
}