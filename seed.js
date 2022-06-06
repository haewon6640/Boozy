const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI
const Ingredient = require('./models/Ingredient')
const User = require('./models/User')
const Recipe = require('./models/Recipe')
const Review = require('./models/Review')
const bcrypt = require('bcryptjs')

//connection to the database 
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB successfully"))
    .catch(err=> console.log(err));

// string of ingredient names
// use dashes to prevent multi-word names from messing up the category
let ingredientArr = [
  'dark-rum Alcohol','vodka Alcohol','gin Alcohol',
  'tequila Alcohol','rum Alcohol','whiskey Alcohol',
  'brandy Alcohol','amaretto Alcohol','coffee-liquer Alcohol',
  'vermouth Alcohol','irish-cream-liqueur Alcohol',
  'orange-liqueur Alcohol','lemon-juice Mixer','lime-juice Mixer',
  'cranberry-juice Mixer', 'grapefruit-juice Mixer', 'pineapple-juice Mixer',
  'tomato-juice Mixer','bitters Alcohol', 'simple-syrup Produce',
  'sour-mix Mixer', 'grenadine Alcohol','cream Mixer',
  'club-soda Mixer', 'tonic-water Alochol', 'ginger-ale Mixer',
  'cola Mixer','lemon Produce','lime Produce',
  'maraschino-cherries Produce', 'olives Produce',
  'salt Garnish', 'sugar Garnish','mint Garnish',
  'orange Produce', 'campari-bitters Alcohol','pickle-juice Mixer',
  'horse-radish Produce','worcestershire-sauce Produce', 'pepper Garnish',
  'triple-sec Alcohol','bourbon Alcohol','ice Garnish',
  'orange-bitters Alcohol', 'allspice-berries Produce', 'black-peppercorns Produce',
  'ginger-beer Mixer', 'absinthe Alcohol', 'egg Produce',
  'pisco Alcohol','cucumber Produce', `pimm's-no.-1 Alcohol`,
  'rosemary Garnish', 'thyme Garnish', `strawberries Produce`,
  `rhubarb Garnish`, 'ginger-syrup Garnish', 'whipped-cream Garnish',
  'coffee Produce', 'mango Produce', 'ginger Produce',
  'raspberries Produce', 'champagne Alcohol', 'aperol Alcohol',
  'prosecco Alcohol', 'orange-juice Mixer'

]

// convert the string of ingredient names into an array of ingredient objects called ingredientSeed
let ingredientSeeds = [];
// loop thru the ingredientArr and make objects with the key name out of each of the strings
for (let i = 0; i < ingredientArr.length; i++) {
  let name = ingredientArr[i].split(' ')[0].replace(/-/g,' ') //replaces all the dashes in the first intended word with spaces
  let category = ingredientArr[i].split(' ')[1]
  
  ingredientSeeds[i] = {name: name, category: category}
  // console.log(ingredientSeeds)
  // ingredientSeeds[i] = {name: name}
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
    password: '$2a$10$NcUeyj5yCHoJTvRgOlw7Cef01EXTP7TfVwAf3qf2ZR.cdz2L0QU3q',
    shelf: shelf
  })
  // create 10 users with faker data
  for (let i = 0; i < 10; i++) {
    shelf = getRandomSubarray(ingredientSeeds,5)
    userSeeds.push({handle: faker.name.findName(),
      email: faker.internet.email(),
      password: '$2a$10$NcUeyj5yCHoJTvRgOlw7Cef01EXTP7TfVwAf3qf2ZR.cdz2L0QU3q',
      shelf: shelf})
  }
  await User.deleteMany()
  await User.insertMany(userSeeds) // insert userSeeds into DB
  userSeeds = await User.find() // take all the user objects from the database and stick them into an array

  // create recipe seeds
 let recipeSeeds = [
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Negroni',
    imgUrl: 'https://assets.bonappetit.com/photos/626710f327b006dd474788c9/1:1/w_1280,c_limit/0425-negroni-recipe.jpg',
    ingredients: [
      await Ingredient.findOne({ name: 'gin' }).exec(),
      await Ingredient.findOne({ name: 'vermouth' }).exec(),
      await Ingredient.findOne({ name: 'orange' }).exec(),
      await Ingredient.findOne({ name: 'campari bitters' }).exec()
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: '',

  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Old-fashioned',
    imgUrl: 'https://assets.bonappetit.com/photos/58409ff731e0aa8a6cd383f8/1:1/w_1280,c_limit/bas-best-old-fashioned.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'bitters'}),
      await Ingredient.findOne({name: 'whiskey'}),
      await Ingredient.findOne({name: 'orange'}),
      await Ingredient.findOne({name: 'maraschino cherries'})
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Bloody Mary',
    imgUrl: 'https://assets.bonappetit.com/photos/57aceb5af1c801a1038bc8fb/1:1/w_1280%2Cc_limit/BLOODY-MARY-RESIZED-1-of-1.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'tomato juice'}),
      await Ingredient.findOne({name: 'pickle juice'}),
      await Ingredient.findOne({name: 'lemon juice'}),
      await Ingredient.findOne({name: 'mango'}),
      await Ingredient.findOne({name: 'horse radish'}),
      await Ingredient.findOne({name: 'pepper'}),
      await Ingredient.findOne({name: 'vodka'}),
      
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Margarita',
    imgUrl: 'https://assets.bonappetit.com/photos/5b69f16006027f654a27cd19/1:1/w_1280,c_limit/ba-margarita-1.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'lime'}),
      await Ingredient.findOne({name: 'salt'}),
      await Ingredient.findOne({name: 'tequila'}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'simple syrup'}),
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Whiskey Smash',
    imgUrl: 'https://assets.bonappetit.com/photos/57ae4a7953e63daf11a4e4d0/1:1/w_1280%2Cc_limit/classic-whiskey-smash.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'mint'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'ice'}),
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Sloe Gin',
    imgUrl: 'https://assets.bonappetit.com/photos/57adf8881b3340441497584a/1:1/w_1280%2Cc_limit/sloe-gin.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: 'tonic water'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'orange bitters'}),
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Boulevardier',
    imgUrl: 'https://assets.bonappetit.com/photos/57ae2ec953e63daf11a4e2fd/1:1/w_1280%2Cc_limit/boulevardier.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'campari bitters'}),
      await Ingredient.findOne({name: 'vermouth'}),
      await Ingredient.findOne({name: 'lemon'}),
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Gin and Tonic',
    imgUrl: 'https://assets.bonappetit.com/photos/57adf784f1c801a1038bcddf/1:1/w_1280%2Cc_limit/gin-and-tonic.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: 'tonic water'}),
      await Ingredient.findOne({name: 'lime'}),
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Spiced Dark and Stormy',
    imgUrl: 'https://assets.bonappetit.com/photos/57add934f1c801a1038bcc4f/1:1/w_1280%2Cc_limit/spiced-dark-and-stormy3.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'allspice berries'}),
      await Ingredient.findOne({name: 'black peppercorns'}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'orange'}),
      await Ingredient.findOne({name: 'dark rum'}),
      await Ingredient.findOne({name: 'ginger beer'}),
      await Ingredient.findOne({name: 'lime'})
    ],
    reviews: [],
    instructions: faker.hacker.phrase(),
    description: 'The longer the spices infuse in the rum, the more flavorful this dark and stormy will be.',
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Sazerac',
    imgUrl: 'https://assets.bonappetit.com/photos/57adf1b153e63daf11a4df64/1:1/w_1920%2Cc_limit/sazerac.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'sugar'}),
      await Ingredient.findOne({name: 'whiskey'}),
      await Ingredient.findOne({name: 'absinthe'}),
      await Ingredient.findOne({name: 'bitters'}),
      await Ingredient.findOne({name: 'lemon'}),
    ],
    reviews: [],
    instructions: `1) Shake sugar and 1/3 cup hot water in a jar until sugar dissolves; chill until ready to use. \n 
                   2) Combine whiskey, absinthe, bitters, 1/3 cup simple syrup, and ¾ cup ice water in a large pitcher; chill \n
                      until very cold, at least 2 hours and uprosemary`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: "Joly's Pisco Sour",
    imgUrl: 'https://assets.bonappetit.com/photos/57add6b4f1c801a1038bcc3a/1:1/w_1920%2Cc_limit/jolys-pisco-sour.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'egg'}),
      await Ingredient.findOne({name: 'pisco'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'bitters'}),
      await Ingredient.findOne({name: 'lime juice'}),
    ],
    reviews: [],
    instructions: `1) Shake 1 large egg white*, pisco, lime juice, and simple syrup in a cocktail shaker until frothy, about 1 minute. \n
                      Fill with ice; shake until outside is frosty, about 30 seconds. Strain into a coupe glass. \n
                      Top with Angostura bitters. \n
                   2) *Raw egg is not recommended for the elderly, people with weakened immune systems...or people who don’t like raw egg.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `The Pimm's Cup`,
    imgUrl: 'https://assets.bonappetit.com/photos/57b0129453e63daf11a4e8e8/1:1/w_1920%2Cc_limit/mare_the_pimms_cup_v.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'cucumber'}),
      await Ingredient.findOne({name: `pimm's no. 1`}),
      await Ingredient.findOne({name: 'sugar'}),
      await Ingredient.findOne({name: 'lemon juice'}),
      await Ingredient.findOne({name: 'ice'}),
      await Ingredient.findOne({name: 'rosemary'}),
      await Ingredient.findOne({name: 'thyme'}),
      await Ingredient.findOne({name: 'mint'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'strawberries'}),
      await Ingredient.findOne({name: 'ginger beer'}),
      await Ingredient.findOne({name: 'rhubarb'}),

    ],
    reviews: [],
    instructions: `1) Place 1/2-inch-thick cucumber slices in cocktail shaker. Using muddler or handle of wooden spoon, \n 
    mash well. Add Pimm's, lemon juice, and sugar. Fill 2 pilsner glasses with ice; set aside. Add ice \n 
    to Pimm's mixture, cover, and shake vigorously 20 times. Strain into glasses. Push 1 rosemary sprig, 1 \n
    thyme sprig, 1 mint sprig, 1 lemon slice, and 2 strawberry halves down into each glass. Fill glasses with \n 
    ginger beer. Garnish with cucumber spears and rhubarb stalks.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Moscow Mule`,
    imgUrl: 'https://assets.bonappetit.com/photos/57ae3c691b33404414975c01/1:1/w_1920%2Cc_limit/moscow-mule.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'club soda'}),
      await Ingredient.findOne({name: `vodka`}),
      await Ingredient.findOne({name: 'ginger syrup'}),
      await Ingredient.findOne({name: 'lime'}),

    ],
    reviews: [],
    instructions: `1) Pour club soda, vodka, and ginger syrup into a Moscow Mule mug filled with ice; stir gently to combine. \n
    Garnish with lime wedges.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Daiquiri, Up-Rocks`,
    imgUrl: 'https://assets.bonappetit.com/photos/57acdc7ef1c801a1038bc83f/1:1/w_1920%2Cc_limit/daiquiri.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'sugar'}),
      await Ingredient.findOne({name: `rum`}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'lime'})

    ],
    reviews: [],
    instructions: `1) Combine sugar, rum, lime juice, and simple syrup in a cocktail shaker; stir until sugar dissolves, about \n 
    20 seconds. Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about \n 
    20 seconds. Place a large ice cube in a coupe glass; strain cocktail through a Hawthorne strainer or a \n
    slotted spoon into glass. \n    
    2) Using a small serrated knife, remove a 1" strip of peel from lime (some white pith is okay); it should be \n
    stiff enough to provide some resistance when bent. Twist over drink to express oils; discard. Garnish \n 
    with a lime twist. \n`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Mojito`,
    imgUrl: 'https://assets.bonappetit.com/photos/620ffe21d2721805fdcfbd31/1:1/w_1920,c_limit/20220215%20Mojito%20LEDE.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'mint'}),
      await Ingredient.findOne({name: `rum`}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'club soda'})

    ],
    reviews: [],
    instructions: `1) Muddle simple syrup and 2 mint sprigs in a cocktail shaker. Add rum and lime juice. Fill shaker with \n
    ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. \n    
    2) Strain cocktail through a Hawthorne strainer or a slotted spoon into a tall Collins glass filled with ice. \n
    Top off with club soda; garnish with more mint`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Cosmopolitan`,
    imgUrl: 'https://assets.bonappetit.com/photos/57acbfc8f1c801a1038bc722/1:1/w_1920%2Cc_limit/cosmopolitan.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'vodka'}),
      await Ingredient.findOne({name: `cranberry juice`}),
      await Ingredient.findOne({name: 'lime juice'}),
      await Ingredient.findOne({name: 'triple sec'}),
      await Ingredient.findOne({name: 'orange'})

    ],
    reviews: [],
    instructions: `1) Combine vodka, cranberry juice, lime juice, and triple sec in a cocktail shaker. Fill shaker with ice, \n
    cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. \n
    2) Strain cocktail through a Hawthorne strainer or a slotted spoon into a martini glass. Garnish with \n
    orange twist.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Screw Driver`,
    imgUrl: 'https://www.liquor.com/thmb/xQdUxz4hELJFJT7L5MimYSFSqM4=/720x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/__opt__aboutcom__coeus__resources__content_migration__liquor__2017__11__06162348__screwdrvier-720x720-recipe-23e0c0ac47334f108e4fa00b34b7f5bf.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'vodka'}),
      await Ingredient.findOne({name: 'orange juice'})

    ],
    reviews: [],
    instructions: `1) Combine vodka, cranberry juice, lime juice, and triple sec in a cocktail shaker. Fill shaker with ice, \n
    cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. \n
    2) Strain cocktail through a Hawthorne strainer or a slotted spoon into a martini glass. Garnish with \n
    orange twist.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Pour Over Irish Coffee`,
    imgUrl: 'https://assets.bonappetit.com/photos/57ad518553e63daf11a4ddec/1:1/w_1920%2Cc_limit/irishcoffee_backbar.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'sugar'}),
      await Ingredient.findOne({name: `coffee`}),
      await Ingredient.findOne({name: 'whiskey'}),
      await Ingredient.findOne({name: 'whipped cream'}),
      await Ingredient.findOne({name: 'bitters'})

    ],
    reviews: [],
    instructions: `1) Place sugar cube in an Irish coffee mug. Add coffee and whiskey and stir to combine. Top with whipped \n
    cream and bitters, if using.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Tom Collins Bar`,
    imgUrl: 'https://assets.bonappetit.com/photos/57ace54df1c801a1038bc8b3/1:1/w_1920%2Cc_limit/tom-collins-bar.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: `lemon juice`}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'mango'}),
      await Ingredient.findOne({name: 'cucumber'}),
      await Ingredient.findOne({name: 'mint'}),
      await Ingredient.findOne({name: 'ginger'}),
      await Ingredient.findOne({name: 'raspberries'}),
      await Ingredient.findOne({name: 'strawberries'}),
      await Ingredient.findOne({name: 'club soda'}),

    ],
    reviews: [],
    instructions: `1)Combine gin, lemon juice, and sugar in a pitcher or large measuring glass and stir to dissolve sugar; \n
    refrigerate gin mixture if not making drinks right away. \n
    2) Do Ahead: Gin mixture can be made 1 day ahead. Cover and chill.\n    
    3) When ready to serve, arrange lemon wedges, mango, cucumber, mint sprigs, ginger, raspberries, and \n 
    strawberries on a platter or in separate bowls and set out alongside gin mixture, club soda, and a bucket \n
    of ice. \n
    4) For each cocktail, muddle ingredients of your choice (mix and match!) in a Collins glass. Fill with ice, \n 
    then add ¼ cup gin mixture and top off with club soda.`,
    description: faker.lorem.paragraph(),
    additionalInfo: ''
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `French 75`,
    imgUrl: 'https://assets.bonappetit.com/photos/57acbe4753e63daf11a4d99a/1:1/w_1920%2Cc_limit/french-75.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: `lemon juice`}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'champagne'}),
      await Ingredient.findOne({name: 'cucumber'}),
      await Ingredient.findOne({name: 'lemon'}),

    ],
    reviews: [],
    instructions: `1) Combine gin, lemon juice, and simple syrup in a cocktail shaker. Fill shaker with ice, cover, and shake \n 
    vigorously until outside of shaker is very cold, about 20 seconds. \n
    2) Strain cocktail through a Hawthorne strainer or a slotted spoon into a large flute. Top with \n 
    Champagne; garnish with lemon twist. \n`,
    description: faker.lorem.paragraph(),
    additionalInfo: "Hendrick's Gin is recommended"
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Aperol Spritz`,
    imgUrl: 'https://assets.bonappetit.com/photos/5aa9640bcb9d0f23ce858096/1:1/w_1280%2Cc_limit/aperol-spritz.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'olives'}),
      await Ingredient.findOne({name: `aperol`}),
      await Ingredient.findOne({name: 'prosecco'}),
      await Ingredient.findOne({name: 'club soda'}),
      await Ingredient.findOne({name: 'ice'}),
    ],
    reviews: [],
    instructions: `1) Thread olives onto a swizzle stick. Pour Aperol and Prosecco into a rocks glass filled with ice. \n 
    Top off with soda and gently stir with swizzle stick with olives \n`,
    description: faker.lorem.paragraph(),
    additionalInfo: ""
  }
 ]

//  recipeSeeds.forEach((recipe => console.log(recipe.name, recipe.description)))
 await Recipe.deleteMany({});
 await Recipe.insertMany(recipeSeeds)

 recipeSeeds = await Recipe.find()
 //create review seeds

  let reviewSeeds = [];
  for (let i = 0; i < recipeSeeds.length * 2; i++) {
    // create 2 times as many reviews as posts
    reviewSeeds[i] = {
      // assign a random user a review
      reviewer: getRandomSubarray(userSeeds,1)[0],
      // assign that review to a random recipe object
      recipe: getRandomSubarray(recipeSeeds,1)[0],
      rating: 
                  {boozy: Math.floor(Math.random()*5),
                  sweet: Math.floor(Math.random()*5),
                  sour: Math.floor(Math.random()*5),
                  bitter: Math.floor(Math.random()*5),
                  salty: Math.floor(Math.random()*5),
                  umami: Math.floor(Math.random()*5),
                  rating: Math.floor(Math.random()*5)},
      title: faker.company.companyName(),
      body: faker.lorem.paragraph(),
    }
    console.log(`Review seed ${i}:`, reviewSeeds[i].rating)
  };
  //delete all the existing reviews then insert all the reviews into the database
  await Review.deleteMany();
  await Review.insertMany(reviewSeeds)

  // assign the reviews made, to the recipes that they belong to
  reviewSeeds = await Review.find()

  for (let i = 0; i < reviewSeeds.length; i++) {
    let review = reviewSeeds[i]
    // console.log(review.recipe , i )
 
   let recipe =  await Recipe.findByIdAndUpdate(review.recipe, {$addToSet: {reviews: review}}, {new:true});
    // console.log(recipe)
    
  }

// console.log(reviewSeeds)
}
seedDB().then(() => {
  mongoose.connection.close();
});