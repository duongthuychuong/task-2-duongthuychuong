require('dotenv').config({
    path: `${__dirname}/.env`
})
const mongoose = require('mongoose')
const express = require('express')
const app = express()

app.use(express.json())

// set the view engine to ejs
app.set('view engine', 'ejs');

const db = require('./db')
const User = require('./models/user')
const PORT = process.env.PORT || 3005


// async function createMockUser(){
//     const user1 = await User.create({ 
//         username: 'john.doe', 
//         email: "john.doe@gmail.com",
//         birthdate: "2000-05-01"
//     });
//     console.log(user1);
// }
// createMockUser()
app.use(express.static("./view"))
app.get('/api/user', async (req, res) => {
    const {name} = req.query
    try {
        const user = await User.find({
            $or: [
                { username: { $regex: name, $options: "i" } },
                { email: { $regex: name, $options: "i" } },
              ],
            
        })
        res.status(200).json({
            data: user,
            errorMsg: null
        })
    } catch (error) {
        res.json({
            data: null,
            errorMsg: error.message
        })
    }
})
app.post('/api/user', async (req, res) => {
    const arrayUser = req.body
    // get size of array users
    const inputSize = arrayUser.length
    console.log("inputSize: " + inputSize);
    // get array of id users
    const listOfId = arrayUser.map((user) => mongoose.Types.ObjectId(user._id))
    // find number of user with those ids
    const countUser = await User.count(
        { _id: { $in: listOfId} }
    )
    if(inputSize !== countUser) {
        return res.status(404).json({
            data: null,
            errorMsg: "Some users are not exist in database."
        })
    }
    //update each user in array
    for (let key in arrayUser) {
        try {
            const u = await User.findByIdAndUpdate(mongoose.Types.ObjectId(arrayUser[key]._id), arrayUser[key])
            console.log("user updated", u);
        } catch (error) {
            return res.status(400).json({
                data: null, 
                errorMsg: error.message
            })
        }
        
    }
    return res.status(200).json({
        data: "All the users have been updated", 
        errorMsg: null
    })
})
app.get('/', (req, res) => {
    res.render('index');
})
app.listen(PORT, () => {
    console.log("Listening on port: " + PORT);
})