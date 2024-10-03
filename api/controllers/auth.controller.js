import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  // destructuring the req data
  const { username, email, password } = req.body;

  try {
    // Hash the password
    const hashPassword = await bcrypt.hash(password, 10);
    console.log(hashPassword);
    // After hashing create new user
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashPassword,
      },
    });

    console.log(newUser);
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create user" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { username: username },
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Check if the password is correct

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(401).json({ message: "Invalid Credentials" });
    }
    // Generate cookie token and send to the user
    // res.setHeader("Set-cookie", "test=" + "myValue").json("Login Success")

    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign(
      {
        id: user.id,
        isAdmin: true,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    const {password: userPassword, ...userInfo} = user;

    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: true
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }
};
export const logout = (req, res) => {
  // DB operations
  res.clearCookie("token").status(200).json({ message: "Logout Successful" })
};
