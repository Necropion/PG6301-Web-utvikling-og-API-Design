import mongoose from "mongoose";

const Schema = mongoose.Schema;

const GoogleUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    bio: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("GoogleUser", GoogleUserSchema);
