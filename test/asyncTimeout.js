function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function sleep(fn, ...args) {
    while (1) {
        var [parents] = await Promise.all([
            timeout(5000)
        ]);
    }
}

sleep()