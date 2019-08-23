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

//public folders are for local (server) save and send of files
app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static('public'));

const publicRoutes = require('./routes/public');
app.use('/public', publicRoutes);

const userRoutes = require('./routes/user');
app.use('/user', userRoutes);

app.post('/auth/signin', requireSignin, Authentication.signin)
app.post('/auth/signup', Authentication.signup)



app.get('/download/:file', function (req, res) {
  let file = req.params.file;
  let path = `${__dirname}/public/${file}`;
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