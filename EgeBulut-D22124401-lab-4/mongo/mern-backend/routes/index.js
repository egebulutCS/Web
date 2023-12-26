var express = require('express');
var User = require('../model/user');
var mongoose = require('mongoose');
const { update } = require('../model/user');

var router = express.Router();

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
