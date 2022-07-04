import mongoose from "mongoose"
const connectionMongo = () => mongoose.connect(process.env.MONGODB_URI)
export default connectionMongo