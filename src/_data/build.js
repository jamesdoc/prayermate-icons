module.exports = {
  env: process.env.ELEVENTY_ENV,
  date: new Date(),
  timestamp: Math.floor(new Date() / 1000),
};
