import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please enter a note title"],
    },
    description: {
      type: String,
      default: "",
    },
    images: {
      type: [String],
    },
  },
  { timestamps: true }
);

export const Note = mongoose.model("Note", noteSchema);
