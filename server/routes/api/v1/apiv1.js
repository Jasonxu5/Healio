import express from "express";
import firebaseAdmin from "../../../firebaseAdmin.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtSecret } from "../../../jwtSecret.js";

// import { userAuth } from "../../../app.js"

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

router.get('/logout', async function (req, res, next) {
  console.log(req.cookies);
  res.cookie("jwt", "", { maxAge: "1" }) // overwrite the existing jwt token
  console.log("Login Session Cookie deleted")
  res.json({ "Status": "Logged out" })
})

router.get('/currentCookie', async function (req, res, next) {
  const decode = jwt.decode(req.cookies.jwt, jwtSecret);
  console.log(decode);
  const token = req.cookies.jwt
  console.log(token);
  if (token) {
    jwt.verify(token, jwtSecret, (err) => {
      if (err) {
        res.json({ "Error": err })
        return;
      }
      res.json({ "Status": "Success" })
      return;
    })
  } else {
    res.json({ "Error": "Unauthorized, no token found" })
    return;
  }
})

router.get('/isLoggedIn', async function (req, res, next) {
  return;
})

router.post('/userlogin', async function (req, res, next) {
  // console.log(req.headers.authorization);
  // const token = req.cookies.jwt;
  // if (token) {
  //   jwt.verify(token, jwtSecret, (err) => {
  //     if (err) {
  //       res.json({ Error: "Unauthorized User! Please create an account or sign in." })
  //     }
  //   })
  // }
  // console.log("hello world: ", req.cookies.jwt); // Do this after login credentials are determined to be correct. Check if the token matches the account when going to dashboard page

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
      createToken(res, newUser)
      res.json({ "status": "success" })
    } catch (error) {
      res.json({ "Error": error })
    }
  })
})

function createToken(res, user) {
  try {
    const maxAge = 60 * 60 // 1 hour in seconds
    const token = jwt.sign(
      {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        is_admin: user.is_family_manager
      },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );
    let cookie = res.cookie('jwt', token, {
      httpOnly: true, // only allows server to access this cookie for security, not stored on browser (client-side)
      maxAge: maxAge * 1000, // 1 hour in milliseconds
    });

    return cookie
  } catch (error) {
    console.log(error);
  }
}

export default router;