import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import {medicationService} from '../services/api';
import {colors, typography, spacing} from '../theme';

const MedicationsScreen = ({navigation}) => {
  const [medications, setMedications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadMedications();
  }, []);

  const loadMedications = async () => {
    try {
      const data = await medicationService.getAll();
      setMedications(data);
    } catch (error) {
      console.error('Error loading medications:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadMedications();
    setRefreshing(false);
  };

  const handleDelete = id => {
    Alert.alert(
      'Delete Medication',
      'Are you sure you want to delete this medication?',
      [
        {text: 'Cancel', style: 'cancel'},
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await medicationService.delete(id);
              loadMedications();
            } catch (error) {
              Alert.alert('Error', 'Failed to delete medication');
            }
          },
        },
      ],
    );
  };

  const renderMedication = ({item}) => (
    <Card style={styles.medicationCard}>
      <View style={styles.medicationHeader}>
        <Text style={styles.medicationName}>{item.name}</Text>
        <TouchableOpacity onPress={() => handleDelete(item._id)}>
          <Text style={styles.deleteButton}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.dosage}>💊 {item.dosage}</Text>
      {item.frequency && (
        <Text style={styles.frequency}>🕐 {item.frequency}</Text>
      )}
      {item.notes && <Text style={styles.notes}>{item.notes}</Text>}
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Medications</Text>
      </View>

      <FlatList
        data={medications}
        renderItem={renderMedication}
        keyExtractor={item => item._id}
        contentContainerStyle={styles.list}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No medications added yet</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Button title="Add Medication" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  list: {
    padding: spacing.lg,
  },
  medicationCard: {
    marginBottom: spacing.md,
  },
  medicationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  medicationName: {
    ...typography.h3,
    color: colors.textPrimary,
    flex: 1,
  },
  deleteButton: {
    fontSize: 20,
  },
  dosage: {
    ...typography.body,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  frequency: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
  },
  notes: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.sm,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
  },
  footer: {
    padding: spacing.lg,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});

export default MedicationsScreen;
