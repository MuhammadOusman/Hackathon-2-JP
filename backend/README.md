# Medicare Backend API

A comprehensive REST API for the Medicare healthcare management mobile application. Built with Node.js, Express.js, MongoDB, and integrated with Cloudinary for file uploads.

## 📋 Overview

Medicare is a full-featured healthcare management app that allows patients to:
- Manage their medical appointments with healthcare providers
- Track medications and set reminders
- Upload and store medical records securely
- Monitor health statistics
- Access a directory of healthcare providers

## 🏗️ Architecture

### Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **File Storage**: Cloudinary
- **Password Hashing**: bcrypt
- **Validation**: Built-in Express validation

### Project Structure
```
backend/
├── config/           # Database and Cloudinary configuration
├── controllers/      # Route handlers for all endpoints
├── middleware/       # Authentication and error handling middleware
├── models/          # MongoDB schemas and models
├── routes/          # API route definitions
├── seedProviders.js # Database seeding script
└── server.js        # Main application entry point
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas account or local MongoDB instance
- Cloudinary account (for file uploads)
- npm or yarn package manager

### Installation

1. **Clone and navigate to backend directory:**
```bash
cd backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
Create a `.env` file in the backend root directory:
```env
# Database
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/medicare?retryWrites=true&w=majority

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_here

# Cloudinary Configuration (for file uploads)
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Server Configuration
PORT=4000
NODE_ENV=development
```

4. **Seed Initial Data:**
```bash
node seedProviders.js
```

5. **Start Development Server:**
```bash
npm run dev
```

The API will be available at `http://localhost:4000`

## 📡 API Endpoints

### Authentication Endpoints
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register` | Register new user | ❌ |
| POST | `/api/auth/login` | User login | ❌ |

### User Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/user/me` | Get current user profile | ✅ |
| PUT | `/api/user/me` | Update user profile | ✅ |

### Healthcare Providers
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/providers` | Get all providers | ✅ |
| GET | `/api/providers/:id` | Get provider by ID | ✅ |

### Appointments Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/appointments` | Get user's appointments | ✅ |
| POST | `/api/appointments` | Create new appointment | ✅ |
| GET | `/api/appointments/:id` | Get appointment by ID | ✅ |
| PUT | `/api/appointments/:id` | Update appointment | ✅ |
| DELETE | `/api/appointments/:id` | Delete appointment | ✅ |

### Medication Management
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/medications` | Get user's medications | ✅ |
| POST | `/api/medications` | Add new medication | ✅ |
| PUT | `/api/medications/:id` | Update medication | ✅ |
| DELETE | `/api/medications/:id` | Delete medication | ✅ |

### Medication Reminders
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/reminders` | Get user's reminders | ✅ |
| POST | `/api/reminders` | Create new reminder | ✅ |
| PUT | `/api/reminders/:id` | Update reminder | ✅ |
| PATCH | `/api/reminders/:id/done` | Mark reminder as completed | ✅ |
| DELETE | `/api/reminders/:id` | Delete reminder | ✅ |

### Medical Records
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/records` | Get user's medical records | ✅ |
| POST | `/api/records/upload` | Upload medical document/image | ✅ |
| GET | `/api/records/:id` | Get record by ID | ✅ |
| DELETE | `/api/records/:id` | Delete medical record | ✅ |

### Health Statistics
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/stats` | Get user's health stats | ✅ |
| POST | `/api/stats` | Update health statistics | ✅ |

### Health Check
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/health` | API health check | ❌ |

## 🔐 Authentication

The API uses JWT (JSON Web Token) based authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

### User Registration Example
```bash
curl -X POST http://localhost:4000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

### User Login Example
```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "securepassword123"
  }'
```

## 📁 File Upload

Medical records support multiple file types:
- **Images**: JPG, PNG, GIF
- **Documents**: PDF
- **Maximum Size**: 10MB per file

### Upload Example (using curl)
```bash
curl -X POST http://localhost:4000/api/records/upload \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "file=@/path/to/your/document.pdf"
```

## 🗄️ Database Models

### User Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (default: 'patient'),
  avatar: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Provider Model
```javascript
{
  name: String (required),
  specialty: String (required),
  avatar: String (optional),
  rating: Number (default: 4.5),
  createdAt: Date,
  updatedAt: Date
}
```

### Appointment Model
```javascript
{
  userId: ObjectId (ref: User),
  providerId: ObjectId (ref: Provider),
  startTime: Date (required),
  status: String (enum: ['scheduled', 'completed', 'cancelled']),
  reason: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Medication Model
```javascript
{
  userId: ObjectId (ref: User),
  name: String (required),
  dosage: String (required),
  frequency: String (required),
  notes: String (optional),
  createdAt: Date,
  updatedAt: Date
}
```

### Reminder Model
```javascript
{
  userId: ObjectId (ref: User),
  medicationId: ObjectId (ref: Medication),
  title: String (required),
  triggerTime: Date (required),
  recurrence: String (enum: ['once', 'daily', 'weekly']),
  status: String (enum: ['pending', 'done']),
  createdAt: Date,
  updatedAt: Date
}
```

### Medical Record Model
```javascript
{
  userId: ObjectId (ref: User),
  fileName: String (required),
  fileUrl: String (required),
  fileType: String (required),
  cloudinaryId: String (required),
  createdAt: Date,
  updatedAt: Date
}
```

### Health Stats Model
```javascript
{
  userId: ObjectId (ref: User),
  heartRate: Number (default: 72),
  bloodPressureSystolic: Number (default: 120),
  bloodPressureDiastolic: Number (default: 80),
  steps: Number (default: 0),
  sleepHours: Number (default: 7.5),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚀 Deployment

### Vercel Deployment

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Add Environment Variables:**
```bash
vercel env add MONGO_URI
vercel env add JWT_SECRET
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

4. **Deploy:**
```bash
vercel --prod
```

### Manual Deployment Script
```bash
chmod +x deploy.sh
./deploy.sh
```

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=your_production_mongodb_uri
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```

## 🧪 Testing

### Health Check
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "Medicare API is running",
  "timestamp": "2024-11-20T...",
  "environment": "development"
}
```

### Postman Collection
A comprehensive Postman collection is available in `POSTMAN_TESTS.md` with all endpoints and example requests.

## 📊 Monitoring & Logging

- Error handling middleware logs errors appropriately
- Health check endpoint for monitoring
- CORS enabled for cross-origin requests
- Rate limiting can be added for production

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token-based authentication
- Input validation and sanitization
- CORS protection
- Secure file upload handling
- Environment variable protection

## 📝 Scripts

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest"
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For support or questions, please contact the development team.

---

**Medicare Backend API** - Empowering healthcare management through technology.
