import mongoose from "mongoose";
import { DB_NAME } from "../src/constant.js";

const connect = async () => {
  try {
    const connectDB = await mongoose.connect(
      `mongodb+srv://${process.env.MongoPwd}:${process.env.MongoPwd}@cluster0.iezdyjg.mongodb.net/${DB_NAME}`
    );
    console.log("Mongoose Connected", connectDB.connection.host);
  } catch (error) {
    console.log("DB not connected", error);
    process.exit(1);
  }
};

export default connect;
