const express = require('express');
const path = require('path');
const redis = require('redis');
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_URL}`
})

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

app.get('/', (req, res) => {
    res.redirect('/welcome');
})

app.get('/welcome', (req, res) => {
    redisClient.connect();

    redisClient.on("error", function (err) {
        console.error(err);
        res.send("Can't connecting to redis");
    })

    redisClient.on("connect", function () {
        console.log('Connected to redis')
        res.status('200').sendFile(path.join(__dirname, '/index.html'));
        redisClient.quit()
    })
})

app.listen(PORT, HOST);
console.log(`docker is Running on http://${HOST}:${PORT}`);