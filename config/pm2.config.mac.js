module.exports = {
    apps: [
        {
            name: "spider",
            script: "../index.js",
            env: {
                "NODE_ENV": "mac",
            },
            instances: 2
        }
    ]
}