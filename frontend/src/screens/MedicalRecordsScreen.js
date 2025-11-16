import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Linking,
  Image,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {pick, types} from '@react-native-documents/picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {recordService} from '../services/api';
import {colors, typography, spacing} from '../theme';
import Feather from 'react-native-vector-icons/Feather';

const MedicalRecordsScreen = () => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = async () => {
    try {
      setLoading(true);
      const data = await recordService.getRecords();
      setRecords(data);
    } catch (error) {
      // Silently handle error
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.8,
        includeBase64: false,
      });

      if (result.didCancel) {
        return;
      }

      if (result.assets && result.assets[0]) {
        await uploadFile(result.assets[0]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image');
    }
  };

  const pickDocument = async () => {
    try {
      const result = await pick({
        type: [types.pdf, types.images],
      });

      if (result && result[0]) {
        await uploadFile(result[0]);
      }
    } catch (error) {
      if (error?.message === 'User canceled document picker' || error?.message === 'user canceled the document picker') {
        // User cancelled - silently return
        return;
      }
      Alert.alert('Error', 'Failed to pick document');
    }
  };

  const uploadFile = async (file) => {
    try {
      setUploading(true);
      setShowUploadModal(false);
      
      await recordService.uploadRecord(file);
      
      Alert.alert('Success', 'File uploaded successfully!');
      loadRecords();
    } catch (error) {
      Alert.alert('Error', error.response?.data?.message || 'Failed to upload file');
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

  const renderRecord = ({item}) => {
    const isImage = item.fileType?.startsWith('image/');
    
    return (
      <TouchableOpacity style={styles.recordCard} activeOpacity={0.7}>
        <View style={styles.cardGlow} />
        
        {isImage ? (
          <Image source={{uri: item.fileUrl}} style={styles.thumbnailImage} />
        ) : (
          <View style={styles.pdfThumbnail}>
            <Feather name="file-text" size={48} color="#07B4C8" />
          </View>
        )}
        
        <View style={styles.recordInfo}>
          <Text style={styles.fileName} numberOfLines={1}>{item.fileName}</Text>
          <View style={styles.recordMeta}>
            <View style={styles.typeBadge}>
              <Feather 
                name={isImage ? 'image' : 'file-text'} 
                size={12} 
                color="#07B4C8" 
              />
              <Text style={styles.typeText}>{item.fileType?.split('/')[1]?.toUpperCase()}</Text>
            </View>
            <Text style={styles.recordDate}>
              {new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          </View>
        </View>
        
        <View style={styles.recordActions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => Linking.openURL(item.fileUrl)}>
            <Feather name="eye" size={18} color="#07B4C8" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteActionButton]}
            onPress={() => handleDelete(item._id)}>
            <Feather name="trash-2" size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Background gradients */}
      <View style={styles.bgGradient1} />
      <View style={styles.bgGradient2} />

      <View style={styles.header}>
        <View>
          <Text style={styles.subtitle}>Your Health</Text>
          <Text style={styles.title}>Medical Records</Text>
        </View>
        <TouchableOpacity 
          style={styles.uploadButton}
          onPress={() => setShowUploadModal(true)}>
          <Feather name="plus" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {uploading && (
        <View style={styles.uploadingBanner}>
          <ActivityIndicator size="small" color="#07B4C8" />
          <Text style={styles.uploadingText}>Uploading file...</Text>
        </View>
      )}

      <FlatList
        data={records}
        renderItem={renderRecord}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        refreshing={loading}
        onRefresh={loadRecords}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconBg}>
              <Feather name="folder" size={48} color="#07B4C8" />
            </View>
            <Text style={styles.emptyTitle}>No Records Yet</Text>
            <Text style={styles.emptyText}>Upload your medical documents and images</Text>
          </View>
        }
      />

      {/* Upload Options Modal */}
      <Modal
        visible={showUploadModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowUploadModal(false)}>
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setShowUploadModal(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Upload Medical Record</Text>
            
            <TouchableOpacity 
              style={styles.uploadOption}
              onPress={pickImage}>
              <View style={styles.uploadIconBg}>
                <Feather name="image" size={24} color="#07B4C8" />
              </View>
              <View style={styles.uploadOptionText}>
                <Text style={styles.uploadOptionTitle}>Photo/Image</Text>
                <Text style={styles.uploadOptionSubtitle}>Select from gallery</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.uploadOption}
              onPress={pickDocument}>
              <View style={styles.uploadIconBg}>
                <Feather name="file-text" size={24} color="#07B4C8" />
              </View>
              <View style={styles.uploadOptionText}>
                <Text style={styles.uploadOptionTitle}>PDF Document</Text>
                <Text style={styles.uploadOptionSubtitle}>Select PDF or image file</Text>
              </View>
              <Feather name="chevron-right" size={20} color="#CBD5E1" />
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.cancelButton}
              onPress={() => setShowUploadModal(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  // Background gradients
  bgGradient1: {
    position: 'absolute',
    top: -100,
    right: -70,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: '#07B4C8',
    opacity: 0.1,
  },
  bgGradient2: {
    position: 'absolute',
    bottom: 150,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: '#34D399',
    opacity: 0.09,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.lg,
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  uploadButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#07B4C8',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#07B4C8',
    shadowOffset: {width: 0, height: 8},
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },

  uploadingBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#E0F7FA',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: 12,
  },
  uploadingText: {
    fontSize: 14,
    color: '#07B4C8',
    fontWeight: '600',
  },

  list: {
    padding: spacing.lg,
    paddingBottom: 100,
  },

  recordCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    marginBottom: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 4,
  },
  cardGlow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: '#07B4C8',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  thumbnailImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
  },
  pdfThumbnail: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordInfo: {
    flex: 1,
  },
  fileName: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  recordMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#E0F7FA',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  typeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#07B4C8',
  },
  recordDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  recordActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteActionButton: {
    backgroundColor: '#FEE2E2',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.xl,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
  },
  uploadOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    marginBottom: spacing.md,
  },
  uploadIconBg: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  uploadOptionText: {
    flex: 1,
  },
  uploadOptionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  uploadOptionSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
  },
  cancelButton: {
    marginTop: spacing.md,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
  },

  // Empty state
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 80,
  },
  emptyIconBg: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#E0F7FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});

export default MedicalRecordsScreen;
