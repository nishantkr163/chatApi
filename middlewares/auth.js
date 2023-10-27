const jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklist.model");

const auth = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if(!token) {
        res.status(200).send({ message : "Please login first" })
    } else {
        const blacklist = await BlacklistModel.findOne({token});
        if(blacklist) {
            res.status(200).send({message : "Please login, token expired"})
        }
        jwt.verify(token, 'myKey', function(err, decoded) {
            const { id } = req.params
            if(decoded) {
                console.log(decoded)
                req.body.noteID = id
                req.body.userID = decoded.userID
                req.body.email = decoded.email
                next()
            }
            else {
                res.status(200).send({ "message" : "Token invalid or expired" })
            }
        });
    }
}

module.exports = {
    auth
}