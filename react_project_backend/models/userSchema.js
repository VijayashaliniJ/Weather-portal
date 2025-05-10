// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;

// const userSchema = new Schema({
//   username: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model('User', userSchema);


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const searchHistorySchema = new Schema({
  city: { type: String, required: true },
  searchedAt: { type: Date, default: Date.now },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  searchHistory: [searchHistorySchema], // New field for storing search history
});

module.exports = mongoose.model('User', userSchema);