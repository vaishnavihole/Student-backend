const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/Student');

const app = express();


app.use(express.json())

const PORT = 5000;

mongoose.connect('mongodb+srv://vaishu:vaishnavi@cluster0.84emy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
{ useNewUrlParser: true, useUnifiedTopology: true
},() => {
    console.log('Connected to database');
});

app.get('/',(req,res) =>{
    res.send('Hello Word!');
})

app.post('/add/student',(req,res) => {

     const student = {
        roll: req.body.roll,
         name: req.body.name,
         age: req.body.age,
       
     }

     const newStudent = new Student(student);
    newStudent.save((err,data) => {
       if(err) {
           console.log(err);
       } else {   
            res.send({
                status:'success',
            })

       }
    })
 })

 app.get('/get/students',async (req,res) => {
     const students = await Student.find();
     res.send({
         status: 'success',
         data:students
     })
 })

 app.post('/get/student',async (req,res) => {
    const student = await Student.findOne({roll: req.body.roll});
    res.send({
        status: 'success',
        data:student

    })
})

app.post('/update/student',async (req,res) => {
    const student = await Student.updateOne(
    {roll: req.body.roll},
    {$set: {name: req.body.name, age: req.body.age}});

    if(student)
    {
        res.send({
            status: 'success',
        })
    }
})

app.post('/delete/student',async (req,res) => {
    const student = await Student.deleteOne({roll: req.body.roll});
    res.send({
        status: 'success',
      

    })
})




app.listen(PORT , () => {
    console.log(`Server Running on port ${PORT}`);
});