import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import tweetRouter from './controller/tweet.js';
import userRouter from './controller/user.js';
import { config } from './config.js';
import {Init} from './connection/connect.js';
import { connectDB } from './db/mongodb.js';


const app = express();

app.use(express.json());
app.use(helmet())
app.use(morgan('tiny'))
app.use(cors({
  origin : config.cors.allowedOrigin
}))


app.use('/tweets', tweetRouter);
app.use('/auth', userRouter)

app.use((req,res,next)=>{
  res.sendStatus(404);
});


app.use((error, req,res,next)=>{
  console.error(error);
  res.sendStatus(500);
})


connectDB().then((client) => {
  console.log(`server started ${new Date()}}`);
  const server = app.listen(config.host.port);
  Init(server);
}).catch(console.log);