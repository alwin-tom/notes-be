const router = require("express").Router();

const {
    login,
    callback
} = require("../controllers/auth.controller");



router.get(
    "/google",
    login
);


router.get(
    "/google/callback",
    callback
);


module.exports = router;
