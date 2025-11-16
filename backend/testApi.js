const http = require('http');

// Test health endpoint
http.get('http://localhost:4000/health', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('✅ Health check:', data);
    
    // Test register
    const registerData = JSON.stringify({
      name: 'Test User',
      email: 'test@test.com',
      password: 'test123'
    });
    
    const options = {
      hostname: 'localhost',
      port: 4000,
      path: '/api/auth/register',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': registerData.length
      }
    };
    
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('✅ Register response:', data);
        process.exit(0);
      });
    });
    
    req.on('error', (e) => {
      console.error('❌ Error:', e.message);
      process.exit(1);
    });
    
    req.write(registerData);
    req.end();
  });
}).on('error', (e) => {
  console.error('❌ Health check failed:', e.message);
  process.exit(1);
});
