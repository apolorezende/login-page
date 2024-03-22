const User = require('../models/User');

async function getUserByUsername(username) {
  return await User.findOne({ username });
}

module.exports = {
  getUserByUsername
};