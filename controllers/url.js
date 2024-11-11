const shortid = require("shortid")
const URL = require("../models/url");


async function hanldeGenerateNewShortURL(req,res) {
    const body = req.body ; 
    if(!body.url) return res.status(400).json({error: "URl is requird"});

    const shortID = shortid(8);
    
    await URL.create({
        shortId:shortID,
        redirectURL: body.url,
        visitHistory:[],
    });
    return res.render("home",{id:shortID});
}

async function hanldeGetAnalytics(req,res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});

    if(!result){
        return res.json("No Result fund!")
    }

    return res.json({
        totalClicks: result.visitHistory.length ,
        analytics: result.visitHistory
    });
}

module.exports = {
    hanldeGenerateNewShortURL,
    hanldeGetAnalytics
}