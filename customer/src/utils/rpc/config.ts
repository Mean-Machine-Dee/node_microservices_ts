import { Kafka, KafkaConfig } from "kafkajs";
const kafkaConfig: KafkaConfig = { brokers: ["localhost:9092'"] };
export const kafka = new Kafka(kafkaConfig);
