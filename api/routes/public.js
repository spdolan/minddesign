const router = require('express').Router();
const fs = require('fs');
const User = require('../models/user')
const Design = require('../models/design')

router.get('/:file', (req, res) => {
  let file = req.params.file;
  // let userEmail = req.params.userEmail;
  // console.log(req);
  let path = __dirname + '/../public/' + file;
  res.sendFile(path);
});

router.post('/:file', (req, res) => {
  let file = req.params.file;
  let path = __dirname + '/../public/' + file;
  // console.log(path);
  var regex = /><\/path>/g;
  let svgStyled = req.body.data.replace(regex, ' style="stroke-width:10;"></path >');
  let svgEmbiggen = svgStyled.replace('viewBox="0 0 200 200" width="200" height="200"', 'viewBox="0 0 800 800" width="800" height="800"')
  fs.writeFile(path, svgEmbiggen, (err) => {
    if (err) throw err;
    console.log(`File ${file} has been saved!`);
    res.send({file});
    
  })

  // singleUpload(req, res, function (err) {
  //   if (err) {
  //     return res.status(422).send({ errors: [{ title: 'Image Upload Error', detail: err.message }] });
  //   }

  //   return res.send({ 'svgUrl': req.file.location });
  // });
});

module.exports = router;