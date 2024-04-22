let express = require("express");
let router = express.Router();
let User = require("../models/user");
let bcrypt = require("bcrypt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      return res.status(200).json({ message: "Login Successful", user });
    } else {
      return res.status(401).json({ message: "Password didn't match" });
    }
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
module.exports = router;
