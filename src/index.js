
const express = require('express');
const server = express();
const puerto = 4000;
const cors = require('cors')
const bodyParser = require('body-parser');
const routes = require('./routes');

server.use(cors());
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use('/', routes);

server.listen(puerto, ()=>{
    console.log("Server running");
})