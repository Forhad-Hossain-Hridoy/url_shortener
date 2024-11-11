const express = require("express");
const {hanldeGenerateNewShortURL} = require("../controllers/url");
const {hanldeGetAnalytics} = require("../controllers/url");
const router = express.Router();

router.post("/",hanldeGenerateNewShortURL);
router.get("/analytics/:shortId",hanldeGetAnalytics);

module.exports = router ;