const express = require('express');
const Router = express.Router();
const imageController = require('../controllers/imageController');

Router.post('/', (req, res) => {
    imageController.create(req.body, (err, data)=>{
        if (err) { res.send(err) };
        res.json({ message: 'Create success!', data: data });
    });
});

Router.get('/', (req, res) => {
    imageController.getAll((err, data)=>{
        if (err) { res.send(err) };
        res.json({ data: data });
    });
});

Router.get('/:id', (req, res) => {
    
});

Router.put('/', (req, res) => {
    
});

Router.delete('/', (req, res) => {
    
});

module.exports = Router;