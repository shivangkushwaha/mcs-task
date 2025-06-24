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
    return res.status(201).json({ success : true ,message: 'Task created successfully', responseData : {task} });
  } catch (error) {
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
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
      let responseData = {
        currentpage : parseInt(page),
        totalpages : Math.ceil((await Task.countDocuments(filter)) / limit),
        limit : parseInt(limit),
        tasks
      }
    return res.status(200).json({ success : true ,message: 'Tasks fetched successfully', responseData });
  } catch (error) {
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, assignedTo } = req.body;

  try {
    const task = await Task.findById(id);
    if (!task || (task.createdBy.toString() !== req.userId && task.assignedTo.toString() !== req.userId)) {
      return res.status(403).json({ success : false ,message: 'Not authorized', responseData : {} });  
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    task.assignedTo = assignedTo || task.assignedTo;
    await task.save();
    return res.status(201).json({ success : true ,message: 'Task updated successfully', responseData : {task} });

  } catch (error) {
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.createdBy.toString() !== req.userId) {
      return res.status(403).json({ success : false ,message: 'Not authorized', responseData : {} });  
    }
    await task.remove();
    return res.status(200).json({ success : true ,message: "Task deleted successfully", responseData : {task} });

  } catch (error) {
    return res.status(500).json({ success : false ,message: 'Server error', responseData : {} });
  }
};
