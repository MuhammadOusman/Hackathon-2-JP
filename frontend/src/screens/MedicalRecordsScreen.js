import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Linking,
  TextInput,
} from 'react-native';
import Card from '../components/Card';
import Button from '../components/Button';
import {recordService} from '../services/api';
import {colors, typography, spacing} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

const MedicalRecordsScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fileUrl, setFileUrl] = useState('');
  const [showUploadForm, setShowUploadForm] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await recordService.getRecords();
      setRecords(data);
    } catch (error) {
      console.error('Error loading records:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async () => {
    if (!fileUrl) {
      Alert.alert('Error', 'Please enter a file URL');
      return;
    }

    try {
      setUploading(true);
      await recordService.uploadRecord({url: fileUrl, type: 'pdf'});
      Alert.alert('Success', 'File uploaded successfully!');
      setFileUrl('');
      setShowUploadForm(false);
      loadRecords();
    } catch (error) {
      Alert.alert('Error', 'Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (id) => {
    Alert.alert('Delete Record', 'Are you sure?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await recordService.deleteRecord(id);
            loadRecords();
          } catch (error) {
            Alert.alert('Error', 'Failed to delete record');
          }
        },
      },
    ]);
  };

  const renderRecord = ({item}) => (
        <Card style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Feather
          name={item.type === 'pdf' ? 'file-text' : 'image'}
          size={28}
          color="#06B6D4"
          style={styles.recordIcon}
        />
        <View style={styles.recordInfo}>
          <Text style={styles.recordType}>{item.type.toUpperCase()}</Text>
          <Text style={styles.recordDate}>
            {new Date(item.createdAt).toLocaleDateString()}
          </Text>
        </View>
      </View>
      <View style={styles.recordActions}>
        <TouchableOpacity
          style={styles.viewButton}
          onPress={() => Linking.openURL(item.url)}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item._id)}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      {showUploadForm ? (
        <Card style={styles.uploadForm}>
          <Text style={styles.formTitle}>Upload File URL</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter file URL"
            value={fileUrl}
            onChangeText={setFileUrl}
            placeholderTextColor={colors.textMuted}
          />
          <View style={styles.formButtons}>
            <Button
              title="Cancel"
              onPress={() => {
                setShowUploadForm(false);
                setFileUrl('');
              }}
              variant="outline"
              style={styles.formButton}
            />
            <Button
              title="Upload"
              onPress={handleUpload}
              loading={uploading}
              style={styles.formButton}
            />
          </View>
        </Card>
      ) : (
        <Button
          title="Upload File"
          onPress={() => setShowUploadForm(true)}
          style={styles.uploadButton}
        />
      )}

      <FlatList
        data={records}
        renderItem={renderRecord}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadRecords}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No records found</Text>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  uploadForm: {
    marginBottom: spacing.lg,
    padding: spacing.lg,
  },
  formTitle: {
    ...typography.h3,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    padding: spacing.md,
    color: colors.textPrimary,
    marginBottom: spacing.md,
  },
  formButtons: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  formButton: {
    flex: 1,
  },
  uploadButton: {
    marginBottom: spacing.lg,
  },
  list: {
    paddingBottom: spacing.xl,
  },
  recordCard: {
    marginBottom: spacing.md,
    padding: spacing.lg,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  recordIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  recordInfo: {
    flex: 1,
  },
  recordType: {
    ...typography.bodyBold,
    color: colors.textPrimary,
  },
  recordDate: {
    ...typography.small,
    color: colors.textSecondary,
  },
  recordActions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  viewButton: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  deleteButton: {
    flex: 1,
    backgroundColor: colors.error,
    padding: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  emptyText: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});

export default MedicalRecordsScreen;
