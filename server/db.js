import mongoose from "mongoose";
import { MongoDBConnectString } from "./MongoDBConnection.js";

dbConnect().catch(err => console.log(err));

let db = {}

async function dbConnect() {
  await mongoose.connect(MongoDBConnectString)
  console.log("connected to the database!")

  const UserSchema = new mongoose.Schema({
    username: String,
    type: String
  })

  db.User = mongoose.model('User', UserSchema)

  console.log("created DB schemas and models")
}

export default db;