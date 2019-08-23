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

//GET to save a user design
router.get(`/:userName/designs/:designName/save`, (req, res) => {
  let fileName = req.params.designName;
  let path = 'https://minddesign-assets.s3.amazonaws.com/' + fileName + '.svg';

  //we'll have a check for the file existing here

  const design = new Design()

  design.designName = fileName
  design.designOwner = req.user._id
  design.svgLink = path
  design.designDescription = String,
  design.likes = 0,
  design.favorites = 0,
  design.published = false

  design.save(function (err, user) {
    if (err) { return next(err) }

    // Repond to request indicating the user was created
    res.send([design])
  });
})

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

//POST to update a user design?


module.exports = router;
