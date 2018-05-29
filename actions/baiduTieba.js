const async = require('async')

const tasks = require('../config/target')

const {gapMaoyanMovie} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const getMaoyanMovies = require('../spiders/maoyan/movies')

// 接口

async.mapSeries(tasks, async v => {
    const res = await Promise.all([getMaoyanMovies(v), timeout(gapMaoyanMovie)])

    const data = res[0]

    return data
}, (err, contents) => {
    if (err) throw err
    // console.log(contents)
})
