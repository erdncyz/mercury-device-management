const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

class StorageService {
    constructor(entity) {
        this.entity = entity;
        this.dataPath = path.join(__dirname, '..', 'data', `${entity}.json`);
        this.initializeStorage();
    }

    // Initialize storage file if it doesn't exist
    initializeStorage() {
        if (!fs.existsSync(this.dataPath)) {
            fs.writeFileSync(this.dataPath, '[]', 'utf8');
        }
    }

    // Get all records
    getAll() {
        const data = fs.readFileSync(this.dataPath, 'utf8');
        return JSON.parse(data);
    }

    // Get record by ID
    getById(id) {
        const items = this.getAll();
        return items.find(item => item.id === id);
    }

    // Create new record
    create(data) {
        const items = this.getAll();
        const newItem = {
            ...data,
            id: uuidv4()
        };
        items.push(newItem);
        this.saveData(items);
        return newItem;
    }

    // Update existing record
    update(id, data) {
        const items = this.getAll();
        const index = items.findIndex(item => item.id === id);
        if (index === -1) throw new Error('Record not found');

        items[index] = { ...data, id };
        this.saveData(items);
        return items[index];
    }

    // Delete record
    delete(id) {
        const items = this.getAll();
        const filteredItems = items.filter(item => item.id !== id);
        this.saveData(filteredItems);
    }

    // Save data to file
    saveData(data) {
        fs.writeFileSync(this.dataPath, JSON.stringify(data, null, 2), 'utf8');
    }
}

module.exports = StorageService; 