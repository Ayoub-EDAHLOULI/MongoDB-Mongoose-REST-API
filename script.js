const express = require('express');
const app = express();
const taskRouter = require('./router/tasksRouter')
const userRouter = require('./router/usersRouter')
app.use(express.json())


//Tasks Router
app.use('/api/v1/tasks', taskRouter);
app.use('/api/v1/tasks/:id', taskRouter);

//Users Router
app.use('/api/v1/users', userRouter);
app.use('/api/v1/users/:id', userRouter);



module.exports = app;