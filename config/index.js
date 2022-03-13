const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  rootPath: path.resolve(__dirname, '..'),
  serviceName: process.env.SERVICE_NAME,
  jwtKey: process.env.SECRET,
  urlDb: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.ccbyg.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
};
