const express = require("express");
const router = express.Router();
const {
  handleGetAllTasks,
  handleGetTasksById,
  handleCreateTasksById,
  handleUpdateTasksById,
  handleDeleteTasksById,
} = require("../controllers/tasks");

// Static routing
router.route("/").get(handleGetAllTasks).post(handleCreateTasksById);

// Dynamic Routing
router
  .route("/:id")
  .get(handleGetTasksById)
  .patch(handleUpdateTasksById)
  .delete(handleDeleteTasksById);

module.exports = router;
