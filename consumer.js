const { Kafka } = require('kafkajs');

const kafka = new Kafka({
  clientId: 'date-consumer',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'nodejs-group' });

const runConsumer = async () => {
  await consumer.connect();
  await consumer.subscribe({ topic: 'ExampleTopic', fromBeginning: true });

  // Process messages from Kafka topic 'ExampleTopic' randomly 1-10 second
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const s = Math.ceil(Math.random() * 10)
      const timeout = s * 1000
      const startTime = Date.now()
      setTimeout(() => {
        console.log({
          value: message.value.toString(),
          offset: message.offset,
          partition,
          timeout: `${s}s`,
          endtime: `${Date.now() - startTime}ms`
        });
      }, timeout)
    }
  });
};

runConsumer().catch(console.error);