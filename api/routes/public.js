const router = require('express').Router();
const keys = require('../config/keys');
const AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY
  // bucketName: keys.S3_BUCKET_NAME
});
const User = require('../models/user')
const Design = require('../models/design')

router.get('/:file', (req, res) => {
  let file = req.params.file;
  let path = 'https://minddesign-assets.s3.amazonaws.com/' + file;
  res.sendFile(path);
});

router.post('/:file', (req, res) => {
  let file = req.params.file;
  // console.log(path);
  var regex = /><\/path>/g;
  let svgStyled = req.body.data.replace(regex, ' style="stroke-width:10;"></path >');
  let svgEmbiggen = svgStyled.replace('viewBox="0 0 200 200" width="200" height="200"', 'viewBox="0 0 300 300" width="600" height="600"')
  
  const params = {
    Bucket: 'minddesign-assets',
    Key: file,
    Body: svgEmbiggen,
    ACL: 'public-read-write',
    ContentType: 'image/svg+xml',
    ContentDisposition: 'attachment'
  };

  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err
    res.send({ file });
  });


});

module.exports = router;