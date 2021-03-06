const axios = require('axios');
const log = require('../../config/log4js.config.js').maoyan_movies;

// 单次请求
async function getMovies(id, offset = 0) {
    const url = `http://maoyan.com/films/celebrity/ajax/works/${id}?offset=${offset}`;

    const {status, data} = await axios.get(url);
    if (status !== 200) {
        log.error('请求失败', url)
        return;
    }

    return data;
}


module.exports = async function getAllMovies({maoyanId:id, name}) {
    let {data, paging} = await getMovies(id);

    let total = paging.total;
    let offset = 3;
    log.info(name, id, 'total', total);

    while (total % 3 && total > 3) {
        const {data: arr} = await getMovies(id, offset);
        data = data.concat(arr || []);

        total -= 3;
        offset += 3;
    }

    console.log('猫眼作品数: ', name, data.length);
    
    return data
}
