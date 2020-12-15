import mongoose from "mongoose";

const BookInfoSchema = new mongoose.Schema({
  id: { type: Number, required: "Id is Required" },
  name: { type: String, required: "Name is Required" },
  author : String,
  publisher : String,
  bookList: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Book",
  },
});

const model = mongoose.model("BookInfo", BookInfoSchema);

export default model;
