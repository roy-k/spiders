const request = require('request');

const log = require('../../config/log4js.config').wxZci
log.info('wxZci log is ready');

var authOptions = {
    method: 'GET',
    url: 'https://search.weixin.qq.com/cgi-bin/searchweb/wxindex/querywxindexgroup',
    qs: {
        "wxindex_query_list": '王者荣耀',
        "gid": "",
        "openid": "ov4ns0GsWbts8NR9jxN06NWHSjTM",
        "search_key": "1528195214034101_3123838899"
    },
    headers: {
        host: "search.weixin.qq.com",
        referer: "https://servicewechat.com/wxc026e7662ec26a3a/4/page-frame.html"
    },
    gzip: true,
    json: true
};

const generateOptions = (person, key) => {
    return {
        method: 'GET',
        url: 'https://search.weixin.qq.com/cgi-bin/searchweb/wxindex/querywxindexgroup',
        qs: {
            "wxindex_query_list": person.name,
            "gid": "",
            "openid": "ov4ns0GsWbts8NR9jxN06NWHSjTM",
            "search_key": key
        },
        headers: {
            host: "search.weixin.qq.com",
            referer: "https://servicewechat.com/wxc026e7662ec26a3a/4/page-frame.html"
        },
        gzip: true,
        json: true
    }
}


module.exports = function (person) {

    const options = generateOptions(person)
    return new Promise((res, rej) => {
        request(options, (err, res, body) => {
            if (err) {
                log.error('请求错误', err);
                console.log('err', err);
                
            }
            console.log('res', res);
            console.log('body', body);
            console.log('body', typeof body);
            console.log('data', body.data);
            console.log('group', body.data.group_wxindex);
            console.log('wxindex_str', body.data.group_wxindex[0].wxindex_str);
        })
    })
}