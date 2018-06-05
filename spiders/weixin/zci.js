const axios = require('axios');
const log = require('../../config/log4js.config.js').wxZci;

var authOptions = {
    method: 'GET',
    port: '443',
    url: 'https://search.weixin.qq.com/cgi-bin/searchweb/wxindex/querywxindexgroup',
    params: {
        "group_query_list": "%E5%B0%8F%E7%A8%8B%E5%BA%8F%3B%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80",
        "wxindex_query_list": "%E5%B0%8F%E7%A8%8B%E5%BA%8F%3B%E7%8E%8B%E8%80%85%E8%8D%A3%E8%80%80",
        "gid": "",
        "openid": "ov4ns0GsWbts8NR9jxN06NWHSjTM",
        "search_key": "1528167595367433_1538571717"
    },
    headers: {
        'accept': "*/*",
        'accept-encoding': "br, gzip, deflate",
        'accept-language': "zh-cn",
        'connection': "keep-alive",
        'content-type': "application/json",
        'host': "search.weixin.qq.com",
        'referer': "https://servicewechat.com/wxc026e7662ec26a3a/4/page-frame.html",
        'user-agent': "Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_6 like Mac OS X) AppleWebKit/604.5.6 (KH" +
                "TML, like Gecko) Mobile/15D100 MicroMessenger/6.6.5 NetType/WIFI Language/zh_CN",
        'cache-control': "no-cache",
        'postman-token': "9fbbc80b-4557-0c19-bbc5-9c935e24da66"
    },
    json: true
};

// 单次请求
async function getZci(id, offset = 0) {

    const {status, data} = await axios(authOptions);

    if (status !== 200) {
        log.error('请求失败', url)
        return;
    }

    return data;
}

getZci().then(data => {
    console.log('data', data);
}, err => {
    console.log('err', err);

})

module.exports = async function getAllMovies({maoyanId: id, name}) {}