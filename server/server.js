const express = require("express");
const fs = require("fs");
const historyApiFallback = require("connect-history-api-fallback");
const mongoose = require("mongoose");
const path = require("path");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");

const config = require("../config/config");
const webpackConfig = require("../webpack.config");

const isDev = process.env.NODE_ENV !== "production";
const port = process.env.PORT || 8080;

const passport = require("passport");
const users = require("./routes/api/users");
const login = require("./routes/api/login");
const register = require("./routes/api/register");
const customers = require("./routes/api/customers");
const groupes = require("./routes/api/groupes");
const forfaits = require("./routes/api/forfaits");
const transactions = require("./routes/api/transactions");

const fileUpload = require("express-fileupload");

var multer = require("multer");
var cors = require("cors");

// Configuration
// ================================================================================================

// Set up Mongoose
mongoose.connect(isDev ? config.db_dev : config.db);
mongoose.Promise = global.Promise;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Route Login
app.use("/users", login);
// Route Register
app.use("/users", register);
//Route User
app.use("/users", users);

//Route Customer
app.use("/customers", customers);

//Route Groupe
app.use("/groupes", groupes);

//Route Forfait
app.use("/forfaits", forfaits);

//Router Transaction
app.use("/transactions", transactions);

if (isDev) {
  const compiler = webpack(webpackConfig);

  app.use(
    historyApiFallback({
      verbose: false
    })
  );

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      contentBase: path.resolve(__dirname, "../client/public"),
      stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  app.use(express.static(path.resolve(__dirname, "../dist")));
} else {
  app.use(express.static(path.resolve(__dirname, "../dist")));

  //Initilaize Public Directory
  app.get("*", function(req, res) {
    res.sendFile(path.resolve(__dirname, "../dist/index.html"));
    res.end();
  });
}

app.listen(port, "0.0.0.0", err => {
  if (err) {
    console.log(err);
  }

  console.info(">>> 🌎 Open http://0.0.0.0:%s/ in your browser.", port);
});

module.exports = app;
