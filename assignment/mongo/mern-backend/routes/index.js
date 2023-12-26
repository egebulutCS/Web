var express = require('express');
var User = require('../model/user');
var mongoose = require('mongoose');
var UserLogin = require('../model/userLogin')
const { update } = require('../model/user');
const { account } = require('../model/userLogin');
//const bcrypt = require("bycrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require('util');

var router = express.Router();

//create token for authenticated user 
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
  });
}

const createUserToken = async(user, code, req, res) => {
  const token = signToken(user._id);

  //set expiry to 1 month 
  let d = new Date();
  d.setDate(d.getDate() + 30);

  //cookie settings 
  res.cookie('jwt', token, {
      expires: d, 
      httpOnly: true,
      secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
      sameSite: 'none'
  });

  //remove user password from output
  user.password = undefined; 
  res.status(code).json({
      status: 'success',
      token,
      data: {
          user
      }
  });
};

router.post("/register", function(req, res, next) {
  // bcrypt.hash(req.body.password, 10)
  //   .then((hashedPassword) => {
//       const newUserLogin = new UserLogin({
//         name: req.body.name,
//         password: hashedPassword,
//       });

// newUserLogin._id = mongoose.Types.ObjectId();

//   newUserLogin.save(function(err) {
//     if (err) {
//       console.log("not saved!");
//       res.status(400);
//       res.send();
//     } else {
//       console.log("saved!");
//       res.send({ id : newUserLogin._id });
//     }

//   });
// })
  //   .catch((e) => {
    //   response.status(500).send({
    //     message: "Password was not hashed successfully",
    //     e,
    //   });
    // });
    // ------------------------
  let newUserLogin = new UserLogin(req.body);
  newUserLogin._id = mongoose.Types.ObjectId();

  newUserLogin.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      createUserToken(newUser, 201, req, res);
      res.send({ id : newUserLogin._id });
    }

  });
});

router.post("/login", function(req, res, next) {
  let newUserLogin = new UserLogin(req.body);
  newUserLogin._id = mongoose.Types.ObjectId();
  UserLogin.findOne({ name: newUserLogin.name })
    .then((userLogin) => {
      if(newUserLogin.password != userLogin.password) {
        return res.status(400).send({
          message: "Passwords does not match",
          error,
        });
      }

      const token = jwt.sign(
        {
          userId: userLogin._id,
          userName: userLogin.name,
        },
        "RANDOM-TOKEN",
        { expiresIn: "24h" }
      );

      res.status(200).send({
        message: "Login Successful",
        name: userLogin.name,
        token,
      });
    })
    .catch((e) => {
      res.status(404).send({
        message: "Username "+newUserLogin.name+" not found",
        e,
      });
    });
});

// exports.logoutUser = catchAsync(async (req, res) => {
//   res.cookie('jwt', 'loggedout', {
//     expires: new Date(Date.now() + 1 * 1000),
//     httpOnly: true
//   });
//   res.status(200).send('user is logged out');
// });

// router.get('/users', function(req, res, next) {
//   let searchQuery = {};

//   if(req.query.name)
//     searchQuery = { name: req.query.name };

//   User.find(searchQuery, function(err, users){
//     if (err) {
//       res.status(400);      
//       res.send();
//     }

//     console.log("returning all the users.");
//     res.send(users);
//   })
// });

router.post('/users', function(req, res, next) {
  let newUser = new User(req.body);
  newUser._id = mongoose.Types.ObjectId();

  newUser.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id : newUser._id });
    }

  });
});

router.get('/userNameUpdate', function(req, res, next) {
  let searchQuery = {};
  let updateQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  if(req.query.updateName)
    updateQuery = { $set: { name: req.query.updateName } };

  User.updateOne(searchQuery, updateQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }})

    searchQuery = { name: req.query.updateName };

  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("updated user name successfully.");
    res.send(users);
  })
});

router.get('/userAgeUpdate', function(req, res, next) {
  let searchQuery = {};
  let updateQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  if(req.query.updateAge)
    updateQuery = { $set : { age: req.query.updateAge } };

  User.updateOne(searchQuery, updateQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }})

  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("updated user age successfully.");
    res.send(users);
  })
});

module.exports = router;
