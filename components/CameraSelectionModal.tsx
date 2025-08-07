import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface CameraSelectionModalProps {
  visible: boolean;
  onClose: () => void;
  onBasicCamera: () => void;
  onAdvancedCamera: () => void;
}

export default function CameraSelectionModal({ 
  visible, 
  onClose, 
  onBasicCamera, 
  onAdvancedCamera 
}: CameraSelectionModalProps) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <LinearGradient
          colors={['rgba(31, 41, 55, 0.95)', 'rgba(17, 24, 39, 0.95)']}
          style={styles.modal}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Choose Camera Mode</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Feather name="x" size={24} color="white" />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            Select the type of jump measurement you want to use:
          </Text>

          {/* Basic Camera Option */}
          <TouchableOpacity style={styles.optionCard} onPress={onBasicCamera}>
            <View style={styles.optionHeader}>
              <View style={[styles.optionIcon, { backgroundColor: '#10B981' }]}>
                <Feather name="camera" size={24} color="white" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Basic Camera</Text>
                <Text style={styles.optionDescription}>
                  Simple measurement with real-time analysis
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Advanced Camera Option */}
          <TouchableOpacity style={styles.optionCard} onPress={onAdvancedCamera}>
            <View style={styles.optionHeader}>
              <View style={[styles.optionIcon, { backgroundColor: '#F97316' }]}>
                <Feather name="video" size={24} color="white" />
              </View>
              <View style={styles.optionInfo}>
                <Text style={styles.optionTitle}>Advanced Camera</Text>
                <Text style={styles.optionDescription}>
                  Video recording with detailed analysis
                </Text>
              </View>
              <Feather name="chevron-right" size={20} color="#9CA3AF" />
            </View>
          </TouchableOpacity>

          {/* Cancel Button */}
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    color: '#9CA3AF',
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  optionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionInfo: {
    flex: 1,
  },
  optionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelText: {
    color: '#9CA3AF',
    fontSize: 16,
    fontWeight: '600',
  },
}); 