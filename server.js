'user strict'

const { consumerQueue, consumerToQueueNormal, consumerToQueueFailed } = require('./src/services/consumerQueue.service')

const queueName = 'test-topic'
// consumerQueue(queueName).then(() => {
//     console.log(`Message consumer started ${queueName}`)
// }).catch(error => {
//     {
//         console.log(`Message Error:, ${error.message}`)
//     }
// })

// consumerToQueueNormal(queueName).then(() => {
//     console.log(`Message consumerToQueueNormal started ${queueName}`)
// }).catch(error => {
//     {
//         console.log(`Message Error:, ${error.message}`)
//     }
// })

// consumerToQueueFailed(queueName).then(() => {
//     console.log(`Message consumerToQueueFailed started ${queueName}`)
// }).catch(error => {
//     {
//         console.log(`Message Error:, ${error.message}`)
//     }
// }) 

require("./src/consumers/email-consumer");
// require("./consumers/paymentConsumer");
// require("./consumers/inventoryConsumer");

console.log("🚀 All consumers started...");