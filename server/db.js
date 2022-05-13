import mongoose from "mongoose";
import { MongoDBConnectString } from "./MongoDBConnection.js";

dbConnect().catch(err => console.log(err));

let db = {}

async function dbConnect() {
  await mongoose.connect(MongoDBConnectString)
  console.log("connected to the database!")

  const UserSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    password: String,
    is_family_manager: Boolean,
    allergies: [String],
    medications: [String],
    procedures: [String],
    vaccines: [String]
  })

  db.User = mongoose.model('User', UserSchema)

  console.log("created DB schemas and models")
}

export default db;