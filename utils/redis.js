const redis = require('redis');

class RedisClient {
      constructor() {
            this.client = redis.createClient();
            this.client.on('error', (error) => {
                  console.log(`Redis client not connected to the server: ${error.message}`);
            });
      }

      isAlive() {
            return this.client.connected;
      }

      async get(key) {
            return new Promise((resolve, reject) => {
                  this.client.get(key, (err, value) => {
                        if (err) {
                              reject(err);
                        } else {
                              resolve(value);
                        }
                  });
            });
      }

      async set(key, value, duration) {
            return new Promise((resolve, reject) => {
                  this.client.set(key, value, 'EX', duration, (err) => {
                        if (err) {
                              reject(err);
                        } else {
                              resolve(true);
                        }
                  });
            });
      }

      async del(key) {
            return new Promise((resolve, reject) => {
                  this.client.del(key, (err) => {
                        if (err) {
                              reject(err);
                        } else {
                              resolve(true);
                        }
                  });
            });
      }
}

const redisClient = new RedisClient();
module.exports = redisClient;
