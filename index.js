require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes/routes"); // Import routes
const utilities = require("./utilities/utilities"); // Import utilities
const app = express();

//auth
const auth = function (req, res, next) {
  let exceptions = ["/login", "/register"];
  if (exceptions.indexOf(req.url) >= 0) {
    next();
  } else {
    utilities.validateToken(req.headers.authorization, (result, username) => {
      if (result) {
        req.loggedInUser = username;
        next();
      } else {
        res.status(401).send("Invalid Token");
      }
    });
  }
};

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://user:5SBWCs0RGVqD3e0Y@cluster0.m9nc57p.mongodb.net/Projeto?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Use the routes
app.use(express.json());
app.use("/", auth, routes);

app.listen(process.env.PORT || 5500, () => {
  console.log("Server started on port 5500");
});
