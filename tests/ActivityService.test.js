const ActivityService = require('../services/ActivityService')

describe('ActivityService', () => {
  const dbActivity = { _id: 'mongoid', activity: 'dbactivity' }
  const activities = {
    findOne: jest.fn(),
    insertOne: jest.fn(),
    insertMany: jest.fn(),
    aggregate: jest.fn(),
  }
  const mongo = {
    db: jest.fn().mockReturnValue({ collection: jest.fn().mockReturnValue(activities) }),
  }
  const activityService = new ActivityService(mongo)
  const insertOneSpy = jest.spyOn(activities, 'insertOne').mockReturnValue(true)

  describe('getActivity', () => {
    const aggregateSpy = jest.spyOn(activities, 'aggregate').mockReturnValue({
      next: jest.fn().mockReturnValue(dbActivity)
    })
    const boredActivitySpy = jest.spyOn(activityService, 'getActivityFromBored')
      .mockImplementation(() => { return { activity: 'bored' } })

    it('does not call bored API if an activity is found in db', async () => {
      const activity = await activityService.getActivity()
      expect(aggregateSpy).toBeCalledWith(expect.arrayContaining([{ $sample: { size: 1 } }]))
      expect(boredActivitySpy).not.toBeCalled()
      expect(insertOneSpy).not.toBeCalled()
      expect(activity).toMatchObject({ activity: 'dbactivity' })
    })

    it('calls bored API if no activity is found in db', async () => {
      jest.spyOn(activities, 'aggregate').mockReturnValue({ next: jest.fn().mockReturnValue(null) })
      const activity = await activityService.getActivity()
      expect(aggregateSpy).toBeCalledWith(expect.arrayContaining([{ $sample: { size: 1 } }]))
      expect(boredActivitySpy).toBeCalled()
      expect(insertOneSpy).toBeCalled()
      expect(activity).toMatchObject({ activity: 'bored' })
    })
  })

  describe('getActivityWithUser', () => {
    const boredActivitySpy = jest.spyOn(activityService, 'getActivityFromBored')
      .mockReturnValue({ activity: 'bored', accessibility: 'SuperHigh', price: 'SuperLow' })

    it('does not call bored API if an activity is found in db', async () => {
      const mongoQuery = [
        { $match: { accessibility: 'SuperHigh', price: 'SuperLow' } },
        { $sample: { size: 1 } },
      ]
      const aggregateSpy = jest.spyOn(activities, 'aggregate').mockReturnValue({
        next: jest.fn().mockReturnValue(dbActivity)
      })

      const activity = await activityService.getActivityWithUser({accessibility: 'SuperHigh', price: 'SuperLow'})
      expect(aggregateSpy).toBeCalledWith(expect.arrayContaining(mongoQuery))
      expect(boredActivitySpy).toBeCalled() // trying to make this called 1 time
      expect(insertOneSpy).toBeCalled() // trying to make this called 1 time
      expect(activity).toMatchObject({ activity: 'dbactivity' })
    })

    it('calls bored API if no activity is found in db', async () => {
      const mongoQuery = [
        { $match: { accessibility: 'SuperHigh', price: 'SuperLow' } },
        { $sample: { size: 1 } },
      ]
      const aggregateSpy = jest.spyOn(activities, 'aggregate').mockReturnValue({
        next: jest.fn().mockReturnValue(null)
      })

      const activity = await activityService.getActivityWithUser({ accessibility: 'SuperHigh', price: 'SuperLow' })
      expect(aggregateSpy).toBeCalledWith(expect.arrayContaining(mongoQuery))
      expect(boredActivitySpy).toBeCalled() // trying to make this called 1 time
      expect(insertOneSpy).toBeCalled() // trying to make this called 1 time
      expect(activity).not.toMatchObject({ activity: 'dbactivity' })
    })
  })

  describe('getActivityFromBored', () => {
    it('parses the accessiblity and price fields', async () => {
      // mock fetch
    })
  })
})