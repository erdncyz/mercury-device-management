const express = require('express');
const router = express.Router();
const deviceService = require('../services/deviceService');

// Authentication middleware
const isAuthenticated = (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/auth/login');
    }
    next();
};

// Home page
router.get('/', isAuthenticated, (req, res) => {
    const devices = deviceService.getAll();
    res.render('index', {
        title: 'Home',
        devices
    });
});

module.exports = router; 