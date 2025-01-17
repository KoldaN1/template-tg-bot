import mongoose, { Document, Schema } from "mongoose";

const userSchema = new Schema({
  tgId: { type: Number, required: true, unique: true, index: true },
  languageCode: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
