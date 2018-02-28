const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

let checkLogin = (user, callback) => {
    if(user.username){
        userModel.findOne({username: user.username}, (err, data)=>{
            if(err){ callback(err) }
            else if(!data) {
                callback({ message: "User is not exist!" });
            } else {
                if(bcrypt.compareSync(user.password, data.password)){
                    callback(null, data.username);
                } else {
                    callback({ message: "Wrong password!" });
                }
            }
        })
    }
}

module.exports = {
    checkLogin
}