'use strict'
const puppeteer = require('puppeteer');
// const request = require('request');
// const cheerio = require('cheerio');

const log = require('../config/log4js.config.js').buluoFans;
log.info('buluo log is ready');

// const {clear, resetDate} = require('../../util/string')

// const {updateNow} = require('./update/douban')

const {LABEL, FOCUS} = {
    LABEL: '.info-data span', // 第3个 : 关注
    FOCUS: '.info-data .num'  // 第2个 : ***
};

let targetUrl = '';

if (process.env.NODE_ENV === 'pro') {
    targetUrl = ''
} else {
    targetUrl = 'https://buluo.qq.com/p/barindex.html?bid=16546' // 刚才是 gk.qq.com  访问失败
}

// request('http://127.0.0.1/mock/movie.html', (a,b,c) => {console.log(c)})
// request('http://gk.qq.com/mock/movie.html', (a,b,c) => {console.log(c)})

module.exports = async function () {
    const browser = await(puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']}));
    const page = await browser.newPage();
    // 进入页面
    try {
        await page.goto(targetUrl);
    }
    catch (error) {
        log.error('页面导航错误', error);
        browser.close();
    }
    // await page.goto(targetUrl);

    await page.waitFor(10000);

    const key = await page.$$eval(LABEL, keys => {
        if(keys.length) {
            return keys[2].innerText;
        }
        return keys.length
    });

    const value = await page.$$eval(FOCUS, values => {
        if(values.length) {
            return values[1].innerText;
        }
        return values.length
    });

    console.log('部落粉丝数ok: ', key, value);
    log.info(key, value);

    page.close()
}