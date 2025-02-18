const Redis = require('ioredis');
const express = require("express");

const app = express();

app.use(express.json())
// Create a Redis client
const redis = new Redis(); // connects to localhost:6379 by default

// Check if connected successfully
redis.on('connect', () => {
  console.log('Connected to Redis!');
});

redis.on('error', (err) => {
  console.error('Redis error: ', err);
});

redis.on('close', () => {
    console.log('Redis connection closed');
  });
  
  redis.on('error', (err) => {
    console.log('Redis error: ', err);
  });
  

  app.get("/user/:id", async (req, res) => {
    const id = req.params.id;

    const user = await redis.get(id)
    console.log(user)
    return res.status(200).json(JSON.parse(user))
  })

  app.post("/user", (req, res) => {
    const { id, name, age } = req.body;
    const user = JSON.stringify({"name": name, "age":age})
    redis.set(id, user)
    return res.status(200).json({message:"user set successfully"})
  })

  app.listen(3000, () => {
    console.log("server start")
  })