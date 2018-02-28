const imageModel = require('../models/imageModel');

let create = (image, callback) => {
    imageModel.create(image, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Create failed!');
        } else {
            callback(null, res);
        }
    });
};

let getAll = (callback) => {
    imageModel.find({}, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Get failed!');
        } else {
            callback(null, res);
        }
    });
};

let getById = (id, callback) => {
    imageModel.findById(id, (err, res)=>{
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
    imageModel.findById(data._id, (err, res)=>{
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
    imageModel.remove({_id: id}, (err)=>{
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