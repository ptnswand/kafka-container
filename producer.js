const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "date-producer",
  brokers: ["localhost:9090", "localhost:9091", "localhost:9092"],
});

const producer = kafka.producer();

const runProducer = async () => {
  await producer.connect();

  // Send messages to Kafka topic 'multi-partition-topic' every 5 second
  setInterval(async () => {
    try {
      const message = {
        value: `Message sent at ${new Date().toISOString().substring(0, 19)}`,
      };
      await producer.send({
        topic: "multi-partition-topic",
        messages: [message],
      });
      console.log("Produced message:", message.value);
    } catch (error) {
      console.error("Error producing message:", error);
    }
  }, 5000);
};

runProducer().catch(console.error);
