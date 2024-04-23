const app = require('./script');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config({path:"./config.env"})
const PORT = process.env.PORT || 3000;
const hostman = process.env.HOST || '127.0.0.1';


const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.DATABASE_PASSWORD)
//Connected to the Database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('Connected!'))
  .catch((err)=> console.log(err, 'the database is not connected'));


//Create your schema
const taskSchema = new mongoose.Schema({
    task:{
        type:String,
        required:[true,'please provide the task'],
        unique:true
    },
    completed:{
        type:Boolean,
        default:false
    }

})

//Create the model Task
const Task = mongoose.model('Task',taskSchema)

const newTask = new Task({
    task: 'Simple',
    completed: true
})

newTask.save().then(()=>{
    console.log('the task is saved')
}).catch((err)=>{
    console.log(err)
})


app.listen(PORT, hostman, () => {
    console.log(`App is listning on port => http://${hostman}:${PORT}`);
});