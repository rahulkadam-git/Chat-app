const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    //mongodb connection
    const con = await mongoose.connect("mongodb+srv://user_31:user31@cluster0.ijzwi.mongodb.net/Chat_app?retryWrites=true&w=majority", {
      useNewUrlParser: true, useUnifiedTopology: true 
    });

    console.log(`Mongodb connected ${con.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = dbConnection;
