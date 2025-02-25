const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Admin check middleware
const isAdmin = (req, res, next) => {
    if (!req.session.user || !req.session.user.isAdmin) {
        return res.status(403).redirect('/');
    }
    next();
};

// List all users
router.get('/', isAdmin, (req, res) => {
    const users = userService.getAll();
    res.render('users/list', {
        title: 'User Management',
        users
    });
});

// Toggle admin status
router.post('/:id/toggle-admin', isAdmin, (req, res) => {
    try {
        userService.toggleAdmin(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

// Toggle user active status
router.post('/:id/toggle-active', isAdmin, (req, res) => {
    try {
        userService.toggleActive(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

// Delete user
router.post('/:id/delete', isAdmin, (req, res) => {
    try {
        userService.delete(req.params.id);
        res.redirect('/users');
    } catch (error) {
        res.status(500).render('error', {
            title: 'Error',
            message: error.message
        });
    }
});

module.exports = router; 