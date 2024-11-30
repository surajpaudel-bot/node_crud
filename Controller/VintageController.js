// Importing the required modules
const mongoose = require("mongoose"); // Mongoose ORM to interact with MongoDB
const Vintage = require("../model/VintageModel"); // Vintage model for database operations

// Logic to display all items from the database
const displayAllItems = (req, res) => {
    // Using Mongoose to find all Vintage items in the database
    Vintage.find()
    .then((result) => {
        // Render the "index" page with the fetched items
        res.render("index", { newVintage: result });
    })
    .catch((error) => {
        // Log error if the database query fails
        console.log(error);
    });
};

// Route handler to render the "create new item" form
const createNew_get = (req, res) => {
    // Render the "create" view which contains the form to create new items
    res.render("create");
};

// Logic for handling the form submission to create a new item
const createNew_post = (req, res) => {
    // Create a new Vintage item from the request body (data submitted in the form)
    const newVintage = new Vintage(req.body);

    // Save the new item to the database
    newVintage.save()
    .then((results) => {
        // On success, redirect to the home page
        res.redirect("/");
        console.log(results);  // Log the saved result
    })
    .catch((error) => {
        // Log any errors and send a 500 status response
        console.log(error);
        res.status(500);
    });
};

// Route handler to display the form to update an item
const update_get = (req, res) => {
    // Get the item ID from the URL parameter
    const itemId = req.params.id;

    // Find the item by ID in the database
    Vintage.findById(itemId)
    .then((result) => {
        // If the item is found, render the "edit" page with the item details
        res.render("edit", { item: result });
    })
    .catch((err) => {
        // If there is an error (e.g., item not found), log it and redirect to home
        console.log(err);
        res.redirect("/");
    });
};

// Logic for handling the update of an item in the database
const update_post = (req, res) => {
    // Get the item ID from the URL parameter
    const item_id = req.params.id;

    // Get the updated data from the request body
    const updated_data = req.body;

    // Find the item by ID and update it with the new data
    Vintage.findByIdAndUpdate(item_id, updated_data)
    .then((result) => {
        // On success, redirect to the home page
        console.log(result);  // Log the updated result
        res.redirect("/");
    })
    .catch((error) => {
        // Log any errors during the update process
        console.log(error);
    });
};

// Logic to delete an item from the database by its ID
const DeleteById = (req, res) => {
    // Get the item ID from the URL parameter
    const item_id = req.params.id;

    // Use Mongoose to delete the item by its ID
    Vintage.deleteOne({ _id: item_id })
    .then((result) => {
        // On successful deletion, log the message and redirect to the home page
        console.log("Delete Successful");
        res.redirect("/");
    })
    .catch((error) => {
        // Log any errors during the deletion process
        console.log(error);
    });
};

// Export the controller methods so they can be used in the routes
module.exports = {
    displayAllItems,
    createNew_get,
    createNew_post,
    update_get,
    update_post,
    DeleteById
};
