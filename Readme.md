# Chat App API Documentation

## Authentication Endpoints

### Register User
Register a new user in the system.

**URL**: `/users/register`
**Method**: `POST`
**Content-Type**: `application/json`

#### Request Body
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Success Response
**Code**: `201 Created`
```json
{
    "user": {
        "_id": "65df12345678901234567890",
        "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
**Code**: `400 Bad Request`
```json
{
    "errors": [
        {
            "type": "field",
            "msg": "Email must be a valid email",
            "path": "email",
            "location": "body"
        }
    ]
}
```

### Login User
Authenticate existing user.

**URL**: `/users/login`
**Method**: `POST`
**Content-Type**: `application/json`

#### Request Body
```json
{
    "email": "user@example.com",
    "password": "password123"
}
```

#### Success Response
**Code**: `200 OK`
```json
{
    "user": {
        "_id": "65df12345678901234567890",
        "email": "user@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Error Responses
**Code**: `401 Unauthorized`
```json
{
    "errors": "Invalid Credentials"
}
```

## Resources Used

### Dependencies
- **express**: Web framework for Node.js
- **mongoose**: MongoDB object modeling tool
- **bcrypt**: Library for hashing passwords
- **jsonwebtoken**: Implementation of JSON Web Tokens
- **express-validator**: Middleware for input validation
- **dotenv**: Load environment variables from .env file

### Database
- **MongoDB**: NoSQL database used for storing user data
- Connection URL format: `mongodb://127.0.0.1:27017/ChatApp`

### Environment Variables
- `PORT`: Server port (default: 3000)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation

### Authentication Flow
1. **Registration**:
   - Validate email and password
   - Hash password using bcrypt
   - Create user in database
   - Generate JWT token
   - Return user data and token

2. **Login**:
   - Validate credentials
   - Find user by email
   - Compare password hash
   - Generate new JWT token
   - Return user data and token
