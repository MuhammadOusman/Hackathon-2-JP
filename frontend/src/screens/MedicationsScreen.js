import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  RefreshControl,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import {medicationService} from '../services/api';
import {colors, typography, spacing, borderRadius} from '../theme';

const MedicationsScreen = ({navigation}) => {
  const [medications, setMedications] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Form fields
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');
  const [notes, setNotes] = useState('');

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

  const resetForm = () => {
    setName('');
    setDosage('');
    setFrequency('');
    setNotes('');
  };

  const handleAddMedication = async () => {
    if (!name || !dosage) {
      Alert.alert('Error', 'Please enter medication name and dosage');
      return;
    }

    setLoading(true);
    try {
      await medicationService.create({
        name,
        dosage,
        frequency,
        notes,
      });
      Alert.alert('Success', 'Medication added successfully!');
      resetForm();
      setModalVisible(false);
      loadMedications();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to add medication');
    } finally {
      setLoading(false);
    }
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
        <Button title="Add Medication" onPress={() => setModalVisible(true)} />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Medication</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.formContainer}>
              <Text style={styles.label}>Medication Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Aspirin"
                value={name}
                onChangeText={setName}
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.label}>Dosage *</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., 100mg"
                value={dosage}
                onChangeText={setDosage}
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.label}>Frequency</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g., Twice daily"
                value={frequency}
                onChangeText={setFrequency}
                placeholderTextColor={colors.textMuted}
              />

              <Text style={styles.label}>Notes</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Additional notes..."
                value={notes}
                onChangeText={setNotes}
                multiline
                numberOfLines={3}
                placeholderTextColor={colors.textMuted}
              />

              <Button
                title="Add Medication"
                onPress={handleAddMedication}
                loading={loading}
                style={styles.submitButton}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: colors.card,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: spacing.xxl,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  modalTitle: {
    ...typography.h2,
    color: colors.textPrimary,
  },
  closeButton: {
    fontSize: 24,
    color: colors.textMuted,
    padding: spacing.sm,
  },
  formContainer: {
    padding: spacing.lg,
  },
  label: {
    ...typography.bodyBold,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
    backgroundColor: colors.background,
  },
  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },
  submitButton: {
    marginTop: spacing.xl,
  },
});

export default MedicationsScreen;
