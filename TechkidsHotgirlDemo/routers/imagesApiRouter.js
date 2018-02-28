const express = require('express');
const Router = express.Router();
const imageController = require('../controllers/imageController');

Router.post('/', (req, res) => {
    imageController.create(req.body, (err, data)=>{
        if (err) { res.status(400).send(err) }
        else {
            res.status(201).json({ message: 'Create success!', data: data });
        }
    });
});

Router.get('/', (req, res) => {
    imageController.getAll((err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    });
});

Router.get('/:id', (req, res) => {
    imageController.getById(req.params.id, (err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    })
});

Router.put('/', (req, res) => {
    imageController.update(req.body, (err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    })
});

Router.delete('/', (req, res) => {
    imageController.deleteById(req.body._id, (err)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Delete success!' });
        }
    })
});

module.exports = Router;