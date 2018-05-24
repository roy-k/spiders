'use strict'
const request = require('request');
const cheerio = require('cheerio');

const log = require('../../config/log4js.config.js').baidu_tieba;
log.info('tieba log is ready');

const {clear, resetDate} = require('../../util/string')

// const {updateNow} = require('./update/douban')

const {
    LABEL,
    FOCUS,
} = require('./config/selectors.js').tieba;

let targetUrl = '';

if(process.env.NODE_ENV === 'pro') {
    targetUrl = ''
} else {
    targetUrl = 'http://tieba.baidu.com/f?kw=%E5%88%98%E6%98%8A%E7%84%B6&ie=utf-8&traceid=' // 刚才是 gk.qq.com  访问失败
}

// request('http://127.0.0.1/mock/movie.html', (a,b,c) => {console.log(c)})
// request('http://gk.qq.com/mock/movie.html', (a,b,c) => {console.log(c)})

module.exports = function () {
    request(targetUrl, function (error, response, body) {
        if(error) {
            log.error('请求出错', error);
            return;
        }

        const $ = cheerio.load(body);

        const result = {};

        try {
            const key = $(LABEL).eq(0).text();
            console.log(key);
            
            const value = $(FOCUS).eq(0).text();
            if(key.indexOf('关注') > -1) {
                console.log(value);
                log.info('关注数: ', value);
            }
        } catch(e) {
            log.error('选择错误', e)
        }
        
        // updateNow(result).then(({status, data}) => {
        //     if(status === 200) {
        //         log.info('更新成功', Date());
        //     }
        // })
    });
}