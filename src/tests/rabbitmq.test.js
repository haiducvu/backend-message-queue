'use strict'

const { connectToRabbitMQForTest } = require('../dbs/init.rabbit')

describe('RabbitMQ', () => {
    it('should connect to RabbitMQ', async () => {
        const channel = await connectToRabbitMQForTest()
        expect(channel).toBeUndefined()
    })
})

