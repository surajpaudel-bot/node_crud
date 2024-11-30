// Import mongoose module to interact with MongoDB
const mongoose = require("mongoose");

// Define the schema for the Vintage model
const VintageSchema = new mongoose.Schema({
    // Define the item name as a string
    item_name: { type: String },
    
    // Define the item description as a string
    item_description: { type: String },
    
    // Define the item price as a number (updated from String to Number for proper numerical operations)
    item_price: { type: Number },
    
    // Define the manufactured year as a number (updated from String to Number for better numerical handling)
    item_year: { type: Number },
    
    // Define the item status as a string (e.g., "new", "used")
    item_status: { type: String },
    
    // Define the image URL as a string (URL of the product image)
    image_url: { type: String }
});

// Create a model using the schema, which will interact with the "Vintage" collection in MongoDB
const Vintage = mongoose.model("Vintage", VintageSchema);

// Export the Vintage model to be used in other parts of the application
module.exports = Vintage;
