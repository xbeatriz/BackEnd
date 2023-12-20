const mongoose = require('mongoose');

// Define a schema for games
const gameSchema = new mongoose.Schema({
  name: { 
    require:true,
    type: String,
  },
  thumbnail: {
    require: true,
    type: String,
  },
  genre: {
    require: true,
    type: String,
  },
  platform: {
    require: true,
    type: String,
  },
}, {collection: "Games"});

const Game = mongoose.model('Games', gameSchema);

// Define a schema for users
const userSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    validate: {
      validator: (value) => {
      const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return value.match(re);},        
      message: "Please enter a valid email address.",
      },
  },
  password: {
    type: String,
    require: true,
    validate: {
      validator: (value) => {
        return value.length > 7;
      },        
      message: "Please enter a longer password. At least 8 char.",
      },
  },
  age: {
  require: true,
  type: Number,
  },
  usertype: {
    type: String,
    default: 'user',
  },
  // Add other fields as needed
}, {collection: "Users"});

const User = mongoose.model('Users', userSchema);

// Define a schema for events
const eventSchema = new mongoose.Schema({
  name: {
    require: true,
    type: String,
  },
  date: {
    require: true,
    type: Date
  },
  hour:{ 
    require: true,
    type: String,
  },
  local: {
    require: true,
    type: String,
    description: String,
  },
  ageLimit: {
    require: true,
    type: Number,
    min: 10,
    default: 10
  },
}, {collection: "Event"});

const Event = mongoose.model('Event',  eventSchema);

module.exports = {
  Game,
  User,
  Event,
};
