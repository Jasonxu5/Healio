import express from "express";

var router = express.Router();

router.post('/user', async function (req, res, next) {
  try {
    const newUser = new req.db.User({
      username: "Jasonxu5", // Later use req.body.username
      type: "Patient"
    })

    await newUser.save()
    res.json({ "status": "success" })
  } catch (err) {
    res.json({ "status": "error", "error": err })
  }
})

export default router;