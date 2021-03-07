import ConsumerKafka from './ConsumerKafka.js'

let consumerKafka = new ConsumerKafka()
consumerKafka.Run()

function retornaMensagens() {
  return consumerKafka.getMessage()
}

export default (req, res) => {
  res.status(200).json(retornaMensagens())
}
