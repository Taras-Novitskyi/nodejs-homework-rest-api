const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const { DB_HOST, PORT = 3000 } = process.env;

mongoose.set("strictQuery", false);

const connection = mongoose.connect(DB_HOST);

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log("Database connection successful");
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`Server not running. Error message: ${err.message}`);
    process.exit(1);
  });
