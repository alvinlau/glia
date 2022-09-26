var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@cluster0.rzwjswe.mongodb.net'


router.post('/', async function (req, res, next) {
  // TODO sanitize fields
  console.log(req.body)
  const json = req.body

  const mongo = new MongoClient(MONGO_URL)
  const users = mongo.db('bored').collection('users');
  await users.insertOne(json)
  await mongo.close()

  res.send(json)
});

module.exports = router;
