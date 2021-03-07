import { Kafka } from 'kafkajs'

const broker = 'localhost:9092'

export default class ConsumerKafka {
  constructor() {
    const kakfa = new Kafka({
      clientId: 'drone-monitor',
      brokers: [broker]
    })

    this.consumer = kakfa.consumer({ groupId: 'drone-monitor' })
    this.messages = []
  }

  getMessage() {
    let retorno = [].concat(this.messages)
    this.messages = []
    console.log('retorno => ', retorno)
    return retorno
  }

  async Run() {
    await this.consumer.connect()
    await this.consumer.subscribe({
      topic: 'mapeamento-drone',
      fromBeginning: true
    })

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        this.messages.push(message.value.toString())
      }
    })
  }
}


