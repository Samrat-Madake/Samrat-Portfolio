const mongoose = require('mongoose');

const uri = "mongodb://samratmadake21_db_user:dndes6sd8NxgxB2s@ac-zhby9os-shard-00-00.6efiskx.mongodb.net:27017,ac-zhby9os-shard-00-01.6efiskx.mongodb.net:27017,ac-zhby9os-shard-00-02.6efiskx.mongodb.net:27017/?ssl=true&replicaSet=atlas-erzxhf-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection failed:", err);
    process.exit(1);
  });
