import { User } from "../models/index.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    if (!users) {
      return res.status(404).json({ message: "No users found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: `User ${userId} not found` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { firstName, lastName, phone, shippingAddress } = req.body;
    const userId = req.params.userId;
    if (!req.user.isAdmin && req.user.userId !== userId) {
      return res
        .status(401)
        .json({ message: "Not authorized to update this profile" });
    }
    const result = await User.findByIdAndUpdate(
      userId,
      {
        firstName,
        lastName,
        phone,
        shippingAddress,
      },
      { new: true },
    );
    if (!result) {
      return res
        .status(400)
        .json({ message: `Unable to updte user ${userId}` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const result = await User.findByIdAndDelete(userId);
    if (!result) {
      return res.status(404).json({ message: `User ${userId} not found` });
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
