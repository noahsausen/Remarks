const User  = require('../models/userModel');

exports.registerUser = async (req, res) => {
  console.log("registerUser started");
  try {
    const user = await User.findOne({username: req.body.username});
    if (user) {
      return res.status(409).send({message: 'An account with this username already exists'});
    }
    console.log("User check completed");
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    await newUser.save();

    res.status(201).send({message: 'Account created successfully'});
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: 'Internal Server Error'});
  }
}

exports.loginUser = async (req, res) => {
  console.log("loginUser started");
  try {
    // Check for user
    const user = await User.findOne({username: req.body.username});
    if (!user) {
      return res.status(404).send({message: 'Account does not exist'});
    } else {
      // If exists, check auth
      if (user.password === req.body.password) {
        console.log(user);
        return res.status(200).send({message: 'Login successful', user});
      } else {
        return res.status(401).send({message: 'Wrong password'});
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({message: 'Internal Server Error'});
  }
}