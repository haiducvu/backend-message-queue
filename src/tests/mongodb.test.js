'use strict'

const mongoose = require('mongoose')
const connectString = 'mongodb://localhost:27017/dbTipJSDEV'

const TestSchema = new mongoose.Schema({ name: String })

// const { connectToMongoDBForTest } = require('../dbs/init.mongodb')

const Test = mongoose.model('Test', TestSchema)

describe('MongoDB Connection', () => {
    let connection;
    beforeAll(async () => {
        connection = await mongoose.connect(connectString)
    })

    afterAll(async () => {
        await connection.disconnect()
    })

    it('should connect to MongoDB', async () => {
        // const db = await connectToMongoDBForTest()
        // expect(db).toBeDefined()
        expect(mongoose.connection.readyState).toBe(1)
    })

    it('should save a document to the database', async () => {
        const user = new Test({ name: 'haidv111' })
        await user.save()
        expect(user.isNew).toBe(false)
    })

    it('should find a document to the database', async () => {
        const user = await Test.findOne({ name: 'haidv111' })
        expect(user).toBeDefined()
        expect(user.name).toBe('haidv111')
    })


})

