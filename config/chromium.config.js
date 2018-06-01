const linuxOpt = {
    args: ['--no-sandbox', '--disable-setuid-sandbox']
}

const mc = {
    executablePath: '/Applications/Chromium.app/Contents/MacOS/Chromium',
    headless: true
}

let out = {
    pageOpt: {
        // waitUntil: 'networkidle2',
        timeout: 1000000
    },
};

// if (process.env.NODE_ENV === 'pro') {
//     out.launch = linuxOpt
// } else if (process.env.NODE_ENV === 'mac') {
//     out.launch = mc
// } else {
    
// }

module.exports = out;