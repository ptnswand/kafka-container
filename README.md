# Commands
**Prerequisites**
- Docker Desktop

Get Started
```bash
docker compose up
```

## Topics

To create a new topic

```bash
docker exec -it kafka /opt/bitnami/kafka/bin/kafka-topics.sh --create --topic <TOPIC_NAME> --bootstrap-server localhost:9092
```