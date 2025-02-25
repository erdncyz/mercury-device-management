const StorageService = require('./storageService');

class DeviceService extends StorageService {
    constructor() {
        super('devices');
    }

    // Create new device
    create(deviceData) {
        return super.create({
            ...deviceData,
            assignmentDate: new Date().toISOString()
        });
    }

    // Update device
    update(id, deviceData) {
        const existingDevice = this.getById(id);
        if (!existingDevice) throw new Error('Device not found');

        return super.update(id, {
            ...deviceData,
            assignmentDate: deviceData.assignedTo !== existingDevice.assignedTo 
                ? new Date().toISOString() 
                : existingDevice.assignmentDate
        });
    }

    // Get device by serial number
    getBySerialNumber(serialNumber) {
        const devices = this.getAll();
        return devices.find(device => device.serialNumber === serialNumber);
    }

    // Check if serial number exists
    isSerialNumberExists(serialNumber, excludeId = null) {
        const devices = this.getAll();
        return devices.some(device => 
            device.serialNumber === serialNumber && device.id !== excludeId
        );
    }

    // Validate device data
    validateDevice(deviceData, excludeId = null) {
        if (!deviceData.name) throw new Error('Device name is required');
        if (!deviceData.type) throw new Error('Device type is required');
        if (!deviceData.serialNumber) throw new Error('Serial number is required');
        
        if (this.isSerialNumberExists(deviceData.serialNumber, excludeId)) {
            throw new Error('Serial number already exists');
        }
    }

    // Cihaz tipine göre filtreleme
    getByType(type) {
        const devices = this.getAll();
        return devices.filter(device => device.type === type);
    }

    // Kişiye atanmış cihazları getir
    getByAssignedPerson(personName) {
        const devices = this.getAll();
        return devices.filter(device => device.assignedTo === personName);
    }
}

module.exports = new DeviceService(); 