
const baseInfo = {
    HEAD_LINE: '#headline',
    HEAD_IMG: '.item .pic img',
    INFOS: '#headline .info li' //  <li> <span>性别</span>:  男 </li>
}

const onesMovies = {
    TOTAL: 'h1',  // 白敬亭 Jingting Bai的全部作品（18）
    items: '.grid_view li',
    poster: '.nbg img',
    title: 'h6 a',
    year: 'h6 span', // 第一个 (2016) 或 正则提取
    rating: '.star span', // 第二个
    director: '.'
}

module.exports = {
    baseInfo,
    onesMovies,
}