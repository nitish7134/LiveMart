var express = require("express");
var router = express.Router();
var Feedback = require('../Models/Feedback')

var authenticate = require("../Controller/authenticate");
var cors = require("./cors");

var mongoose = require("mongoose");


router.use(express.json());
router.use(
    express.urlencoded({
        extended: true,
    })
);

router.get("/", cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Feedback.find({ "AddressedFromID": req.body.headers }) /* yaha user ki object id, can't test json print karke, dekh lio*/
        .then(response => {
            console.log(JSON.stringify(response));
            return res.status(200).send(response);
        })
        .catch((err) => {
            console.log(err);
            next(err);
            return res.status(500);
        });
}
);

router.post("/", cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Feedback.create({
        AddressedFromID: req.body.user._id,
        AddressedToID: req.body.Seller._id,
        ItemID: req.body.ItemID,
        Query: req.body.Query
    })
        .then(feedback => {
            feedback.save()
                .then(user => {
                    return res.status(200);
                })
                .catch(err => {
                    console.log("Error while posting comment: ", err);
                    next(err);
                });
        })
})