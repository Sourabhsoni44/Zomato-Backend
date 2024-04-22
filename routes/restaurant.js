let mongoose = require('mongoose');
let express = require("express");
let router = express.Router();
let Restaurant = require("../models/restaurant");

// Create a new restaurant
router.post('/restro', async (req, res) => {
    try {
        let restaurant = new Restaurant(req.body);
        await restaurant.save();
        res.status(201).json({ restaurant, msg: "Restaurant created successfully" });
    } catch (error) {
        console.error('Error creating restaurant:', error);
        res.status(500).json({ error: 'Failed to create restaurant' });
    }
});

// Get all restaurants
router.get('/restro', async (req, res) => {
    try {
        let restaurants = await Restaurant.find();
        if (restaurants.length === 0) {
            return res.status(404).json({ error: 'No restaurants found' });
        }
        res.status(200).json(restaurants);
    } catch (error) {
        console.error('Error fetching restaurants:', error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
});

// Get a single restaurant by ID
router.get('/restro/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error fetching restaurant by ID:', error);
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
});

// Update a restaurant by ID
router.patch('/restro/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json(restaurant);
    } catch (error) {
        console.error('Error updating restaurant:', error);
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
});

// Delete a restaurant by ID
router.delete('/restro/:id', async (req, res) => {
    try {
        let restaurant = await Restaurant.findByIdAndDelete(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.status(200).json({ msg: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error('Error deleting restaurant:', error);
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
});

module.exports = router;
