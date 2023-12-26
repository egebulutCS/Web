const express = require('express');
const User = require('../model/user');
const mongoose = require('mongoose');
const UserLogin = require('../model/userLogin');
const LibraryLog = require('../model/libraryLog');
const { update } = require('../model/user');
const { account } = require('../model/userLogin');
const jwt = require("jsonwebtoken");
const auth = require('./../auth');

const router = express.Router();

router.post("/register", function(req, res, next) {

  let newUserLogin = new UserLogin(req.body);
  newUserLogin._id = mongoose.Types.ObjectId();

  newUserLogin.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id : newUserLogin._id });
    }

  });
});

router.post('/deleteUser', function(req, res, next) {
  let searchQuery = {};

  if(req.body.name)
    searchQuery = { name: req.body.name };

    UserLogin.deleteOne(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("deleted the matching userLogin.");
    res.send(logs);
  })
});

router.post("/login", function(req, res, next) {
  let searchQuery = {};

  if(req.body)
    searchQuery = { name: req.body.name};

  let userLogin = new UserLogin(req.body);
  userLogin._id = mongoose.Types.ObjectId();
  
  UserLogin.findOne(searchQuery, function(err, users){
    if (err) {
      res.status(400);
      res.send({
        message: "Query error",
        err
      });
    }

    if (users == null){
      res.status(404);
      res.send({
        message: "Username "+req.body.name+" not found",
        err
      });
    } else {

      if (users.password != req.body.password) {
        res.status(400);
        res.send({
          message: "Passwords does not match",
          err
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
    }
  });
});

router.post('/changePassword', function (req, res, next) {
  let searchQuery = {};
  let updateQuery = {};

  if (req.body.name)
    searchQuery = { name: req.body.name };

  if (req.body.newPassword)
    updateQuery = { $set: { password: req.body.newPassword } };

  let userLogin = new UserLogin(req.body);
  userLogin._id = mongoose.Types.ObjectId();

  UserLogin.findOne(searchQuery, function (err, users) {
    if (err) {
      res.status(400);
      res.send({
        message: "Query error",
        err
      });
    }

    if (users == null) {
      res.status(404);
      res.send({
        message: "Username " + req.body.name + " not found",
        err
      });
    } else {

      if (users.password != req.body.password) {
        res.status(400);
        res.send({
          message: "Passwords does not match",
          err
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

      UserLogin.updateOne(searchQuery, updateQuery, function (err, users) {
        if (err) {
          res.status(400);
          res.send();
        }
      })

      UserLogin.find(searchQuery, function (err, users) {
        if (err) {
          res.status(400);
          res.send();
        }

        console.log("updated user password successfully.");
        res.status(200).send({
          message: "Password Change Successful",
          name: userLogin.name,
          token,
        });
      })
    }
  });
});

// free endpoint
router.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access anytime" });
});

// authentication endpoint
router.get("/auth-endpoint", auth, (request, response) => {
  response.json({ message: "You are authorized to access" });
});

router.post("/createLog", function(req, res, next) {

  let newLibraryLog = new LibraryLog(req.body);
  newLibraryLog._id = mongoose.Types.ObjectId();

  newLibraryLog.save(function(err) {
    if (err) {
      console.log("not saved!");
      res.status(400);
      res.send();
    } else {
      console.log("saved!");
      res.send({ id : newLibraryLog._id });
    }

  });
});

router.post('/getLogsByName', function(req, res, next) {
  let searchQuery = {};

  if(req.body.name)
    searchQuery = { name: req.body.name };

    LibraryLog.find(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the logs.");
    res.send(logs);
  })
});

router.post('/getLogsByBook', function(req, res, next) {
  let searchQuery = {};

  if(req.body.book)
    searchQuery = { book: req.body.book };

    LibraryLog.find(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the logs.");
    res.send(logs);
  })
});

router.post('/getLogsByFee', function(req, res, next) {
  let searchQuery = {};

  if(req.body.fee)
    searchQuery = { fee: req.body.fee };

    LibraryLog.find(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the logs.");
    res.send(logs);
  })
});

router.post('/updateBook', function(req, res, next) {
  let searchQuery = {};
  let updateQuery = {};

  if(req.body.name)
    searchQuery = { name: req.body.name };

  if(req.body.book)
    updateQuery = { $set : { book: req.body.book } };

  User.updateOne(searchQuery, updateQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }})

  User.find(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("updated log books successfully.");
    res.send(logs);
  })
});

router.post('/updateFee', function(req, res, next) {
  let searchQuery = {};
  let updateQuery = {};

  if(req.body.name)
    searchQuery = { name: req.body.name };

  if(req.body.fee)
    updateQuery = { $set : { fee: req.body.fee } };

  User.updateOne(searchQuery, updateQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }})

  User.find(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("updated log fee successfully.");
    res.send(logs);
  })
});

router.post('/deleteLog', function(req, res, next) {
  let searchQuery = {};

  if(req.body.name)
    searchQuery = { name: req.body.name };

    LibraryLog.deleteOne(searchQuery, function(err, logs){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("deleted the matching log.");
    res.send(logs);
  })
});








router.get('/users', function(req, res, next) {
  let searchQuery = {};

  if(req.query.name)
    searchQuery = { name: req.query.name };

  User.find(searchQuery, function(err, users){
    if (err) {
      res.status(400);      
      res.send();
    }

    console.log("returning all the users.");
    res.send(users);
  })
});

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
