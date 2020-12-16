import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  user_id: { type: Number, required: "Id is Required", unique: true },
  intra_id: { type: String, required: "Name is Required", unique: true },
  level: { type: Number, required: "Level is Required" },
  /*
  level 1 : cadet
  level 2 : librarian
  level 3 : staff
  */
  rental_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
  ],
});

const model = mongoose.model("user", UserSchema);

export default model;
