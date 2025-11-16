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

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 40,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, slideAnim]);

  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter email and password');
      return;
    }

    animateButton();
    setLoading(true);
    console.log('Frontend: Sending login request for email:', email);
    try {
      await authService.login(email, password);
      console.log('Frontend: Login successful');
    } catch (error) {
      console.log('Frontend: Login failed with error:', error);
      Alert.alert('Login Failed', error.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Animated gradient background */}
      <View style={styles.gradientTop} />
      <View style={styles.gradientBottom} />
      
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled">
          
          <Animated.View 
            style={[
              styles.content,
              {
                opacity: fadeAnim,
                transform: [{translateY: slideAnim}],
              },
            ]}>
            
            {/* Header */}
            <View style={styles.header}>
              <View style={styles.iconContainer}>
                  <Feather name="activity" size={36} color="#fff" />
                </View>
              <Text style={styles.title}>Welcome Back</Text>
              <Text style={styles.subtitle}>Sign in to continue your health journey</Text>
            </View>

            {/* Form */}
            <View style={styles.form}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Email</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    emailFocused && styles.inputFocused
                  ]}
                  pointerEvents="box-none">
                    <View style={[styles.inputIconWrapper, emailFocused && styles.inputIconWrapperFocused]}>
                      <Feather name="mail" size={18} color={emailFocused ? '#ffffff' : '#94A3B8'} />
                    </View>
                  <TextInput
                    style={styles.input}
                    placeholder="your@email.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor="#475569"
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Password</Text>
                <View 
                  style={[
                    styles.inputWrapper,
                    passwordFocused && styles.inputFocused
                  ]}
                  pointerEvents="box-none">
                  <View style={[styles.inputIconWrapper, passwordFocused && styles.inputIconWrapperFocused]}>
                    <Feather name="lock" size={18} color={passwordFocused ? '#ffffff' : '#94A3B8'} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor="#475569"
                  />
                </View>
              </View>

              <Animated.View style={{transform: [{scale: buttonScale}]}}>
                <Button
                  title="Sign In"
                  onPress={handleLogin}
                  loading={loading}
                  style={styles.signInButton}
                />
              </Animated.View>

              <TouchableOpacity
                onPress={() => navigation.navigate('Register')}
                style={styles.signupLink}>
                <Text style={styles.signupText}>
                  Don't have an account? <Text style={styles.signupBold}>Sign Up</Text>
                </Text>
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
  scrollContent: {
    flexGrow: 1,
    paddingTop: 60,
    paddingBottom: 40,
  },
  content: {
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  iconContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#06B6D4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  icon: {
    fontSize: 50,
    color: '#ffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#94A3B8',
    textAlign: 'left',
  },
  form: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#CBD5E1',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1E293B',
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#334155',
    paddingHorizontal: 16,
    transition: 'all 0.3s ease',
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
    fontSize: 20,
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 18,
    fontSize: 16,
    color: '#FFFFFF',
  },
  signInButton: {
    marginBottom: 24,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 28,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    fontSize: 13,
    color: '#64748B',
    marginHorizontal: 16,
    fontWeight: '600',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
    marginBottom: 32,
  },
  socialBtn: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: '#1E293B',
    borderWidth: 2,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#94A3B8',
  },
  signupLink: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  signupText: {
    fontSize: 15,
    color: '#64748B',
  },
  signupBold: {
    fontWeight: '700',
    color: '#06B6D4',
  },
});

export default LoginScreen;
