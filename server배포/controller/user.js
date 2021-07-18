import express from 'express';
import { body, param, validationResult} from 'express-validator';
import * as userController from './userCon.js';
import {isAuth} from '../middleware/auth.js';

const router = express.Router();

const loginvalid = [
  body('username').trim().notEmpty().withMessage('이름 입력해').isLength({ min : 3}).withMessage('이름 3자 이상. 외자임? ㄲㅈ'),
  body('password').trim().notEmpty().withMessage('비번').isLength({ min : 5}).withMessage('비번 5자 이상')
]

const signupValid = [
  ...loginvalid
]

router.post('/login', loginvalid, userController.login);

router.post('/signup', signupValid, userController.signUp);

router.get('/me', isAuth, userController.me);

export default router;