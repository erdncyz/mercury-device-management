const StorageService = require('./storageService');
const bcrypt = require('bcryptjs');

class UserService extends StorageService {
    constructor() {
        super('users');
        this.initializeAdmin();
    }

    // Initialize admin user
    async initializeAdmin() {
        const users = this.getAll();
        if (users.length === 0) {
            this.create({
                username: 'admin',
                password: 'admin123',
                isAdmin: true,
                isActive: true // Admin otomatik aktif
            });
        }
    }

    // User login
    async login(username, password) {
        const users = super.getAll();
        const user = users.find(u => u.username === username && u.password === password);
        
        if (user) {
            if (!user.isActive) {
                throw new Error('Your account is waiting for admin approval');
            }
            // Return user info without password
            const { password, ...userWithoutPassword } = user;
            return userWithoutPassword;
        }
        return null;
    }

    // Register new user
    async register(userData) {
        const existingUser = this.getAll().find(u => u.username === userData.username);
        if (existingUser) {
            throw new Error('Username is already taken');
        }

        return this.create({
            ...userData,
            isAdmin: false,
            isActive: false // Yeni kullanıcılar pasif başlar
        });
    }

    // Get all users (with passwords)
    getAll() {
        const users = super.getAll();
        return users;
    }

    // Toggle admin status
    toggleAdmin(id) {
        const user = this.getById(id);
        if (!user) throw new Error('User not found');
        if (user.username === 'admin') throw new Error('Cannot modify main admin privileges');
        
        user.isAdmin = !user.isAdmin;
        this.update(id, user);
        return user;
    }

    // Toggle user active status
    toggleActive(id) {
        const user = this.getById(id);
        if (!user) throw new Error('User not found');
        if (user.username === 'admin') throw new Error('Cannot modify main admin status');
        
        user.isActive = !user.isActive;
        this.update(id, user);
        return user;
    }

    // Delete user
    delete(id) {
        const user = this.getById(id);
        if (!user) throw new Error('User not found');
        if (user.username === 'admin') throw new Error('Cannot delete main admin user');
        
        super.delete(id);
    }
}

module.exports = new UserService(); 