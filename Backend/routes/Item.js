var express = require("express");
var router = express.Router();
var User = require("../Models/User");
var Items = require("../Models/Item");

var authenticate = require("../Controller/authenticate");
var cors = require("./cors");
var mongoose = require("mongoose");
const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("invalid image type");

    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});
const uploadOptions = multer({ storage: storage });

router.use(express.json());
router.use(
  express.urlencoded({
    extended: true,
  })
);

router.options("*", cors.corsWithOptions, (req, res) => {
  res.sendStatus(200);
});

/* GET users listing. */
router.get(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  function (req, res, next) {
    var num = req.user.role == "Customer" ? 0 : 1;
    let filter = { Seller: num };
    if (req.query.categories) {
      filter = { Seller: num, category: req.query.categories.split(",") };
    }

    Items.find(filter)
      .populate("category")
      .then((items) => {
        res.send(items);
      });
  }
);
router.get(`/:id`, (req, res, next) => {
  Items.findById(req.params.id)
    .populate("category")
    .then((product) => {
      if (!product) {
        res.status(500).json({ success: false });
      }
      res.send(product);
    });
});
router.get(
  //Gives options to choose from while adding new Item
  "/ToAdd",
  cors.corsWithOptions,
  authenticate.verifyUser,
  function (req, res, next) {
    var num = req.user.role == "Retailer" ? 0 : 1;
    try {
      Items.find({ Seller: num }).then((items) => {
        res.send(items);
      });
    } catch (err) {
      next(err);
    }
  }
);

router.post(
  "/",
  cors.corsWithOptions,
  authenticate.verifyUser,
  uploadOptions.single("image"),
  (req, res, next) => {
    try {
      var seller = {
        Name: req.user.Name,
        Price: req.body.price,
        Quantity: req.body.Quantity,
        Seller: mongoose.Types.ObjectId(req.user._id),
      };
      const file = req.file;
      if (!file) return res.status(400).send("No image in the request");

      const fileName = file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
      Items.create({
        brand: req.body.brand,
        TotalQuantity: req.body.countInStock,
        Name: req.body.Name,
        description: req.body.description,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
        Seller: req.user.role == "Retailer" ? 0 : 1,
        Category: req.body.category,
        image: `${basePath}${fileName}`, // "http://localhost:3000/public/upload/image-2323232"
      }).then((item) => {
        item.Sellers.push(seller);
        item.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.send(item);
      });
    } catch (err) {
      console.log(err);
      return res.status(500);
    }
  }
);

router.post(
  "/:ItemID",
  cors.corsWithOptions,
  authenticate.verifyUser,
  (req, res, next) => {
    try {
      Item.findById(req.params.ItemID).then((item) => {
        if ((req.user.role == "Retailer" ? 0 : 1) == item.seller)
          return res.statusCode(401);
        var seller = {
          Price: Number(req.body.item.price),
          Quantity: Number(req.body.item.Quantity),
          Name: req.user.Name,
          Seller: mongoose.Schema.ObjectId(req.user._id),
        };
        item.Sellers.push(seller);
        item.save();
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ message: "Item Created" });
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
);

router.get(
  `/get/featured/:count`,
  authenticate.verifyUser,
  (req, res, next) => {
    var num = req.user.role == "Retailer" ? 0 : 1;
    const count = req.params.count ? req.params.count : 0;
    Items.find({ Seller: num, isFeatured: true })
      .limit(+count)
      .then((products) => {
        if (!products) {
          res.status(500).json({ success: false });
        }
        res.send(products);
      });
  }
);

router.put(
  "/gallery-images/:id",
  uploadOptions.array("images", 10),
  authenticate.verifyUser,
  (req, res, next) => {
    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.filename}`);
      });
    }

    Items.findByIdAndUpdate(
      req.params.id,
      {
        images: imagesPaths,
      },
      { new: true }
    ).then((product) => {
      if (!product)
        return res.status(500).send("the gallery cannot be updated!");

      res.send(product);
    });
  }
);

module.exports = router;
