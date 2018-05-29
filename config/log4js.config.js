const log4js = require('log4js')
const path = require('path')

// 按配置 分文件 记录日志
const spiders = [
    'douban_base',
    'maoyan_movies',
    'baidu_base',
    'baidu_tieba',
    'weiboFans',
    'weiboRealtime',
    'buluoFans'
];

const appenders = {
    default: {
        type: 'file',
        filename: path.join(__dirname, `../logs/default.log`),
        maxLogSize: 10485760
    }
};
const categories = {
    default: {
        appenders: ['default'],
        level: 'all'
    }
};

spiders.forEach(v => {
    appenders[v] = {
        type: 'file',
        filename: path.join(__dirname, `../logs/${v}.log`),
        maxLogSize: 10485760
    }
});
spiders.forEach(v => {
    categories[v] = {
        appenders: [v],
        level: 'all'
    }
});

const config = {
    appenders,
    categories
}

log4js.configure(config);

const out = {
    default: log4js.getLogger('default')
}
spiders.forEach(v => {
    out[v] = log4js.getLogger(v)
});

module.exports = out;
