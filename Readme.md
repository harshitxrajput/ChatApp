# ChatSync - Real-time Chat Application

Live Demo: [ChatSync](https://chatsync-c0xd.onrender.com)

ChatSync is a modern real-time chat application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) that enables users to communicate instantly with each other.

## Features

- Real-time messaging using Socket.IO
- User authentication and authorization
- Profile customization with avatar uploads
- Online/Offline user status
- Image sharing in chats
- Multiple theme options
- Responsive design
- Secure password handling
- JWT-based authentication

## Technology Stack

### Frontend
- **React.js** - A JavaScript library for building user interfaces
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind CSS
- **Zustand** - Lightweight state management
- **Axios** - Promise-based HTTP client
- **Socket.IO Client** - Real-time bidirectional communication
- **React Router DOM** - Client-side routing
- **React Hot Toast** - Toast notifications
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Socket.IO** - Real-time engine
- **JWT** - JSON Web Tokens for authentication
- **Bcrypt.js** - Password hashing
- **Cloudinary** - Cloud storage for images
- **Cookie Parser** - Parse HTTP cookies
- **CORS** - Cross-Origin Resource Sharing

## Project Structure

### Frontend (`/frontend`)
```
frontend/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/         # Route components
│   ├── store/         # Zustand state management
│   ├── lib/           # Utilities and configurations
│   └── constants/     # Constants and configurations
```

### Backend (`/backend`)
```
backend/
├── src/
│   ├── controllers/   # Request handlers
│   ├── models/       # Database schemas
│   ├── routes/       # API routes
│   ├── middleware/   # Custom middleware
│   └── lib/         # Utilities and configurations
```

## API Documentation

### Authentication Routes

#### POST /api/auth/signup
Register a new user
```json
// Request
{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "123456"
}

// Response - 201 Created
{
    "_id": "65f1c3c27819f0ff08e7b123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": ""
}
```

#### POST /api/auth/login
Login existing user
```json
// Request
{
    "email": "john@example.com",
    "password": "123456"
}

// Response - 200 OK
{
    "_id": "65f1c3c27819f0ff08e7b123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "",
    "message": "User login successfully"
}
```

#### GET /api/auth/logout
Logout current user
```json
// Response - 200 OK
{
    "message": "User logged out successfully"
}
```

#### PUT /api/auth/update-profile
Update user profile picture
```json
// Request
{
    "profilePic": "base64_encoded_image_string"
}

// Response - 200 OK
{
    "message": "Profile updated successfully",
    "updatedUser": {
        "_id": "65f1c3c27819f0ff08e7b123",
        "fullName": "John Doe",
        "email": "john@example.com",
        "profilePic": "https://res.cloudinary.com/demo/image/upload/v1234567/profile.jpg"
    }
}
```

#### GET /api/auth/get-profile
Get current user profile
```json
// Response - 200 OK
{
    "_id": "65f1c3c27819f0ff08e7b123",
    "fullName": "John Doe",
    "email": "john@example.com",
    "profilePic": "https://res.cloudinary.com/demo/image/upload/v1234567/profile.jpg"
}
```

### Message Routes

#### GET /api/message/user
Get all users for sidebar
```json
// Response - 200 OK
{
    "filteredUsers": [
        {
            "_id": "65f1c3c27819f0ff08e7b456",
            "fullName": "Jane Smith",
            "email": "jane@example.com",
            "profilePic": "https://res.cloudinary.com/demo/image/upload/v1234567/jane.jpg"
        },
        {
            "_id": "65f1c3c27819f0ff08e7b789",
            "fullName": "Mike Johnson",
            "email": "mike@example.com",
            "profilePic": "https://res.cloudinary.com/demo/image/upload/v1234567/mike.jpg"
        }
    ]
}
```

#### GET /api/message/:id
Get chat messages with specific user
```json
// Response - 200 OK
[
    {
        "_id": "65f1c3c27819f0ff08e7b789",
        "senderId": "65f1c3c27819f0ff08e7b123",
        "receiverId": "65f1c3c27819f0ff08e7b456",
        "text": "Hello Jane!",
        "image": null,
        "createdAt": "2024-03-13T12:00:00.000Z"
    },
    {
        "_id": "65f1c3c27819f0ff08e7b790",
        "senderId": "65f1c3c27819f0ff08e7b456",
        "receiverId": "65f1c3c27819f0ff08e7b123",
        "text": "Hi John! How are you?",
        "image": null,
        "createdAt": "2024-03-13T12:01:00.000Z"
    }
]
```

#### POST /api/message/send/:id
Send message to specific user
```json
// Request
{
    "text": "Hi there!",
    "image": "base64_encoded_image_string"
}

// Response - 201 Created
{
    "_id": "65f1c3c27819f0ff08e7b791",
    "senderId": "65f1c3c27819f0ff08e7b123",
    "receiverId": "65f1c3c27819f0ff08e7b456",
    "text": "Hi there!",
    "image": "https://res.cloudinary.com/demo/image/upload/v1234567/message.jpg",
    "createdAt": "2024-03-13T12:02:00.000Z"
}
```

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/harshitxrajput/ChatApp.git
cd ChatApp
```

2. Install dependencies
```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Environment Variables

Create a `.env` file in the backend directory:
```env
PORT=5001
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_CLOUD_SECRET=your_cloudinary_secret
```

4. Start the application
```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

## Features in Detail

### Real-time Communication
- Instant message delivery using Socket.IO
- Online/Offline status updates
- Real-time typing indicators

### Authentication & Security
- JWT-based authentication
- HTTP-only cookies
- Password hashing with bcrypt
- Protected API routes

### User Experience
- 30+ theme options with DaisyUI
- Responsive design for all devices
- Image sharing capabilities
- User-friendly toast notifications
- Smooth navigation with React Router

### State Management
- Efficient state handling with Zustand
- Persistent theme preferences
- Managed WebSocket connections

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
