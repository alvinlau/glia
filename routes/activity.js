var express = require('express');
var router = express.Router();
const fetch = require('cross-fetch');
const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@' + process.env.MONGO_HOST

router.get('/', async function(req, res, next) {
  const mongo = new MongoClient(MONGO_URL)
  
  const users = mongo.db('bored').collection('users')
  const loggedInUser = req.header('boredUser')
  console.log('logged in user from request: ' + loggedInUser)
  const user = await users.findOne({name: loggedInUser}) || await users.findOne()
  console.log('current user: ' + user.name)

  const activities = mongo.db('bored').collection('activities')
  let activity = null

  // no user supplied, just get any activity
  if (!user) {
    activity = await activities.aggregate([{$sample: {size: 1}}]).next()
      || await getActivityFromBored()
    activity._id || await activities.insertOne(activity) // if it has _id then it's from mongo
    await mongo.close()
    res.send(activity)
    return
  }

  // apply user filter, first by looking up cache
  activity = await activities.aggregate([
    { $match: {accessibility: user.accessibility, price: user.price} },
    { $sample: {size: 1} },
  ]).next()
  console.log(activity)

  if (activity) {
    console.log('found activitiy in cache')
    await mongo.close()
    res.send(activity)
    return
  }
  
  // no match in cache, call bored API
  let activitiesReceived = []
  while (!(activity && userPreferred(user, activity))) {
    activity = await getActivityFromBored()
    activitiesReceived.push(activity)
  }
  await activities.insertMany(activitiesReceived) // save all unqualifying activies in cache

  console.log(activity)
  await mongo.close()
  res.send(activity)
});


// TODO backoff on api busy
async function getActivityFromBored() {
  const response = await fetch('http://www.boredapi.com/api/activity/')
  if (!response.ok) { return null }
  const json = await response.json()

  const activity = {
    activity: json.activity,
    type: json.type,
    participants: json.participants,
    link: json.link,
    key: json.key,
    accessibility: accessibility(json.accessibility),
    price: price(json.price)
  }

  return activity
}


function userPreferred(user, activity) {
  return activity.accessibility == user.accessibility && activity.price == user.price
}


function accessibility(source) {
  switch (true) {
    case source > 0.75:
      return 'Low'
    case source > 0.25:
      return 'Medium'
    default:
      return 'High'
      // TODO exception if the value is < 0?
  }
}

function price(source) {
  switch (true) {
    case source < 0:
      // exception?
    case source == 0:
      return 'Free'
    case source <= 0.5:
      return 'Low'
    default:
      return 'High'
  }
}

module.exports = router;
