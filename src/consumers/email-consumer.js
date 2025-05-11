const { connectToRabbitMQ } = require("../dbs/init.rabbit");
const handleMessage = require("../services/messageHandler");

const queueName = "email_queue";

const sendEmail = async (to, subject, text) => {
    return new Promise((resolve, reject) => {
        console.log(`📧 Sending email to ${to}...`);
        setTimeout(() => {
            if (true) { // Math.random() > 0.2 // hard coded
                console.log(`✅ Email sent to ${to}`);
                resolve();
            } else {
                console.error(`❌ Failed to send email to ${to}`);
                reject(new Error("Simulated email failure"));
            }
        }, 2000); // Giả lập thời gian gửi email
    });
};

module.exports = sendEmail;


const startEmailConsumer = async () => {
    const { channel, connection } = await connectToRabbitMQ();
    await handleMessage(channel, queueName, async (data) => {
        await sendEmail(data.email, data.subject, data.body);

        // sau khi gởi email, thông báo cập nhật database
        // channel.sendToQueue("update_db_queue", Buffer.from(JSON.stringify({
        //     orderId: data.orderId,
        //     status: "email_sent"
        // })));
    });
};

startEmailConsumer();
