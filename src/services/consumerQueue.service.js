'use strict'

const { connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue } = require('../dbs/init.rabbit')

const messageService = {
    consumerQueue: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();
            if (!channel || !connection) {
                throw new Error(`Failed to create channel or connection`)
            }
            await consumerQueue(channel, queueName)
        }
        catch (error) {
            console.error(`Error consumerToQUeue::`, error)
        }
    }
}

module.exports = messageService