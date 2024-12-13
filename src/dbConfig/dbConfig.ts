import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb connected successfully");
    });

    connection.on("error", (err) => {
      console.log("MongoDb connection error." + err);
      process.exit();
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
