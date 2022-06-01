const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI
const Ingredient = require('./models/Ingredient')
const User = require('./models/User')
const Recipe = require('./models/Recipe')


//connection to the database 
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB successfully"))
    .catch(err=> console.log(err));

// string of ingredient names
// use dashes to prevent multi-word names from messing up the category
let ingredientArr = [
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
  'orange Produce', 'campari-bitters Alcohol','pickle-juice Mixer',
  'horse-radish Produce','worcestershire-sauce Produce', 'pepper Garnish',
  'triple-sec Alcohol','bourbon Alcohol','ice Garnish',
  'orange-bitters Alcohol', 'allspice-berries Produce', 'black-peppercorns Produce',
  'ginger-beer Mixer'
  

]


// convert the string of ingredient names into an array of ingredient objects called ingredientSeed
let ingredientSeeds = [];
// loop thru the ingredientArr and make objects with the key name out of each of the strings
for (let i = 0; i < ingredientArr.length; i++) {
  let name = ingredientArr[i].split(' ')[0].replace(/-/g,' ') //replaces all the dashes in the first intended word with spaces
  let category = ingredientArr[i].split(' ')[1]
  // ingredientSeeds[i] = {name: name, category: category}
  ingredientSeeds[i] = {name: name}
}

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

// delete all the ingredients, users, and recipes in the current database then add all the ingredient objects

const seedDB = async () => {
  await Ingredient.deleteMany({}); //if you want to delete all ingredients
  
  
  await Ingredient.insertMany(ingredientSeeds) //insert ingredient seeds created from the string list above
  
  ingredientSeeds = await Ingredient.find() //takes the ingredient seed objects from the database to use in the creation of users and recipes

  //create the DemoUser
  // its shelf will have 5 random ingredients
  let userSeeds = []
  let shelf = [...ingredientSeeds]
  shelf = getRandomSubarray(ingredientSeeds,5)
  userSeeds.push({
    handle: 'DemoUser',
    email: 'DemoUser@gmail.com',
    password: '123456',
    shelf: shelf
  })
  // create 10 users with faker data
  for (let i = 0; i < 10; i++) {
    shelf = getRandomSubarray(ingredientSeeds,5)
    userSeeds.push({handle: faker.name.findName(),
      email: faker.internet.email(),
      password: '123456',
      shelf: shelf})
  }
  // create recipe seeds
 let recipeSeeds = [
  {
    name: 'Negroni',
    ingredients: [
      await Ingredient.findOne({ name: 'gin' }).exec(),
      await Ingredient.findOne({ name: 'vermouth' }).exec(),
      await Ingredient.findOne({ name: 'orange' }).exec(),
      await Ingredient.findOne({ name: 'campari' }).exec()
    ]
  },
  {
    name: 'Old-fashioned',
    ingredients: [
      await Ingredient.findOne({name: 'bitters'}),
      await Ingredient.findOne({name: 'whiskey'}),
      await Ingredient.findOne({name: 'orange'}),
      await Ingredient.findOne({name: 'maraschino-cherries'})
    ]
  },
  {
    name: 'Bloody Mary',
    ingredients: [
      await Ingredient.findOne({name: 'tomato juice'}),
      await Ingredient.findOne({name: 'pickle juice'}),
      await Ingredient.findOne({name: 'lemon juice'}),
      await Ingredient.findOne({name: 'worcestershire sauce'}),
      await Ingredient.findOne({name: 'horse radish'}),
      await Ingredient.findOne({name: 'pepper'}),
      await Ingredient.findOne({name: 'vodka'}),
      
    ]
  },
  {
    name: 'Margarita',
    ingredients: [
      await Ingredient.findOne({name: 'lime'}),
      await Ingredient.findOne({name: 'salt'}),
      await Ingredient.findOne({name: 'tequila'}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'simple syrup'}),
    ]
  },
  {
    name: 'Whiskey Smash',
    ingredients: [
      await Ingredient.findOne({name: 'mint'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'ice'}),
    ]
  },
  {
    name: 'Sloe Gin',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: 'tonic water'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'orange bitters'}),
    ]
  },
  {
    name: 'Boulevardier',
    ingredients: [
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'campari'}),
      await Ingredient.findOne({name: 'vermouth'}),
      await Ingredient.findOne({name: 'lemon'}),
    ]
  },
  {
    name: 'Gin and Tonic',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: 'tonic water'}),
      await Ingredient.findOne({name: 'lime wedges'}),
    ]
  },
  {
    name: 'Spiced Dark and Stormy',
    ingredients: [
      await Ingredient.findOne({name: 'allspice berries'}),
      await Ingredient.findOne({name: 'black peppercorns'}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'orange'}),
      await Ingredient.findOne({name: 'ginger beer'}),
      await Ingredient.findOne({name: 'lime'}),
      await Ingredient.findOne({name: 'rum'}),

    ]
  }

 ]
  await Recipe.deleteMany({});
  await Recipe.insertMany(recipeSeeds)
  await User.insertMany(userSeeds)
};


seedDB().then(() => {
  mongoose.connection.close();
});