const express = require('express');

const { Spot, Image, User, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const { Op, json } = require('sequelize');

const router = express.Router();

// Get All Spots
router.get('/', async (req, res) => {
    const returnSpots = await Spot.findAll();

    return res.json({ Spots: returnSpots });
});

// Create a spot
router.post('/', requireAuth, async (req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const ownerId = req.user.id;

    try {
        const newSpot = await Spot.create({
            ownerId,
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        });

        return res.status(201).json(newSpot);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

// Get a spot based on spotId
router.get('/:spotId', async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    
    const specifiedSpot = await Spot.findOne({
        where: { id: req.params.spotId },

        include: [
            {
                model: Image,
                as: 'SpotImages',
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ],
    });

    return res.json(specifiedSpot);
});

// Edit a spot
router.put('/:spotId', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    if (spotId.ownerId !== req.user.id) return res.status(403).json({"message": "Only the owner of the spot is authorized to edit",
    "statusCode": 403});

    const spotToUpdate = await Spot.findOne({
        where: { id: req.params.spotId },
        attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'description', 'price', 'createdAt', 'updatedAt'],
    });

    await spotToUpdate.update({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
        updatedAt: new Date()
    });

    return res.json(spotToUpdate);
});

// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    if (spotId.ownerId !== req.user.id) return res.status(403).json({"message": "Only the owner is authorized to delete this spot", "statusCode": 403});

    await spotId.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statusCode": 200});
});

// Get all spots owned by the current user
router.get('/current/:userId', requireAuth, async (req, res) => {
    const userId = req.params.userId;

    const userSpots = await Spot.findAll({
        where: { ownerId: {[Op.in]: [userId]} }
    });

    return res.json({ Spots: userSpots });
});

// Get all bookings for a spot based on spotId
// ** Check owner order is valid **
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    
    const nonOwnerBookingsData = await Booking.findAll({
        where: { spotId: req.params.spotId },
        attributes: ['spotId', 'startDate', 'endDate']
    });

    const ownerBookingsData = await Booking.findAll({
        where: { spotId: req.params.spotId },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
        ],
    });

    if (req.user.id !== spotId.ownerId) return res.json({Bookings: nonOwnerBookingsData});
    if (req.user.id === spotId.ownerId) return res.json({Bookings: ownerBookingsData});
});

// Get all reviews based on spotId 
// ** Multiple reviews being returned when new review posted **
router.get('/:spotId/reviews', async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    
    const reviews = await Review.findAll({
        where: { spotId: req.params.spotId },

        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            },
        ],
    });

    return res.json({Reviews: reviews});
});

// Create a booking for a spot based on spotId 
// ** Verify Dates Working **
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});
    if (spotId.ownerId === req.user.id) return res.status(403).json({"message": "You cannot create a booking for a spot that you own", "statusCode": 403});

    try {
        const spotBookings = await Booking.findAll({
            where: { spotId: req.params.spotId }
        });
    
        const newBooking = await Booking.build({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate,
            endDate
        });
    
        spotBookings.forEach(booking => {
            if (newBooking.startDate === booking.startDate && newBooking.endDate === booking.endDate) return res.status(403).json({"message": "Sorry, this spot is already booked for the specified dates", "statusCode": 403});

            if (newBooking.startDate === booking.startDate || newBooking.startDate >= booking.startDate && newBooking.startDate <= booking.endDate) return res.status(403).json({"message": "Start date conflicts with an existing booking", "statusCode": 403});
    
            if (newBooking.endDate === booking.endDate || newBooking.endDate <= booking.endDate && newBooking.endDate >= booking.startDate) return res.status(403).json({"message": "End date conflicts with an existing booking", "statusCode": 403});
        });
    
        await newBooking.save();
        return res.json(newBooking);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

// Create a review for a spot based on spotId
router.post('/:spotId/reviews', requireAuth, async (req, res) => {
    const { review, stars } = req.body;
    const spotId = await Spot.findByPk(req.params.spotId);

    const spotReviews = await Review.findAll({
        where: { spotId: req.params.spotId }
    });

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});

    spotReviews.forEach(review => {
        if (review.userId === req.user.id) return res.status(403).json({"message": "You can only post one review per spot", "statusCode": 403});
    });

    if (stars === null || typeof stars !== 'number' || stars < 1 || stars > 5) {
        const err = new Error('Validation error');
        err.status = 400;
        err.title = 'Validation error';
        err.errors = ['Stars must be an integer from 1 to 5'];
        return next(err);
    };

    try {
        const newReview = await Review.create({
            userId: req.user.id,
            spotId: req.params.spotId,
            review,
            stars
        });

        return res.json(newReview);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

// Add an image to a spot based on spotId
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});

    if (req.user.id !== spotId.ownerId) return res.status(403).json({"message": "You must own this spot to post an image",
    "statusCode": 403});

    const newImage = await Image.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        url: req.body.url,
        preview: req.body.previewImage
    });

    const { id, url, preview } = newImage; 

    return res.json({id, url, preview});
});

// Delete an image for a spot
router.delete('/:spotId/images/:imageId', requireAuth, async (req, res) => {
    const spotId = await Spot.findByPk(req.params.spotId);

    const imageToDelete = await Image.findOne({
        where: {
            id: req.params.imageId,
            spotId: req.params.spotId
        }
    });

    if (!spotId) return res.status(404).json({"message": "Spot couldn't be found",
    "statusCode": 404});

    if (!imageToDelete) return res.status(404).json({"message": "Spot Image couldn't be found",
    "statusCode": 404});

    if (req.user.id !== spotId.ownerId) return res.status(200).json({"message": "Spot must belong to the current user in order to delete an image", "statuscode": 403});

    await imageToDelete.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statuscode": 200});
});

module.exports = router;