# React Native MongoDB App

This project is a React Native application that connects to a MongoDB database using a Node.js backend. It provides user authentication and displays a list of users.

## Project Structure

```
react-native-mongodb-app
├── mobile               # React Native mobile application
│   ├── src              # Source files for the mobile app
│   ├── app.json         # Configuration for the React Native app
│   ├── babel.config.js   # Babel configuration
│   ├── metro.config.js   # Metro bundler configuration
│   ├── package.json      # Mobile app dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration for the mobile app
├── server               # Node.js backend server
│   ├── src              # Source files for the server
│   ├── package.json      # Server dependencies and scripts
│   └── tsconfig.json     # TypeScript configuration for the server
└── shared               # Shared types between mobile and server
    └── types
        └── user.ts      # TypeScript types related to user data
```

## Setup Instructions

### Prerequisites

- Node.js (version 14 or higher)
- MongoDB (local or cloud instance)
- React Native CLI

### Installation

1. **Clone the repository:**

   ```
   git clone <repository-url>
   cd react-native-mongodb-app
   ```

2. **Set up the server:**

   - Navigate to the server directory:
     ```
     cd server
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Create a `.env` file based on the `.env.example` file and configure your MongoDB connection string.
   - Start the server:
     ```
     npm run start
     ```

3. **Set up the mobile application:**

   - Navigate to the mobile directory:
     ```
     cd mobile
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the React Native application:
     ```
     npm run start
     ```

### Usage

- The application allows users to register and log in.
- After logging in, users can view a list of registered users.
- The mobile app communicates with the Node.js backend to handle authentication and user data.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.