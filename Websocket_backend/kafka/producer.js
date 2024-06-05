const {kafka}  = require('./client');

async function init(){
    const producer = kafka.producer();
    console.log('connecting producer');
    await producer.connect();
    console.log('connected successfully...');
    await producer.send({
        topic:'rider-updated',
        messages :[
            {
                partition:0,
                key: "location-update",
                value:JSON.stringify({name:'vivek', loc : 'south'})
            },
        ]
    });

    await producer.disconnect();
}

init();