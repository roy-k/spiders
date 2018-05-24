// 豆瓣 基本信息
const doubanBaseInfo = require('../spiders/douban/baseInfo')
doubanBaseInfo()

// 猫眼 作品信息
const maoyanMovies = require('../spiders/maoyan/movies')
maoyanMovies(446810)

// 百度百科 基本信息
const baiduBaseInfo = require('../spiders/baidu/baseInfo')
baiduBaseInfo()

// 百度贴吧 关注数
const tieba = require('../spiders/baidu/tieba')
tieba()

// 微博 粉丝数
const weiboFans = require('../spiders/weibo/weiboFans')
weiboFans()

// 微博 热度
const weiboRealtime = require('../spiders/weibo/weiboRealtime')
weiboRealtime()

// 部落 粉丝数
const buluoFans = require('../spiders/buluo/buluoFans')
buluoFans()