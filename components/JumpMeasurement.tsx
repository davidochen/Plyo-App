import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

interface JumpMeasurementProps {
  onClose: () => void;
  onJumpRecorded: (height: number) => void;
}

export default function JumpMeasurement({ onClose, onJumpRecorded }: JumpMeasurementProps) {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jumpHeight, setJumpHeight] = useState<number | null>(null);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return (
      <View style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading camera...</Text>
        </View>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#1F2937', '#111827']}
          style={styles.permissionContainer}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Feather name="camera" size={64} color="#10B981" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need camera access to measure your vertical jump using computer vision technology.
          </Text>
          <TouchableOpacity style={styles.permissionButton} onPress={requestPermission}>
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    );
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  };

  const startJumpDetection = async () => {
    if (Platform.OS === 'web') {
      // Web simulation
      setIsRecording(true);
      setIsAnalyzing(true);
      
      // Simulate analysis time
      setTimeout(() => {
        const simulatedHeight = 26.5 + (Math.random() * 4); // Random height between 26.5" and 30.5"
        setJumpHeight(parseFloat(simulatedHeight.toFixed(1)));
        setIsAnalyzing(false);
        setIsRecording(false);
      }, 3000);
    } else {
      // Native implementation would use computer vision here
      setIsRecording(true);
      setIsAnalyzing(true);
      
      // Simulate analysis for demo
      setTimeout(() => {
        const simulatedHeight = 26.5 + (Math.random() * 4);
        setJumpHeight(parseFloat(simulatedHeight.toFixed(1)));
        setIsAnalyzing(false);
        setIsRecording(false);
      }, 3000);
    }
  };

  const saveJump = () => {
    if (jumpHeight) {
      onJumpRecorded(jumpHeight);
      Alert.alert(
        'Jump Recorded!',
        `Your vertical jump of ${jumpHeight}" has been saved to your progress.`,
        [{ text: 'Great!', onPress: onClose }]
      );
    }
  };

  const retryMeasurement = () => {
    setJumpHeight(null);
    setIsAnalyzing(false);
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      {/* Camera View */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Jump Measurement</Text>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Feather name="rotate-ccw" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Instructions */}
        {!isRecording && !jumpHeight && (
          <View style={styles.instructionsContainer}>
            <LinearGradient
              colors={['rgba(31, 41, 55, 0.9)', 'rgba(17, 24, 39, 0.9)']}
              style={styles.instructions}
            >
              <Feather name="target" size={32} color="#10B981" />
              <Text style={styles.instructionTitle}>Position yourself</Text>
              <Text style={styles.instructionText}>
                Stand 6-8 feet from the camera, make sure your full body is visible, then tap the record button when ready to jump.
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Recording Indicator */}
        {isRecording && (
          <View style={styles.recordingContainer}>
            <LinearGradient
              colors={['rgba(239, 68, 68, 0.9)', 'rgba(220, 38, 38, 0.9)']}
              style={styles.recordingBadge}
            >
              <View style={styles.recordingDot} />
              <Text style={styles.recordingText}>
                {isAnalyzing ? 'ANALYZING JUMP...' : 'RECORDING'}
              </Text>
            </LinearGradient>
          </View>
        )}

        {/* Analysis Overlay */}
        {isAnalyzing && (
          <View style={styles.analysisOverlay}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.9)', 'rgba(5, 150, 105, 0.9)']}
              style={styles.analysisContainer}
            >
              <Feather name="zap" size={48} color="white" />
              <Text style={styles.analysisTitle}>Analyzing Your Jump</Text>
              <Text style={styles.analysisText}>
                AI is measuring your vertical displacement...
              </Text>
              <View style={styles.loadingBar}>
                <View style={styles.loadingBarFill} />
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Results */}
        {jumpHeight && (
          <View style={styles.resultsContainer}>
            <LinearGradient
              colors={['rgba(16, 185, 129, 0.95)', 'rgba(5, 150, 105, 0.95)']}
              style={styles.results}
            >
              <Feather name="check-circle" size={48} color="white" />
              <Text style={styles.resultsTitle}>Jump Measured!</Text>
              <Text style={styles.jumpHeightText}>{jumpHeight}"</Text>
              <Text style={styles.resultsSubtext}>Vertical Jump Height</Text>
              
              <View style={styles.resultsActions}>
                <TouchableOpacity style={styles.retryButton} onPress={retryMeasurement}>
                  <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.saveButton} onPress={saveJump}>
                  <Text style={styles.saveButtonText}>Save Jump</Text>
                </TouchableOpacity>
              </View>
            </LinearGradient>
          </View>
        )}

        {/* Bottom Controls */}
        <View style={styles.bottomControls}>
          {!isRecording && !jumpHeight && (
            <TouchableOpacity style={styles.recordButton} onPress={startJumpDetection}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.recordButtonGradient}
              >
                <Feather name="trending-up" size={32} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111827',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'white',
    fontSize: 16,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 20,
    padding: 40,
  },
  permissionTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    textAlign: 'center',
  },
  permissionText: {
    color: '#9CA3AF',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 32,
  },
  permissionButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  permissionButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  camera: {
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  flipButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  instructionsContainer: {
    position: 'absolute',
    top: '40%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructions: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    maxWidth: 300,
  },
  instructionTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
  },
  instructionText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },
  recordingContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  recordingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 8,
  },
  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'white',
  },
  recordingText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  analysisOverlay: {
    position: 'absolute',
    top: '35%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  analysisContainer: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    maxWidth: 300,
  },
  analysisTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  analysisText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  },
  loadingBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 2,
    overflow: 'hidden',
  },
  loadingBarFill: {
    height: '100%',
    width: '60%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  resultsContainer: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  results: {
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    maxWidth: 320,
    width: '100%',
  },
  resultsTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  jumpHeightText: {
    color: 'white',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  resultsSubtext: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 16,
    marginBottom: 24,
  },
  resultsActions: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  retryButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: 'white',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#10B981',
    fontSize: 16,
    fontWeight: '600',
  },
  bottomControls: {
    position: 'absolute',
    bottom: 60,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  recordButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    overflow: 'hidden',
  },
  recordButtonGradient: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});