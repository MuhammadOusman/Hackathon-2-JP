import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import Button from '../components/Button';
import {authService} from '../services/api';
import Feather from 'react-native-vector-icons/Feather';
import {colors, typography, spacing, borderRadius} from '../theme';

const RegisterScreen = ({navigation}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [nameFocused, setNameFocused] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    setLoading(true);
    console.log('🚀 Frontend: Starting registration process');
    console.log('📧 Email:', email);
    console.log('👤 Name:', name);
    console.log('🔑 Password length:', password.length);

    try {
      console.log('📤 Frontend: Sending register request for email:', email);
      console.log('🌐 API Base URL:', 'https://hackathon-2-6tn8ab4kn-ousmans-projects-c8bfeb83.vercel.app');
      console.log('📡 Full URL:', 'https://hackathon-2-6tn8ab4kn-ousmans-projects-c8bfeb83.vercel.app/api/auth/register');

      const response = await authService.register(name, email, password);

      console.log('✅ Frontend: Register successful');
      console.log('📦 Response data:', response);

      // Navigation will happen automatically through the auth check in navigation/index.js
    } catch (error) {
      console.log('❌ Frontend: Register failed with error:', error);
      console.log('🔍 Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers,
          data: error.config?.data
        }
      });

      Alert.alert('Registration Failed', error.response?.data?.message || 'Please try again');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {toValue: 1, duration: 600, easing: Easing.out(Easing.ease), useNativeDriver: true}),
      Animated.spring(slideAnim, {toValue: 0, tension: 40, friction: 8, useNativeDriver: true}),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {toValue: 0.95, duration: 100, useNativeDriver: true}),
      Animated.timing(buttonScale, {toValue: 1, duration: 100, useNativeDriver: true}),
    ]).start();
  };

  return (
    <View style={styles.container}>
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />

      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
  <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <Animated.View style={[styles.content, {opacity: fadeAnim, transform: [{translateY: slideAnim}]}]}>
            <View style={styles.header}>
              <View style={styles.iconContainer}><Feather name="activity" size={36} color="#fff" /></View>
              <Text style={styles.title}>Create Your Account</Text>
              <Text style={styles.subtitle}>Sign up to get started</Text>
            </View>

            <View style={styles.form}>
              <View style={[styles.inputGroup, {marginBottom: 16}]}> 
                <Text style={styles.label}>Full Name</Text>
                <View 
                  style={[styles.inputWrapper, nameFocused && styles.inputFocused]}
                  pointerEvents="box-none">
                  <View style={[styles.inputIconWrapper, nameFocused && styles.inputIconWrapperFocused]}>
                    <Feather name="user" size={18} color={nameFocused ? '#ffffff' : '#94A3B8'} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your full name"
                    placeholderTextColor="#94A3B8"
                    value={name}
                    onChangeText={setName}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}> 
                <Text style={styles.label}>Email</Text>
                <View 
                  style={[styles.inputWrapper, emailFocused && styles.inputFocused]}
                  pointerEvents="box-none">
                  <View style={[styles.inputIconWrapper, emailFocused && styles.inputIconWrapperFocused]}>
                    <Feather name="mail" size={18} color={emailFocused ? '#ffffff' : '#94A3B8'} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="yourmail@mail.com"
                    placeholderTextColor="#94A3B8"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}> 
                <Text style={styles.label}>Password</Text>
                <View 
                  style={[styles.inputWrapper, passwordFocused && styles.inputFocused]}
                  pointerEvents="box-none">
                  <View style={[styles.inputIconWrapper, passwordFocused && styles.inputIconWrapperFocused]}>
                    <Feather name="lock" size={18} color={passwordFocused ? '#ffffff' : '#94A3B8'} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Create a password"
                    placeholderTextColor="#94A3B8"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              <Animated.View style={{transform: [{scale: buttonScale}]}}>
                <Button title="Sign Up" onPress={() => {animateButton(); handleRegister();}} loading={loading} style={styles.signInButton} />
              </Animated.View>

              <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.signupLink}>
                <Text style={styles.signupText}>Already have an account? <Text style={styles.signupBold}>Sign In</Text></Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0F1C',
  },
  gradientTop: {
    position: 'absolute',
    top: -200,
    left: -100,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: '#06B6D4',
    opacity: 0.15,
    pointerEvents: 'none',
  },
  gradientBottom: {
    position: 'absolute',
    bottom: -150,
    right: -120,
    width: 350,
    height: 350,
    borderRadius: 175,
    backgroundColor: '#3B82F6',
    opacity: 0.1,
    pointerEvents: 'none',
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  header: {
    paddingTop: 60,
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.4,
    shadowRadius: 24,
    elevation: 16,
  },
  icon: {
    fontSize: 48,
    color: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'center',
  },
  form: {
    paddingHorizontal: 32,
    paddingBottom: 32,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: '#CBD5F5',
    marginBottom: 10,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#1E293B',
    borderRadius: 14,
    backgroundColor: '#181F2A',
    paddingHorizontal: 16,
  },
  inputIconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#213343',
  },
  inputIconWrapperFocused: {
    backgroundColor: '#06B6D4',
    borderColor: '#06B6D4',
  },
  inputIconText: {
    fontSize: 18,
    color: '#94A3B8',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputFocused: {
    borderColor: '#06B6D4',
    backgroundColor: '#0F172A',
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  inputIcon: {
    fontSize: 22,
    marginRight: 10,
    color: '#06B6D4',
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    paddingHorizontal: 8,
    fontSize: 16,
    color: '#fff',
    backgroundColor: 'transparent',
  },
  signInButton: {
    marginTop: 16,
    borderRadius: 14,
    height: 52,
    backgroundColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  signupButton: {
    marginTop: 16,
    borderRadius: 14,
    height: 52,
    backgroundColor: '#06B6D4',
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  signupLink: {
    marginTop: 32,
    alignItems: 'center',
  },
  signupText: {
    fontSize: 15,
    color: '#94A3B8',
    fontWeight: '400',
  },
  signupBold: {
    fontWeight: '700',
    color: '#06B6D4',
  },
});

export default RegisterScreen;
