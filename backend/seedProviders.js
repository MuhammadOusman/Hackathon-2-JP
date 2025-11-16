require('dotenv').config();
const mongoose = require('mongoose');
const Provider = require('./models/Provider');

const seedProviders = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing providers
    await Provider.deleteMany();

    // Create sample providers
    const providers = [
      {
        name: 'Dr. Emily Reed',
        specialty: 'Cardiology',
        avatar: 'https://i.pravatar.cc/150?img=47',
        rating: 4.8,
      },
      {
        name: 'Dr. Sarah Carter',
        specialty: 'General Medicine',
        avatar: 'https://i.pravatar.cc/150?img=45',
        rating: 4.9,
      },
      {
        name: 'Dr. Michael Chen',
        specialty: 'Dermatology',
        avatar: 'https://i.pravatar.cc/150?img=12',
        rating: 4.7,
      },
      {
        name: 'Dr. James Wilson',
        specialty: 'Pediatrics',
        avatar: 'https://i.pravatar.cc/150?img=13',
        rating: 4.6,
      },
      {
        name: 'Dr. Lisa Martinez',
        specialty: 'Neurology',
        avatar: 'https://i.pravatar.cc/150?img=44',
        rating: 4.9,
      },
    ];

    await Provider.insertMany(providers);
    console.log('✅ Providers seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed error:', error);
    process.exit(1);
  }
};

seedProviders();
