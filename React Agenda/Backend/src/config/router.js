const express = require('express')

module.exports = function(server){
    //Api Route
    const router = express.Router()
    server.use('/api',router)

    //Todo Routes
    const todoService = require('../api/todo/todoservice')
    todoService.register(router,'/todo')
}