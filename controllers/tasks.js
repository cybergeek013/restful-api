const Task = require("../models/tasks");

// GET to fetch all the tasks
async function handleGetAllTasks(req, res) {
  try {
    const tasks = await Task.find();
    return res.json(tasks);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// GET to fetch tasks by id
async function handleGetTasksById(req, res) {
  try {
    const task = await Task.findById(req.params.id);
    // If no tasks found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    return res.json(task);
  } catch (error) {
    console.error("Error fetching task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// POST to create new tasks
async function handleCreateTasksById(req, res) {
  try {
    const { title, description, priority } = req.body;
    // If not title is provided by user
    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    // Create a new task and save it into MongoDB
    const newTask = new Task({
      title,
      description,
      priority,
    });
    await newTask.save();

    return res.status(201).json({ success: "Task is saved" });
  } catch (error) {
    console.error("Error creating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// PATCH to update the existing tasks by id
async function handleUpdateTasksById(req, res) {
  try {
    const updateFields = req.body;
    const task = await Task.findById(req.params.id);
    // If no tasks found
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    // find the task and update
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updateFields
    );

    return res.json(updatedTask);
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

// DELETE to delete a task by id
async function handleDeleteTasksById(req, res) {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    return res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

module.exports = {
  handleGetAllTasks,
  handleGetTasksById,
  handleCreateTasksById,
  handleUpdateTasksById,
  handleDeleteTasksById,
};
