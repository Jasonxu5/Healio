import express from "express";
import firebaseAdmin from "../../../firebaseAdmin.js";


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

router.get('/user', async function (req, res, next) {
  console.log(req.headers.authorization);
})

router.post('/user', async function (req, res, next) {
  let token = await verifyAuthToken(req);

  let user = await firebaseAdmin.auth.verifyIdToken(token);

  if (!user) {
    res.json({ "Error": "Not Logged In!" })
  }

  try {
    const newUser = new req.db.User({
      user_id: user.uid,
      type: "Patient"
    })

    await newUser.save()
    res.json({ "status": "success" })
  } catch (err) {
    res.json({ "status": "error", "error": err })
  }
})

export default router;