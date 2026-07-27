const express = require("express");

const router = express.Router();

const {
    login,
    callback,
    session,
    logout
} = require("../controllers/auth.controller");



router.get(
    "/google",
    login
);



router.get(
    "/google/callback",
    callback
);



router.get(
    "/session",
    session
);



router.post(
    "/logout",
    logout
);



module.exports = router;
