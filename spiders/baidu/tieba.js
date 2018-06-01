'use strict'
const request = require('request');
const cheerio = require('cheerio');

const log = require('../../config/log4js.config.js').baidu_tieba;
log.info('tieba log is ready');

const {clear, resetDate} = require('../../util/string')

const {
    LABEL,
    FOCUS,
} = require('./config/selectors.js').tieba;


module.exports = function (targetUrl) {
    return new Promise((res, rej) => {
        request(targetUrl, function (error, response, body) {
            if(error) {
                log.error('请求出错', error);
                rej(error)
            }
    
            const $ = cheerio.load(body);
    
            const result = {};
    
            try {
                const key = $(LABEL).eq(0).text();
                console.log(key);
                
                const value = $(FOCUS).eq(0).text();
                if(key.indexOf('关注') > -1) {
                    console.log(value);
                    log.info('百度贴吧关注数: ', value);
                    res(value);
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
    })
}