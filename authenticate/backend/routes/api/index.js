const router = require('express').Router();

const { User } = require('../../db/models');

const { restoreUser } = require('../../utils/auth.js');

router.use(restoreUser);

router.get(
  '/restore-user',
  (req, res) => {
    return res.json(req.user);
  }
);

module.exports = router;