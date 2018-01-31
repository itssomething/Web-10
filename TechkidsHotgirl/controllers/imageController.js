const imageModel = require('../models/imageModel');

let create = (image, callback) => {
    imageModel.create(image, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Create failed!');
        }
        callback(null, res);
    });
};

let getAll = (callback) => {
    imageModel.find({}, (err, res)=>{
        if(err) {
            console.log(err);
            callback('Get failed!');
        }
        callback(null, res);
    });
};

module.exports = {
    create,
    getAll
}