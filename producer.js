const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "ExampleTopic",
  brokers: ["localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();

  // Send messages to Kafka topic 'ExampleTopic' every 5 second
  setInterval(async () => {
    try {
      const message = {
        value: `Message sent at ${new Date().toISOString().substring(0, 19)}`,
      };
      await producer.send({
        topic: "ExampleTopic",
        messages: [message],
      });
      console.log("Produced message:", message.value);
    } catch (error) {
      console.error("Error producing message:", error);
    }
  }, 5000);
};

runProducer().catch(console.error);
