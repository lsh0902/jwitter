import {Server} from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.socketIO = new Server(server, { 
      cors : {
        origin : config.cors.allowedOrigin 
      },
    });
    
    // this.socketIO.use((socket, next) => {
    //   const token = socket.handshake.auth.token;
    //   if(!token) {
    //     console.log('토큰 없네');
    //     return next(new Error('Authentication error'));
    //   } else {
    //     jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
    //       if(error) {
    //         console.log('잘못된 토큰 : ', token);
    //         return next(new Error('Authentication error'));
    //       }
    //       console.log('다음으로', config.jwt.secretKey);
    //       next();
    //     })
    //   }
    // })
    
    this.socketIO.on('connection', () => {
      this.socketIO.emit("dwitter", 'hi guys😁');
    })
  }
}

let socket;
export function Init(server) {
  if(!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO() {
  if(!socket) throw new Error('init first');
  return socket.socketIO;
}