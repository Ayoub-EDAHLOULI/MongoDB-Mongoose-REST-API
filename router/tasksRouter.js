const router = require('express').Router();
const {getAllTasks, getOneTask, deleteTask, createTask, updateTask} = require('../controller/tasksController');

router.route('/').get(getAllTasks).post(createTask);

router.route('/:id').get(getOneTask).delete(deleteTask).put(updateTask);

module.exports = router





