const mongoose = require("mongoose");


function connectToMongoDbCluster() {
  console.log("Connecting to MongoDB...",process.env.MONGO_URI);
  mongoose
    .connect("mongodb+srv://smadal770:smadal770@cluster0.drvvyr0.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => {
      console.log("Connected to MongoDB successfully!");
      ///logger.info("Connect to MongoDb Successfully!");
    })
    .catch((e) => {
      console.log(e);
      ///logger.warn("Connection to MongoDb Failed!");
    });
}

module.exports = connectToMongoDbCluster;
