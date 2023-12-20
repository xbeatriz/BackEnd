const { User } = require('../models/models.js'); // Import your User model
const utilities = require('../utilities/utilities.js');
const bcrypt = require("bcrypt");

//user login
exports.login = (req, res) => {
  User.find({ email: req.body.email }).then((user) => {
    if (user.length > 0) {
      bcrypt
        .compare(req.body.password, user[0].password)
        .then(function (result) {
          if (result) {
            utilities.generateToken({ user: req.body.email }, (token) => {
              res.status(200).json(token);
            });
          } else {
            res.status(401).send("Not Authorized");
          }
        });
    } else {
      res.status(401).send("Not Authorized");
    }
  }).catch((err) => {
    res.status(401).send("Not Authorized");
  });
};

//user register
exports.register = (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const userToCreate = new User({
        email: req.body.email,
        password: hash,
      });

      User.find({ email: req.body.email }).then((user) => {
        if (user.length > 0) {
          res.status(406).send("Duplicated User");
        } else {
          userToCreate.save().then(() => {
            res.status(200).send("Registered User");
          }).catch((err)=> {
            res.status(400).send(err);
          })
        }
      }).catch((err) => {
        res.status(400).send(err);
      })
    })
  })
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

// Get a specific user by ID
exports.getUserById = async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
},

// Create a new user
exports.createUser = async (req, res) => {
  const { name, email, age } = req.body;
  const user = new User({ name, email, age });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

// Update a user by ID
exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
},

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;

  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}