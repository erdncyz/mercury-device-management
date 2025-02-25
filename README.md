# ☿ Mercury Device Management

A web application developed for tracking corporate devices (phones, tablets, Apple TV, Android TV).

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

3. Default admin user:
   ```
   Username: admin
   Password: admin123
   ```

4. Start the application:
   ```bash
   # For development
   npm run dev

   # For production
   npm start
   ```

5. Visit `http://localhost:3000` in your browser to view the application.

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
│   └── devices.js
├── views/                # EJS templates
│   ├── layouts/
│   │   └── main.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   └── devices/
│       ├── list.ejs
│       ├── add.ejs
│       └── edit.ejs
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

## Security

- User passwords are hashed with bcrypt
- Session-based authentication
- Admin-only routes protection
- Input validation and sanitization

## Data Persistence

All data is stored in JSON files:
- Data persists in the file system
- Data survives server restarts
- Backup by copying JSON files

## License

ISC