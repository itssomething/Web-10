const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    hashPassword: { type: String, required: true },
    avatarUrl: { type: String, default: '' }
},{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});

module.exports = mongoose.model('user', userSchema);