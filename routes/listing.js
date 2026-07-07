const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} =require("../cloudConfig.js");
const upload = multer({ storage })

router.route("/")
.get(                       //INDEX ROUTE
  wrapAsync(listingController.index)
)
.post(                     //CREATE ROUTE
  isLoggedIn,
  upload.single('listing[image]'),
   validateListing,
  wrapAsync(listingController.createListing)
);
//NEW ROUTE
router.get("/new", isLoggedIn, listingController.renderNewForm);

router.route("/:id")
.get(           //SHOW ROUTE
  wrapAsync(listingController.showListing)
)
.put(           //Update Route
  isLoggedIn,
  isOwner,
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)
.delete(          //Delete Route
  isLoggedIn,
  wrapAsync(listingController.destroyListing)
);

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
    isOwner,
  wrapAsync(listingController.renderEditForm)
);

module.exports=router;