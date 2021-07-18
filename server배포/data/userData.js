import { useVirtualId } from '../db/mongodb.js';
import Mongoose from 'mongoose';

export const userSchema = new Mongoose.Schema({
  username : {type : String, required : true},
  name : {type : String, required : true},
  email : {type : String, required : true},
  password : {type : String, required : true},
  url : {type : String, required : false},
});

useVirtualId(userSchema);
const User = Mongoose.model('User', userSchema);

export async function findByUsername(username) {    return User.findOne({username});  }
export async function findById(id) {                return User.findById(id); }
export async function createUser(user) {            return new User(user).save().then(data => data.id); }

let user = [
  {
    id : 1,
    username : 'lsh',
    password : '$2b$04$XTo6IZuIYJZXiY7trZKeKOtSYvEiPAS3rdhaktKsFPY88GZLsBuxK',
    email : 'hehesi207@nave.com',
    url : 'Http://www.sdf.fdbs/fbsdbosd'
  }
]