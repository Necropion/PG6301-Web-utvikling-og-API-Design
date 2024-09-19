import mongoose from "mongoose";

const Schema = mongoose.Schema;

const chatSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    },
    userID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Chat", chatSchema);
