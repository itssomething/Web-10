const userModel = require('../models/userModel');

let create = (user, callback) => {
    userModel.create(user, (err, res)=>{
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