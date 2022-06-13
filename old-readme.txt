Boozy
======

Boozy is a cocktail generator and social platform where users will be able to find recipes based on what alcohol they have submitted on their virtual shelf, submit their own cocktail recipes, and post, comment on and review what they are currently drinking.

Background and Overview
-----------------------
We've all been there - hanging out at home on a Saturday night and looking to make a cocktail with what we have on hand in our kitchen.  But what can we actually make?  With Boozy, users will be able to add alcohol, mixers and syrups to a virtual "Shelf" and generate a list of cocktails they can make with what they have on hand.  If a user is missing ingredients, they will be shown grocery stores, liqour stores or specialty shops where they might be able to find those ingredients.  
Users will also be able to submit, share and update their own cocktail recipes, as well as post what they are drinking, and review, comment and share if they are drinking another user's recipe.
Goals:
* Create a database to store user data, including ingredients on hand (the "Shelf"), submitted cocktails, comments and numerical reviews.
* Construct a generator that queries the cocktails databse and returns a list of cocktails made with ingredients that a user has on their "Shelf"
* Incorporate the Google Maps API to show nearby stores where users may find missing ingredients
* Utilize the Google Maps API to show what other users are drinking in your city on a homepage feed
* Create a search function for cocktails and different types of alcohol


Technologies
------------
The backend of Boozy will be created using MongoDB and Express.

The frontend of Boozy will be created with React and Node.js.

We will incorporate the Google Maps API to show nearby stores as well as populate a feed with what other users are drinking in your area.

Technical Challenges:
Populating the feed with what other users are drinking nearby while not revealing the exact location of those users.

Generating cocktails from the database while showing missing ingredients and utilizing Google Maps API to show possible stores.

Search and filter based on flavor profiles.

Group Members and Work Breakdown
--------------------------------
#### Jerry Park, Jeremy Pietila, Keenan Parker, Pamela Tenney, Anders Kindall

#### Over the weekend:
* All team members will complete MERN tutorial
* Write proposal - Anders
* Implement user auth backend - Jerry
* Implement recipe/search index backend - Jerry
* Implement shelf backend - Jerry
* Crawl for initial seed data - Keenan
* Initialize master stylesheets, begin styling splash, navbar - Pam
* Start work on user auth frontend - Pam
* Start work on recipe/search index frontend - Pam

#### Day 1
* Backedn for recipe show page
* Seed intial recipe/user data

#### Day 2 
* Recipe show page frontend
* Backend for recipe selector

#### Day 3
* Backend for recipe selector
* Implement maps

#### Day 4
* Implement feed
* Search backend

#### Day 5
* Search frontend

#### Day 6
* Finish styling
