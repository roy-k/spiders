
const baseInfo = {
    INFO_KEY: '.basicInfo-block .name', // <dt class="basicInfo-item name">中文名</dt>
    INFO_VALUE: '.basicInfo-block .value', // <dd class="basicInfo-item value"></dd>
}

const tieba = {
    LABEL: '.card_top .card_num .card_numLabel', // 第一个 : 关注
    FOCUS: '.card_top .card_num .card_menNum'  // 第一个 : ***
}

module.exports = {
    baseInfo,
    tieba,
}