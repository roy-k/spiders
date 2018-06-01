const Async = require('async')

const tasks = require('../config/target')

const {gapMaoyanMovie} = require('../config/timeGap.config')

const {timeout} = require('../common/utils')

const log = require('../config/log4js.config').default

const getMaoyanMovies = require('../spiders/maoyan/movies')

// 接口

module.exports = function () {
    Async.mapSeries(tasks, async v => {
        const res = await Promise.all([getMaoyanMovies(v), timeout(gapMaoyanMovie)])

        const data = res[0]

        log.info('ok', v.name, data.length);

        return data
    }, (err, contents) => {
        if (err) 
            throw err
            // console.log(contents)
        })
}
