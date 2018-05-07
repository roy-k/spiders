'use strict'
const request = require('request');
const cheerio = require('cheerio');

const {logN} = require('../common/log')
logN.info('log is ready');

const {updateNow} = require('./update/douban')

const {
    NOW_PLAYING, // li
    NOW_ITEM_POSTER, // src
    NOW_ITEM_TITLE, // text
    NOW_ITEM_RATING, // text
    NOW_ITEM_INFO_URL, // href
    NOW_ITEM_TICKET_URL // href
} = require('./config/douban_selectors')

const targetUrl = 'https://movie.douban.com/cinema/nowplaying/shenzhen/'
// const targetUrl = 'http://gk.qq.com/mockData/data.html'


module.exports = function () {
    request(targetUrl, function (error, response, body) {
        if(error) {
            logN.error('请求出错', error);
            return;
        }

        const $ = cheerio.load(body);

        const lis = $(NOW_PLAYING);

        logN.info('条目数量: ', lis.length)

        const result = [];

        for (let i = 0; i < lis.length; i++) {

            const $v = $(lis[i]);
            const v = $v[0];

            let title,
                rating,
                region,
                duration,
                release,
                director,
                actors,
                votecount,
                poster,
                info_url,
                ticket_url;

            title = v.attribs['data-title'];
            rating = v.attribs['data-score'];
            region = v.attribs['data-region'];
            duration = v.attribs['data-duration'];
            release = v.attribs['data-release'];
            director = v.attribs['data-director'];
            actors = v.attribs['data-actors'];
            votecount = v.attribs['data-votecount'];

            if(!title) {
                logN.error('无标题 !!', v);
                return
            }

            const Vposter = $v.find(NOW_ITEM_POSTER);
            if (Vposter.length) {
                poster = Vposter[0].attribs.src
            } else {
                logN.warn(`海报缺失: ${title}`)
            }

            const VinfoUrl = $v.find(NOW_ITEM_INFO_URL);
            if (VinfoUrl.length) {
                info_url = VinfoUrl[0].attribs.href
            } else {
                logN.warn(`详情缺失: ${title}`)
            }

            const VticketUrl = $v.find(NOW_ITEM_TICKET_URL);
            if (VticketUrl.length) {
                ticket_url = VticketUrl[0].attribs.href
            } else {
                logN.warn(`购票链接缺失: ${title}`)
            }

            result.push({
                title,
                rating,
                region,
                duration,
                release,
                director,
                actors,
                votecount,
                poster,
                info_url,
                ticket_url
            })

            logN.info(`${title} 解析完成`);
        }

        updateNow(result).then(({status, data}) => {
            if(status === 200) {
                logN.info('更新成功', Date());
            }
        })
    });
}