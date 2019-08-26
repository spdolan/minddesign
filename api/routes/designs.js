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
const cmd = require('node-cmd');
const exec = require('child_process').exec;

router.param('userId', function (req, res, next) {
  let { userId } = req.params;
  if (userId === 'guest' || userId === 'all'){
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
  design.likes = Math.floor(Math.random() * 100),
  design.favorites = Math.floor(Math.random() * 25),
  design.published = true

  design.save(function (err, user) {
    if (err) { return next(err) }

    // Repond to request indicating the design was created
    res.send([design])
  });
})

router.get(`/:userId/:fileName/gcode`, (req, res) => {
  let { fileName } = req.params
  runCmd = `pslicer --load config.ini --export-gcode ${fileName}.stl`
  console.log(runCmd);
  
  exec(runCmd,
    { shell: 'C:/RailsInstaller/Git/git-bash.exe',
      cwd:  'C:/Users/snpdo/Downloads/Demo\ Night/'
    }, 
   (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`);
      return;
    }
    res.send(`Design ${fileName} sucessfully converted to GCode file!`)
  });

  // cmd.run(
  //   `cd ../../Downloads/Demo\ Night && pslicer --load config.ini --export-gcode ${fileName}.stl`
  // );
})

//GET all designs
router.get(`/`, (req, res) => {
  let { public } = req.query;
  let queryObject = {}
  if(public){
    queryObject.published = true
  }

  Design
    .find(queryObject)
    .exec((err, design) => {
      if (err) {
        res.status(400).send('Unable to find that design');
      }

      res.send(design);
    })
})

//GET single user design
router.get(`/:designId`, (req, res) => {
  let { designId } = req.params;
  Design
    .findById(designId)
    .exec((err, design) => {
      if (err) {
        res.status(400).send('Unable to find that design');
      }
      
      res.send([design]);
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