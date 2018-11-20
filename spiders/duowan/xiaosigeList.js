'use strict'
const request = require('request');
const cheerio = require('cheerio');

module.exports = function (targetUrl) {
    return new Promise((res, rej) => {
        request(targetUrl, function (error, response, body) {
            if (error) {
                log.error('请求出错', error);
                rej(error)
            }
            
            const $ = cheerio.load(body);

            const result = [];

            const links = $('a');

            const keys = $(INFO_KEY);
            const values = $(INFO_VALUE);

            log.info('info数量', keys.length, values.length)

            Array
                .from(links)
                .forEach((v, i) => {
                    const activeReg = /bbs.duowan.com\/thread/;
                    const textReg = /【/;   
                    
                    // 455

                    const url = null || v.attribs.href;
                    const text = $(v).eq(0).text();
                    if(activeReg.test(url) && textReg.test(text)){
                        result.push(url)
                    }
                })
            console.log('数量', result.length);
            
            res(result);
        });
    })
}