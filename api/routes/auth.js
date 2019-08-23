const router = require('express').Router();
const Authentication = require('./controllers/authentication')
const passportService = require('./services/passport')
const passport = require('passport')

const requireAuth = passport.authenticate('jwt', { session: false })
const requireSignin = passport.authenticate('local', { session: false })

router.post('/signin', requireSignin, Authentication.signin)
router.post('/signup', Authentication.signup)

module.exports = router;
// app.use(
//   cookieSession({
//     maxAge: 30 * 24 * 60 * 60 * 1000,
//     keys: ['helloworld']
//   })
// )

//setup for our non-local Auth routes
  // app.use(passport.initialize())
  // app.use(passport.session())

  // passport.serializeUser((user, done) => {
  //   done(null, user._id)
  // })

  // passport.deserializeUser((id, done) => {
  //   done(null, id)
  // })
    // app.get('/auth/google', googleAuth)

  // app.get('/auth/google/callback', googleAuth, (req, res) => {

  //   console.log(req.user);
  //   res.redirect("http://localhost:3000");
  // })

  // app.get('/api/current_user', (req, res) => {
  //   console.log(req.user)
  //   res.send(req.user)
  // })

  // app.get('/api/logout', (req, res) => {
  //   req.logout()
  //   res.send(req.user)
  // })


