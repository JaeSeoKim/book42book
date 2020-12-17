import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  book_id: { type: String, required: "Id is Required" },
  status: { type: Number, required: "Status is Required" },
  /*
  0 : 대출 가능
  1 : 대출 중
  2 : 분실
  3 : 파손
  */
  book_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bookinfo",
  },
  render_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rental_date: { type: Date },
  donater: String,
});

const model = mongoose.model("book", BookSchema);

export default model;
