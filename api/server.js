const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const fs = require('fs');
const passport = require('passport')
const passportService = require('./services/passport')
const cookieSession = require('cookie-session')
const User = require('./models/user')
const Authentication = require('./controllers/authentication')
const requireAuth = passport.authenticate('jwt', { session: false })
const requireGoogleAuth = passport.authenticate('google',
  {
    scope: ['profile', 'email'],
    failureRedirect: "/"
  })
const requireSignin = passport.authenticate('local', { session: false })
const keys = require('./config/keys');
const uploadService = require('./services/file-upload')
const singleUpload = uploadService.single('svg');
const app = express()
// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });

//CORS handlers here
app.use(cors());

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

const designRoutes = require('./routes/design');
app.use('/design', designRoutes);

app.get('/download/:userName/:fileName', function (req, res) {
  let { userName, fileName} = req.params;
  let path = `https://minddesign-assets.s3.amazonaws.com/${userName}/designs/${fileName}`;
  res.download(path);
  // res.send({file: path});
});

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Server Setup
const port = process.env.PORT || 8000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);