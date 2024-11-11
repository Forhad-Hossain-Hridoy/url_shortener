//external import's
const express = require("express");

//internal import's
const URL = require("../models/url");

const router = express.Router();

//render home page
router.get('/',async (req,res)=>{
    const allUrls = await URL.find({});
    return res.render('home',{
        urls: allUrls
    })
})

module.exports = router; 
