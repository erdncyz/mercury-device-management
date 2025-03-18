const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const readline = require('readline');

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Data file path
const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');

// Ensure data directory exists
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize empty users array if file doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, '[]', 'utf8');
}

console.log('====================================');
console.log('Mercury Device Management - Admin Setup');
console.log('====================================\n');

function promptUsername() {
  rl.question('Enter admin username: ', (username) => {
    if (!username.trim()) {
      console.log('Username cannot be empty. Please try again.');
      return promptUsername();
    }
    
    promptPassword(username);
  });
}

function promptPassword(username) {
  rl.question('Enter admin password: ', (password) => {
    if (!password.trim()) {
      console.log('Password cannot be empty. Please try again.');
      return promptPassword(username);
    }
    
    createAdmin(username, password);
  });
}

function createAdmin(username, password) {
  // Create admin user
  const admin = {
    username: username,
    password: password, 
    isAdmin: true,
    isActive: true,
    id: uuidv4()
  };
  
  try {
    // Read existing users
    const users = JSON.parse(fs.readFileSync(usersFile, 'utf8'));
    
    // Check if admin already exists
    const adminExists = users.some(user => user.username === username);
    
    if (adminExists) {
      console.log(`\n⚠️ User '${username}' already exists. Updating password and ensuring admin rights.`);
      
      // Update existing admin
      const updatedUsers = users.map(user => {
        if (user.username === username) {
          return { ...user, password, isAdmin: true, isActive: true };
        }
        return user;
      });
      
      fs.writeFileSync(usersFile, JSON.stringify(updatedUsers, null, 2), 'utf8');
    } else {
      // Add new admin
      users.push(admin);
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2), 'utf8');
    }
    
    console.log(`\n✅ Admin user '${username}' successfully created/updated!`);
    console.log('\nYou can now start the application with: npm start');
    
  } catch (error) {
    console.error('\n❌ Error creating admin user:', error.message);
  }
  
  rl.close();
}

// Start the prompt flow
promptUsername(); 