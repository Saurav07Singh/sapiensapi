import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
const resgisterUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res.status(201).json({ message: "Error!!!" });

  const checkExistingUser = User.findOne({ username: username });
  
  if (!checkExistingUser) return res.status(409).send("Member already exists!");

  try {
    const newUser = await User.create({
      username,
      password,
    });

    res.json(newUser._id);
  } catch (error) {
    res.send(error.message);
    
  }
};

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password)
      return res
        .status(400)
        .json({ message: "Please provide Username and Password!" });

    const user = await User.findOne({
      username: username,
    });

    if (!user) {
      throw new Error(404, "User does not exist");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
      //throw new Error(404, "Invalid user credentials")
      return res.status(401).json({ message: "Invalid user credentials" });
    }

    const token = jwt.sign({ username }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
    });

    res.status(200).json({ message: "Success" });
  } catch (error) {
    res.send(error.message);
  }
};

const logoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.json({ message: "success" });
  } catch (err) {
    console.log(err.message);
  }
};

const pickColor = async (req, res) => {
  const { selectedColor } = req.body;
 // console.log("Request!", req.cookies);
  const token = req.cookies.token;
 // console.log("SelectedCOlor", selectedColor);
//  console.log("TOken", req.cookies);
  if (!selectedColor)
    return res.status(201).json({ message: "Color required!" });
  if (!token) {
    //console.log(res)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded);
    if (!decoded)
      return res.status(401).json({ message: "Access denied. Invalid Token." });
    const { username } = decoded;
    const updatedColor = await User.updateOne(
      { username: username },
      { $set: { color: selectedColor } }
    );
    res.json({ message: "COlor updated successfully!" });
  } catch (error) {
    console.log(error.message);
  }
};

const getColor = async (req, res) => {
  //const {color} = req.body;
  //console.log("COOKIES",req.cookies)
  const token = req.cookies.token;
  //console.log("Token from frontend",token)
  //if(!color) return res.status(201).json({"message":"Color required!"});
  if (!token) {
    //console.log(res)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(decoded)
    if (!decoded)
      return res.status(401).json({ message: "Access denied. Invalid Token." });
    const { username } = decoded;

    const selectedColor = await User.findOne(
      { username: username },
      { color: 1, _id: 0 }
    );
    return res.send(selectedColor);
  } catch (error) {
    console.log(error.message);
  }
};

export { resgisterUser, loginUser, pickColor, getColor, logoutUser };
