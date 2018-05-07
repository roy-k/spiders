const axios = require('axios')

const updateNow = function(data) {
    return axios.post('/api/douban/now/update', data)
}

module.exports = {
    updateNow,
}