import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {spacing} from '../theme';

const Button = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
}) => {
  const getBackgroundColor = () => {
    if (disabled) return '#CBD5E1';
    switch (variant) {
      case 'primary':
        return '#06B6D4';
      case 'secondary':
        return '#E0F2FE';
      case 'danger':
        return '#EF4444';
      case 'outline':
        return 'transparent';
      default:
        return '#06B6D4';
    }
  };

  const getTextColor = () => {
    if (disabled) return '#94A3B8';
    if (variant === 'outline') return '#06B6D4';
    if (variant === 'secondary') return '#0F172A';
    return '#FFFFFF';
  };

  const getPadding = () => {
    switch (size) {
      case 'small':
        return {paddingVertical: spacing.sm, paddingHorizontal: spacing.lg};
      case 'large':
        return {paddingVertical: spacing.lg, paddingHorizontal: spacing.xl};
      default:
        return {paddingVertical: spacing.md, paddingHorizontal: spacing.xl};
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          borderColor: variant === 'outline' ? '#06B6D4' : 'transparent',
          borderWidth: variant === 'outline' ? 2 : 0,
          shadowOpacity: variant === 'outline' ? 0 : 0.15,
          elevation: variant === 'outline' ? 0 : 4,
        },
        getPadding(),
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator color={getTextColor()} />
      ) : (
        <Text
          style={[
            styles.text,
            {
              color: getTextColor(),
              fontSize: size === 'small' ? 14 : 15,
            },
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    shadowColor: '#06B6D4',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
});

export default Button;
