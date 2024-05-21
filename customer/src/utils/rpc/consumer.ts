import { Consumer, EachMessagePayload, Kafka, KafkaConfig } from "kafkajs";
const kafkaConfig: KafkaConfig = { brokers: ["localhost:9092"] };
export const kafka = new Kafka(kafkaConfig);
const admin = kafka.admin();

export const consumer = async () => {
  const consumer = kafka.consumer({ groupId: "test-group" });

  await consumer.connect();
  await consumer.subscribe({ topic: "topic-event", fromBeginning: true });
  await consumer.run({
    eachMessage: async ({ topic, partition, message }: EachMessagePayload) => {
      console.log("received message");
      console.log({
        value: message.value?.toString(),
      });
    },
  });
};

export const producer = async () => {
  const producer = kafka.producer();
  await producer.connect();
  console.log(await admin.listTopics());
  await producer.send({
    topic: "topic-event",
    messages: [{ value: "Hello KafkaJS user!" }],
  });
};

producer();
consumer();
