var express = require('express')
var app = express()
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
app.use(bodyParser())
var auth = function () {
  app.post('http://localhost:3000/login', function (req, res) {
    console.log(req)
    var token = jwt.sign(req.body, jwtSecret, { expiresInMinutes: 60*5 })

    res.json({token: token})
  })
}
module.exports = auth
