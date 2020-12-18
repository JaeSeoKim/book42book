import mongoose from "mongoose";

const BookInfoSchema = new mongoose.Schema({
  name: { type: String, required: "Name is Required" },
  author: String,
  publisher: String,
  book: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

const model = mongoose.model("bookinfo", BookInfoSchema);

export default model;
