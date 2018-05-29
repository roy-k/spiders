function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function queue(tasks, time, fn) {
    tasks.forEach(async (v, i) => {
        await Promise.all([fn(v), timeout(time)]);
    });
}

module.exports = {
    queue,
    timeout
};