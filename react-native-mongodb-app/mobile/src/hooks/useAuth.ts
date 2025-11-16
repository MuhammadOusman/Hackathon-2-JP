import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { loginUser, registerUser } from '../services/api';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    const login = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await loginUser(email, password);
            setUser(response.data);
            navigation.navigate('Home');
        } catch (err) {
            setError(err.response.data.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    const register = async (email, password) => {
        setLoading(true);
        setError(null);
        try {
            const response = await registerUser(email, password);
            setUser(response.data);
            navigation.navigate('Home');
        } catch (err) {
            setError(err.response.data.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        navigation.navigate('Login');
    };

    return {
        user,
        loading,
        error,
        login,
        register,
        logout,
    };
};

export default useAuth;