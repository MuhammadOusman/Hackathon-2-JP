# Medicare Backend API

Complete REST API for Medicare healthcare app built with Node.js, Express, and MongoDB.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (use `.env.example` as template):
```
MONGO_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
JWT_SECRET=your_jwt_secret
PORT=4000
```

3. Seed providers:
```bash
node seedProviders.js
```

4. Start server:
```bash
npm run dev
```

## API Endpoints

### Auth
- POST `/api/auth/register` - Register user
- POST `/api/auth/login` - Login user

### User
- GET `/api/user/me` - Get current user
- PUT `/api/user/me` - Update profile

### Providers
- GET `/api/providers` - List providers
- GET `/api/providers/:id` - Get provider

### Appointments
- GET `/api/appointments` - List appointments
- POST `/api/appointments` - Create appointment
- GET `/api/appointments/:id` - Get appointment
- PUT `/api/appointments/:id` - Update appointment
- DELETE `/api/appointments/:id` - Delete appointment

### Medications
- GET `/api/medications` - List medications
- POST `/api/medications` - Add medication
- PUT `/api/medications/:id` - Update medication
- DELETE `/api/medications/:id` - Delete medication

### Reminders
- GET `/api/reminders` - List reminders
- POST `/api/reminders` - Create reminder
- PUT `/api/reminders/:id` - Update reminder
- PATCH `/api/reminders/:id/done` - Mark as done
- DELETE `/api/reminders/:id` - Delete reminder

### Medical Records
- GET `/api/records` - List records
- POST `/api/records/upload` - Upload file (multipart/form-data)
- GET `/api/records/:id` - Get record
- DELETE `/api/records/:id` - Delete record

### Health Stats
- GET `/api/stats` - Get stats
- POST `/api/stats` - Update stats

## Test

Health check: `GET /health`
