import { string } from "zod"
import { RABBITMQ_USER,
    RABBITMQ_PASS,
    RABBITMQ_HOST,
    RABBITMQ_NOTIFICATION_QUEUE } from "../config"

 
import client, {Connection, Channel, ConsumeMessage} from "amqplib"
import CustomerController from "../controllers/customers.controller"
const controller = new CustomerController()



class RabbitMqConnection{

    connection !: Connection
    channel !: Channel
    private connected!: Boolean


    async connect(){
        if(this.connected && this.channel) return
        else this.connected = true

        try{
            console.log('TYING TO CONNECT TO RRABBITMQ ')
            this.connection  = await client.connect(
                `amqp://${RABBITMQ_USER}:${RABBITMQ_PASS}@${RABBITMQ_HOST}:5672`
            )
            console.log("CONNECTED TO RABBIT SERVER")
            this.channel = await this.connection.createChannel()
            
            console.log("CREATED CHANNEL")
            await this.startListeningToNewMessages();
        }catch(err){
            console.log(err, "Error connecting to rabbibmq")
        }
    }

    async sendMessage (queue: string, message: any){
        try{
            if(!this.channel){
                await this.connect()
            }
            this.channel.sendToQueue(queue, Buffer.from(JSON.stringify(message)))
        }catch(err){
            console.log("ERROR SENDING ", err)
        }
    }

    async startListeningToNewMessages() {
        await this.channel.assertQueue(RABBITMQ_NOTIFICATION_QUEUE as string, {
          durable: true,
        });
    
        this.channel.consume(
            RABBITMQ_NOTIFICATION_QUEUE as string,
          (msg) => {
            {
              if (!msg) {
                return console.error(`Invalid incoming message`);
              }
    
              controller.handleIncomingRabbitMessage(msg)
    
              this.channel.ack(msg);
            }
          },
          {
            noAck: false,
          }
        );
      }



}

export default new RabbitMqConnection()