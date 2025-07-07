const express = require("express");
const router = express.Router();

const storeCtrl = require("../controllers/storeController");
const { verifyToken } = require("../middleware/authMiddleware");
const { isStoreOwner } = require("../middleware/roleMiddleware");

router.get("/", verifyToken, storeCtrl.listStores);
router.post("/", verifyToken,  storeCtrl.addStore);
router.get("/owner", verifyToken, isStoreOwner, storeCtrl.getStoreRatingsForOwner);

module.exports = router;
