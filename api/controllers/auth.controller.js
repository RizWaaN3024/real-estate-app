import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";

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
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to login" });
  }

  // Generate cookie token and send to the user
};

export const logout = (req, res) => {
  // DB operations
};
