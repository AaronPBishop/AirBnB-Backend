const express = require('express');

const { Spot, Image, User, Review, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth.js');

const router = express.Router();



module.exports = router;