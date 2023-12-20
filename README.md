# Commands
> Don't foget to change your `CLUSTER_ID: 'g3NEraTtedKafKAkrAFTiD'` to a new value!

**Prerequisites**
- Docker Desktop

Get Started
```bash
docker compose up
```

After that, your `--bootstrap-server` is running on `localhost:9092`.

## Topics

To create a new topic syntax:
`kafka-topics.sh --create --topic <topic_name> --partitions <num_partitions> --replication-factor <replication_factor> --bootstrap-server <broker_list>`
- `--create`: Specifies creating a topic.
- `--topic`: Name of the topic to be created.
- `--partitions`: Number of partitions for the topic.
- `--replication-factor`: Replication factor for fault tolerance.
- `--bootstrap-server`: Comma-separated list of Kafka broker addresses.

**Example**
```bash
docker exec -it broker /bin/kafka-topics --create --topic ExampleTopic --partitions 3 --replication-factor 1 --bootstrap-server localhost:9092
```

The command to list Kafka topics involves using the kafka-topics.sh script with the --list option such as `kafka-topics.sh --list --bootstrap-server <broker_list>`.
- `--list`: Lists all available topics.

**Example**
```bash
docker exec -it broker /bin/kafka-topics --list --bootstrap-server localhost:9092
```

To describe a Kafka topic, you use the kafka-topics.sh script with the --describe option. This command provides detailed information about the specified topic, including its partitions, replication factor, leader, and more. Syntax: `kafka-topics.sh --describe --topic <topic_name> --bootstrap-server <broker_list>`

**Example**
```bash
docker exec -it broker /bin/kafka-topics --describe --topic ExampleTopic --bootstrap-server localhost:9092
```

## Producer & Consumer Kafka Topics
In Apache Kafka, producers are responsible for sending messages to topics, while consumers read and process these messages from topics. Below are examples demonstrating the use of producers and consumers for a Kafka topic.

To produce messages to a Kafka topic named "ExampleTopic" you can use the Kafka console producer.
```bash
docker exec -it broker /bin/kafka-console-producer --topic ExampleTopic --bootstrap-server localhost:9092
```
After executing this command, you'll be in an interactive mode to input messages. Type messages and press Enter to produce them to the "ExampleTopic" Kafka topic:
```bash
Hello, Kafka!
Kafka with Kraft is a better way.
No more ZooKeeper, right? Ahh, that nice!
```
Press `Ctrl + C` to exit the producer console.

To consume messages from the "ExampleTopic" Kafka topic using the Kafka console consumer.
```bash
docker exec -it broker /bin/kafka-console-consumer --topic ExampleTopic --bootstrap-server localhost:9092 --from-beginning
```
These examples illustrate how to use both the Kafka console producer/consumer to produce and consume messages to/from a Kafka topic using the command line.
