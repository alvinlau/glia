const UserService = require ('../services/UserService')

describe('UserService', () => {
  const users = {
    findOne: jest.fn(),
    insertOne: jest.fn()
  }
  const mongo = {
    db: jest.fn().mockReturnValue({ collection: jest.fn().mockReturnValue(users) }),
  }
  const userService = new UserService(mongo)


  describe('getUser', () => {
    const findOneSpy = jest.spyOn(users, 'findOne').mockReturnValue({name: 'somename'})

    it('does not look for user when given username is invalid', async () => {
      const nullUser = await userService.getUser(null)
      expect(findOneSpy).not.toHaveBeenCalled()
      expect(nullUser).toBeNull()

      const blankUser = await userService.getUser('')
      expect(findOneSpy).not.toHaveBeenCalled()
      expect(blankUser).toBeNull()
    })

    it('gets user given valid username', async () => {
      const amy = await userService.getUser('Amy')
      expect(findOneSpy).toHaveBeenCalledTimes(1)
      expect(amy).not.toBeNull()
      expect(amy).toMatchObject({name: 'somename'})
    })
  })


  describe('addUser', () => {
    const insertOneSpy = jest.spyOn(users, 'insertOne').mockReturnValue(true)

    it('does not add user when given invalid user', async () => {
      await userService.addUser(null)
      expect(insertOneSpy).not.toHaveBeenCalled()

      await userService.addUser('')
      expect(insertOneSpy).not.toHaveBeenCalled()
    })

    it('adds user given valid user', async () => {
      const result = await userService.addUser({name: 'jon'})
      expect(insertOneSpy).toHaveBeenCalledTimes(1)
      expect(result).toBe(true)
    })
  })
})