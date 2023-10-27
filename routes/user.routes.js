const { express } = require("../db");
const bcrypt = require('bcrypt');
const { UserModel } = require("../model/users.model");
var jwt = require("jsonwebtoken");
const { BlacklistModel } = require("../model/blacklist.model");


const userRouter = express.Router()

userRouter.post("/register", (req, res) => {
    console.log(req.body)
    const {name, email, pass} = req.body;

    try {
        bcrypt.hash(pass, 5, async function(err, hash) {
            // Store hash in your password DB.
            if(err) {
                res.status(200).send({ message : "Unable to hash" })
            } else {
                const user = new UserModel({name, email, pass : hash })
                await user.save()
                res.status(200).send({ message : "Account Created Successfully" })
            }
        });
    } catch (error) {
        // res.status(400).send({ "error" : error })
        if (error.code === 11000 && error.keyPattern.email === 1) {
            // Mongoose error code 11000 indicates a duplicate key error
            res.status(200).send({ message: "Email already registered" });
        } else {
            res.status(400).send({ "error": error.message });
        }
    }
})

userRouter.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "error" : error })
  }
})

userRouter.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const users = await UserModel.findOne({ _id : userId });
    res.status(200).send(users)
  } catch (error) {
    res.status(400).send({ "error" : error })
  }
})


userRouter.post("/login", async (req, res) => {
    const { email, pass } = req.body;
    try {
      const user = await UserModel.findOne({ email });
      if (user) {
        const token = jwt.sign(
          {
            email : user.email,
            userID : user._id
          },
          "myKey"
        );
        bcrypt.compare(pass, user.pass, function (err, result) {
          // result == true
          if (result) {
            res.status(200).send({ message: "Login Successful", token, user });
          } else {
            res.status(200).send({ message: "Login Unsuccessful, wrong credentials" });
          }
        });
      } else {
          res.status(200).send({ message: "Email not found" });
      }
    } catch (error) {
      res.status(400).send({ "error": error });
    }
  });

  userRouter.get("/logout", async (req, res) => {
    const token = req.headers.authorization?.split(" ")[1]
    try {
      const blacklist = new BlacklistModel({ "token" : token });
      await blacklist.save()
      res.status(200).send({ message : "Logout successfull" })
    } catch (error) {
      res.status(400).send({ "error": error });
    }
  })

module.exports = {
    userRouter
}