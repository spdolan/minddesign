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

// POST to create new file
router.post('/:userName/:fileName', (req, res) => {
  let { fileName } = req.params
  // console.log(path);
  var regex = /><\/path>/g;
  let svgStyled = req.body.data.replace(regex, ' style="stroke-width:10;"></path >');
  let svgEmbiggen = svgStyled.replace('viewBox="0 0 200 200" width="200" height="200"', 'viewBox="0 0 300 300" width="600" height="600"')

  const params = {
    Bucket: 'minddesign-assets',
    Key: `${userName}/designs/${fileName}`,
    Body: svgEmbiggen,
    ACL: 'public-read-write',
    ContentType: 'image/svg+xml',
    ContentDisposition: 'attachment'
  };

  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err
    res.send({ fileName });
  });
});

// GET to display file
router.get('/:userName/:fileName', (req, res) => {
  let { fileName } = req.params
  let path = `https://minddesign-assets.s3.amazonaws.com/${userName}/designs/${fileName}`;
  res.sendFile(path);
});

//GET to originally save a user design
router.get(`/:userName/:fileName/save`, (req, res) => {
  let { fileName } = req.params
  let path = `https://minddesign-assets.s3.amazonaws.com/${userName}/designs/${fileName}`;

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

//PUT to update a user design
router.put(`/:userName/:designName/edit`, (req, res) => {
  let { designName } = req.params

  //we'll have a check for the file existing here
  Design.findOneAndUpdate({ designOwner: req.user._id, designName: designName }, req.body).exec((err, result) => {
    if (err) return next(err);
    if (result === undefined) {
      res.status(404).send('Design not found, please check name or login.');
    } else {
      res.send([result])
    }
  })


})

module.exports = router;