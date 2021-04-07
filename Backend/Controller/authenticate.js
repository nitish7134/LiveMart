var passport = require('passport');
var User = require('../Models/User');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookStrategy = require('passport-facebook').Strategy;
var GoogleStrategy = require('passport-google-oauth20');
var config = require('../config.js');
// used to serialize the user for the session
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user);
    });
});

exports.getToken = function (user) {
    return jwt.sign(user, config.jwtKey);
};
exports.getOTPToken = function (user) {
    return jwt.sign(user, config.jwtOTPKey);
};

var opts = {};
var cookieExtractor = function (req) {
    var token = null;
    if (req && req.cookies) token = req.cookies['jwt'];
    return token;
};
opts.jwtFromRequest = cookieExtractor; //r'ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.jwtKey;
// opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            else if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
            }
        });
    }
));

exports.verifyUser = //passport.authenticate('jwt', { session: false });
    /* function */ (req, res, next) => {
        const { authorization } = req.headers;
        //authorization === Bearer sfafsafa
        if (!authorization) {
            return res.status(401).send({ error: "you must be logged in" })
        }
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, config.jwtOTPKey, async (err, payload) => {
            if (err) {
                return res.status(401).send({ error: "you must be logged in 2" })
            }
            const { userId } = payload;
            const user = await User.findById(userId)
            req.user = user;
            next();
        })
    }

exports.verifyUserWithoutOtp = (req, res, next) => {
        const { authorization } = req.headers;
        //authorization === Bearer
        if (!authorization) {
            return res.status(401).send({ error: "you must be logged in" })
        }
        const token = authorization.replace("Bearer ", "");
        jwt.verify(token, config.jwtKey, async (err, payload) => {
            if (err) {
                return res.status(401).send({ error: "you must be logged in 2" })
            }
            const { userId } = payload;
            const user = await User.findById(userId)
            req.user = user;
            next();
        })
    }
    exports.verifyAdmin = function (req, res, next) {
        User.findOne({ _id: req.user._id })
            .then((user) => {
                console.log("User: ", req.user);
                if (user.role == -1) {
                    next();
                }
                else {
                    err = new Error('You are not authorized to perform this operation!');
                    err.status = 403;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err))
    }

    exports.facebookPassport = passport.use(new FacebookStrategy({
        clientID: config.facebook.clientId,
        clientSecret: config.facebook.clientSecret,
        callbackURL: config.baseUrl + config.facebook.callbackURL,
        profileFields: ["email", "name"]
    }, (accessToken, refreshToken, profile, done) => {
        console.log(JSON.stringify(profile))
        User.findOne({ email: profile.emails[0].value }, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                user.facebookId = profile.id;
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                });
               // return done(null, user);
            }
            else {
                user = new User({});
                user.facebookId = profile.id;
                user.Name = profile.name.givenName +" "+profile.name.familyName;
                user.email = profile.emails[0].value;
                user.save((err, user) => {
                    if (err)
                        return done(err, false);
                    else
                        return done(null, user);
                })
            }
        });
    }
    ));

    exports.googlePassport = passport.use(new GoogleStrategy({
        clientID: config.google.clientId,
        clientSecret: config.google.clientSecret,
        callbackURL: "https://192.168.1.83.xip.io:3443/users/auth/google/callback"//config.baseUrl + config.google.callbackURL
    }, (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            User.findOne({ email: profile.emails[0].value }, (err, user) => {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    user.googleId = profile.id;
                    user.save((err, user) => {
                        if (err)
                            return done(err, false);
                        else
                            return done(null, user);
                    });
                   // return done(null, user);
                }
                else {
                    user = new User({});
                    user.firstname = profile.name.givenName
                    user.googleId = profile.id;
                    user.lastname = profile.name.familyName;
                    user.email = profile.emails[0].value;
                    user.save((err, user) => {
                        if (err)
                            return done(err, false);
                        else
                            return done(null, user);
                    })
                }
            });
        })
    }
    ));


