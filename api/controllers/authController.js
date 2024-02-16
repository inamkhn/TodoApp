import ErrorHandler from "../utils/errorHandler.js";
import User from "../models/userModel.js";
// import { sendToken } from '../utils/sendToken.js';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    //|| !file
    return next(new ErrorHandler("Please enter all field", 400));
  let user = await User.findOne({ email });
  if (user) return next(new ErrorHandler("User Already Exist", 409));
  const hashedPassword = bcrypt.hashSync(password, 10);
  try {
    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(200).json("User is successfully created");
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password)
    //|| !file
    return next(new ErrorHandler("Please enter all field", 400));
  try {
    let user = await User.findOne({ email });
    if (!user)
      return next(new ErrorHandler("Incorrect Email and Password", 409));

    const comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword)
      return next(new ErrorHandler("Incorrect Email and Password", 409));
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = user._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    console.log(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json('User has been logged out!');
  } catch (error) {
    next(error);
  }
};
