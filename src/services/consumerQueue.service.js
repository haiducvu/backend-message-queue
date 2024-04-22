'use strict'

const { connectToRabbitMQ,
    connectToRabbitMQForTest,
    consumerQueue } = require('../dbs/init.rabbit')

// const log = console.log

// console.log = function () {
//     log.apply(console, [new Date()].concat(arguments))
// }

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
    },

    // case processing
    consumerToQueueNormal: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationQueue = 'notificationQueueProcess' // assertQueue

            // 1. TTL
            // const timeExpired = 15000;
            // setTimeout(() => {
            //     channel.consume(notificationQueue, msg => {
            //         console.log(`SEND notificationQueue successfully processed:`, msg.content.toString())
            //         channel.ack(msg)
            //     })
            // }, timeExpired)

            // 2. LOGIC
            channel.consume(notificationQueue, msg => {
                try {
                    const numberTest = Math.random()
                    console.log({ numberTest })
                    if (numberTest < 0.8) {
                        throw new Error(`Send notification failed:: HOT FIX`)
                    }
                    console.log(`SEND notificationQueue successfully processed:`, msg.content.toString())
                    channel.ack(msg)
                } catch (error) {
                    // console.error(`SEND notification error:`, error)
                    channel.nack(msg, false, false) // IMPORTANT
                    /**
                     * nack: stands for "negative acknowledgement".
                     * The first argument msg is the message being negatively acknowledged. 
                     * The second argument false indicates that the message should not be requeued. 
                     *  If set to true, the message would be requeued for another attempt at processing.
                     * The third argument false indicates that the message should not be discarded.
                     *  If set to true, the message would be discarded and not requeued.
                     */

                }
            })

        } catch (error) {
            console.log(error)
        }
    },

    // case failed processing
    consumerToQueueFailed: async (queueName) => {
        try {
            const { channel, connection } = await connectToRabbitMQ();

            const notificationExchangeDLX = 'notificationExDLX' // notificationEx direct 
            const notificationRoutingKeyDLX = 'notificationRoutingKeyDLX' // assert

            const notificationQueueHandler = 'notificationQueueHotFix'

            await channel.assertExchange(notificationExchangeDLX, 'direct', {
                durable: true
            })

            const queueResult = await channel.assertQueue(notificationQueueHandler, {
                exclusive: false
            })

            await channel.bindQueue(queueResult.queue, notificationExchangeDLX, notificationRoutingKeyDLX)
            await channel.consume(queueResult.queue, msgFailed => {
                console.log(`this notification error:, pls hot fix:`, msgFailed.content.toString());
            }, {
                noAck: true
            })

        } catch (error) {
            console.error(error)
            throw error;
        }
    }
}

module.exports = messageService