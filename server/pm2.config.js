const path = require('path')

module.exports = {
    apps: [
        {
            name: "spider-server",
            script: path.resolve(__dirname, './index.js'),
            env: {
                "NODE_ENV": "development",
            },
            instances: 1
        }
    ]
}