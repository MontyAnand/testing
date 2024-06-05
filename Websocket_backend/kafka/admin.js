const {Kafka} = require('kafkajs');

const kafka = new Kafka({
    clientId: 'CMT1',
    brokers: ['192.168.1.6:9092']
});

async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting....");
    await admin.connect();
    console.log('admin connected');
    console.log('Topic creating...');
    await admin.createTopics({
        topics:[
            {
                topic: 'rider-updated',
                numPartitions:2,
            }
        ]
    })
    console.log('topics ceated...');
    console.log('disconecting...')
    await admin.disconnect();
    console.log('disconnected');
}

init();