const router = require('express').Router();
const fs = require('fs');
const passport = require('passport')
const Authentication = require('../controllers/authentication')
const requireSignin = passport.authenticate('local', { session: false })
const User = require('../models/user')
const Design = require('../models/design')
const aws = require('aws-sdk');
const keys = require('../config/keys');
const s3 = new aws.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY
  // bucketName: keys.S3_BUCKET_NAME
});

router.param('userId', function (req, res, next) {
  let { userId } = req.params;
  if(userId === 'guest'){
    req.user = { _id: 'guest' };
    next();
  } else {
    User.findById(userId).exec((err, result) => {
      if (err) return next(err);
      if (result === undefined) {
        res.status(404).send('Error encountered, please update your request and try again.');
      } else {
        req.user = result;
        next();
      }
    })
  }
  
});

// POST to create new file
router.post('/:userId/:fileName', (req, res) => {
  let { fileName } = req.params
  var regex = /><\/path>/g;
  let svgStyled = req.body.data.replace(regex, ' style="stroke-width:10;"></path >');
  let svgEmbiggen = svgStyled.replace('viewBox="0 0 200 200" width="200" height="200"', 'viewBox="0 0 300 300" width="600" height="600"')

  const params = {
    Bucket: 'minddesign-assets',
    Key: `${req.user._id}/designs/${fileName}`,
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
router.get('/:userId/:fileName', (req, res) => {
  let { fileName } = req.params
  let path = `https://minddesign-assets.s3.amazonaws.com/${req.user._id}/designs/${fileName}`;
  res.sendFile(path);
});

//GET to originally save a user design
router.get(`/:userId/:fileName/save`, (req, res) => {
  let { fileName } = req.params
  let path = `https://minddesign-assets.s3.amazonaws.com/${req.user._id}/designs/${fileName}.svg`;

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

    // Repond to request indicating the design was created
    res.send([design])
  });
})

//GET single user design
router.get(`/:designId`, (req, res) => {
  let { designId } = req.params;
  console.log(designId);
  Design
    .findById(designId)
    .exec((err, design) => {
      if (err) {
        res.status(400).send('Unable to find that design');
      }
      res.send(design);
    })
})

//PUT to update a user design
router.put(`/:designId/edit`, (req, res) => {
  let { designId } = req.params

  //we'll have a check for the file existing here
  Design.findOneAndUpdate({ designOwner: req.user._id, designId: designId }, req.body).exec((err, result) => {
    if (err) return next(err);
    if (result === undefined) {
      res.status(404).send('Design not found, please check name or login.');
    } else {
      res.send([result])
    }
  })
})

module.exports = router;