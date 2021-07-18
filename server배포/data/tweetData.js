import { useVirtualId} from '../db/mongodb.js';
import Mongoose from 'mongoose';
import * as userRepo from './userData.js';

const tweetSchema = new Mongoose.Schema({
  text : {type : String, required : true},
  userId : {type : String, required : true},
  name : {type : String, required : true},
  username : {type : String, required : true},
  url : {type : String, required : false},
}, {timestamps: true});

useVirtualId(tweetSchema);
const Tweet = Mongoose.model('Tweet', tweetSchema);

export async function getTweetByUserName(username) {  
  console.log(username);
  return username ? Tweet.find({ username }).sort({createdAt : -1}) : Tweet.find().sort({createdAt : -1}); }
export async function getTweetById(id) {   return Tweet.findById(id); }
export async function updateTweet(id, text) {  return Tweet.findByIdAndUpdate(id, {text}, {returnOriginal : false}); }
export async function deleteTweet(id) {  return Tweet.findByIdAndDelete(id); }

export async function createTweet(text, userId) {
  return userRepo.findById(userId).then(user => {
    return new Tweet({
      text,
      userId,
      name : user.name,
      username : user.username
    }).save()
  })
}