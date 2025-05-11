module.exports = async (channel, queue, handler) => {
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            try {

                const numberTest = Math.random()
                console.log('numberTest', { numberTest })
                if (numberTest < 0.8) {
                    throw new Error(`Send notification failed:: HOT FIX`)
                }

                const data = msg.content.toString();//JSON.parse(msg.content.toString());
                console.log('dataaaaaa', data)
                console.log(`📩 Received message from ${queue}:`, data);
                await handler(data); // Xử lý logic
                channel.ack(msg);
            } catch (error) {
                console.error(`❌ Error processing ${queue}:`, error);
                channel.nack(msg, false, false); // Đưa vào dead-letter queue nếu cần
                /**
                 * nack: stands for "negative acknowledgement".
                 * The first argument msg is the message being negatively acknowledged. 
                 * The second argument false indicates that the message should not be requeued. 
                 *  If set to true, the message would be requeued for another attempt at processing.
                 * The third argument false indicates that the message should not be discarded.
                 *  If set to true, the message would be discarded and not requeued.
                 */                   
            }
        }
    });

    console.log(`🚀 Consumer listening on queue: ${queue}`);
};
