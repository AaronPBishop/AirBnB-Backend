const express = require('express');

const { Spot, Image, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');
const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const imageToDelete = await Image.findByPk(req.params.imageId);

    if (!imageToDelete) return res.status(404).json({"message": "Image couldn't be found", "statusCode": 404});

    const imageSpot = await Spot.findOne({ where: { id: imageToDelete.spotId } });
    const imageReview = await Review.findOne({ where: { id: imageToDelete.reviewId }});

    if (imageSpot && req.user.id !== imageSpot.ownerId) return res.status(200).json({"message": "Spot must belong to the current user in order to delete an image", "statuscode": 403});
    if (imageReview && req.user.id !== imageReview.userId) return res.status(200).json({"message": "Review must belong to the current user in order to delete an image", "statuscode": 403});

    await imageToDelete.destroy();

    return res.status(200).json({"message": "Successfully deleted", "statuscode": 200});
});

module.exports = router;