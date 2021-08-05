const bcrypt = require("bcryptjs");
const db = require("../models");
const token = require("../token");

module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email: email } });
    let userToken;
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const passwordResult = bcrypt.compareSync(password, user.password);
    if (passwordResult) {
      userToken = token.createToken(user.id);
      res.send({ token: userToken });
    } else {
      res.status(404).json({ message: "Invalid password" });
      return;
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.register = async function (req, res) {
  const { name, email, dob, password } = req.body;

  try {
    const candidat = await db.User.findOne({ where: { email: email } });
    if (candidat) {
      return res.status(400).json({ message: "Email already exists" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password to short" });
    }
    const salt = bcrypt.genSaltSync(10);

    const user = await db.User.create({
      name: name,
      email: email,
      dob: dob,
      password: bcrypt.hashSync(password, salt),
    });

    res.status(201).json({ message: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const users = await db.User.findAll({ raw: true });
    console.log(req.headers);
    if (!users) {
      res.status(404).json({
        message: "No registered users",
      });
      return;
    }

    res.status(200).json({ message: user });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.delete = async function (req, res) {
  const { id } = req.body;

  try {
    const user = await db.User.findOne({ where: { id: id } });

    if (!user) {
      res.status(404).json({ message: `User whis id ${id} not found` });
      return;
    }

    await user.destroy({ where: { id: id } });
    res.status(200).json({ message: `User whis id ${id} was deleted` });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

module.exports.update = async function (req, res) {
  const { email, name } = req.body;

  try {
    const user = await db.User.findOne({ where: { email: email } });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await user.update(
      { name: name },
      {
        where: { email: email },
      }
    );
    res
      .status(200)
      .json({ message: `User ${user.id}: name updated. New name: ${name}` });
  } catch (err) {
    res.status(500).json({ message: `Something went wrong` });
  }
};
