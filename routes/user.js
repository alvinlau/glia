var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@cluster0.rzwjswe.mongodb.net'


router.post('/', async function (req, res, next) {
  const {name, accessibility, price} = req.body
  if ([name, accessibility, price].some(val => !val)) {
    next('name, accessibility, price fields must be valid values')
    return
  }

  const user = { name, accessibility, price }

  const mongo = new MongoClient(MONGO_URL)
  const users = mongo.db('bored').collection('users');
  await users.insertOne(user)
  await mongo.close()

  res.send(user)
});

module.exports = router;
