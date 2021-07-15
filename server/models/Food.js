const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  daysSinceEaten: {
    type: Number,
    required: true,
  },
});

const Food = mongoose.model('foodinfo', FoodSchema);

module.exports = Food; 