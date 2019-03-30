const port = 3003

const bodyAParser = require('body-parser')
const express = require('express')
const server = express()
const allowCors = require('./cors')

server.use(bodyAParser.urlencoded({extended:true}))
server.use(bodyAParser.json())
server.use(allowCors)


server.listen(port, function(){
    console.log(`Backend is running on port ${port}.`)
})

module.exports = server