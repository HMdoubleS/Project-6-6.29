const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator'); // ensures that no two users can share the same email address

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);