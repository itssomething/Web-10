const express = require('express');
const Router = express.Router();
const userController = require('../controllers/userController');

Router.post('/', (req, res) => {
    userController.create(req.body, (err, data)=>{
        if (err) { res.status(400).send(err) }
        else {
            res.status(201).json({ message: 'Create success!', data: data });
        }
    });
});

Router.get('/', (req, res) => {
    userController.getAll((err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    });
});

Router.get('/:id', (req, res) => {
    userController.getById(req.params.id, (err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    })
});

Router.put('/', (req, res) => {
    userController.update(req.body, (err, data)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Success!', data: data });
        }
    })
});

Router.delete('/', (req, res) => {
    userController.deleteById(req.body._id, (err)=>{
        if (err) { res.send(err) }
        else {
            res.json({ message: 'Delete success!' });
        }
    })
});

module.exports = Router;