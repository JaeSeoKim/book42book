import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
  id : {type: Number, required: "Id is Required"},
  intra_id: { type: String, required: 'Name is Required' },
  level: {type: Number, required: 'Level is Required'},
  /*
  level 1 : cadet
  level 2 : librarian
  level 3 : staff
  */
  rental_list: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    }
  ]
})

const model = mongoose.model('User', UserSchema)

export default model