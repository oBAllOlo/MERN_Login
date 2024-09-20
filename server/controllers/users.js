const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.listUsers = async (req, res) => {
  try {
    // Fetch users and exclude only the password, include role
    const users = await User.find({}).select("-password").exec();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

exports.readUsers = async (req, res) => {
  try {
    // Fetch specific user by ID and exclude the password
    const id = req.params.id;
    const user = await User.findOne({ _id: id }).select("-password").exec();
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

exports.updateUsers = async (req, res) => {
  try {
    // Code for updating users
    var { id, password } = req.body.values;

    //1. generate salt
    const salt = await bcrypt.genSalt(10);
    //2. encrypt password
    var enPassword = await bcrypt.hash(password, salt);

    const user = await User.findByIdAndUpdate(
      { _id: id },
      {
        password: enPassword,
      }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

exports.removeUsers = async (req, res) => {
  try {
    // Delete user by ID
    const id = req.params.id;
    const user = await User.findByIdAndDelete({ _id: id });
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

exports.changeStatus = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        enabled: req.body.enabled,
      }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};

exports.changeRole = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findByIdAndUpdate(
      { _id: req.body.id },
      {
        role: req.body.role,
      }
    );
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server Error!");
  }
};
