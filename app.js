const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const passport = require("passport");
const db = require('./config/keys').mongoURI
const users = require("./routes/api/users")
const recipes = require("./routes/api/recipes");
const ingredients = require("./routes/api/ingredients");
const reviews = require('./routes/api/reviews');
mongoose
    .connect(db, {useNewUrlParser: true})
    .then(()=> console.log("Connected to MongoDB successfully"))
    .catch(err=> console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users)
app.use("/api/recipes", recipes)
app.use("/api/ingredients", ingredients)
app.use("/api/reviews", reviews);
   
const port = process.env.PORT || 5000;
app.listen(port, ()=> console.log(`Server is running on port ${port}`))

