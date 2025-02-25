const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '..', 'data', 'users.json');
const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));

// Tüm kullanıcıları aktif yap
const updatedUsers = users.map(user => ({
    ...user,
    isActive: true
}));

// Dosyaya kaydet
fs.writeFileSync(usersFile, JSON.stringify(updatedUsers, null, 2));
console.log('All users have been activated'); 