import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI || ''

if (!MONGO_URI) {
  throw new Error('⚠️ MONGO_URI no está definida en las variables de entorno.')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDatabase() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI, {
      dbName: 'mydatabase',
      bufferCommands: false
    }).then((mongoose) => mongoose)
  }

  cached.conn = await cached.promise
  return cached.conn
}
