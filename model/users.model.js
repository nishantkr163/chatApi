const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxLength: 20,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        maxLength: 20,
        minLength: 5
    },
    pass: {
        type : String,
        require : true,
        maxLength: 1024,
        minLength : 5
    }
    // name : String,
    // email : String,
    // pass : String
}, {
    timestamps: true,
    versionKey : false
});

const UserModel = mongoose.model("users", userSchema)

module.exports = {
    UserModel
}