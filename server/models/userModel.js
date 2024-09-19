import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    userType: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
