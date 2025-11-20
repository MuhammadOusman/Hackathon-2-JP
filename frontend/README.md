# Medicare - Healthcare Management App

A comprehensive mobile healthcare management application built with React Native. Medicare empowers patients to take control of their healthcare journey through appointment management, medication tracking, medical record storage, and health monitoring.

## 📱 Overview

Medicare is a feature-rich healthcare companion app that provides:

- **Appointment Management**: Book, track, and manage healthcare appointments
- **Medication Tracking**: Monitor medications with smart reminders
- **Medical Records**: Securely store and access medical documents
- **Health Statistics**: Track vital signs and health metrics
- **Provider Directory**: Browse and connect with healthcare providers
- **User Profiles**: Personalized health management dashboard

## 🏗️ Architecture

### Tech Stack
- **Framework**: React Native (Expo)
- **Language**: JavaScript/TypeScript
- **Navigation**: React Navigation
- **State Management**: React Hooks
- **HTTP Client**: Axios
- **Storage**: AsyncStorage
- **UI Components**: Custom components with React Native
- **Styling**: Theme-based styling system

### Project Structure
```
frontend/
├── android/              # Android native code
├── ios/                  # iOS native code
├── src/
│   ├── assets/          # Images and static assets
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── navigation/      # Navigation configuration
│   ├── screens/         # App screens/pages
│   ├── services/        # API services and utilities
│   ├── theme/           # Theme and styling constants
│   └── utils/           # Helper functions
├── __tests__/           # Unit tests
├── App.tsx              # Main app component
└── package.json         # Dependencies and scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- React Native development environment
- Android Studio (for Android development)
- Xcode (for iOS development, macOS only)

### Installation

1. **Clone and navigate to frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Environment Setup:**
Create a `.env` file in the frontend root directory:
```env
API_BASE_URL=http://localhost:4000/api
# For production, use your deployed backend URL
# API_BASE_URL=https://your-backend-url.vercel.app/api
```

4. **Start Metro bundler:**
```bash
npm start
```

5. **Run on Android:**
```bash
npm run android
```

6. **Run on iOS (macOS only):**
```bash
npm run ios
```

## 📱 Features

### 🔐 Authentication
- User registration and login
- Secure JWT token management
- Persistent login sessions
- Profile management

### 📅 Appointment Management
- Browse healthcare providers by specialty
- Schedule appointments with date/time selection
- View upcoming and past appointments
- Appointment status tracking (scheduled, completed, cancelled)
- Reschedule or cancel appointments

### 💊 Medication Management
- Add medications with dosage and frequency
- Set medication reminders
- Track medication adherence
- Update medication information
- Medication history

### 📄 Medical Records
- Upload medical documents (PDF, images)
- Secure cloud storage with Cloudinary
- Organize and categorize records
- View and download records
- Delete outdated records

### 📊 Health Statistics
- Track vital signs (heart rate, blood pressure)
- Monitor daily steps and sleep hours
- Health metrics dashboard
- Progress tracking over time

### 👥 Provider Directory
- Browse healthcare providers
- Filter by specialty
- View provider ratings and information
- Direct appointment booking

## 🎨 UI/UX Design

### Design System
- **Colors**: Medical-themed color palette
- **Typography**: Clean, readable fonts
- **Components**: Consistent, reusable UI elements
- **Navigation**: Intuitive bottom tab navigation
- **Animations**: Smooth transitions and micro-interactions

### Screens
- **Splash Screen**: App loading and branding
- **Authentication**: Login/Register forms
- **Home Dashboard**: Health overview and quick actions
- **Appointments**: Appointment management
- **Medications**: Medication tracking
- **Medical Records**: Document management
- **Health Stats**: Vital signs tracking
- **Profile**: User settings and information
- **Provider Directory**: Healthcare provider listings

## 🔧 Configuration

### API Configuration
The app connects to the Medicare backend API. Update the API URL in `src/services/api.js`:

```javascript
const API_BASE_URL = 'https://your-deployed-backend-url.com/api';
```

### Build Configuration
- **Android**: Configure in `android/app/build.gradle`
- **iOS**: Configure in `ios/MedicareApp/Info.plist`

## 📦 Build & Deployment

### Android APK Build
```bash
# Generate release APK
cd android
./gradlew assembleRelease
```

### iOS Build (macOS)
```bash
cd ios
pod install
# Open Xcode and build for device/archive
```

### Environment Configurations
- **Development**: Local backend connection
- **Staging**: Staging backend environment
- **Production**: Production backend with optimized settings

## 🧪 Testing

### Unit Tests
```bash
npm test
```

### Integration Tests
```bash
npm run test:e2e
```

### Test Coverage
```bash
npm run test:coverage
```

## 🔒 Security Features

- Secure token storage with AsyncStorage
- API request/response encryption
- Input validation and sanitization
- Secure file upload handling
- User session management

## 📊 Performance Optimization

- Image optimization and caching
- Lazy loading for lists
- Memory management
- Bundle size optimization
- Offline data caching

## 🛠️ Development Tools

### Debugging
- React Native Debugger
- Flipper
- Chrome DevTools
- Android Studio Profiler

### Code Quality
- ESLint configuration
- Prettier code formatting
- TypeScript support
- Pre-commit hooks

## 📱 Device Compatibility

- **Android**: API 21+ (Android 5.0+)
- **iOS**: iOS 11.0+
- **Screen Sizes**: Responsive design for all screen sizes
- **Orientations**: Portrait and landscape support

## 🔄 API Integration

The app integrates with the Medicare Backend API:

### Authentication Flow
1. User registers/logs in
2. JWT token stored securely
3. Token attached to all API requests
4. Automatic token refresh handling

### Data Synchronization
- Real-time data fetching
- Offline data caching
- Conflict resolution
- Background sync

## 🎯 User Journey

1. **Onboarding**: User creates account
2. **Setup**: Complete health profile
3. **Discovery**: Browse providers and services
4. **Management**: Schedule appointments, track medications
5. **Monitoring**: View health stats and records
6. **Engagement**: Receive reminders and notifications

## 📈 Analytics & Monitoring

- User engagement tracking
- Performance monitoring
- Error reporting
- Crash analytics
- Usage statistics

## 🤝 Contributing

### Development Workflow
1. Create feature branch from `main`
2. Implement changes with tests
3. Code review and approval
4. Merge to `main` branch

### Code Standards
- Follow React Native best practices
- Use TypeScript for type safety
- Maintain test coverage above 80%
- Follow component composition patterns

## 📄 License

This project is licensed under the MIT License.

## 📞 Support & Contact

For support, bug reports, or feature requests:
- Create an issue on GitHub
- Contact the development team
- Check the troubleshooting guide

## 🗺️ Roadmap

### Upcoming Features
- [ ] Push notifications for reminders
- [ ] Telemedicine video calls
- [ ] Health goal setting and tracking
- [ ] Integration with wearables
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Offline mode enhancements

### Version History
- **v1.0.0**: Initial release with core features
- **v1.1.0**: Health statistics and enhanced UI
- **v1.2.0**: Push notifications and offline support

---

**Medicare** - Your personal healthcare companion, empowering better health management through technology.
