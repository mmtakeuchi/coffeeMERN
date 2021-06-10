const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const User = require("../models/User");

// GET USER
module.exports.getUser = (req, res) => {
  res.json({
    id: req.user.id,
    name: req.user.name,
    email: req.user.email,
    isAdmin: req.user.isAdmin,
  });
};

// REGISTER
module.exports.register = async (req, res) => {
  const user = await User.findOne({ name: req.body.name });
  if (user) {
    errors.name = "User already exists";
    return res.status(400).json(errors);
  } else {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: req.body.isAdmin,
    });

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        newUser.password = hash;
        newUser
          .save()
          .then((user) => {
            const payload = {
              id: user.id,
              name: user.name,
              isAdmin: user.isAdmin,
            };

            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                  success: true,
                  token: "Bearer " + token,
                });
              }
            );
          })
          .catch((err) => console.log(err));
      });
    });
  }
};

// LOGIN
module.exports.login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ email: "This user does not exist" });
  }

  bcrypt.compare(password, user.password).then((isMatch) => {
    if (isMatch) {
      const payload = { id: user.id, name: user.name, isAdmin: user.isAdmin };

      jwt.sign(
        payload,
        keys.secretOrKey,
        // Tell the key to expire in one hour
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: "Bearer " + token,
          });
        }
      );
    } else {
      return res.status(400).json({ password: "Incorrect password" });
    }
  });
};
