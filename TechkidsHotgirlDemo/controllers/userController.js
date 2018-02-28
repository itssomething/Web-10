const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const configs = require('../configs.json')

let create = (user, callback) => {
    let newUser = {
        username: user.username,
        avatarUrl: user.avatarUrl,
        hashPassword: bcrypt.hashSync(user.password, bcrypt.genSaltSync(configs.saltRounds))
    }
    userModel.create(newUser, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Create failed!');
        } else {
            callback(null, res);
        }
    });
};

let getAll = (callback) => {
    userModel.find({}, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Get failed!');
        } else {
            callback(null, res);
        }
    });
};

let getById = (id, callback) => {
    userModel.findById(id, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Get failed!');
        } else if(!res) {
            callback('Not found!');
        } else {
            callback(null, res);
        }
    });
};

let update = (data, callback) => {
    userModel.findById(data._id, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Get failed!');
        } else if(!res._id) {
            callback('Not found!');
        } else {
            for(let key in res){
                if(data[key]){
                    res[key] = data[key];
                }
            }
            res.save((err, res)=>{
                if (err) { callback(err) }
                callback(null, res);
            })
        }
    });
};

let deleteById = (id, callback) => {
    userModel.remove({_id: id}, (err)=>{
        if (err) {
            callback(err)
        } else {
            callback(null);
        }
    })
};

module.exports = {
    create,
    getAll,
    getById,
    update,
    deleteById
}