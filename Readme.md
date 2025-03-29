# Chat App API Documentation

## Authentication Endpoints

### Register User
Create a new user account.

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

### Login User
Authenticate an existing user.

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

### Get User Profile
Get the profile of the authenticated user.

**URL**: `/users/profile`
**Method**: `GET`
**Authorization**: Bearer Token required

#### Success Response
**Code**: `200 OK`
```json
{
    "user": {
        "email": "user@example.com"
    }
}
```

### Logout User
Logout the current user and invalidate the token.

**URL**: `/users/logout`
**Method**: `GET`
**Authorization**: Bearer Token required

#### Success Response
**Code**: `200 OK`
```json
{
    "message": "Logged out successfully"
}
```

## Error Responses (Common)
**Code**: `401 Unauthorized`
```json
{
    "error": "Unauthorized User"
}
```

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

## Database Schema

### User Model
```javascript
{
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 6,
        maxLength: 50
    },
    password: {
        type: String,
        select: true
    }
}
```

## Redis Implementation
The application uses Redis for token blacklisting during logout:

- **Token Blacklisting**: When a user logs out, their JWT token is stored in Redis with an expiration time of 24 hours
- **Authentication Check**: Every protected route checks if the token exists in Redis blacklist
- **Token Expiry**: Blacklisted tokens are automatically removed after 24 hours
- **Use Case**: Prevents use of logged-out tokens that are still within their JWT expiration period

## Technical Stack

### Core Dependencies
- **express**: Web framework
- **mongoose**: MongoDB ODM
- **ioredis**: Redis client for Node.js
- **jsonwebtoken**: JWT implementation
- **bcrypt**: Password hashing
- **express-validator**: Request validation

## Authentication Flow

1. **Registration** (`POST /users/register`):
   - Validate email and password
   - Hash password using bcrypt
   - Create user in database
   - Generate JWT token (expires in 24h)
   - Return user data and token

2. **Login** (`POST /users/login`):
   - Validate credentials
   - Find user by email
   - Compare password hash
   - Generate new JWT token
   - Return user data and token

3. **Profile Access** (`GET /users/profile`):
   - Extract token from Authorization header
   - Check if token is blacklisted in Redis
   - Verify JWT token
   - Return user profile data

4. **Logout** (`GET /users/logout`):
   - Extract token from Authorization header
   - Store token in Redis blacklist with 24h expiry
   - Clear token from client
   - Return success message

### Token Validation Process
```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐
│  Extract    │     │ Check Redis  │     │   Verify    │
│   Token    ─┼────►│  Blacklist   ├────►│   Token     │
└─────────────┘     └──────────────┘     └──────┬──────┘
                                                │
┌─────────────┐     ┌──────────────┐           │
│   Access    │     │   Return     │           │
│  Resource   │◄────┤    Data      │◄──────────┘
└─────────────┘     └──────────────┘
```

### Security Measures
- Passwords hashed using bcrypt (10 rounds)
- JWT tokens expire after 24 hours
- Blacklisted tokens tracked in Redis
- Token required for protected routes
- Email validation and password length checks
