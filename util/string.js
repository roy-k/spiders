const clear = (str) => {
    return str.replace(' ', '').replace('&nbsp;', '')
};

// 1993年10月15日

const resetDate = (str) => {
    const temp = str.replace(/[\u5e74\u6708\u65e5]/g, '-')
    return temp.substring(0, temp.lastIndexOf('-'));
}

module.exports = {
    clear,
    resetDate,
}