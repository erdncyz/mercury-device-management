# ☿ Mercury Device Management

A web application developed for tracking corporate devices (phones, tablets, Apple TV, Android TV).

![image](https://github.com/user-attachments/assets/c0346fb8-26ad-4583-bf2d-7076a212ea9f)

![image](https://github.com/user-attachments/assets/8fc57a8d-1712-4efa-98be-b307a5322944)

![image](https://github.com/user-attachments/assets/09e67555-94e2-4257-9ee6-edfe1f2d7250)

![image](https://github.com/user-attachments/assets/75ca8cc0-1c6b-4a18-a4c9-b96bd76db6e8)

![image](https://github.com/user-attachments/assets/bf803759-a199-40bc-8d18-29e9e3fe206c)


## Features

- **User Management**
  - Admin and regular user roles
  - Secure login system
  - Encrypted user credentials

- **Admin Features**
  - Add devices
  - Edit devices
  - Delete devices
  - View all devices
  - Assign/reassign devices
  - Manage users

- **User Features**
  - View device list
  - View device details
  - See device assignments

## Technologies

- Node.js
- Express.js
- EJS Template Engine
- Express Session
- Express EJS Layouts
- UUID
- Bcrypt.js

## Installation

1. Clone the project:
   ```bash
   git clone https://github.com/erdncyz/mercury-device-management.git
   cd mercury-device-management
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create an admin user:
   ```bash
   npm run setup
   ```
   This will prompt you to enter an admin username and password.

4. Start the application:
   ```bash
   # For development
   npm run dev

   # For production
   npm start
   ```

5. Visit `http://localhost:3000` in your browser to view the application.

## User Management

### Creating Admin Users
You can create or update admin users using the setup script:
```bash
npm run setup
```

The script will:
- Prompt you to enter a username and password
- Create a new admin user with these credentials
- If the username already exists, update the password and ensure admin rights

### User Activation
- New registered users are inactive by default
- Admin users can activate new users through the User Management page
- Only active users can log in to the system

## Data Storage

Data is stored in JSON files:
- `data/users.json`: User information
- `data/devices.json`: Device information

## Project Structure

```
project/
├── index.js                # Main application file
├── package.json           # Project dependencies
├── README.md             # Project documentation
├── data/                 # JSON data files
│   ├── users.json
│   └── devices.json
├── services/             # Data processing services
│   ├── storageService.js
│   ├── userService.js
│   └── deviceService.js
├── routes/               # Route handlers
│   ├── index.js
│   ├── auth.js
│   ├── users.js
│   └── devices.js
├── views/                # EJS templates
│   ├── layouts/
│   │   └── main.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── users/
│   │   └── list.ejs
│   └── devices/
│       ├── list.ejs
│       ├── add.ejs
│       └── edit.ejs
├── scripts/              # Utility scripts
│   └── create-admin.js   # Admin creation script
└── public/              # Static files
    ├── css/
    │   └── style.css
    └── js/
        └── main.js
```

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/register` - New user registration
- `GET /auth/logout` - Logout

### Devices
- `GET /devices` - List all devices
- `GET /devices/:id` - Show device details
- `POST /devices` - Add new device (admin only)
- `PUT /devices/:id` - Update device (admin only)
- `DELETE /devices/:id` - Delete device (admin only)

### Users
- `GET /users` - List all users (admin only)
- `POST /users/:id/toggle-admin` - Toggle admin rights (admin only)
- `POST /users/:id/toggle-active` - Activate/deactivate user (admin only)
- `POST /users/:id/delete` - Delete user (admin only)

## Security

- User passwords are hashed with bcrypt
- Session-based authentication
- Admin-only routes protection
- Input validation and sanitization
- User activation system

## Data Persistence

All data is stored in JSON files:
- Data persists in the file system
- Data survives server restarts
- Backup by copying JSON files

## License

ISC
