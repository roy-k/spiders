'use strict'
const async = require('async');
const request = require('request');
const cheerio = require('cheerio');
const writeFile = require('./writeFile.js');
const readFile = require('./readFile');
const path = require('path');
const host = 'http://nanrenvip.net/';

const interval = 2000;

readFile('all').then(function (data) {
    console.log(data.length);
    const tt = data.slice(599, 600);
    async.mapSeries(tt, function (item, callback) {
        console.log('开始');
        async.retry({
            times: 5,
            interval: function(retryCount) {
                return 500 * Math.pow(2, retryCount);
            }
        }, function (cbItem) {
            request(p, function (error, response, body) {
                console.log('statusCode:', response && response.statusCode);
                if(!response || !response.statusCode) {
                    console.log('响应出错, 重试条目中');
                    cbItem('err code', 1);
                    return;
                }

                const $ = cheerio.load(body);

                const total = $('a[title="Total record"] b').text();


                if(total > 30) {
                    setTimeout(function () {
                        async.mapSeries(pageArr, function (item, cbPages) {
                            console.log('开始获取分页: ' + pageUri);
                            async.retry({
                                times: 5,
                                interval: function(retryCount) {
                                    return 500 * Math.pow(2, retryCount);
                                }
                            }, function (cb) {
                                request(pageUri, function (error, response, body) {
                                    console.log('statusCode:', response && response.statusCode);
                                    if(!response || !response.statusCode) {
                                        console.log('响应出错, 重试分页');
                                        cb('err code', 1);
                                        return;
                                    }
                                    cb(null, 1);
                                })
                            }, function(err, result) {
                                if(err) {
                                    console.log(err);
                                }
                                setTimeout(function () {
                                    cbPages(null);
                                }, interval)
                            });
                        }, function(err, results) {
                            if (err) console.error(err.message);
                            console.log('分页获取完毕');
                            writeFile(result, item.title).then(function () {
                                setTimeout(function () {
                                    cbItem(null, 1);
                                }, interval)
                            });
                        })
                    }, interval)
                } else {
                    writeFile(result, item.title).then(function () {
                        setTimeout(function () {
                            cbItem(null, 1);
                        },interval)
                    });
                }
            });
        }, function(err, result) {
            if (err) console.error(err.message);
            callback(null, 1);
        });
    }, function(err, results) {
        if (err) console.error(err.message);
        console.log('done');
    });
});

