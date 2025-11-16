import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Card from './Card';
import {colors, typography, spacing} from '../theme';

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({label, value, sub, trend}) => {
  const getTrendColor = () => {
    switch (trend) {
      case 'up':
        return colors.statGood;
      case 'down':
        return colors.statBad;
      default:
        return colors.statNeutral;
    }
  };

  return (
    <Card elevated={false} padding={spacing.md} style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        <Text style={styles.value}>{value}</Text>
        {sub && (
          <Text style={[styles.sub, {color: getTrendColor()}]}>{sub}</Text>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 80,
  },
  label: {
    ...typography.small,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: spacing.xs,
  },
  value: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  sub: {
    ...typography.tiny,
    marginLeft: spacing.sm,
    marginBottom: 4,
  },
});

export default StatCard;
