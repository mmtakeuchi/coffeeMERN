const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const db = require("./config/keys").mongoURI;

const port = process.env.PORT || 5000;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

app.listen(port, () => console.log(`Server is running on port ${port}`));
