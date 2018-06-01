'use strict'
const Async = require('async')
const puppeteer = require('puppeteer');
const {launch: launchOpt, pageOpt} = require('../../config/chromium.config');

const log = require('../../config/log4js.config.js').weiboRealtime;
log.info('weiboRealtime log is ready');

const {INDEX_INPUT, REALTTIME_INPUT, DELETE_TEXT, HOT_24} = require('./config/selectors.js').weiboRealtime;

const {gapWeiboRealtime} = require('../../config/timeGap.config')

const {timeout} = require('../../common/utils')

let targetUrl = 'http://data.weibo.com/index/realtime';

module.exports = async function (tasks) {
    // const browser = await(puppeteer.launch(launchOpt));
    const browser = await(puppeteer.launch({headless: false}));
    const page = await browser.newPage();
    // 进入页面
    try {
        await page.goto(targetUrl, pageOpt);
    } catch (error) {
        log.error('页面导航错误', error);
        browser.close();
    }

    await page.waitFor(5000);

    const url = page.url();
    console.log('url', url);

    const name = '白敬亭';

    if (url === 'http://data.weibo.com/index') {
        await page.type(INDEX_INPUT, name, {delay: 0});

        // 回车
        await page
            .keyboard
            .press('Enter');

        await page.waitFor(3000);

        page.goto(targetUrl)

        await page.waitFor(2000);
    }

    Async.mapSeries(tasks, async v => {

        // console.log(v);
        

        const deleteText = await page.$(DELETE_TEXT);

        await deleteText.click();

        await page.type(REALTTIME_INPUT, v.name, {delay: 0});

        // 回车
        await page
            .keyboard
            .press('Enter');

        await page.waitFor(8000);

        const data = await page.$eval(HOT_24, li => {
            const spans = li.children;

            const hotNum = spans[2].innerText;

            const trend = spans[4].classList[0];

            const percent = spans[4].textContent;

            return {hotNum, trend, percent}
        });

        console.log('微博热度: ',v.name,  data);
        log.info(v.name, '热度', data);

        await timeout(gapWeiboRealtime);

        return data

    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        page.close();
    })

}