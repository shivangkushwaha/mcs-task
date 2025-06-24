const Task = require('../models/task');
const User = require('../models/user');

// Create task
exports.createTask = async (req, res) => {
  const { title, description, status, assignedTo } = req.body;
  try {
    const task = new Task({
      title, description, status, createdBy: req.userId, assignedTo
    });
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tasks with pagination and filtering
exports.getTasks = async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const filter = { $or: [{ createdBy: req.userId }, { assignedTo: req.userId }] };
  if (status) filter.status = status;

  try {
    const tasks = await Task.find(filter)
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task || (task.createdBy.toString() !== req.userId && task.assignedTo.toString() !== req.userId)) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;
    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await task.remove();
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
