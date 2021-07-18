import Mongoose from 'mongoose';
import {config } from '../config.js';


export function connectDB() {
  return Mongoose.connect(config.db.mongo , {
    useFindAndModify : false,
    useNewUrlParser : true,
    useUnifiedTopology : true,
  })
}

export function useVirtualId(schema){
  schema.virtual('id').get(function() {
    return this._id.toString();
  })
  schema.set('toJSON', {virtuals: true});
  schema.set('toObject', {virtuals: true});
}


  
let db;
export function getTweets() {
  return db.collection('tweets');
}