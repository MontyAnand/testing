const {kafka} = require('./client');

async function init(){
    const consumer = kafka.consumer({ groupId: 'user'});
    await consumer.connect();
    await consumer.subscribe({topics:['rider-updated'], fromBeginning: true});
    await consumer.run({
        eachMessage: async ({topic,partition,message,heartbeat,pause})=>{
            console.log(`topic : ${topic} , Partion : ${partition} , Message : ${message}`);
        }
    })

    //await consumer.disconnect();
}

init();