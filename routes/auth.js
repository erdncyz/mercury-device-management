const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Middleware to check if user is already logged in
const redirectIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return res.redirect('/');
    }
    next();
};

// Login page
router.get('/login', redirectIfAuthenticated, (req, res) => {
    res.render('auth/login', { title: 'Login' });
});

// Login process
router.post('/login', redirectIfAuthenticated, async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userService.login(username, password);
        
        if (user) {
            req.session.user = user;
            res.redirect('/');
        } else {
            res.render('auth/login', {
                title: 'Login',
                error: 'Invalid username or password'
            });
        }
    } catch (error) {
        res.render('auth/login', {
            title: 'Login',
            error: error.message
        });
    }
});

// Register page
router.get('/register', redirectIfAuthenticated, (req, res) => {
    res.render('auth/register', { title: 'Register' });
});

// Register process
router.post('/register', redirectIfAuthenticated, async (req, res) => {
    try {
        const { username, password } = req.body;
        await userService.register({ username, password });
        res.redirect('/auth/login');
    } catch (error) {
        res.render('auth/register', {
            title: 'Register',
            error: error.message
        });
    }
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/auth/login');
});

module.exports = router; 