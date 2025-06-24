const express = require('express');
const { createTask, getTasks, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const validate = require('../middlewares/validate');
const { taskCreateValidation, taskUpdateValidation, taskIdParamValidation } = require('../validations/taskValidation');

router.post('/tasks', authMiddleware, validate(taskCreateValidation), createTask);
router.get('/tasks', authMiddleware, getTasks);
router.put('/tasks/:id', authMiddleware, validate(taskIdParamValidation), validate(taskUpdateValidation), updateTask);
router.delete('/tasks/:id', authMiddleware, validate(taskIdParamValidation), deleteTask);

module.exports = router;
