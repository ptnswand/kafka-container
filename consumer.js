const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "date-consumer",
  brokers: ["localhost:9090", "localhost:9091", "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "nodejs-group" });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: "multi-partition-topic", fromBeginning: true });

  // Process messages from Kafka topic 'multi-partition-topic' randomly 1-10 second
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log(
        `partition: ${partition} | offset: ${
          message.offset
        } | value: ${message.value.toString().substring(27, 35)}`
      );
      const s = Math.ceil(Math.random() * 10);
      const timeout = s * 1000;
      const startTime = Date.now();
      setTimeout(() => {
        console.log({
          value: message.value.toString(),
          offset: message.offset,
          endtime: `${Date.now() - startTime}ms`,
          partition,
        });
      }, timeout);
    },
  });
};

runConsumer().catch(console.error);
