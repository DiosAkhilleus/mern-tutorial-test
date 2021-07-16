const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const FoodModel = require('./models/Food');

app.use(express.json());
app.use(cors());
mongoose.connect(
  'mongodb+srv://diosakhilleus:mern@cluster0.zgiaf.mongodb.net/food?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.post('/insert', async (req, res) => {
  const foodName = req.body.foodName;
  const daysSinceEaten = req.body.daysSinceEaten;
  const food = new FoodModel({
    foodName: foodName,
    daysSinceEaten: daysSinceEaten,
  });
  try {
    await food.save();
  } catch (err) {
    console.error(err);
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('posted');
});

app.get('/read', async (req, res) => {
  FoodModel.find({}, (err, result) => {
    if (err) {
      res.send(err);
    } 
    res.send(result);
  });
});

app.put('/update', async (req, res) => {
  const newFoodName = req.body.newFoodName;
  const id = req.body.id;
  try {
    await FoodModel.findById(id, (err, updatedFood) => {
      updatedFood.foodName = newFoodName;
      updatedFood.save();
      res.send('update');
    });
  } catch (err) {
    console.error(err);
  }
});

app.delete('/remove/:id', async (req, res) => {
  const id = req.params.id;
  await FoodModel.findByIdAndDelete(id).exec();
  console.log(`deleting entry ${id}`);
  res.send('del');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
