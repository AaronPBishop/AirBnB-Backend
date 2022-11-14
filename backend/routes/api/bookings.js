const express = require('express');

const { Spot, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();

// Edit a booking
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const { startDate, endDate } = req.body;

    const bookingToUpdate = await Booking.findByPk(req.params.bookingId);

    if (!bookingToUpdate) return res.status(404).json({"message": "Booking couldn't be found", "statusCode": 404});

    if (bookingToUpdate.userId !== req.user.id) return res.status(404).json({"message": "Only the owner of this review has permission to edit", "statusCode": 404});

    if (bookingToUpdate.endDate < new Date()) return res.status(403).json({"message": "Past bookings can't be modified", "statusCode": 403});

    const relevantBookingsId = bookingToUpdate.spotId;
    const allBookings = await Booking.findAll({ where: { spotId: relevantBookingsId } });

    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    for (let booking of allBookings) {
        if (booking.id !== bookingToUpdate.id && startDateObj.getTime() === booking.startDate.getTime() && endDateObj.getTime() === booking.endDate.getTime()) return res.status(403).json({"message": "Sorry, this spot is already booked for the specified dates", "statusCode": 403});

        if (booking.id !== bookingToUpdate.id && startDateObj >= booking.startDate && startDateObj <= booking.endDate) return res.status(403).json({"message": "Start date conflicts with an existing booking", "statusCode": 403});

        if (booking.id !== bookingToUpdate.id && endDateObj <= booking.endDate && endDateObj >= booking.startDate) return res.status(403).json({"message": "End date conflicts with an existing booking", "statusCode": 403});
    };

    try {
        await bookingToUpdate.update({ startDate, endDate });

        return res.json(bookingToUpdate);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

router.delete('/:bookingId', requireAuth, async (req, res) => {
    const bookingId = await Booking.findByPk(req.params.bookingId);

    if (!bookingId) return res.status(404).json({"message": "Booking couldn't be found", "statusCode": 404});

    if (bookingId.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner of this booking in order to delete", "statusCode": 403});

    if (new Date() >= bookingId.startDate && new Date() < bookingId.endDate) return res.status(403).json({"message": "Bookings that have been started can't be deleted", "statusCode": 403});

    await bookingId.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statusCode": 200});
});

// Get all of the user's current bookings
router.get('/current', requireAuth, async (req, res) => {
    const userBookings = await Booking.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
            },
        ]
    });

    return res.json(userBookings);
});

module.exports = router;