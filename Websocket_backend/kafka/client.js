const {Kafka} = require('kafkajs');

module.exports.kafka = new Kafka({
    clientId: 'CMT1',
    brokers: ['192.168.1.6:9092']
});