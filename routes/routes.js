const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../model/userSchema");
const authenticate = require("../middleware/authenticate");
const Contact = require("../model/contactSchema");
const Request = require("../model/requestSchema");

router.get("/", (req, res) => {
  res.send("hello world");
});

router.post("/register", async (req, res) => {
  try {
    const { username, fullname, email, phone, password, cpassword, image } =
      req.body;
    if (
      !username ||
      !fullname ||
      !email ||
      !phone ||
      !password ||
      !cpassword ||
      !image
    ) {
      return res.status(422).json({ error: "Please fill the Data" });
    }
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(404).json({ message: "Email is already registered" });
    }
    const user = new User({
      username,
      fullname,
      email,
      phone,
      password,
      cpassword,
      image,
    });
    const userData = await user.save();
    if (userData) {
      return res.json(userData);
    } else {
      return res.status(404).json({ error: "Failed to register" });
    }
  } catch (error) {
    console.log(error.message);
  }
});
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const userLogin = await User.findOne({ email: email });
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      const token = await userLogin.generateAuthToken();
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000000),
        httpOnly: true,
        secure: false,
      });
      if (!isMatch) {
        res.status(400).json({ error: "Invalid credientials" });
      } else {
        res.json(userLogin);
      }
    } else {
      res.status(400).json({ error: "Invalid credientials" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getdata", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/getUser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//contact routes
router.post("/contact", async (req, res) => {
  try {
    const { name, email, phone, address, district, message } = req.body;
    if (!name || !email || !phone || !address || !district || !message) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const contact = new Contact({
      name,
      email,
      phone,
      address,
      district,
      message,
    });
    await contact.save();
    res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
//request route

router.post("/request", async (req, res) => {
  try {
    const { bookname, author, publication, edition } = req.body;
    if (!bookname || !author || !publication || !edition) {
      return res.status(400).json({ error: "Please fill the data" });
    }
    const request = new Request({
      bookname,
      author,
      publication,
      edition,
    });
    await request.save();
    res.status(200).json(request);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", {
    path: "/",
  });
  res.status(201).send("User Logout");
});
module.exports = router;
