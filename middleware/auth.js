const { secretOrKey } = require("../config/keys");

module.exports = generateToken = (data) => {
  jwt.sign(
    data,
    secretOrKey,
    // Tell the key to expire in one hour
    { expiresIn: 3600 },
    (err, token) => {
      res.json({
        success: true,
        token: "Bearer " + token,
      });
    }
  );
};
