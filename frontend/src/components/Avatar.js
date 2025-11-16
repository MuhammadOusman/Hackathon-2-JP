import React from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import {colors, typography, spacing} from '../theme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: number;
}

const Avatar: React.FC<AvatarProps> = ({uri, name, size = 48}) => {
  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  if (uri) {
    return (
      <Image
        source={{uri}}
        style={[styles.avatar, {width: size, height: size, borderRadius: size / 2}]}
      />
    );
  }

  return (
    <View
      style={[
        styles.placeholder,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}>
      <Text style={[styles.initials, {fontSize: size * 0.4}]}>
        {name ? getInitials(name) : '?'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: colors.background,
  },
  placeholder: {
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initials: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
});

export default Avatar;
