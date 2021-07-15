const express = require('express');
const mongoose = require('mongoose');
const app = express();

const FoodModel = require('./models/Food');

app.use(express.json());

mongoose.connect(
  'mongodb+srv://diosakhilleus:mern@cluster0.zgiaf.mongodb.net/food?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.get('/', async (req, res) => {
  const food = new FoodModel({
    foodName: 'Cheebs',
    daysSinceEaten: 6,
  });
  try {
    await food.save();
  } catch (err) {
    console.error(err);
  }
  res.end('entry added');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
