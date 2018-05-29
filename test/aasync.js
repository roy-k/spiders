const tasks = require('../config/target');

// const {queue} = require('../common/utils');

const async = require('async');

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function queue(tasks, time, fn) {
    tasks.forEach(async (v, i) => {
        await Promise.all([fn(v), timeout(time)]);
    });
}

async function fn(v) {
    console.log('id: ',v.maoyanId);
}

async.mapSeries(tasks, async v => {
    return await Promise.all([fn(v), timeout(5000)]);
}, (err, contents) => {
    if (err) throw err
    console.log(contents)
})
