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
const app = express()
// DB Setup
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });

//CORS handlers here
app.use(cors());
// app.all('/*', function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   next();
// });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use('/public', express.static(__dirname + '/public'));  
app.use(express.static('public'));

// const mainRoutes = require('./routes/main');
// app.use('/', mainRoutes);

app.post('/auth/signin', requireSignin, Authentication.signin)
app.post('/auth/signup', Authentication.signup)

app.get('/public/:file', (req, res) => {
  let file = req.params.file;
  let path = __dirname + '/public/' + file;
  res.sendFile(path);
});

app.post('/public/:file', (req, res) => {
  let file = req.params.file;
  let path = __dirname + '/public/' + file;
  var regex = /><\/path>/g;
  let svgStyled = req.body.data.replace(regex, ' style="stroke-width:10;"></path >');
  fs.writeFile(path, svgStyled, (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
    res.send('yep, data passed upward.');
  });
})


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