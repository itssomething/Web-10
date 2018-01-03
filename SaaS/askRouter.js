const express = require('express');
const Router = express.Router();

Router.get('/', (req, res)=>{
    console.log(req.query.question);
    res.render("ask");
});

Router.get('/sub', (req, res)=>{
    res.send({
        a: 4,
        b: 5
    });
});

Router.post('/', (req, res)=>{
});

module.exports = Router;