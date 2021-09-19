const Redis = require("ioredis");

const { redis: config } = require("../config");

let redis;

module.exports = {
  start() {
    redis = new Redis(config.port, config.host);
    console.log("redis connected");
    return redis;
  },
  hasStart() {
    if (!redis) {
      this.start();
    }
    return true;
  },
  get(...args) {
    return this.hasStart() && redis.get(...args);
  },
  set(...args) {
    return this.hasStart() && redis.set(...args);
  },
};
