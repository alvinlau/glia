const express = require('express')
const router = express.Router()

const { MongoClient } = require('mongodb')
const MONGO_URL = 'mongodb+srv://glia:' + process.env.MONGO_PASSWD + '@' + process.env.MONGO_HOST
const mongo = new MongoClient(MONGO_URL)

const activityService = new (require('../services/ActivityService'))(mongo)
const userService = new (require('../services/UserService'))(mongo)

router.get('/', async function(req, res, next) {
  // determine user
  const loggedInUser = req.header('boredUser')
  console.log('logged in user from request: ' + loggedInUser)

  const user = await userService.getUser(loggedInUser)
  user && console.log('found user: ' + user.name)

  // no user supplied, just get any activity
  let activity = null
  if (!user) {
    activity = await activityService.getActivity()
    res.send(activity)
    return
  }

  // get activity based on user preferences
  user.activityKey = req.header('boredActivityKey')
  activity = await activityService.getActivityWithUser(user)
  res.send(activity)
});

module.exports = router;
