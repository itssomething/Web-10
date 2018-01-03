const express = require('express');
const Router = express.Router();

Router.get('/', (req, res)=>{
    res.send("Question Page");
});

Router.get('/:id', (req, res)=>{
    console.log(req.params.id);
});

module.exports = Router;