import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { jwtSecret } from "./jwtSecret.js";

import db from "./db.js";
import indexRouter from './routes/index.js';
import apiRouter from './routes/api/v1/apiv1.js'
// import usersRouter from './routes/users.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let app = express();
app.use(cookieParser());

const whitelist = ['http://localhost:3000', 'https://healio-e7722.web.app'];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (whitelist.includes(origin))
      return callback(null, true)

    callback(new Error('Not allowed by CORS'));
  }
}

app.use(cors(corsOptions));
// app.use(cookieSession({
//   secure: true,
//   sameSite: "none"
// }))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  req.db = db;
  next();
})

// export function userAuth(req, res, next) {
//   const token = req.cookies.jwt;
//   console.log("hello", token);
//   if (token) {
//     jwt.verify(token, jwtSecret, (err) => {
//       if (err) {
//         res.json({ Error: "Unauthorized User! Please create an account or sign in." })
//       }
//       next();
//     });
//   } else {
//     res.json({ Error: "Authorization Error! No Token Found." })
//   }
// }

app.use('/api/v1', apiRouter);
//app.use('/users', usersRouter);

export default app;