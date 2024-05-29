const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();


const port = 5000;
const app = express();
app.use(bodyParser.json());


app.use(cors());

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });



  const userSchema = new mongoose.Schema({
    name: String,
    age: Number
  });
  const User = mongoose.model('User', userSchema);


  app.post('/adduser', async (req, res) => {
    const { name, age } = req.body;
    try {
      
      const newUser = new User({
        name,
        age
      });
      await newUser.save();
      res.status(201).json({ message: 'User added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });


  app.get('/users', async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error('Error retrieving users from database:', error);
      res.status(500).send('Error retrieving users from database');
    }
  });


  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });