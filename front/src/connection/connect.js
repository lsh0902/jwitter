import socket from 'socket.io-client';

export default class Socket {
  constructor(url, getToken) {
    this.socketIO = socket(url, {
      auth : (f) => f({ token : getToken() }),
    });

    this.socketIO.on('connect_error', (error) => {
      console.error(error);
    })
    
  }

  onSync(event, callback) {
    if(!this.socketIO.connected) {
      this.socketIO.connect();
    }
    this.socketIO.on(event, callback);
    return () => this.socketIO.off(event);
  }
}

