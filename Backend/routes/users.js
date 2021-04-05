var express = require('express');
var router = express.Router();
var User = require('../models/user');

var passport = require('passport');
var authenticate = require('../Controller/authenticate');
var cors = require('./cors');
const config = require('../config');

const _getRedirectUrl = (req) => {
  return "/" + req.user.role + "/";// === 'admin' ? '/admin/orders' : '/customer/orders'
}

router.use(express.json());
router.use(express.urlencoded({
  extended: true
}));

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find({}).then(users => {
    res.send(users);
  });
});
router.get('/profile', cors.cors, authenticate.verifyUser, (req, res) => {
  return res.send(req.user);
});


router.post('/signup', cors.corsWithOptions, async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = new User({ email, password });
    await user.save();
    const token = jwt.sign({ userId: user._id }, config.secretKey)
    res.send({ token })

  } catch (err) {
    return res.status(422).send(err.message)
  }
})
router.post('/signin', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(422).send({ error: "must provide email or password" })
  }
  const user = await User.findOne({ email })
  if (!user) {
    return res.status(422).send({ error: "must provide email or password" })
  }
  try {
    await user.comparePassword(password);
    const token = jwt.sign({ userId: user._id }, config.secretKey)
    res.send({ token })
  } catch (err) {
    return res.status(422).send({ error: "must provide email or password" })
  }
})

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
router.get('/auth/google', passport.authenticate('google', { successRedirect: config.baseUrl + '/', failureRedirect: config.baseUrl + '/error?index=4', scope: ['profile', 'email'] }));

router.get('/auth/google/callback', (req, res, next) => {
  passport.authenticate('google', { successRedirect: '/profile', failureRedirect: '/error/?index=4' }, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ index: 4, success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      } else {
        var token = authenticate.getToken({ _id: req.user._id });
        res.cookie('jwt', token);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        //res.json({ success: true, status: 'Login Successful!', token: token });
        res.redirect(config.appBaseUrl);
      }
    });
  })(req, res);
});

router.get("/auth/facebook", passport.authenticate('facebook', { successRedirect: config.baseUrl + '/', failureRedirect: config.baseUrl + '/error?index=4', scope: ['email'] }));

router.get("/auth/facebook/callback", (req, res, next) => {
  passport.authenticate("facebook", { successRedirect: config.baseUrl + '/', failureRedirect: config.baseUrl + '/error?index=4' }, (err, user, info) => {
    if (err)
      return next(err);
    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      res.json({ index: 2, success: false, status: 'Login Unsuccessful!', err: info });
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      } else {
        var token = authenticate.getToken({ _id: req.user._id });
        res.cookie('jwt', token);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        //res.json({ success: true, status: 'Login Successful!', token: token });
        res.redirect(config.appBaseUrl);
      }
    });
  })(req, res);
});
router.get('/checkJWTtoken', cors.corsWithOptions, (req, res) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err)
      return next(err);

    if (!user) {
      res.statusCode = 401;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT invalid!', success: false, err: info });
    }
    else {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      return res.json({ status: 'JWT valid!', success: true, user: user });
    }
  })(req, res);
});
module.exports = router;
