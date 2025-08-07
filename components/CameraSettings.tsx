import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface CameraSettingsProps {
  onClose: () => void;
  onSettingsChanged: (settings: CameraSettings) => void;
  currentSettings: CameraSettings;
}

export interface CameraSettings {
  resolution: '720p' | '1080p' | '4K';
  frameRate: 30 | 60 | 120;
  enableHDR: boolean;
  enableStabilization: boolean;
  analysisMode: 'basic' | 'advanced' | 'pro';
  autoSave: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
}

export default function CameraSettings({ onClose, onSettingsChanged, currentSettings }: CameraSettingsProps) {
  const [settings, setSettings] = useState<CameraSettings>(currentSettings);

  const updateSetting = <K extends keyof CameraSettings>(
    key: K,
    value: CameraSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChanged(newSettings);
  };

  const resolutionOptions = [
    { label: '720p', value: '720p' as const, description: 'Standard quality, faster processing' },
    { label: '1080p', value: '1080p' as const, description: 'High quality, balanced performance' },
    { label: '4K', value: '4K' as const, description: 'Ultra high quality, slower processing' },
  ];

  const frameRateOptions = [
    { label: '30 FPS', value: 30 as const, description: 'Standard frame rate' },
    { label: '60 FPS', value: 60 as const, description: 'Smooth motion capture' },
    { label: '120 FPS', value: 120 as const, description: 'High-speed analysis' },
  ];

  const analysisModeOptions = [
    { label: 'Basic', value: 'basic' as const, description: 'Simple height measurement' },
    { label: 'Advanced', value: 'advanced' as const, description: 'Form analysis included' },
    { label: 'Pro', value: 'pro' as const, description: 'Full biomechanical analysis' },
  ];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1F2937', '#111827']}
        style={styles.content}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Camera Settings</Text>
          <View style={styles.placeholder} />
        </View>

        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Resolution Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Video Quality</Text>
            <View style={styles.optionsContainer}>
              {resolutionOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    settings.resolution === option.value && styles.selectedOption
                  ]}
                  onPress={() => updateSetting('resolution', option.value)}
                >
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {settings.resolution === option.value && (
                      <Feather name="check" size={20} color="#10B981" />
                    )}
                  </View>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Frame Rate Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Frame Rate</Text>
            <View style={styles.optionsContainer}>
              {frameRateOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    settings.frameRate === option.value && styles.selectedOption
                  ]}
                  onPress={() => updateSetting('frameRate', option.value)}
                >
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {settings.frameRate === option.value && (
                      <Feather name="check" size={20} color="#10B981" />
                    )}
                  </View>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Analysis Mode */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Analysis Mode</Text>
            <View style={styles.optionsContainer}>
              {analysisModeOptions.map((option) => (
                <TouchableOpacity
                  key={option.value}
                  style={[
                    styles.optionCard,
                    settings.analysisMode === option.value && styles.selectedOption
                  ]}
                  onPress={() => updateSetting('analysisMode', option.value)}
                >
                  <View style={styles.optionHeader}>
                    <Text style={styles.optionLabel}>{option.label}</Text>
                    {settings.analysisMode === option.value && (
                      <Feather name="check" size={20} color="#10B981" />
                    )}
                  </View>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Toggle Settings */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Preferences</Text>
            
            <View style={styles.toggleContainer}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>HDR Video</Text>
                <Text style={styles.toggleDescription}>Enhanced color and contrast</Text>
              </View>
              <Switch
                value={settings.enableHDR}
                onValueChange={(value) => updateSetting('enableHDR', value)}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="white"
              />
            </View>

            <View style={styles.toggleContainer}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Video Stabilization</Text>
                <Text style={styles.toggleDescription}>Reduce camera shake</Text>
              </View>
              <Switch
                value={settings.enableStabilization}
                onValueChange={(value) => updateSetting('enableStabilization', value)}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="white"
              />
            </View>

            <View style={styles.toggleContainer}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Auto Save</Text>
                <Text style={styles.toggleDescription}>Automatically save measurements</Text>
              </View>
              <Switch
                value={settings.autoSave}
                onValueChange={(value) => updateSetting('autoSave', value)}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="white"
              />
            </View>

            <View style={styles.toggleContainer}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Sound Effects</Text>
                <Text style={styles.toggleDescription}>Audio feedback during recording</Text>
              </View>
              <Switch
                value={settings.soundEffects}
                onValueChange={(value) => updateSetting('soundEffects', value)}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="white"
              />
            </View>

            <View style={styles.toggleContainer}>
              <View style={styles.toggleInfo}>
                <Text style={styles.toggleLabel}>Haptic Feedback</Text>
                <Text style={styles.toggleDescription}>Vibration feedback</Text>
              </View>
              <Switch
                value={settings.hapticFeedback}
                onValueChange={(value) => updateSetting('hapticFeedback', value)}
                trackColor={{ false: '#374151', true: '#10B981' }}
                thumbColor="white"
              />
            </View>
          </View>

          {/* Info Section */}
          <View style={styles.section}>
            <View style={styles.infoCard}>
              <Feather name="info" size={20} color="#10B981" />
              <Text style={styles.infoTitle}>Performance Tips</Text>
              <Text style={styles.infoText}>
                • Higher resolution and frame rates provide better accuracy but use more battery
              </Text>
              <Text style={styles.infoText}>
                • Pro analysis mode requires more processing time
              </Text>
              <Text style={styles.infoText}>
                • Enable stabilization for handheld recording
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  content: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  optionsContainer: {
    gap: 12,
  },
  optionCard: {
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#374151',
  },
  selectedOption: {
    borderColor: '#10B981',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  optionDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1F2937',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#374151',
  },
  toggleInfo: {
    flex: 1,
  },
  toggleLabel: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  toggleDescription: {
    color: '#9CA3AF',
    fontSize: 14,
  },
  infoCard: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  infoTitle: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#9CA3AF',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
}); 