import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors, borderRadius, shadows, spacing} from '../theme';

interface CardProps {
  children: ReactNode;
  elevated?: boolean;
  style?: ViewStyle;
  padding?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  elevated = true,
  style,
  padding = spacing.lg,
}) => {
  return (
    <View
      style={[
        styles.card,
        {padding},
        elevated && shadows.small,
        style,
      ]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },
});

export default Card;
