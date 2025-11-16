const http = require('http');
const https = require('https');

let token = '';
let userId = '';
let providerId = '';
let appointmentId = '';

function makeRequest(method, path, data = null, useToken = false) {
  return new Promise((resolve, reject) => {
    const postData = data ? JSON.stringify(data) : null;
    const options = {
      hostname: 'localhost',
      port: 4000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(useToken && { 'Authorization': `Bearer ${token}` }),
        ...(postData && { 'Content-Length': Buffer.byteLength(postData) })
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch {
          resolve(responseData);
        }
      });
    });

    req.on('error', reject);
    if (postData) req.write(postData);
    req.end();
  });
}

async function testAPIs() {
  console.log('\n🚀 Testing Medicare Backend APIs\n');
  console.log('='.repeat(50));

  try {
    // 1. Health Check
    console.log('\n1️⃣  Testing Health Endpoint...');
    const health = await makeRequest('GET', '/health');
    console.log('✅ Health:', health.message);

    // 2. Register
    console.log('\n2️⃣  Testing Register...');
    const registerRes = await makeRequest('POST', '/api/auth/register', {
      name: 'Sarah Test',
      email: `sarah${Date.now()}@test.com`,
      password: 'test123'
    });
    token = registerRes.token;
    userId = registerRes._id;
    console.log('✅ Registered:', registerRes.name, '(ID:', userId, ')');

    // 3. Get Profile
    console.log('\n3️⃣  Testing Get Profile...');
    const profile = await makeRequest('GET', '/api/user/me', null, true);
    console.log('✅ Profile:', profile.name, '-', profile.email);

    // 4. Get Providers
    console.log('\n4️⃣  Testing Get Providers...');
    const providers = await makeRequest('GET', '/api/providers', null, true);
    providerId = providers[0]._id;
    console.log(`✅ Found ${providers.length} providers:`, providers.map(p => p.name).join(', '));

    // 5. Create Appointment
    console.log('\n5️⃣  Testing Create Appointment...');
    const appointment = await makeRequest('POST', '/api/appointments', {
      providerId,
      startTime: new Date(Date.now() + 86400000).toISOString(),
      reason: 'Regular checkup'
    }, true);
    appointmentId = appointment._id;
    console.log('✅ Appointment created with', appointment.providerId.name);

    // 6. Get Appointments
    console.log('\n6️⃣  Testing Get Appointments...');
    const appointments = await makeRequest('GET', '/api/appointments', null, true);
    console.log(`✅ Found ${appointments.length} appointment(s)`);

    // 7. Create Medication
    console.log('\n7️⃣  Testing Create Medication...');
    const medication = await makeRequest('POST', '/api/medications', {
      name: 'Metformin',
      dosage: '500mg',
      frequency: 'Twice daily',
      notes: 'Take with food'
    }, true);
    console.log('✅ Medication added:', medication.name, '-', medication.dosage);

    // 8. Get Medications
    console.log('\n8️⃣  Testing Get Medications...');
    const medications = await makeRequest('GET', '/api/medications', null, true);
    console.log(`✅ Found ${medications.length} medication(s)`);

    // 9. Create Reminder
    console.log('\n9️⃣  Testing Create Reminder...');
    const reminder = await makeRequest('POST', '/api/reminders', {
      title: 'Take Metformin',
      triggerTime: new Date(Date.now() + 3600000).toISOString(),
      recurrence: 'daily',
      medicationId: medication._id
    }, true);
    console.log('✅ Reminder created:', reminder.title);

    // 10. Get Reminders
    console.log('\n🔟 Testing Get Reminders...');
    const reminders = await makeRequest('GET', '/api/reminders', null, true);
    console.log(`✅ Found ${reminders.length} reminder(s)`);

    // 11. Get Health Stats
    console.log('\n1️⃣1️⃣  Testing Get Health Stats...');
    const stats = await makeRequest('GET', '/api/stats', null, true);
    console.log('✅ Stats: HR:', stats.heartRate, 'BP:', `${stats.bloodPressureSystolic}/${stats.bloodPressureDiastolic}`, 'Steps:', stats.steps);

    // 12. Update Health Stats
    console.log('\n1️⃣2️⃣  Testing Update Health Stats...');
    const updatedStats = await makeRequest('POST', '/api/stats', {
      heartRate: 75,
      steps: 10000,
      sleepHours: 8
    }, true);
    console.log('✅ Stats updated: HR:', updatedStats.heartRate, 'Steps:', updatedStats.steps);

    console.log('\n' + '='.repeat(50));
    console.log('✅ All API tests passed!');
    console.log('='.repeat(50) + '\n');

    process.exit(0);
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

testAPIs();
