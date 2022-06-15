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
  'dark-rum Alcohol boozy','vodka Alcohol boozy','gin Alcohol',
  'tequila Alcohol','rum Alcohol','whiskey Alcohol',
  'brandy Alcohol','amaretto Alcohol','coffee-liqueur Alcohol',
  'vermouth Alcohol','irish-cream-liqueur Alcohol',
  'orange-liqueur Alcohol','lemon-juice Mixer','lime-juice Mixer',
  'cranberry-juice Mixer', 'grapefruit-juice Mixer', 'pineapple-juice Mixer',
  'tomato-juice Mixer','bitters Alcohol', 'simple-syrup Produce',
  'sour-mix Mixer', 'grenadine Alcohol','cream Mixer',
  'club-soda Mixer', 'tonic-water Alochol', 'ginger-ale Mixer',
  'cola Mixer','lemon Produce','lime Produce',
  'maraschino-cherry Produce', 'olives Produce',
  'salt Garnish', 'sugar Garnish','mint Garnish',
  'orange Produce', 'campari-bitters Alcohol','pickle-juice Mixer',
  'horse-radish Produce','worcestershire Produce', 'pepper Garnish',
  'triple-sec Alcohol','bourbon Alcohol','ice Garnish',
  'orange-bitters Alcohol', 'allspice-berries Produce', 'black-peppercorns Produce',
  'ginger-beer Mixer', 'absinthe Alcohol', 'egg Produce',
  'pisco Alcohol','cucumber Produce', `pimm's-no.-1 Alcohol`,
  'rosemary Garnish', 'thyme Garnish', `strawberries Produce`,
  `rhubarb Garnish`, 'ginger-syrup Garnish', 'whipped-cream Garnish',
  'coffee Produce', 'mango Produce', 'ginger Produce',
  'raspberries Produce', 'champagne Alcohol', 'aperol Alcohol',
  'prosecco Alcohol', 'orange-juice Mixer', 
  'sweet-vermouth Alcohol',
  'drambuie-liqueur Alcohol',
  'sloe-gin Alcohol',
  'peach-juice Produce',
  'tabasco Produce',
  'celery Produce',
  'cherry Produce',
  'celery-salt Produce',

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
      await Ingredient.findOne({ name: 'sweet vermouth' }).exec(),
      await Ingredient.findOne({ name: 'orange' }).exec(),
      await Ingredient.findOne({ name: 'campari bitters' }).exec()
    ],
    reviews: [],
    instructions: "In any order combime 1 oz each of gin, Campari ad sweet vermouth in a rocks glass. Add ice and give a quick stir. Use a pairing knife to cut a strip of orange peel with a small amount of pith attached. Add the orange twist as a garnish.",
    description: 'The Negroni’s bitter intensity and easy equal-parts formula have helped make it a favorite',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 5, boozy: 4, salty: 0, sour: 0, sweet: 3, umami: 0},

  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Old-fashioned',
    imgUrl: 'https://assets.bonappetit.com/photos/58409ff731e0aa8a6cd383f8/1:1/w_1280,c_limit/bas-best-old-fashioned.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'bitters'}),
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'orange'}),
      await Ingredient.findOne({name: 'sugar'}),
      await Ingredient.findOne({name: 'maraschino cherry'})
    ],
    reviews: [],
    instructions: "Place ½ tsp or 1 cube of sugar in a rocks glass. Pour bitters over sugar, then add 1 tsp water and stir until the sugar is nearly dissolved. Fill the glass with large ice cubes, add 1 oz bourbon, and gently stir to combine. Express the oil of an orange peel over the glass, then drop in. (optional) Garnish with charry for a sweeter drink.",
    description: 'This drink is precisely what the word cocktail referred to 200 years ago.',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 5, salty: 0, sour: 0, sweet: 3, umami: 0},
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Bloody Mary',
    imgUrl: 'https://assets.bonappetit.com/photos/57aceb5af1c801a1038bc8fb/1:1/w_1280%2Cc_limit/BLOODY-MARY-RESIZED-1-of-1.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'tomato juice'}),
      await Ingredient.findOne({name: 'pickle juice'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'tabasco'}),
      await Ingredient.findOne({name: 'worchestershire'}),
      await Ingredient.findOne({name: 'olives'}),
      await Ingredient.findOne({name: 'lime'}),
      await Ingredient.findOne({name: 'mango'}),
      await Ingredient.findOne({name: 'horse radish'}),
      await Ingredient.findOne({name: 'pepper'}),
      await Ingredient.findOne({name: 'vodka'}),
      await Ingredient.findOne({name: 'celery'}),
      await Ingredient.findOne({name: 'celery salt'}),
      
    ],
    reviews: [],
    instructions: "Rub the juicy side of the lemon or lime wedge along the lip of a pint glass. Fill the glass with ice and set aside. Squeeze the lemon and lime wedges into a shaker and drop them in. Add 2 oz vodka, 4oz tomato juice, 2 tsp horseradish, 1 dash Tabasco, 1 dash Worcestershire, black pepper, paprika, plus a pinch of celery salt along with ice and shake gently. Strain into the prepared glass. Garnish with parsley sprig, 2 speared green olives, a lime wedge and a celery stalk (optional).",
    description: 'It’s a hangover cure, a nutritious breakfast, an airport bar staple. This tomato- and vodka-based classic, created in Paris in the 1920s.',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 5, salty: 3, sour: 0, sweet: 1, umami: 3},
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
    instructions: "Place salt on small shallow plate. Rim two glasses with lime wedge, then dip in salt to coat rim. Divide 4 oz tequila, 2oz simple syrup, and 1.5 oz lime juice between 2 glasses and stir to combine. Top with ice, garnish with lime, and serve.",
    description: 'when this zesty classic is made correctly—with quality tequila, orange liqueur, and lime juice—the drink carries itself upright',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 4, salty: 3, sour: 3, sweet: 5, umami: 0},
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
    instructions: "Muddle 3 lemon wedges in a shaker. Add 2 oz bourbon, ¾ oz simple syrup, mint leaves and ice, and shake until well-chilled. Double-strain into a rocks glass over fresh ice. Garnish with a mint sprig.",
    description: 'the citrus-and-mint combination the perfect cocktail for those who say they’ll never drink whiskey. ',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 5, salty: 0, sour: 4, sweet: 4, umami: 0},
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Sloe Gin Fizz',
    imgUrl: 'https://assets.bonappetit.com/photos/57adf8881b3340441497584a/1:1/w_1280%2Cc_limit/sloe-gin.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'sloe gin'}),
      await Ingredient.findOne({name: 'simple syrup'}),
      await Ingredient.findOne({name: 'lemon juice'}),
      await Ingredient.findOne({name: 'club soda'}),
      await Ingredient.findOne({name: 'lemon'}),
      await Ingredient.findOne({name: 'cherry'}),
    ],
    reviews: [],
    instructions: "Add 1oz each of sloe gin, gin, lemon juice and simple syrup into a cocktail shaker with ice, and shake until well-chilled. Fill a highball or Collins glass with ice, and strain the contents of the shaker into the glass. Top with the club soda. Garnish with a lemon wedge and a cherry.",
    description: "A sloe gin fizz is refreshing and delightfully balances sweet against tart. It begins with Sloe Gin then we add fresh lemon, a little sugar and club soda.",
    additionalInfo: '',
    creator_flavor_profile: {bitter: 2, boozy: 4, salty: 0, sour: 4, sweet: 4, umami: 0},
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: 'Boulevardier',
    imgUrl: 'https://assets.bonappetit.com/photos/57ae2ec953e63daf11a4e2fd/1:1/w_1280%2Cc_limit/boulevardier.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'bourbon'}),
      await Ingredient.findOne({name: 'campari bitters'}),
      await Ingredient.findOne({name: 'sweet vermouth'}),
      await Ingredient.findOne({name: 'lemon'}),
    ],
    reviews: [],
    instructions: "Add 1.5 oz bourbon, ¾ oz Campari and ¾ oz sweet vermouth into a mixing glass with ice and stir until well-chilled. Strain into a rocks glass over fresh ice. Garnish with a lemon twist.",
    description: 'The boulevardier cocktail is an alcoholic drink composed of whiskey, sweet vermouth, and Campari.',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 4, boozy: 5, salty: 0, sour: 2, sweet: 2, umami: 0},
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
    instructions: "Fill a highball glass with ice, then add 2 oz gin. Top with the tonic water and gently stir. Garnish with lime wheels or seasonal garnishes",
    description: "A gin and tonic is a highball cocktail made with gin and tonic water poured over a large amount of ice. The ratio of gin to tonic varies according to taste, strength of the gin, other drink mixers being added, etc., with most recipes calling for a ratio between 1:1 and 1:3.",
    additionalInfo: '',
    creator_flavor_profile: {bitter: 1, boozy: 5, salty: 0, sour: 3, sweet: 2, umami: 0},
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
    instructions: "Coarsely grind 2 tsp allspice and 2 tsp peppercorns in spice mill or with mortar and pestle; add spices and orange zest to 750-ml bottle of rum and let infuse at least 2 days. Strain into a clean bottle or a glass jar. Rum can be infused 3 weeks ahead. Store in a dark, dry place. Combine lime juice and 4 oz. spiced rum in a cocktail shaker; fill with ice. Shake until outside is frosty, about 30 seconds. Strain into highball glasses filled with ice, top off with ginger beer, and garnish with lime wedges.",
    description: 'The longer the spices infuse in the rum, the more flavorful this dark and stormy will be.',
    additionalInfo: 'serves 2',
    creator_flavor_profile: {bitter: 2, boozy: 5, salty: 0, sour: 2, sweet: 5, umami: 0},
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
    instructions: `Shake sugar and ⅓ cup hot water in a jar until sugar dissolves. Chill until ready to use. Combine whiskey, absinthe, bitters, ⅓ cup simple syrup, and ¾ cup ice water in a large pitcher; chill until very cold, at least 2 hours and uprosemary`,
    description: 'The Sazerac is a local variation of a cognac or whiskey cocktail originally from New Orleans, named for the Sazerac de Forge et Fils brand of cognac brandy.',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 4, boozy: 5, salty: 0, sour: 2, sweet: 5, umami: 0},
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
    instructions: `Shake 1 large egg white*, pisco, lime juice, and simple syrup in a cocktail shaker until frothy, about 1 minute. Fill with ice; shake until outside is frosty, about 30 seconds. Strain into a coupe glass. Top with Angostura bitters. *Raw egg is not recommended for the elderly, people with weakened immune systems...or people who don’t like raw egg.`,
    description: "A pisco sour is an alcoholic cocktail of Peruvian origin that is typical of the cuisines from Peru and Chile.",
    additionalInfo: '',
    creator_flavor_profile: {bitter: 4, boozy: 2, salty: 0, sour: 0, sweet: 3, umami: 0},
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
    instructions: `1) Place 1/2-inch-thick cucumber slices in cocktail shaker. Using muddler or handle of wooden spoon, mash well. Add Pimm's, lemon juice, and sugar. Fill 2 pilsner glasses with ice; set aside. Add ice to Pimm's mixture, cover, and shake vigorously 20 times. Strain into glasses. Push 1 rosemary sprig, 1 thyme sprig, 1 mint sprig, 1 lemon slice, and 2 strawberry halves down into each glass. Fill glasses with ginger beer. Garnish with cucumber spears and rhubarb stalks.`,
    description: faker.lorem.paragraph(),
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 2, salty: 0, sour: 3, sweet: 5, umami: 0},
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
    instructions: 'Pour club soda, vodka, and ginger syrup into a Moscow Mule mug filled with ice. Stir gently to combine. Garnish with lime wedges.',
    description: 'A Moscow mule is a cocktail made with vodka, ginger beer and lime juice, garnished with a slice or wedge of lime',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 5, salty: 0, sour: 2, sweet: 5, umami: 0},
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
    instructions: 'Combine sugar, rum, lime juice, and simple syrup in a cocktail shaker; stir until sugar dissolves, about 20 seconds. Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. Place a large ice cube in a coupe glass; strain cocktail through a Hawthorne strainer or a slotted spoon into glass. Using a small serrated knife, remove a 1" strip of peel from lime (some white pith is okay); it should be stiff enough to provide some resistance when bent. Twist over drink to express oils; discard. Garnish with a lime twist.',
    description: "This three-ingredient gift has pleased millions of palates over the ensuing years, including household names like Ernest Hemingway and President JFK.",
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 4, salty: 0, sour: 4, sweet: 5, umami: 0},
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
    instructions: `Muddle simple syrup and 2 mint sprigs in a cocktail shaker. Add rum and lime juice. Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. Strain cocktail through a Hawthorne strainer or a slotted spoon into a tall Collins glass filled with ice. Top off with club soda; garnish with more mint`,
    description: 'The combination of sweetness, citrus, and herbaceous mint flavors is intended to complement the rum, and has made the mojito a popular summer drink',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 4, salty: 0, sour: 2, sweet: 5, umami: 0},
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
    instructions: `Combine vodka, cranberry juice, lime juice, and triple sec in a cocktail shaker. Fill shaker with ice,
    cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. Strain cocktail through a Hawthorne strainer or a slotted spoon into a martini glass. Garnish with orange twist.`,
    description:`A cosmopolitan, or informally a cosmo, is a cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed or sweetened lime juice`,
    additionalInfo: '',
    creator_flavor_profile: {bitter: 3, boozy: 5, salty: 0, sour: 3, sweet: 5, umami: 0},
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
    instructions: `Put some vodka in your orange juice. Alternatively, put some orange juice in your vodka`,
    description: "The beauty of the Screwdriver lies in the cocktail’s simplicity and the drink’s adoption as a morning eye-opener",
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 5, salty: 0, sour: 2, sweet: 4, umami: 0},
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
    instructions: `Place sugar cube in an Irish coffee mug. Add coffee and whiskey and stir to combine. Top with whipped
    cream and bitters, if using.`,
    description: 'Irish coffee is a caffeinated alcoholic drink consisting of Irish whiskey, hot coffee, and sugar, stirred, and topped with cream',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 3, boozy: 4, salty: 0, sour: 0, sweet: 4, umami: 0},
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
    instructions: `Combine gin, lemon juice, and sugar in a pitcher or large measuring glass and stir to dissolve sugar; refrigerate gin mixture if not making drinks right away. Do Ahead: Gin mixture can be made 1 day ahead. Cover and chill. When ready to serve, arrange lemon wedges, mango, cucumber, mint sprigs, ginger, raspberries, and strawberries on a platter or in separate bowls and set out alongside gin mixture, club soda, and a bucket
    of ice. For each cocktail, muddle ingredients of your choice (mix and match!) in a Collins glass. Fill with ice, then add ¼ cup gin mixture and top off with club soda.`,
    description: 'This "gin and sparkling lemonade" drink is typically served in a Collins glass over ice',
    additionalInfo: '',
    creator_flavor_profile: {bitter: 0, boozy: 4, salty: 0, sour: 2, sweet: 4, umami: 0},
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
    instructions: `Combine gin, lemon juice, and simple syrup in a cocktail shaker. Fill shaker with ice, cover, and shake vigorously until outside of shaker is very cold, about 20 seconds. Strain cocktail through a Hawthorne strainer or a slotted spoon into a large flute. Top with Champagne; garnish with lemon twist.`,
    description: `French 75 is a cocktail made from gin, champagne, lemon juice, and sugar. It is also called a 75 Cocktail, or in French simply a Soixante Quinze`,
    additionalInfo: "Hendrick's Gin is recommended",
    creator_flavor_profile: {bitter: 2, boozy: 5, salty: 0, sour: 0, sweet: 5, umami: 0},
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Aperol Spritz`,
    imgUrl: 'https://assets.bonappetit.com/photos/5aa9640bcb9d0f23ce858096/1:1/w_1280%2Cc_limit/aperol-spritz.jpg',
    ingredients: [
      await Ingredient.findOne({name: 'olives'}),
      await Ingredient.findOne({name: 'aperol'}),
      await Ingredient.findOne({name: 'prosecco'}),
      await Ingredient.findOne({name: 'club soda'}),
      await Ingredient.findOne({name: 'ice'}),
    ],
    reviews: [],
    instructions: `Thread olives onto a swizzle stick. Pour Aperol and Prosecco into a rocks glass filled with ice. Top off with soda. Gently stir with swizzle stick with olives`,
    description: `A Spritz Veneziano is an Italian wine-based cocktail, commonly served as an aperitif in Northeast Italy`,
    additionalInfo: "",
    creator_flavor_profile: {bitter: 4, boozy: 4, salty: 3, sour: 0, sweet: 1, umami: 3},
  },
  {
    user: getRandomSubarray(userSeeds,1)[0],
    name: `Greyhound`,
    imgUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/07/shutterstock_504770413.jpg?resize=700,700',
    ingredients: [
      await Ingredient.findOne({name: 'gin'}),
      await Ingredient.findOne({name: 'grapefruit juice'})

    ],
    reviews: [],
    instructions: `Pour two ounces of gin into a cocktail glass, and top with grapefruit juice to taste`,
    description: `Grapefuit and gin for the win!`,
    additionalInfo: 'Looking to throw a bone between the citrus and spirit? Add salt to the rim, and you have another canine-related classic, the Salty Dog. This simple variation can also be made with either gin or vodka, and the salted rim lends a savory quality to each electrolyte-laced sip.',
    creator_flavor_profile: {bitter: 3, boozy: 4, salty: 0, sour: 0, sweet: 3, umami: 0},
    
},
{
  user: getRandomSubarray(userSeeds,1)[0],
  name: `Rusty Nail`,
  imgUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/07/Rusty-nail.jpg?resize=700,700',
  ingredients: [
    await Ingredient.findOne({name: 'whiskey'}),
    await Ingredient.findOne({name: 'drambuie liqueur'})

  ],
  reviews: [],
  instructions: `Two parts whiskey, half part drambuie liqueur. Add the whistkey and Drambuie into a mixing glass with ice and stir until well-chilled. Strain into a rocks glass over one large ice cube`,
  description: `Frank Sinatra and the Rat Pack loved this drink!`,
  additionalInfo: '',
  creator_flavor_profile: {bitter: 0, boozy: 5, salty: 0, sour: 0, sweet: 3, umami: 0},
},
{
  user: getRandomSubarray(userSeeds,1)[0],
  name: `Black Russian`,
  imgUrl: 'https://www.liquor.com/thmb/QOZuXd5sMdPAVREzFO3p25ub6Ng=/720x540/smart/filters:no_upscale()/__opt__aboutcom__coeus__resources__content_migration__liquor__2019__02__22083816__black-russian-720x720-recipe-294769f33a6d4ccd9331030c158a1a53.jpg',
  ingredients: [
    await Ingredient.findOne({name: 'vodka'}),
    await Ingredient.findOne({name: 'coffee liqueur'})

  ],
  reviews: [],
  instructions: `Add 2 parts vodka and 1 part coffee liqueur into a mixing glass with ice and stir until well-chilled. Strain into a rocks glass over fresh ice.`,
  description: `The arch-nemesis of the White Russian!`,
  additionalInfo: '',
  creator_flavor_profile: {bitter: 3, boozy: 5, salty: 0, sour: 0, sweet: 2, umami: 0},
},
{
  user: getRandomSubarray(userSeeds,1)[0],
  name: `Mimosa`,
  imgUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/07/shutterstock_561512077.jpg?resize=700,700',
  ingredients: [
    await Ingredient.findOne({name: 'orange juice'}),
    await Ingredient.findOne({name: 'champagne'})

  ],
  reviews: [],
  instructions: `Divide orange juice evenly into two flute glasses; top with chilled Champagne and serve.`,
  description: `The more sophisticated sibling of the screwdriver!`,
  additionalInfo: '',
  creator_flavor_profile: {bitter: 0, boozy: 2, salty: 0, sour: 2, sweet: 4, umami: 0},
},
{
  user: getRandomSubarray(userSeeds,1)[0],
  name: `Bellini`,
  imgUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/07/Bellini_1009292707.jpg?resize=700,700',
  ingredients: [
    await Ingredient.findOne({name: 'peach juice'}),
    await Ingredient.findOne({name: 'champagne'})

  ],
  reviews: [],
  instructions: `Put the peach juice or puree in a Champagne flute up to about 1/3 full. Slowly top up with Prosecco.`,
  description: `A peachy mimosa`,
  additionalInfo:  'Purists do not use Champagne to make this cocktail; it can be too flavorful and hide the subtle peach flavor. If a non-alcoholic cocktail is desired, use sparkling water in place of the sparkling wine',
  creator_flavor_profile: {bitter: 0, boozy: 2, salty: 0, sour: 0, sweet: 5, umami: 0},
},
{
  user: getRandomSubarray(userSeeds,1)[0],
  name: `Vodka Cranberry`,
  imgUrl: 'https://www.tasteofhome.com/wp-content/uploads/2018/07/Vodka-cranberry.jpg?resize=700,700',
  ingredients: [
    await Ingredient.findOne({name: 'cranberry juice'}),
    await Ingredient.findOne({name: 'vodka'}),
    await Ingredient.findOne({name: 'lime'})

  ],
  reviews: [],
  instructions: `Fill a glass ⅔ full of ice. Pour in the vodka and cranberry juice and stir to combine. Give the lime wedge a light squeeze over the drink before using it as a garnish. Add up to 2 teaspoons of simple syrup if you want a sweeter drink.`,
  description: `The name tells you how to make it!`,
  additionalInfo:"",
  creator_flavor_profile: {bitter: 3, boozy: 4, salty: 0, sour: 1, sweet: 4, umami: 0},
}
]

//  recipeSeeds.forEach((recipe => console.log(recipe.name, recipe.description)))
 await Recipe.deleteMany();
 await Recipe.insertMany(recipeSeeds)

 recipeSeeds = await Recipe.find()
 //create review seeds

//   let reviewSeeds = [];
//   let count = 0;
//   let j = 0;
//   let ratingObject;
//   for (let i = 0; i < recipeSeeds.length * 2; i++) {
//     // create 2 times as many reviews as posts
//     // create 2 reviews that emphasize each flavor category
  
//     reviewSeeds[i] = {
//       // assign a random user a review
//       reviewer: getRandomSubarray(userSeeds,1)[0],
//       // assign that review to a random recipe object
//       recipe: recipeSeeds[j],
//       rating: 
//                   {boozy: Math.floor(Math.random()*5),
//                   sweet: Math.floor(Math.random()*5),
//                   sour: Math.floor(Math.random()*5),
//                   bitter: Math.floor(Math.random()*5),
//                   salty: Math.floor(Math.random()*5),
//                   umami: Math.floor(Math.random()*5),
//                   rating: Math.floor(Math.random()*5)},
//       title: faker.company.companyName(),
//       body: faker.lorem.paragraph(),
//     }
//     count ++
// };
//delete all the existing reviews then insert all the reviews into the database
await Review.deleteMany();
//   await Review.insertMany(reviewSeeds)

// for (let i = 0; i < reviewSeeds.length; i++){
//     if (count > 1) {
//         count = 0
//         if (j+1 < recipeSeeds.length) {
//             j++
//         }
//     }
//     console.log(`The receipe ${recipeSeeds[j].name} contains: `, 
//     recipeSeeds[j]
//         .ingredients.map(
//             ingredientId => Ingredient
//                 .findOne({_id: ingredientId})
//                     .then(res => console.log(res.name)) )
//                 )
// }

  // assign the reviews made, to the recipes that they belong to
//   reviewSeeds = await Review.find()

//   for (let i = 0; i < reviewSeeds.length; i++) {
//     let review = reviewSeeds[i]
//     // console.log(review.recipe , i )
   
//    let recipe =  await Recipe.findByIdAndUpdate(review.recipe, {$addToSet: {reviews: review}}, {new:true});
   
//     // console.log(recipe)
    
//   }

// console.log(reviewSeeds)
}
seedDB().then(() => {
  mongoose.connection.close();
});