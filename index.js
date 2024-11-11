//External Import's
require("dotenv").config();
const express = require("express");
const path = require("path");

//Internal Import's
const { connectToMongoDB } = require("./connect");
const staticRoute = require("./routes/staticRouter");
const urlRoute = require("./routes/url");
const { hanldeRedirectURL, handleDeleteURL } = require("./controllers/url");

const app = express();
const PORT = 8001;

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

//database connection
connectToMongoDB(process.env.MONGODB_URL).then(() =>
  console.log("mongodb connected")
);

//view engine configaration
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//route setup
app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get("/:shortId", hanldeRedirectURL);
app.post("/url/delete", handleDeleteURL);

app.listen(PORT, () => console.log(`Server started at PORT ${PORT}`));
