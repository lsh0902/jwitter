import express from 'express';
import { body, param, validationResult} from 'express-validator';
import * as tweetController from './tweetCon.js';
import {validate} from '../middleware/validator.js';
import { isAuth, isUser } from '../middleware/auth.js';

const router = express.Router();

const validateTweet = [
  body('text').notEmpty().withMessage('본문이 비었?는데?'),
  validate
]

router.get('/',isAuth ,tweetController.getTweets);

router.get('/:id',[
  param('id').isInt().withMessage('숫자를 입력하세요'), isAuth,
  validate
], tweetController.getTweet);

router.post('/', isAuth, validateTweet ,tweetController.createTweet);

router.put('/:id', isAuth, isUser, validateTweet, tweetController.updateTweet);

router.delete('/:id', isAuth, isUser, tweetController.delTweet);


export default router;