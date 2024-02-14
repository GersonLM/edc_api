import mongoose from 'mongoose';
// import config from './config';
require('dotenv').config({path:'variables.env'});

const conectDB = async()=>{
  try{
    mongoose.set("strictQuery", false);
    mongoose.connect(process.env.DB_MONGO,{ useUnifiedTopology: true, useNewUrlParser: true });
    console.log("DB CONECTADA")
  }catch(error){
    console.log(error);
    process.exit(1);
  }
}

module.exports = conectDB
