import dotenv from 'dotenv';
dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if(value == null) {
    throw new Error('no key');
  }
  return value
}



export const config = {
  jwt : {
    secretKey : required('JWT_SECRET'),
    expires : parseInt(required('JWT_EXPIRE', 86400)),
  },
  bcrypt : {
    salt : parseInt(required('BCRYPT_SORT', 7)),
  },
  host : {
    port : parseInt(required('HOST_PORT', 8080)),
  },
  db : {
    host : required('DB_HOST'),
    user : required('DB_USER'),
    database:required('DB'),
    password : required('DB_PASSWORD'),
    mongo : required('MONGO'),
  },
  cors : {
    allowedOrigin : required('CORS_ALLOW_ORIGIN')
  }
};