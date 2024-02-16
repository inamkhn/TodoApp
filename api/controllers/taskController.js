// import ErrorHandler from "../utils/errorHandler.js";
import Task from "../models/taskModel.js";
import User from "../models/userModel.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createTask = async (req, res, next) => {
  try {
    const addtask = await Task.create(req.body);
    const result = await addtask.save();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getTask = async (req, res, next) => {
  const id = req.params.id
  try {
    const task = await Task.findById(id);
    if (!task) {
      return next(errorHandler(404, 'task not found!'));
    }
    res.status(200).json(task);
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const updatedList = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(`task has been Updated! ${updatedList}`);
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json("task has been deleted!");
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const getallTasks = async (req, res, next) => {
  const tasks = await Task.find({})
  res.status(200).json(tasks);
}

export const getUserTask = async (req, res, next) => {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Task.find({ userRef: req.params.id });
      res.status(200).json(listings);
    } catch (error) {
      next(error);
    }
  } else {
    return next(errorHandler(401, "You can only view your own listings!"));
  }
};