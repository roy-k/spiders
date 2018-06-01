'use strict'
const puppeteer = require('puppeteer');
const {launch:launchOpt, pageOpt} = require('../../config/chromium.config');

const log = require('../../config/log4js.config.js').weiboFans;
log.info('weiboFans log is ready');

const {LABEL, FOCUS} = require('./config/selectors.js').weiboFans;

// let targetUrl = '';

// if (process.env.NODE_ENV === 'pro') {
//     targetUrl = ''
// } else {
//     targetUrl = 'https://weibo.com/u/2870450862?is_hot=1'
// }

module.exports = async function (targetUrl) {
    const browser = await(puppeteer.launch(launchOpt));
    const page = await browser.newPage();
    // 进入页面
    try {
        await page.goto(targetUrl, pageOpt);
    }
    catch (error) {
        log.error('页面导航错误', error);
        browser.close();
    }

    await page.waitFor(10000);

    const key = await page.$$eval(LABEL, keys => {
        if(keys.length) {
            return keys[1].innerText;
        }
        return keys.length
    });

    const value = await page.$$eval(FOCUS, values => {
        if(values.length) {
            return values[1].innerText;
        }
        return values.length
    });

    console.log('微博粉丝数: ', key, value);
    log.info(key, value);

    page.close();
}