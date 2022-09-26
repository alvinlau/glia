var express = require('express');
var router = express.Router();

const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@cluster0.rzwjswe.mongodb.net'

router.get('/', async function(req, res, next) {
  const mongo = new MongoClient(MONGO_URL)
  const users = mongo.db('bored').collection('users')
  const user = await users.findOne()
  const activities = mongo.db('bored').collection('activities')
  let activity = null

  // should we allow request with no user?
  if (!user) {
    activity = await activities.findOne() || await getActivityFromBored()
    activity._id || await activities.insertOne(activity) // if it has _id then it's from mongo
    res.send(activity)
    await mongo.close()
    return
  }

  // apply user filter
  // lookup cache
  activity = await activities.findOne({accessibility: user.accessibility, price: user.price})
  if (activity) {
    res.send(activity)
    await mongo.close()
    return
  }
  
  // no match in cache, call bored API
  let activitiesReceived = []
  while (!(activity && userPreferred(user, activity))) {
    activity = await getActivityFromBored()
    activitiesReceived.push(activity)
    // console.log(activity)
  }
  await activities.insertMany(activitiesReceived) // save all unqualifying activies in cache

  await mongo.close()
  res.send(activity)
});


// TODO backoff on api busy
async function getActivityFromBored() {
  // TODO check response
  const response = await fetch('http://www.boredapi.com/api/activity/')
  const json = await response.json()

  var activity = {
    ...(json),
    accessibility: accessibility(json.accessibility),
    price: price(json.price)
  }

  return activity
}


function userPreferred(user, activity) {
  return activity.accessibility == user.accessibility && activity.price == user.price
}



// TODO schema checks
function accessibility(source) {
  switch (true) {
    case source > 0.75:
      return 'Low'
    case source > 0.25:
      return 'Medium'
    default:
      return 'High'
      // exception of the value is < 0?
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
