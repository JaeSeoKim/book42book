import mongoose from "mongoose";

const BookSchema = new mongoose.Schema({
  id: { type: String, required: "Id is Required", unique: true },
  status: { type: Number, required: "Status is Required" },
  /*
  0 : 대출 가능
  1 : 대출 중
  2 : 분실
  3 : 파손
  */
  book_info: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BookInfo",
  },
  render_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  rental_date: { type: Date, default: Date.now },
  donater: String,
});

const model = mongoose.model("Book", BookSchema);

export default model;
