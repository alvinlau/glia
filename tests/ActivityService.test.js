const ActivityService = require('../services/ActivityService')

describe('ActivityService', () => {
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
  const dbActivity = { _id: 'mongoid', activity: 'someactivity' }
  const aggregateSpy = jest.spyOn(activities, 'aggregate').mockReturnValue({
    next: jest.fn().mockReturnValue(dbActivity)
  })
  const insertOneSpy = jest.spyOn(activities, 'insertOne').mockReturnValue(true)

  describe('getActivity', () => {
    const boredActivitySpy = jest.spyOn(activityService, 'getActivityFromBored')
      .mockImplementation(() => { return { activity: 'bored' } })

    it('does not call bored API if an activity is found in db', async () => {
      // const dbActivity = { _id: 'mongoid', activity: 'someactivity'}
      // jest.spyOn(activities, 'aggregate').mockReturnValue({ 
      //   next: jest.fn().mockReturnValue(dbActivity)
      // })
      const activity = await activityService.getActivity()
      expect(aggregateSpy).toBeCalled()
      expect(boredActivitySpy).not.toBeCalled()
      expect(insertOneSpy).not.toBeCalled()
      expect(activity).toMatchObject({ activity: 'someactivity' })
    })

    it('calls bored API if no activity is found in db', async () => {
      jest.spyOn(activities, 'aggregate').mockReturnValue({ next: jest.fn().mockReturnValue(null) })
      const activity = await activityService.getActivity()
      expect(aggregateSpy).toBeCalled()
      expect(boredActivitySpy).toBeCalled()
      expect(insertOneSpy).toBeCalled()
      expect(activity).toMatchObject({ activity: 'bored' })
    })    
  })

  describe('getActivityWithUser', () => {
    const boredActivitySpy = jest.spyOn(activityService, 'getActivityFromBored')
      .mockImplementation(() => { return { activity: 'bored' } })

    it('does not call bored API if an activity is found in db', async () => {
      const mongoQuery = [
        { $match: { accessibility: 'SuperHigh', price: 'SuperLow' } },
        { $sample: { size: 1 } },
      ]

      const activity = await activityService.getActivityWithUser({accessibility: 'SuperHigh', price: 'SuperLow'})
      expect(aggregateSpy).toBeCalledWith(expect.arrayContaining([
        expect.objectContaining({ $match: { accessibility: 'SuperHigh', price: 'SuperLow' } }),
        expect.objectContaining({ $sample: { size: 1 } })
      ]))
      expect(boredActivitySpy).not.toBeCalled()
      expect(insertOneSpy).not.toBeCalled()
      expect(activity).toMatchObject({ activity: 'someactivity' })
    })
  })

  describe('getActivityFromBored', () => {
    it('parses the accessiblity and price fields', async () => {
      // mock fetch
    })
  })
})