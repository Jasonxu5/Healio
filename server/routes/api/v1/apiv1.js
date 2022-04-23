import express from "express";
import firebaseAdmin from "../../../firebaseAdmin.js";
import bcrypt from 'bcryptjs'

var router = express.Router();

const getUserFromToken = async (token) => {
  try {
    const firebaseUser = await firebaseAdmin.auth.verifyIdToken(token);
    return firebaseUser
  } catch (err) {
    return { "Error": err }
  }
}

async function verifyAuthToken(req, res, next) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    //const user = await getUserFromToken(token)

    // if (!user) {
    //   res.json({ "Error": "Unauthorized" });
    // }

    return token
  } catch (err) {
    return { "Error": err }
  }
}

router.post('/userlogin', async function (req, res, next) {
  // console.log(req.headers.authorization);

  let email = req.body.email;
  let password = req.body.password;

  console.log(email);

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
      console.log(result)
      if (result) {
        res.json({ "status": "success" })
        return;
      }
      res.json({ "Error: ": "Login not successful" })
    })
})

router.post('/user', async function (req, res, next) {
  // let token = await verifyAuthToken(req);
  // let user = await firebaseAdmin.auth.verifyIdToken(token);

  let email = req.body.email;
  let existingEmail = await req.db.User.exists({ email: email })

  if (existingEmail) {
    res.json({ "Error: ": "Another User with this email already exists" });
    return;
  }

  let password = req.body.password;

  bcrypt.hash(password, 10).then(async (hash) => { // 10 denotes the number of salt rounds, greater number makes it harder to brute-force hash
    try {
      const newUser = new req.db.User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: hash,
        is_family_manager: req.body.isFamilyManager
      })

      await newUser.save()
      res.json({ "status": "success" })
    } catch (error) {
      res.json({ "Error": error })
    }
  })
})

export default router;