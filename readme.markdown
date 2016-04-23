Normal Mode
View Mockups here

Goals

Your job is to take what you have learned about routing in Express and add a SQL database to the mix to provide persistent storage. You'll need to flex your Angular-fu, your understanding of Express routing, and server-side logic to make it work.

Input

On your index.html page, create two text inputs, one for capturing names, the other for capturing patronuses (that is the correct spelling according to this).
When each form is submitted, it should POST data to a new Node/Express route named for what it handles, i.e. person.js and patronus.js. See the routes section below.

Tables
Your app will have two tables: people and patronuses.
The people table will need to have a Primary Key person_id field plus a first_name, last_name, and an patronus_id (Foreign Key). Your patronuses table will likewise need an patronus_id (Primary Key) field, plus patronus_name.
Note that we will be storing the patronus_id given for a person in the people.patronus_id column.

Routes

people.js
This router module will handle GET, POST and PUT requests to the /people URL.
A GET request to the /people URL should return a list of all of the people currently in our database.
A GET request to the /people/<person_id> will retrieve a person based on their person_id, for example GET /people/123 would respond with the person information associated with the person_id of 123.

Each 'person' object that is included in the response should include it's associated patronus (if one exists for that person). To get this information, you will need to JOIN the patronus table.

A POST request to the /people URL will create a new person and store it in the database. Inititally, a person should not be associated with a patronus.

A PUT request to the /people/<person_id> URL should update that person. For example to associate a patronus with a patronus_id of 42 with a person with a person_id of 16, you could issue a PUT /people/16 with a body of {"patronus_id" : 42}. This route will need to use an UPDATE query to accomplish this.

You will need to bring in the npm module 'pg' to interface with the database from within the routes.

patronuses.js

This router module will do almost the same thing as people.js, but for the patronus data instead. Define GET routes that will retrieve the entire collection of patronuses and a specific patronus and a POST route that will store new patronuses.

Displaying People and Patronuses

When the page loads, all of the people and patronuses should be displayed (if there are any on the server). When a new person or patronus is created, the page should be updated to reflect this new information.

Hard Mode
Assigning Patronuses to People

In addition to just listing people and patronuses, create some functionality to assign a patronus to a person. Create two <select> elements within a form. Add a submit button that when submitted will take the currently selected inputs and associate them on the server. This can be accomplished by issuing a PUT request to the correct person with the correct patronus id included in the body. For example sending PUT /people/123 with a body of {"patronus_id" : 456} should associate that patronus with that person.

When a person is assigned an patronus successfully, their listing should be removed from the name list on the DOM and from the person drop down menu.

The completed assignment paring should be placed in a new section on the DOM which will list all of the information for every completed assignment.

Patronuses can be duplicated across assignments. People only get one patronus assigned.

Pro Mode
Deploy

Deploy your new app to heroku!
