const express = require("express")
const router = express.Router()

router.get("/usertest", (req, res) => {
    res.send("user test is successfull")
})

router.post("/userposttest", (req, res) => {
    const username = req.body.username
    res.json(username)
})

module.exports = router 