import { getSocketIO } from '../connection/connect.js';
import * as tweetRepository from '../data/tweetData.js';

export async function getTweets(req, res) {
  const username = req.query.user;
  console.log(username);
  const data = await (username ? tweetRepository.getTweetByUserName(username) : tweetRepository.getTweetByUserName());
  res.status(200).json(data);
}

export async function getTweet(req, res, next) {
  const id = req.params.id;
  const tweet = await tweetRepository.getTweetById(id);
  console.log(tweet);
  if(tweet) {
    return res.status(200).json(tweet);
  } else { 
    return res.status(404).json({message : 'id not found'});
  }
}

export async function createTweet(req, res) {
  const { text } = req.body;
  const tweet = await tweetRepository.createTweet(text, req.userId);
  res.status(201).json(tweet);
  getSocketIO().emit('tweets', tweet);
}

export async function updateTweet(req,res) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await tweetRepository.updateTweet(id, text);
  if(tweet) {
    res.status(200).json(tweet);
  } else { 
    res.status(404).json({ message : '없음'});
  }
}
export async function delTweet(req,res) {
  await tweetRepository.deleteTweet(req.params.id);
  res.sendStatus(204);
}










