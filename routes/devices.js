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

// Admin check middleware
const isAdmin = (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.status(403).redirect('/');
    }
    next();
};

// List all devices
router.get('/', isAuthenticated, (req, res) => {
    const devices = deviceService.getAll();
    res.render('devices/list', {
        title: 'Devices',
        devices
    });
});

// Add device page
router.get('/add', isAdmin, (req, res) => {
    res.render('devices/add', { title: 'Add Device' });
});

// Add device process
router.post('/', isAdmin, (req, res) => {
    try {
        deviceService.validateDevice(req.body);
        deviceService.create(req.body);
        res.redirect('/devices');
    } catch (error) {
        res.render('devices/add', {
            title: 'Add Device',
            error: error.message,
            device: req.body
        });
    }
});

// Edit device page
router.get('/:id/edit', isAdmin, (req, res) => {
    const device = deviceService.getById(req.params.id);
    if (!device) {
        return res.status(404).render('error', {
            title: 'Error',
            message: 'Device not found'
        });
    }
    res.render('devices/edit', {
        title: 'Edit Device',
        device
    });
});

// Update device
router.post('/:id', isAdmin, (req, res) => {
    try {
        deviceService.validateDevice(req.body, req.params.id);
        deviceService.update(req.params.id, req.body);
        res.redirect('/devices');
    } catch (error) {
        res.render('devices/edit', {
            title: 'Edit Device',
            error: error.message,
            device: { ...req.body, id: req.params.id }
        });
    }
});

// Delete device
router.post('/:id/delete', isAdmin, (req, res) => {
    try {
        deviceService.delete(req.params.id);
        res.redirect('/devices');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

module.exports = router; 