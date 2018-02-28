const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const configs = require('../configs.json');

const login = (username, password, callback) => {
    userModel.findOne({ username: username }, (err, data)=>{
        if (err) { callback(err) }
        else if (!data) { callback({ message: 'User is not exist!' }); }
        else {
            if (bcrypt.compareSync(password, data.hashPassword)) {
                callback(null, data);
            } else {
                callback({ message: 'Wrong password!' });
            }
        }
    })
}

module.exports = {
    login
}