const math = require('mathjs');
const moment = require('moment');

// Function to generate normally distributed random numbers using Box-Muller transform
function randomNormal(mean = 0, stddev = 1) {
    let u1 = 0, u2 = 0;
    // Convert [0,1) to (0,1)
    while (u1 === 0) u1 = Math.random();
    while (u2 === 0) u2 = Math.random();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    // Return the desired normal random value
    return z0 * stddev + mean;
}

// Function to generate OHLCV data
function generateOHLCV(initialPrice, initialVolume, mu, sigma, muV, sigmaV, timeSteps, intervals) {
    const opens = [];
    const highs = [];
    const lows = [];
    const closes = [];
    const volumes = [];
    
    let price = initialPrice;
    let volume = initialVolume;

    const deltaT = 1 / intervals;

    for (let t = 0; t < timeSteps; t++) {
        const prices = [];
        
        for (let i = 0; i < intervals; i++) {
            const epsilon = randomNormal();
            price = price * Math.exp((mu - 0.5 * sigma ** 2) * deltaT + sigma * Math.sqrt(deltaT) * epsilon);
            prices.push(price);
        }
        
        const epsilonV = randomNormal();
        volume = volume * Math.exp(muV + sigmaV * epsilonV);
        
        opens.push(prices[0]);
        highs.push(Math.max(...prices));
        lows.push(Math.min(...prices));
        closes.push(prices[prices.length - 1]);
        volumes.push(volume);
    }

    const ohlcvData = opens.map((open, index) => ({
        open: open,
        high: highs[index],
        low: lows[index],
        close: closes[index],
        volume: volumes[index]
    }));

    return ohlcvData;
}

// Parameters
const initialPrice = 100;
const initialVolume = 1000;
const mu = 0.0002;
const sigma = 0.01;
const muV = 0.0001;
const sigmaV = 0.01;
const timeSteps = 100;  // Number of time steps (e.g., days)
const intervals = 60;   // Number of intervals per time step (e.g., minutes in a day)

// Generate OHLCV data
const ohlcvData = generateOHLCV(initialPrice, initialVolume, mu, sigma, muV, sigmaV, timeSteps, intervals);

// Print the OHLCV data
console.log(ohlcvData);
