const mongoose = require('mongoose');
const { Schema } = mongoose;
const validator = require('validator')
const userSchema = new Schema({
  
    username: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Email is not valid !!!")
            }
        }
    },
    birthdate: {
        type: Date,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User