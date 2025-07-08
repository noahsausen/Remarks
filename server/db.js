const mongoose = require('mongoose');
module.exports = () => {
  const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }

  try {
    mongoose.connect(process.env.MONGOURI);
    console.log("MongoDB Connected");
  } catch (error) {
    console.log(error);
    console.log("Failed to connect to MongoDB");
  }
}