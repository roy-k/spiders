var express = require('express')
var app = express()
var expressWs = require('express-ws')(app)


let www = null

app.use(function (req, res, next) {
    return next()
})

app.get('/wsapi/wxkey', function (req, res, next) {

    const key = req.query.wxkey

    if(!key) {
        res.json({ error: '请传入参数' })
        return
    }

    if(www !== null) {
        www.send(`replay: ${key}`)
    }

    res.json({ error: null, msg: key })
})

app.ws('/wsapi/wxkey', function (ws, req) {
    www = ws
})

app.listen(3771)
