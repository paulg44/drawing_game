<!-- File to hold my current plans -->

Currently the user selects a category (shapes, letters, etc) then the project selects a random item from the category. This is in json format locally and I am switching it to MongoDB.

I have the route set up for querying the database. I now need to pass the the category and random item name to the database to send back the data.

- Pass category name to query correct database
- Pass random item from category (in the future select random item from database?)
- If I change the items to just an array of names all the variables through the app will need to change from randomItem to randomItem

- user clicks category, random item is selected then thats passed to database and whats sent back displayed on display page
- have one database for now with all 16 options in. Extra databases next
