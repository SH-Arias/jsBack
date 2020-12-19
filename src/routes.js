const express = require('express');
const server = express.Router();
const dataBaseHandler = require('./dataBaseFunctions.js');

server.route('/example_insert').post (function (req, res) {
    dataBaseHandler.insertNewExample(req.body, (respuesta) =>  {
     console.log(respuesta)
         res.status(200).send(respuesta)                    
    });   
});

server.route('/example_get').get (function (req, res) {
    dataBaseHandler.getAllExample(req.body, (respuesta) =>  {
     console.log(respuesta)
         res.status(200).send(respuesta)                    
    });   
});

server.route('/stats').get (function (req, res) {
    dataBaseHandler.getStats(req.query, (respuesta) =>  {
     console.log(respuesta)
         res.status(200).send(respuesta)                    
    });   
});

server.route('/translate').get (function (req, res) {
    dataBaseHandler.getStats(req.query, (respuesta) =>  {
     console.log(respuesta)
         res.status(200).send(respuesta)                    
    });   
});

module.exports = server;