module.exports = {
  env: process.env.NODE_ENV === "production" ? "production" : "development",
  port: process.env.PORT || 3000,
};
