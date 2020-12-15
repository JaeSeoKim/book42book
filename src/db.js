import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false
})

mongoose.Promise = global.Promise;

const db = mongoose.connection

const handleOpen = () => console.log('✅ DB Connection Succes!')
const handleClose = error => console.log(`❎ DB Connection Fail : ${error}`)

db.once('open', handleOpen)
db.on('error', handleClose)