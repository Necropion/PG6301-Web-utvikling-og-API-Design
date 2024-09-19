import mongoose from "mongoose";

const Schema = mongoose.Schema;

const msgSchema = new Schema(
  {
    content: {
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
    chatID: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Msg", msgSchema);
