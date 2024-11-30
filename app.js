// Import required modules
const express = require("express"); // Express framework to handle routing and HTTP requests
const bodyParser = require("body-parser"); // Middleware to parse incoming request bodies
const mongoose = require("mongoose"); // Mongoose ORM to interact with MongoDB

// Import the controller for handling Vintage model actions
const VintageController = require("./Controller/VintageController");

// Import the Vintage model for CRUD operations
const Vintage = require("./model/VintageModel");

const app = express(); // Initialize the Express application

// Set the view engine to EJS for rendering dynamic HTML templates
app.set("view engine", "ejs");

// Middleware to parse URL-encoded data (form submissions)
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse JSON data in the request body
app.use(bodyParser.json());

// Connect to MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/new_db", {
    useNewUrlParser: true,  // Use the new URL parser for MongoDB
    useUnifiedTopology: true,  // Use the new unified topology layer for MongoDB
})
.then(() => console.log("Database Successfully Connected")) // Log success on connection
.catch((err) => console.log(err)); // Log errors if the connection fails

// Define routes for handling different HTTP requests

// Route for the home page which displays all items
app.get("/", VintageController.displayAllItems);

// Route for the "Create New Item" form page (GET request)
app.get("/create", VintageController.createNew_get);

// Route for submitting the "Create New Item" form (POST request)
app.post("/create", VintageController.createNew_post);

// Route to handle searching for items by name
app.get("/getbyname", (req, res) => {
    const name = req.query.item_name; // Get the item_name from the query parameters

    // If no name is provided or it's empty, redirect to the home page
    if (!name || name.trim() === "") {
        return res.redirect("/"); // Redirect to home if no search term is given
    }

    // Perform a case-insensitive search using regular expressions in MongoDB
    Vintage.find({ "item_name": { $regex: name, $options: 'i' } })
        .then((results) => {
            console.log(results);  // Log the search results for debugging
            res.render("index", { newVintage: results });  // Render the index page with search results
        })
        .catch((error) => {
            console.log(error);  // Log any errors
            res.status(500).send('Error occurred while searching for items');  // Send an error response if search fails
        });
});

// Route to render the edit form for an item (GET request)
app.get("/edit/:id", VintageController.update_get);

// Route to handle updating an item (POST request)
app.post("/update/:id", VintageController.update_post);

// Route to handle deleting an item by its ID (POST request)
app.post("/delete/:id", VintageController.DeleteById);

// Start the Express application and listen on port 8000
app.listen(8000, (err) => {
    if (err) {
        console.log(err);  // Log any errors if the server fails to start
    } else {
        console.log(`The application is successfully running on port localhost:8000`);  // Log a success message
    }
});
