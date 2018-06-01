module.exports = {
    apps: [
        {
            name: "spider",
            script: "../index.js",
            env: {
                "NODE_ENV": "pro",
            },
            instances: 2
        }
    ]
}