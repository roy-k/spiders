'use strict'
const request = require('request');
const cheerio = require('cheerio');

const log = require('../../config/log4js.config.js').douban_base;
log.info('douban-base log is ready');

const {
    HEAD_LINE,
    HEAD_IMG,
    INFOS,
} = require('./config/selectors.js').baseInfo;

module.exports = function (targetUrl) {
    return new Promise((res, rej) => {
        request(targetUrl, function (error, response, body) {
            if(error) {
                log.error('请求出错', error);
                rej(error)
            }
    
            const $ = cheerio.load(body);
    
            const result = {};
    
            let headImg = '';
            try {
                headImg = $(HEAD_IMG)[0].attribs.src;
                log.info('headImg: ', headImg)
            } catch(err) {
                log.error('获取封面出错', err)
            }
    
            if(headImg) {
                result.headImg = headImg
            } else {
                log.warn('海报缺失: ', '人物')
            }
    
            const infos = $(INFOS);
            log.info('info数量', infos.length)
    
            Array.from(infos).forEach((v, i) => {
                const info = infos.eq(i).text().trim();
                const [name, value] = info.split(':');
    
                if(name.indexOf('性别') > -1) {
                    result.gender = value.trim()
                }
                if(name.indexOf('出生日期') > -1) {
                    result.birthday = value.trim()
                }
                if(name.indexOf('出生地') > -1) {
                    result.birthPlace = value.trim()
                }
            })
    
            console.log('豆瓣基本信息: ', result);
            log.info('豆瓣基本信息: ', result);
            res(result);
        });
    })
}