const shortid = require("shortid");
const URL = require("../models/url");

//generate new url
async function hanldeGenerateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URl is requird" });

  const shortID = shortid(8);

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
  });
  return res.render("home", { id: shortID });
}

//handle get analytics
async function hanldeGetAnalytics(req, res) {
  const { shortId } = req.params;
  const result = await URL.findOne({ shortId });

  if (!result) {
    return res.json("No Result fund!");
  }

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

//handle redirect URl
async function hanldeRedirectURL(req, res) {
  const { shortId } = req.params;
  try {
    const entry = await URL.findOneAndUpdate(
      { shortId },
      { $push: { visitHistory: { timestamps: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      return res.status(404).send("Short URL not found");
    }

    res.redirect(entry.redirectURL);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
}

// hanlde delete url
async function handleDeleteURL(req, res) {
  const { shortId } = req.body; // Extract the shortId from the form data

  try {
    // Find and delete the document by shortId
    const result = await URL.deleteOne({ shortId: shortId });

    if (result.deletedCount > 0) {
      console.log(`Deleted URL with shortId: ${shortId}`);
    } else {
      console.log(`No URL found with shortId: ${shortId}`);
    }

    // Redirect back to the home page or display a confirmation message
    res.redirect("/"); // Or render a confirmation page
  } catch (err) {
    console.error("Error deleting document:", err);
    res.status(500).send("Error deleting URL");
  }
}

module.exports = {
  hanldeGenerateNewShortURL,
  hanldeGetAnalytics,
  hanldeRedirectURL,
  handleDeleteURL,
};
