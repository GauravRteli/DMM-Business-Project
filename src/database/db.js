import mongoose from "mongoose";
export const connectDb = async () => {
  if (mongoose.connection.readyState === 1) {
    console.log("already Connected !");
    return;
  }
  try {
    const connection = await mongoose.connect(process.env.MONGO_DB_URL, {
      dbName: "DMM_Items",
      useUnifiedTopology: true,
    });
    console.log("Connected to Database ..... !");
  } catch (error) {
    console.log("Failed to connect with database !");
    console.log(error);
  }
};
