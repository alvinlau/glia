class UserService {
  constructor (mongo) {
    this.mongo = mongo
    this.users = mongo.db('bored').collection('users')
  }

  async getUser(username) {
    return await this.users.findOne({ name: username })
  }

  async addUser(user) {
    await this.users.insertOne(user)
  }
}

module.exports = UserService
