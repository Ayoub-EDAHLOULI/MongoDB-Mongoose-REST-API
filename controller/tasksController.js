const fs = require('fs');

//Tasks :

//Get All Tasks
exports.getAllTasks = (req, res) => {
    fs.readFile(`${__dirname}/../task.json`, (err, data) => {
        if(err) return err
        res.end(data)
    })
}

//Get Once Task
exports.getOneTask = (req, res) => {
    console.log("ID =======> ", req.params.id)
    fs.readFile(`${__dirname}/../task.json`, (err, data) => {
        if(err) {
            return err
        }else{
            const ID = req.params.id
            const dataTasks = JSON.parse(data)
            const result = dataTasks.find(item => item.id == ID)
            console.log(result);
            res.status(200).json({
                result
            })
        }
    })
}


//Delete Task
exports.deleteTask = (req, res) => {
    const id = +req.params.id;

    if(id) {
        console.log("Deleting: " + id);
        fs.readFile(`${__dirname}/../task.json`, (err, data) =>{
            if(err) return err
            const dataTasks = JSON.parse(data)
            const result = dataTasks.filter(item => item.id !== id)
            console.log(result);
            fs.writeFile(`${__dirname}/../task.json`, JSON.stringify(result), err => {
                if(err) console.log(err);
                res.status(200).json({result});
            })
        })
        
      } else {
        res.status(400).send("Please specify an Item Id");
      }
}


//Create Task
exports.createTask = (req, res) => {

    console.log(req.body);
    const task = req.body.task
    let newTask = {
        "id": Math.floor(Math.random() *10000),
        "task": task
    }

    fs.readFile(`${__dirname}/../task.json`, (err, data) => {
        if(err) return err
        const dataTasks = JSON.parse(data)
        const newResult = [...dataTasks, newTask]
        console.log("=========",newResult);

        fs.writeFile(`${__dirname}/../task.json`, JSON.stringify(newResult), err => {
            if(err) return err
            res.status(201).json({
                result : JSON.stringify(newResult)
            })
        })

    })
}


//Update Task
exports.updateTask = (req, res) => {
    const task = req.body.task;

    fs.readFile(`${__dirname}/../task.json`, (err, data) => {
        if(err) return err
        const id = +req.params.id;
        const myData = JSON.parse(data);
        const result = myData.find(item => item.id === id);
        const dataTasks = myData.filter(item => item.id !== id)
        result.task = task
        const newResult = [...dataTasks, result]

        fs.writeFile(`${__dirname}/../task.json`, JSON.stringify(newResult), err => {
            if(err) return err
            res.status(200).json({newResult});
        })
    })
}




//module.exports = { getAllTasks, getOneTask, deleteTask, createTask, updateTask}
//module.exports = { getAllUsers, getOneUser, deleteUser, createUser, updateUser}
