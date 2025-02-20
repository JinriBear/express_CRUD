const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = 'express_crud';

let db;

const connectDB = async () => {
  try {
    await client.connect();
    db = client.db(dbName);
    console.log('MongoDB 연결');
  } catch (error) {
    console.error('MongoDB 연결 실패: ', error);
  }
}

const getDB = () => {
  if(!db) {
    throw new Error('데이터베이스 초기화 안됨');
  }
  return db;
}

module.exports = {
  connectDB,
  getDB,
}