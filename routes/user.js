const express = require('express')
const router = express.Router()

const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@' + process.env.MONGO_HOST
const mongo = new MongoClient(MONGO_URL)

const userService = new (require('../services/UserService'))(mongo)

router.post('/', async function (req, res, next) {
  // quick schema check, standing in for using a library
  const {name, accessibility, price, activityKey} = req.body
  if ([name, accessibility, price].some(val => !val)) {
    res.status(400).send('name, accessibility, price fields must be valid values')
    return
  }

  // TODO check the success for adding user
  const user = { name, accessibility, price, activityKey }
  await userService.addUser(user)
  console.log(`added user ${user.name}`)

  res.send(user)
});

module.exports = router;
