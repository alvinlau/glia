const fetch = require('cross-fetch');

class ActivityService {
  constructor (mongo) {
    this.mongo = mongo
    this.activities = mongo.db('bored').collection('activities')
  }

  async getActivity() {
    const activity = await this.activities.aggregate([{ $sample: { size: 1 } }]).next()
      || await getActivityFromBored()
    activity._id || await this.activities.insertOne(activity) // if it has _id then it's from mongo
    return activity
  }

  async getActivityWithUser(user) {
    // apply user filter, first by looking up cache
    let activity = await this.activities.aggregate([
      { $match: { accessibility: user.accessibility, price: user.price } },
      { $sample: { size: 1 } },
    ]).next()
    
    // found activity in cache
    if (activity) {
      console.log(`found activity in cache for user ${user.name}`)
      console.log(activity)
      // grab another activity from bored API to grow our cache
      activity = await getActivityFromBored()
      await this.activities.insertOne(activity)
      return activity
    }

    // no match in cache, call bored API
    let activitiesReceived = []
    while (!(activity && userPreferred(user, activity))) {
      activity = await getActivityFromBored()
      console.log(`activity ${activity.activity}`)
      activitiesReceived.push(activity)
    }
    console.log(`got activity from BoredAPI for user ${user.name}`)
    console.log(activity)
    await this.activities.insertMany(activitiesReceived) // save all unqualifying activies in cache
    return activity
  }
}

// TODO backoff on api busy
async function getActivityFromBored() {
  const response = await fetch('http://www.boredapi.com/api/activity/')
  if (!response.ok) {return null}
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

module.exports = ActivityService
