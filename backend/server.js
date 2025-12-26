const express = require("express");
// const cors = require("cors");

const app = express();

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// 🔹 MongoDB connection
const db = require("./app/models");

// Important for mongoose warning
db.mongoose.set("strictQuery", false);

// 🔥 VERY IMPORTANT: use `mongo` (docker-compose service name), NOT localhost
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.error("Cannot connect to the database!", err);
    process.exit(1);
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Test application." });
});

// routes
require("./app/routes/tutorial.routes")(app);

// 🔹 listen AFTER everything is configured
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}.`);
});
