const mongoose = require("mongoose");

const blacklistSchema = mongoose.Schema({
    token : String
}, {
    timestamps: true,
    versionKey : false
});

const BlacklistModel = mongoose.model("blacklist", blacklistSchema)

module.exports = {
    BlacklistModel
}