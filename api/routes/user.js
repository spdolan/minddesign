const router = require('express').Router();
const fs = require('fs');
const passport = require('passport')
const Authentication = require('../controllers/authentication')
const requireSignin = passport.authenticate('local', { session: false })
const User = require('../models/user')
const Design = require('../models/design')

router.param('userName', function (req, res, next) {
  let { userName } = req.params;
  User.findOne({ name: userName }).exec((err, result) => {
    if (err) return next(err);
    if (result === undefined) {
      res.status(404).send('User not found, please check User Name.');
    } else {
      req.user = result;
      next();
    }
  })
});

//GET for user information

//POST to update user information
router.post('/:userName/edit', (req, res, next) => {
  //checks below here for request body data validation

  //Mongoose function to find and updated specific document
  User.findByIdAndUpdate(req.user._id,
    //we'll pass in our updates, Mongo is smart enough to overwrite what is present and leave the rest
    req.body,
    //this parameter tells Mongo to return the updated object to us
    { new: true },
    //return an error or return our shiny updated Student
    function (err, result) {
      if (err) return next(err);
      res.send(result);
    });
});

//GET all user designs
router.get(`/:userName/designs`, (req, res) => {
  
  Design
    .find({ designOwner: req.user._id})
    .sort({ 'updated_at': -1 })
    .exec((err, designs) => {
      if (err) {
        res.status(400).send('Unable to retrieve designs');
      }
      res.send(designs);
    })
})

//GET single user design
router.get(`/:userName/designs/:designName`, (req, res) => {
  let { designName } = req.params;
  
  Design
    .findOne({ designOwner: req.user._id, name: designName  })
    .sort({ 'updated_at': -1 })
    .exec((err, designs) => {
      if (err) {
        res.status(400).send('Unable to find that design');
      }
      res.send([designs]);
    })
})

module.exports = router;
