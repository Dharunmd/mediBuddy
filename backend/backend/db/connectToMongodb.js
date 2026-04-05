import mongoose from "mongoose";

const connectToMongoDB = async (uri) => {
  try {
    await mongoose.connect(uri);
    console.log("Connected To Database");
  } catch (err) {
    console.log(err);
  }
};

export default connectToMongoDB;
