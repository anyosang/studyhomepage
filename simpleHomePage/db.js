const { MongoClient, ObjectId } = require("mongodb")

let db
const mongoURI = "mongodb+srv://admin:qwe123@cluster0.okipy9k.mongodb.net/?retryWrites=true&w=majority"
const dbName = 'LG'; // 데이터베이스 이름

const connectDB = async () => {
  try {
    const client = await MongoClient.connect(mongoURI, { useUnifiedTopology: true })
    db = client.db(dbName)
    console.log('MongoDB connected')
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}

const getDB = () => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.')
  }
  return db
}

module.exports = { connectDB, getDB }
