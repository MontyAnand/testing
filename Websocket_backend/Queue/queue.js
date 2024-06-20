const EventEmitter = require('events');

class Queue extends EventEmitter {
    constructor(concurrency = 1) {
        super();
        this.concurrency = concurrency;
        this.running = 0;
        this.queue = [];
        this.processQueue();
    }

    add(task, { priority = 0, attempts = 3, backoff = 1000 } = {}) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject, attempts, backoff, priority });
            this.queue.sort((a, b) => b.priority - a.priority); // Sort by priority
            this.emit('added');
        });
    }

    async processQueue() {
        this.on('added', () => {
            if (this.running < this.concurrency && this.queue.length) {
                const { task, resolve, reject, attempts, backoff } = this.queue.shift();
                this.running++;
                this.runTask(task, attempts, backoff, resolve, reject);
            }
        });
    }

    async runTask(task, attempts, backoff, resolve, reject) {
        try {
            const result = await task();
            resolve(result);
        } catch (err) {
            if (attempts > 1) {
                setTimeout(() => {
                    this.runTask(task, attempts - 1, backoff, resolve, reject);
                }, backoff);
            } else {
                reject(err);
            }
        } finally {
            this.running--;
            this.emit('added');
        }
    }
}

// Example task function
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const sampleTask = async () => {
    await delay(1000); // Simulate a 1-second task
    return 'Task completed';
};

// Use the queue
const queue = new Queue(3); // Create a queue with concurrency of 3

const addTasks = async () => {
    for (let i = 0; i < 10; i++) {
        queue.add(async () => {
            const result = await sampleTask();
            console.log(`Task ${i} result: ${result}`);
            return result;
        }, { priority: i % 2 === 0 ? 1 : 0 }).then(result => {
            console.log(`Task ${i} completed with result: ${result}`);
        }).catch(err => {
            console.error(`Task ${i} failed with error: ${err}`);
        });
    }
};

addTasks();
