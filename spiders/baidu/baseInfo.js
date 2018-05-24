'use strict'
const request = require('request');
const cheerio = require('cheerio');

const log = require('../../config/log4js.config.js').baidu_base;
log.info('baidu_base log is ready');

const {clear, resetDate} = require('../../util/string')

// const {updateNow} = require('./update/douban')

const {
    INFO_KEY,
    INFO_VALUE,
} = require('./config/selectors.js').baseInfo;

let targetUrl = '';

if(process.env.NODE_ENV === 'pro') {
    targetUrl = ''
} else {
    targetUrl = 'http://127.0.0.1/mock/bbai.html' // 刚才是 gk.qq.com  访问失败
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

        const keys = $(INFO_KEY);
        const values = $(INFO_VALUE);

        log.info('info数量', keys.length, values.length)
        
        Array.from(keys).forEach((v, i) => {
            const key = clear(keys.eq(i).text());
            // console.log(key, values.eq(i).text());
            
            const Rh = /\u8eab*\u9ad8/ // 身高
            const Rw = /\u4f53*\u91cd/ // 体重
            const Rc = /\u661f*\u5ea7/ // 星座
            // const Rw = /\u4f53*\u91cd/ // 体重
            // const Rw = /\u4f53*\u91cd/ // 体重


            if(key.indexOf('中文名') > -1) {
                result.name = values.eq(i).text().trim()
            }
            if(Rh.test(key)) {
                result.height = values.eq(i).text().trim()
            }
            if(Rw.test(key)) {
                result.weight = values.eq(i).text().trim()
            }
            if(Rc.test(key)) {
                result.constellation = values.eq(i).text().trim()
            }
            if(key.indexOf('出生日期') > -1) {
                result.birthday = resetDate(values.eq(i).text().trim())
            }
        })

        console.log(result);
        log.info('res: ', result);
        

        // updateNow(result).then(({status, data}) => {
        //     if(status === 200) {
        //         log.info('更新成功', Date());
        //     }
        // })
    });
}