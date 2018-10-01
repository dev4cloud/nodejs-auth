/**
 * config/local.js
 * exports an object with configuration params
 */

module.exports = {
  APP_PORT: "1337",
  DB_HOST: "127.0.0.1:27017/authSys",
  DB_USER: "authSys",
  DB_PASS: "secret",
  JWT_KEY: "thisIsMyJwtKeyUsedToEncodeTheTokens"
}