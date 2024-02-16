import express from 'express'
import { createTask,getTask,deleteTask,updateTask,getallTasks,getUserTask } from '../controllers/taskController.js'
import {isAuthenticated} from '../middleware/auth.js'
const router = express.Router()

router.route('/addtask').post(createTask)
router.route('/getask/:id').get(getTask)

router.route('/deletetask/:id').delete(deleteTask) //isAuthenticated
router.route('/updatetask/:id').put(isAuthenticated,updateTask)
router.get('/gettasks/:id',getUserTask);
router.route('/allTasks').get(getallTasks)

export default router


