# Backend Server

A Node.js RESTful API for user authentication and management, featuring JWT-based authentication, PostgreSQL integration, and robust middleware support.

## Features

- User registration and login with hashed passwords
- JWT authentication and refresh token support
- Protected routes and role-based authorization
- Input validation and centralized error handling
- PostgreSQL database integration
- Docker support for easy deployment

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcryptjs
- Docker

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/pipaliyajaydip/backend-server.git
    cd backend-server
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Configure environment variables:

    Copy `.env.development` and update values as needed:
    ```
    NODE_ENV=development
    PORT=5000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=youruser
    DB_PASSWORD=yourpassword
    DB_NAME=yourdb
    JWT_SECRET=your_jwt_secret
    JWT_EXPIRES_IN=5m
    REFRESH_SECRET=your_refresh_secret
    REFRESH_EXPIRES_IN=7d
    ```

4. Start the server:
    ```bash
    npm start
    ```

### Docker

To run with Docker:
```bash
docker build -t backend-server .
docker run -p 5000:5000 --env-file .env.development backend-server
```

## API Endpoints

### Auth

- `POST /login`  
  User login, returns JWT token.

- `POST /register`  
  User registration.

### Users

- `GET /getusers`  
  Get all users (protected).

- `POST /adduser`  
  Add a new user.

### Health

- `GET /ping`  
  Health check endpoint.

## Project Structure

```
server/
│
├── app.js
├── config/
│   ├── db.js
│   └── env.js
├── controllers/
│   ├── authController.js
│   └── userController.js
├── middlewares/
│   ├── authMiddleware.js
│   ├── authorize.js
│   ├── errorHandler.js
│   └── validate.js
├── models/
│   └── userModel.js
├── routes/
│   └── route.js
├── utils/
│   ├── customCodes/
│   │   └── codes.js
│   ├── Jwt/
│   │   └── token.js
│   ├── messages/
│   │   └── messages.js
│   └── responses/
│       └── responseHandler.js
└── validations/
    └── auth.schema.js
```

## Security Best Practices

- Passwords are hashed using bcryptjs.
- JWT secrets and DB credentials are stored in environment variables.
- Protected routes require valid JWT tokens.
- Input validation and error handling are enforced.

## License

MIT

