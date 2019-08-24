const aws = require('aws-sdk');
const keys = require('../config/keys');
const s3 = new aws.S3({
  accessKeyId: keys.AWS_ACCESS_KEY_ID,
  secretAccessKey: keys.AWS_SECRET_ACCESS_KEY
  // bucketName: keys.S3_BUCKET_NAME
});

exports.uploadS3File = function(userName,fileName,data) {
  const params = {
    Bucket: 'minddesign-assets',
    Key: `${userName}/${fileName}`,
    Body: data,
    ACL: 'public-read-write',
    ContentType: 'image/svg+xml',
    ContentDisposition: 'attachment'
  };

  s3.upload(params, function (s3Err, data) {
    if (s3Err) throw s3Err
    return data.Location
  });

}
