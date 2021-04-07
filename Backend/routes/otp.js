var express = require('express');
var router = express.Router();
var OTP = require('../Models/otp');

var authenticate = require('../Controller/authenticate');
var cors = require('./cors');
const config = require('../config');

var messagebird = require('messagebird')(config.messagebird_API_KEY);
var nodemailer = require('nodemailer');

router.use(express.json());
router.use(express.urlencoded({
    extended: true
}));

router.options('*', cors.corsWithOptions, (req, res) => { res.sendStatus(200); })

function sendMail(email, otp) {
    const transporter = nodemailer.createTransport({
        port: 465,               // true for 465, false for other ports
        host: "smtp.gmail.com",
        auth: {
            user: config.GMAIL.email,
            pass: config.GMAIL.password,
        },
        secure: true,
    });
    const mailData = {
        from: config.GMAIL.email,  // sender address
        to: email,   // list of receivers
        subject: 'OTP VERIFICATION | LiveMart',
        text: 'OTP FOR YOUR LOGIN IS: ' + otp
    };
    transporter.sendMail(mailData, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
function sendSMS(PhoneNo, otp) {
    var params = {
        'originator': 'LIVEMART',
        'recipients': [
            PhoneNo
        ],
        'body': 'OTP FOR YOUR LOGIN IS: ' + otp
    };

    messagebird.messages.create(params, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log(info);
    });
}
function sendOtp(PhoneNo, email, otp) {
    sendMail(email, otp)
    sendSMS(PhoneNo, otp);
}

router.get('/send', cors.corsWithOptions, authenticate.verifyUserWithoutOtp, (req, res) => {
    var otp = (Math.floor(Math.random() * 10000) + 10000).toString().substring(1);
    const otpvar = new OTP({
        user: req.user._id,
        otp: otp
    });
    await otpvar.save();
    sendOtp(req.user.phoneNo, req.user.email, otp);
})
router.get('/verify', cors.corsWithOptions, authenticate.verifyUser, (req, res) => {
    const otpvar = await OTP.findOne({ user: user._id })
    if (!otpvar) {
        return res.status(422).send({ error: "NO Expired" })
    }
    try {
        if (req.body.otp !== otpvar.otp) {
            res.statusCode = 401;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: false, status: 'OTP INVALID' });
        } else {
            res.statusCode = 200;
            var token = authenticate.getOTPToken({ _id: req.user._id });
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Valid OTP',token:token });
        }
    } catch (err) {
        return res.status(422).send({ error: "err" })
    }
})