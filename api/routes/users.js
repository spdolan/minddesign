const router = require('express').Router();
const fs = require('fs');
const passport = require('passport')
const Authentication = require('../controllers/authentication')
const requireSignin = passport.authenticate('local', { session: false })
const User = require('../models/user')
const Design = require('../models/design')

router.param('userId', function (req, res, next) {
  let { userId } = req.params;
  User.findById(userId).exec((err, result) => {
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
router.post('/:userId/edit', (req, res, next) => {
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
router.get(`/:userId/designs`, (req, res) => {
  
  Design
    .find({ designOwner: req.user._id})
    .sort({ 'updated_at': -1 })
    .exec((err, designs) => {
      if (err) {
        res.status(400).send('Unable to retrieve designs');
      }
      // console.log(designs);
      res.send(designs);
    })
})


module.exports = router;
