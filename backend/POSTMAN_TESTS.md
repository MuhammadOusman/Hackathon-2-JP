# Medicare Backend - Complete Postman Test Collection

## Base URL
```
http://localhost:4000
```

---

## 1. Health Check (No Auth)

### Check Server Status
```
GET http://localhost:4000/health
```

**Expected Response:**
```json
{
  "status": "ok",
  "message": "Medicare API is running"
}
```

---

## 2. Auth Endpoints (No Auth Required)

### Register New User
```
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "_id": "673abc123...",
  "name": "Test User",
  "email": "test@example.com",
  "role": "patient",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**COPY THE TOKEN FROM RESPONSE!**

---

### Login User
```
POST http://localhost:4000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Response:**
```json
{
  "_id": "673abc123...",
  "name": "Test User",
  "email": "test@example.com",
  "role": "patient",
  "avatar": "",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

## ALL ENDPOINTS BELOW REQUIRE AUTHORIZATION HEADER

**In Postman:**
1. Go to Authorization tab
2. Select "Bearer Token"
3. Paste the token you got from register/login

OR add to Headers:
```
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 3. User Endpoints

### Get Current User Profile
```
GET http://localhost:4000/api/user/me
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "_id": "673abc123...",
  "name": "Test User",
  "email": "test@example.com",
  "role": "patient",
  "avatar": "",
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

---

### Update User Profile
```
PUT http://localhost:4000/api/user/me
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Updated Name",
  "avatar": "https://i.pravatar.cc/150?img=25"
}
```

**Expected Response:**
```json
{
  "_id": "673abc123...",
  "name": "Updated Name",
  "email": "test@example.com",
  "avatar": "https://i.pravatar.cc/150?img=25",
  "role": "patient"
}
```

---

## 4. Providers Endpoints

### Get All Providers
```
GET http://localhost:4000/api/providers
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
[
  {
    "_id": "673abc...",
    "name": "Dr. Emily Reed",
    "specialty": "Cardiology",
    "avatar": "https://i.pravatar.cc/150?img=47",
    "rating": 4.8,
    "createdAt": "2024-11-16T...",
    "updatedAt": "2024-11-16T..."
  },
  {
    "_id": "673def...",
    "name": "Dr. Sarah Carter",
    "specialty": "General Medicine",
    "avatar": "https://i.pravatar.cc/150?img=45",
    "rating": 4.9,
    "createdAt": "2024-11-16T...",
    "updatedAt": "2024-11-16T..."
  }
]
```

**COPY A PROVIDER _id FOR NEXT TESTS!**

---

### Get Provider By ID
```
GET http://localhost:4000/api/providers/PASTE_PROVIDER_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "_id": "673abc...",
  "name": "Dr. Emily Reed",
  "specialty": "Cardiology",
  "avatar": "https://i.pravatar.cc/150?img=47",
  "rating": 4.8,
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

---

## 5. Appointments Endpoints

### Get All Appointments
```
GET http://localhost:4000/api/appointments
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
[]
```
(Empty initially, will have data after creating)

---

### Create Appointment
```
POST http://localhost:4000/api/appointments
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "providerId": "PASTE_PROVIDER_ID_HERE",
  "startTime": "2024-11-20T10:00:00Z",
  "reason": "Annual checkup"
}
```

**Expected Response:**
```json
{
  "_id": "673xyz...",
  "userId": "673abc...",
  "providerId": {
    "_id": "673...",
    "name": "Dr. Emily Reed",
    "specialty": "Cardiology",
    "avatar": "https://i.pravatar.cc/150?img=47"
  },
  "startTime": "2024-11-20T10:00:00.000Z",
  "status": "scheduled",
  "reason": "Annual checkup",
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

**COPY APPOINTMENT _id FOR NEXT TESTS!**

---

### Get Appointment By ID
```
GET http://localhost:4000/api/appointments/PASTE_APPOINTMENT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Update Appointment
```
PUT http://localhost:4000/api/appointments/PASTE_APPOINTMENT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "startTime": "2024-11-21T14:00:00Z",
  "reason": "Follow-up checkup",
  "status": "scheduled"
}
```

---

### Delete Appointment
```
DELETE http://localhost:4000/api/appointments/PASTE_APPOINTMENT_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "message": "Appointment removed"
}
```

---

## 6. Medications Endpoints

### Get All Medications
```
GET http://localhost:4000/api/medications
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Create Medication
```
POST http://localhost:4000/api/medications
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "name": "Metformin",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "notes": "Take with meals"
}
```

**Expected Response:**
```json
{
  "_id": "673med...",
  "userId": "673abc...",
  "name": "Metformin",
  "dosage": "500mg",
  "frequency": "Twice daily",
  "notes": "Take with meals",
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

**COPY MEDICATION _id FOR NEXT TESTS!**

---

### Update Medication
```
PUT http://localhost:4000/api/medications/PASTE_MEDICATION_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "dosage": "1000mg",
  "frequency": "Once daily",
  "notes": "Take before breakfast"
}
```

---

### Delete Medication
```
DELETE http://localhost:4000/api/medications/PASTE_MEDICATION_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "message": "Medication removed"
}
```

---

## 7. Reminders Endpoints

### Get All Reminders
```
GET http://localhost:4000/api/reminders
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Create Reminder
```
POST http://localhost:4000/api/reminders
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "title": "Take Metformin",
  "medicationId": "PASTE_MEDICATION_ID_HERE",
  "triggerTime": "2024-11-17T08:00:00Z",
  "recurrence": "daily"
}
```

**Expected Response:**
```json
{
  "_id": "673rem...",
  "userId": "673abc...",
  "medicationId": {
    "_id": "673med...",
    "name": "Metformin",
    "dosage": "500mg"
  },
  "title": "Take Metformin",
  "triggerTime": "2024-11-17T08:00:00.000Z",
  "recurrence": "daily",
  "status": "pending",
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

**COPY REMINDER _id FOR NEXT TESTS!**

---

### Update Reminder
```
PUT http://localhost:4000/api/reminders/PASTE_REMINDER_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "triggerTime": "2024-11-17T09:00:00Z",
  "title": "Take Metformin - Updated"
}
```

---

### Mark Reminder as Done
```
PATCH http://localhost:4000/api/reminders/PASTE_REMINDER_ID_HERE/done
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "_id": "673rem...",
  "status": "done",
  ...
}
```

---

### Delete Reminder
```
DELETE http://localhost:4000/api/reminders/PASTE_REMINDER_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

---

## 8. Medical Records Endpoints

### Get All Records
```
GET http://localhost:4000/api/records
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Upload File (Image or PDF)

**In Postman:**
1. Method: POST
2. URL: `http://localhost:4000/api/records/upload`
3. Authorization: Bearer Token (paste your token)
4. Body tab → select "form-data"
5. Add key: `file` (change type to "File" from dropdown)
6. Choose a file (PDF or image)
7. Send

**Expected Response:**
```json
{
  "_id": "673rec...",
  "userId": "673abc...",
  "fileName": "test.pdf",
  "fileUrl": "https://res.cloudinary.com/...",
  "fileType": "application/pdf",
  "cloudinaryId": "medicare_records/...",
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

**COPY RECORD _id FOR NEXT TESTS!**

---

### Get Record By ID
```
GET http://localhost:4000/api/records/PASTE_RECORD_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

---

### Delete Record
```
DELETE http://localhost:4000/api/records/PASTE_RECORD_ID_HERE
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response:**
```json
{
  "message": "Record removed"
}
```

---

## 9. Health Stats Endpoints

### Get Health Stats
```
GET http://localhost:4000/api/stats
Authorization: Bearer YOUR_TOKEN_HERE
```

**Expected Response (default values):**
```json
{
  "_id": "673stat...",
  "userId": "673abc...",
  "heartRate": 72,
  "bloodPressureSystolic": 120,
  "bloodPressureDiastolic": 80,
  "steps": 0,
  "sleepHours": 7.5,
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

---

### Update Health Stats
```
POST http://localhost:4000/api/stats
Authorization: Bearer YOUR_TOKEN_HERE
Content-Type: application/json

{
  "heartRate": 75,
  "bloodPressureSystolic": 118,
  "bloodPressureDiastolic": 78,
  "steps": 8500,
  "sleepHours": 8.0
}
```

**Expected Response:**
```json
{
  "_id": "673stat...",
  "userId": "673abc...",
  "heartRate": 75,
  "bloodPressureSystolic": 118,
  "bloodPressureDiastolic": 78,
  "steps": 8500,
  "sleepHours": 8,
  "createdAt": "2024-11-16T...",
  "updatedAt": "2024-11-16T..."
}
```

---

## Testing Flow (Step by Step)

1. ✅ **Health Check** - Verify server is running
2. ✅ **Register** - Create account, copy token
3. ✅ **Login** - Test login, copy token
4. ✅ **Get User Profile** - Verify auth works
5. ✅ **Get Providers** - List doctors, copy a provider ID
6. ✅ **Create Appointment** - Book with provider ID
7. ✅ **Get Appointments** - See your appointments
8. ✅ **Create Medication** - Add medicine, copy medication ID
9. ✅ **Create Reminder** - Link to medication
10. ✅ **Mark Reminder Done** - Update status
11. ✅ **Upload File** - Test PDF/image upload
12. ✅ **Get Records** - See uploaded files
13. ✅ **Get Stats** - Check health data
14. ✅ **Update Stats** - Modify health metrics
15. ✅ **Update Profile** - Change name/avatar
16. ✅ **Delete Tests** - Clean up test data

---

## Quick Copy-Paste Test Sequence

### Step 1: Register
```
POST http://localhost:4000/api/auth/register
Content-Type: application/json

{
  "name": "Sarah Khan",
  "email": "sarah@test.com",
  "password": "test123"
}
```

### Step 2: Get Providers (use token from step 1)
```
GET http://localhost:4000/api/providers
Authorization: Bearer YOUR_TOKEN
```

### Step 3: Create Appointment (use providerId from step 2)
```
POST http://localhost:4000/api/appointments
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "providerId": "PROVIDER_ID_HERE",
  "startTime": "2024-11-20T10:00:00Z",
  "reason": "Checkup"
}
```

### Step 4: Create Medication
```
POST http://localhost:4000/api/medications
Authorization: Bearer YOUR_TOKEN
Content-Type: application/json

{
  "name": "Aspirin",
  "dosage": "100mg",
  "frequency": "Daily"
}
```

### Step 5: Upload File (use form-data in Postman)
```
POST http://localhost:4000/api/records/upload
Authorization: Bearer YOUR_TOKEN
Body: form-data
Key: file (type: File)
Value: [select any PDF or image]
```

---

**Server must be running:** `npm run dev` in backend folder

Test karlein sab endpoints Postman pe! 🚀
