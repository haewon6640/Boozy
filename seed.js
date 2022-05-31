const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI
const Ingredient = require('./models/Ingredient')
const User = require('./models/User')

//connection to the database 
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB successfully"))
    .catch(err=> console.log(err));

// string of ingredient names
// use dashes to prevent multi-word names from messing up the category
const ingredientArr = [
  'rum Alcohol','vodka Alcohol','gin Alcohol',
  'tequila Alcohol','rum Alcohol','whiskey Alcohol',
  'brandy Alcohol','amaretto Alcohol','coffee-liquer Alcohol',
  'vermouth Alcohol','irish-cream-liqueur Alcohol',
  'orange-liqueur Alcohol','lemon-juice Mixer','lime-juice Mixer',
  'cranberry-juice Mixer', 'grapefruit-juice Mixer', 'pineapple-juice Mixer',
  'tomato-juice Mixer','bitters Alcohol', 'simple-syrup Produce',
  'sour-mix Mixer', 'grenadine Alcohol','cream Mixer',
  'club-soda Mixer', 'tonic-water Alochol', 'ginger-ale Alcohol',
  'cola Mixer','lemon Produce','lime Produce',
  'maraschino-cherries Produce', 'oranges Produce','olive Produce',
  'salt Garnish', 'sugar Garnish','mint Garnish',
]

// convert the string of ingredient names into an array of ingredient objects called ingredientSeed
let ingredientSeeds = [];
// loop thru the ingredientArr and make objects with the key name out of each of the strings
for (let i = 0; i < ingredientArr.length; i++) {
  let name = ingredientArr[i].split(' ')[0].replace(/-/g,' ') //replaces all the dashes in the first intended word with spaces
  let category = ingredientArr[i].split(' ')[1]
  ingredientSeeds[i] = {name: name, category: category}
}

//create the DemoUser
// its shelf will have 5 random ingredients
function getRandomSubarray(arr, size) {
  let shuffled = arr.slice(0), i = arr.length, temp, index;
  while (i--) {
      index = Math.floor((i + 1) * Math.random());
      temp = shuffled[index];
      shuffled[index] = shuffled[i];
      shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
}

let userSeeds = []

let shelf = [...ingredientSeeds]
shelf = getRandomSubarray(ingredientSeeds,5)

userSeeds.push({
  handle: 'DemoUser',
  email: 'DemoUser@gmail.com',
  password: '123456',
  shelf: getRandomSubarray(ingredientSeeds,5)
})
// create 10 users with faker data
for (let i = 0; i < 10; i++) {
  userSeeds.push({
    handle: faker.name.findName(),
    email: faker.internet.email(),
    password: '123456',
    shelf: shelf
  })
}
// delete all the ingredients, users, and recipes in the current database then add all the ingredient objects

const seedDB = async () => {
  await Ingredient.deleteMany({}); //if you want to delete all ingredients
  await User.deleteMany({});
  await User.insertMany(userSeeds)
  await Ingredient.insertMany(ingredientSeeds)
};


seedDB().then(() => {
  mongoose.connection.close();
});