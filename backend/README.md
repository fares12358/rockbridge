# Rock Bridge Backend

Rock Bridge Backend is a modular RESTful API built with **Node.js**, **Express**, and **MongoDB**. It provides the core logic for managing services, media, quote requests, and user authentication.

## 🚀 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: JWT (JSON Web Tokens)
- **File Handling**: Multer (local disk storage under `uploads/`)
- **Email**: Nodemailer

## 📦 Dependencies

| Dependency | Purpose |
| :--- | :--- |
| `express` | Core web framework for routing and server logic |
| `mongoose` | MongoDB object modeling for schema management |
| `jsonwebtoken` | Secure authentication and session management |
| `bcrypt` | Secure password hashing |
| `multer` | Middleware for handling `multipart/form-data` (file uploads to local disk) |
| `nodemailer` | Email sending capabilities for OTPs and notifications |
| `cors` | Cross-Origin Resource Sharing for frontend communication |
| `dotenv` | Environment variable management |

## ✨ Key Features & Main Functions

### 🔐 Authentication System
- **Secure Login/Registration**: User identity verification using bcrypt password hashing.
- **Session Management**: JWT-based authentication with access and refresh token logic.
- **Password Recovery**: OTP-based password reset via email.
- **Protected Routes**: Middleware to ensure only authenticated users can access admin endpoints.

### 🛠️ CRUD Operations
The API provides full Create, Read, Update, and Delete (CRUD) capabilities for the following entities:

- **Services**: 
    - `CREATE`: Add new services with images.
    - `READ`: List all available services for the public.
    - `DELETE`: Remove obsolete services.
- **Media**: 
    - `CREATE`: Upload images/videos to local disk (`uploads/media/`).
    - `READ`: Fetch gallery assets.
    - `DELETE`: Remove media files.
- **Quote Requests**: 
    - `CREATE`: Public submission of quote requests.
    - `READ`: Admin access to view all requested quotes.
    - `DELETE`: Mark quotes as handled or remove them.

## 📁 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   └── db.js             # MongoDB connection configuration
│   ├── controllers/
│   │   ├── AuthControlles.js # User authentication and password reset logic
│   │   ├── emailController.js# Email handling
│   │   ├── mediaController.js# Media upload and management logic
│   │   ├── quoteController.js# Quote request processing logic
│   │   └── serviceController.js# Service management logic
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification and authorization
│   │   └── localUpload.js     # Shared local-disk multer factory (services + media uploads)
│   ├── models/
│   │   ├── Media.js          # Schema for media assets
│   │   ├── QuoteRequest.js    # Schema for quote requests
│   │   ├── Service.js        # Schema for services
│   │   └── Users.js          # Schema for user accounts
│   ├── routes/
│   │   ├── AuthRoutes.js     # Authentication endpoints
│   │   ├── mediaRouter.js    # Media management endpoints
│   │   ├── quoteRouter.js    # Quote request endpoints
│   │   └── servicesRouter.js # Service management endpoints
│   └── server.js             # Application entry point and server initialization
├── uploads/                  # Directory for stored media and service images
└── .env                     # Environment variables
```

## 🛠️ API Documentation

### 🔐 Authentication (`/auth`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/auth/login` | Authenticate user and receive token | ❌ |
| `POST` | `/auth/relogin` | Validate and refresh session token | ❌ |
| `POST` | `/auth/forgot` | Request password reset (sends email) | ❌ |
| `POST` | `/auth/reset` | Reset password using token/OTP | ❌ |
| `GET` | `/auth/me` | Get current authenticated user profile | ✅ |

### 🛠️ Services (`/services`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/services` | Retrieve all services | ❌ |
| `POST` | `/services` | Create a new service (requires image) | ✅ |
| `DELETE` | `/services/:id` | Delete a specific service | ✅ |

### 🖼️ Media (`/media`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/media` | Retrieve all media assets | ❌ |
| `POST` | `/media` | Upload a new media file | ✅ |
| `DELETE` | `/media/:id` | Delete a media asset | ✅ |

### ✉️ Quotes (`/quotes`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/quotes` | Submit a new quote request | ❌ |
| `GET` | `/quotes` | Retrieve all quote requests | ✅ |
| `DELETE` | `/quotes/:id` | Delete a quote request | ✅ |

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
REFRESH_TOKEN_SECRET=your_refresh_token_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_app_password
BODY_LIMIT=10mb
```

## 🏃 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Seed the admin user** (sets/resets the single admin's login credentials only — does not touch services, media, or quotes):
   ```bash
   ADMIN_EMAIL=admin@example.com ADMIN_PASSWORD=changeme npm run seed:admin
   ```
   `ADMIN_NAME` is optional (defaults to `Admin`). Running it again with the same email updates that user's name/password instead of creating a duplicate.

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Server URL**: `http://localhost:5000`