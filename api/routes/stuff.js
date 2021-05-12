const express = require("express");
const router = express.Router();
const stuffController = require("../controllers/stuff");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

router.post("/", auth, multer, stuffController.createSauce);
router.put("/:id", auth, multer, stuffController.modifySauce);
router.delete("/:id", auth, stuffController.deleteSauce);
router.get("/:id", stuffController.getOneSauce);
router.get("/", stuffController.getAllSauces);
router.post("/:id/like", auth, stuffController.likeSauce);

module.exports = router;
