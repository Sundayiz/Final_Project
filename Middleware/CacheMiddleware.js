const client = require("../config/redis");
exports.cache = (key) => async (req, res, next) => {
  const cachedData = await client.get(key);
  if (cachedData) return res.status(200).json(JSON.parser(cachedData));
  next();
};
exports.storeInCache = (key, data, ttl = 3600) =>
  client.setEx(key, ttl, JSON.stringify(data));
