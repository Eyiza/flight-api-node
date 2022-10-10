const {Flight} = require('../models/Flight');
const {v4: uuid} = require('uuid');

// Get all flights
exports.getFlights = async(req, res) => {
    try {
        const flights = Flight;
        res.status(200).json(
            {
                message: "All flights",
                flights: flights
            }
        );
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Get a single flight
exports.getFlight = async(req, res) => {
    try {
        let id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id);
        res.status(200).json(
            {
                message: "Flight found",
                flight
            }
        );
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Create a flight
exports.createFlight = async(req, res) => {    
    try {
        const flight = await req.body;
        flight.id = uuid();
        Flight.push(flight);
        res.status(201).json({
            message: "Flight created",
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Update a flight
exports.updateFlight = async(req, res) => {
    try {
        let id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id);
        const {title, time, price, date} = await req.body;
        flight.title = title;
        flight.time = time;
        flight.price = price;
        flight.date = date;
        res.status(200).json({
            message: "Flight updated",
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Delete a flight
exports.deleteFlight = async(req, res) => {
    try {
        let id = req.params.id;
        const flight = Flight.find((flight) => flight.id === id);
        Flight.splice(Flight.indexOf(flight), 1); // Remove 1 flight at the index of the flight
        res.status(200).json({
            message: "Flight deleted",
            flight
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
