import express from "express";
import firebaseAdmin from "../../../firebaseAdmin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../../../jwtSecret.js";
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from 'path';
import fs from "fs";
import Papa from "papaparse";
import cookie from "cookie";

// import { userAuth } from "../../../app.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

var router = express.Router();

router.get('/logout', async function (req, res, next) {
  res.cookie("jwt", "", { // overwrite the existing jwt token
    maxAge: "1",
    sameSite: 'none',
    secure: true
  })
  console.log("Login Session Cookie deleted")
  res.json({ "Status": "Logged out" })
})

router.get('/currentCookie', async function (req, res, next) {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.json({ "Error": err })
        return;
      }
      const decode = jwt.decode(req.cookies.jwt, jwtSecret);
      res.json(decode)
      return;
    })
  } else {
    res.json({ "Error": "Unauthorized, no token found" })
    return;
  }
})

router.post('/profile', async function (req, res, next) {
  let accountEmail = req.body.email;
  let user = await req.db.User.findOne({ email: accountEmail });

  user.first_name = req.body.newFirst;
  user.last_name = req.body.newLast;

  await user.save();
  res.json({ "Status": "Success" });
})

router.post('/userlogin', async function (req, res, next) {
  let email = req.body.email;
  let password = req.body.password;

  if (!email || !password) {
    res.json({ "Error: ": "No email or password provided" })
    return;
  }

  let user = await req.db.User.findOne({ email })
  if (!user) {
    res.json({ "Error: ": "No user found with this email" })
    return;
  }

  bcrypt.compare(password, user.password)
    .then(function (result) {
      if (result) {
        createToken(res, user)
        res.json({ "status": "success" })
        return;
      } else {
        res.json({ "Error: ": "Incorrect email or password" })
      }
    })
})

router.post('/user', async function (req, res, next) {
  let email = req.body.email;
  let existingEmail = await req.db.User.exists({ email: email })

  if (existingEmail) {
    res.json({ "Error: ": "Another User with this email already exists" });
    return;
  }

  let password = req.body.password;

  let types = new Map();
  types.set('allergies', '');
  types.set('medications', '')
  types.set('procedures', '')
  types.set('vaccines', '')

  for (let key of types.keys()) {
    let healthData = await createHealthData(key);
    types.set(key, healthData)
  }

  console.log(types.get('allergies'))
  console.log(types.get('medications'))
  types.get('procedures')
  types.get('vaccines')

  bcrypt.hash(password, 10).then(async (hash) => { // 10 denotes the number of salt rounds, greater number makes it harder to brute-force hash
    try {
      const newUser = new req.db.User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        is_family_manager: req.body.isFamilyManager,
        allergies: types.get('allergies'),
        medications: types.get('medications'),
        procedures: types.get('procedures'),
        vaccines: types.get('vaccines')
      })

      await newUser.save()
      createToken(res, newUser)
      res.json({ "status": "success" })
    } catch (error) {
      res.json({ "Error": error })
    }
  })
})

async function createHealthData(key) {
  let start = 1;
  let limit = 5;

  let randNum = Math.floor(Math.random() * (limit - start + 1) + start); // Generates random numbers between start and limit
  let file = fs.createReadStream(path.resolve(__dirname, `../../../data/${key}.csv`))

  return new Promise((resolve) => {
    Papa.parse(file, {
      header: false,
      complete: (results) => {
        let arrayElm = [];
        let final = [];
        let data = results.data;

        for (let i = 1; i <= randNum; i++) {
          arrayElm.push(data[Math.floor(Math.random() * data.length)]) // Grab a random array element from data
        }

        arrayElm.forEach((array) => {
          array.forEach((element) => {
            final.push(element)
          })
        })
        resolve(final);
      }
    })
  });
}

function createToken(res, user) {
  try {
    const maxAge = 60 * 60 // 1 hour in seconds
    const token = jwt.sign(
      {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_family_manager,
        allergies: user.allergies,
        medications: user.medications,
        procedures: user.procedures,
        vaccines: user.vaccines
      },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    let cookie = res.cookie('jwt', token, {
      httpOnly: true, // only allows server to access this cookie for security, not stored on browser (client-side)
      maxAge: maxAge * 1000, // 1 hour in milliseconds
      sameSite: 'none',
      secure: true
    });

    return cookie
  } catch (error) {
    console.log(error);
  }
}

router.get('/appointments', async function (req, res, next) {
  let email = req.query.email;

  let userAppoints = await req.db.Appointment.find({ email: email })
  let result = await Promise.all(userAppoints.map(async (item) => {
    return { name: item.name, date: item.date, doctor: item.doctor }
  }))

  res.json(result);
})

router.post('/appointment', async function (req, res, next) {
  try {
    const newAppointment = new req.db.Appointment({
      email: req.body.email,
      name: req.body.name,
      date: req.body.date,
      doctor: req.body.doctor
    })
    await newAppointment.save()
    res.json({ "status": "success" })
  } catch (error) {
    res.json({ "Error": error })
  }
})

export default router;