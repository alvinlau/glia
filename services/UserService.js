class UserService {
  constructor (mongo) {
    this.mongo = mongo
    this.users = mongo.db('bored').collection('users')
  }

  async getUser(username) {
    return username ? await this.users.findOne({ name: username }) : null
  }

  async addUser(user) {
    return user && await this.users.insertOne(user)
  }
}

module.exports = UserService
