const fs = require('fs');

//Users : 


//First Midlleware bodyChecker

exports.bodyChecker = (req, res, next) => {
    if(!req.body.userName || !req.body.Gmail){
        console.log('Body must be full');
    }else{
        next()
    }
}

//Get All Tasks
exports.getAllUsers = (req, res) => {
    fs.readFile(`${__dirname}/../users.json`, (err, data) => {
        if(err) return err
        res.end(data)
    })
}

//check the id
exports.idChecker = (req, res, next, val) => {
    console.log(`hello this is =========================> id=${val}`);
    console.log(`hello this is =========================> id=${req.params.id}`);
    next()
}

//Get Once Task
exports.getOneUser = (req, res) => {
    console.log("ID =======> ", req.params.id)
    fs.readFile(`${__dirname}/../users.json`, (err, data) => {
        if(err) {
            return err
        }else{
            const ID = req.params.id
            const dataUser = JSON.parse(data)
            const result = dataUser.find(item => item.id == ID)
            console.log(result);
            res.status(200).json({
                result
            })
        }
    })
}


//Delete Task
exports.deleteUser = (req, res) => {
    const id = +req.params.id;

    if(id) {
        console.log("Deleting: " + id);
        fs.readFile(`${__dirname}/../users.json`, (err, data) =>{
            if(err) return err
            const dataUser = JSON.parse(data)
            const result = dataUser.filter(item => item.id !== id)
            console.log(result);
            fs.writeFile(`${__dirname}/../users.json`, JSON.stringify(result), err => {
                if(err) console.log(err);
                res.status(200).json({result});
            })
        })
        
      } else {
        res.status(400).send("Please specify an Item Id");
      }
}


//Create Task
exports.createUser = (req, res) => {

    console.log(req.body);
    const userName = req.body.userName
    const Gmail = req.body.Gmail
    let newUser = {
        "id": Math.floor(Math.random() *100),
        "userName": userName,
        "Gmail":Gmail
    }

    fs.readFile(`${__dirname}/../users.json`, (err, data) => {
        if(err) return err
        const dataUsers = JSON.parse(data)
        const newResult = [...dataUsers, newUser]
        console.log("=========",newResult);

        fs.writeFile(`${__dirname}/../users.json`, JSON.stringify(newResult), err => {
            if(err) return err
            res.status(201).json({
                result : JSON.stringify(newResult)
            })
        })

    })
}


//Update Task
exports.updateUser = (req, res) => {
    const userName = req.body.userName
    const Gmail = req.body.Gmail

    fs.readFile(`${__dirname}/../users.json`, (err, data) => {
        if(err) return err
        const id = +req.params.id;
        const myData = JSON.parse(data);
        const result = myData.find(item => item.id === id);
        const dataUsers = myData.filter(item => item.id !== id);
        result.userName = userName
        result.Gmail = Gmail
        const newResult = [...dataUsers, result]

        fs.writeFile(`${__dirname}/../users.json`, JSON.stringify(newResult), err => {
            if(err) return err
            res.status(200).json({newResult});
        })
    })
}
