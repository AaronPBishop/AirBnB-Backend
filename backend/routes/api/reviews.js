const express = require('express');

const { Spot, Image, User, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();

// Edit a review
router.put('/:reviewId', requireAuth, async (req, res, next) => {
    const { review, stars } = req.body;

    const reviewToUpdate = await Review.findByPk(req.params.reviewId);

    if (!reviewToUpdate) return res.status(404).json({"message": "Review couldn't be found", "statusCode": 404});

    if (reviewToUpdate.userId !== req.user.id) return res.status(404).json({"message": "Only the owner of this review has permission to edit", "statusCode": 404});

    if (stars === null || typeof stars !== 'number' || stars < 1 || stars > 5) {
        const err = new Error('Validation error');
        err.status = 400;
        err.title = 'Validation error';
        err.errors = ['Stars must be an integer from 1 to 5'];
        return next(err);
    };

    try {
        await reviewToUpdate.update({ review, stars });

        return res.json(reviewToUpdate);
    } catch (e) {
        e.status = 400;
        next(e);
    };
});

// Delete a review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewId = await Review.findByPk(req.params.reviewId);

    if (!reviewId) return res.status(404).json({"message": "Review couldn't be found", "statusCode": 404});

    if (reviewId.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner of this review to delete", "statusCode": 403});

    await reviewId.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statusCode": 200});
});

// Get all reviews of the current user
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: { userId: req.user.id },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: ['id', 'ownerId', 'address', 'city', 'state', 'country', 'lat', 'lng', 'name', 'price', 'previewImage']
            },
            {
                model: Image,
                as: 'ReviewImages',
                attributes: ['id', 'url']
            },
        ]
    });

    return res.json({ Reviews: reviews });
});

// Add an image to a review based on the review id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;
    const reviewId = await Review.findByPk(req.params.reviewId);
    const allImages = await Image.findAll({
        where: { reviewId: req.params.reviewId }
    });

    if (!reviewId) return res.status(404).json({"message": "Review couldn't be found", "statusCode": 404});

    if (reviewId.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner of this review to add an image", "statusCode": 403});

    if (allImages.length > 9) return res.status(400).json({"message": "Maximum number of images for this resource was reached", "statusCode": 400});

    const newImage = await Image.create({
        userId: reviewId.userId,
        spotId: reviewId.spotId,
        reviewId: reviewId.id,
        url
    });

    const { id } = newImage;

    res.json({id, url});
});

// Delete an image for a review
router.delete('/:reviewId/images/:imageId', requireAuth, async (req, res) => {
    const reviewId = await Review.findByPk(req.params.reviewId);
    const imageId = await Image.findByPk(req.params.imageId);

    if (!imageId) return res.status(404).json({"message": "Review image couldn't be found", "statusCode": 404});

    if (reviewId.userId !== req.user.id) return res.status(403).json({"message": "You must be the owner of this review to delete this image", "statusCode": 403});

    await imageId.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statusCode": 200});
});

module.exports = router;