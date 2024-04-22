let express = require("express");
let router = express.Router();
let User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/signup", async (req, res) => {
  try {
    let existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res.send("User already exists");
    } else {
      let newPassword = await bcrypt.hash(req.body.password, 10);

      let userData = new User({
        name: req.body.name,
        email: req.body.email,
        password: newPassword,
      });

      await userData.save();
      return res
        .status(201)
        .json({ message: "Successfully Registered, Please login now." });
    }
  } catch (error) {
    console.error("Error signing up:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
