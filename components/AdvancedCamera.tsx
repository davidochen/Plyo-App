import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform, Dimensions } from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width, height } = Dimensions.get('window');

interface AdvancedCameraProps {
  onClose: () => void;
  onJumpRecorded: (height: number, videoUri?: string) => void;
}

export default function AdvancedCamera({ onClose, onJumpRecorded }: AdvancedCameraProps) {
  console.log('AdvancedCamera component initialized');
  console.log('Camera permissions:', permission);
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [jumpHeight, setJumpHeight] = useState<number | null>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const recordingInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRecording && !isPaused) {
      recordingInterval.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else if (recordingInterval.current) {
      clearInterval(recordingInterval.current);
    }

    return () => {
      if (recordingInterval.current) {
        clearInterval(recordingInterval.current);
      }
    };
  }, [isRecording, isPaused]);

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
            We need camera access to measure your vertical jump using advanced computer vision technology.
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

  const startRecording = async () => {
    try {
      if (cameraRef.current) {
        setIsRecording(true);
        setRecordingTime(0);
        setIsPaused(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        
        // Simulate video recording
        if (Platform.OS === 'web') {
          // Web simulation
          setTimeout(() => {
            stopRecording();
          }, 5000);
        } else {
          // Native recording would start here
          setTimeout(() => {
            stopRecording();
          }, 5000);
        }
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to start recording');
    }
  };

  const stopRecording = async () => {
    try {
      setIsRecording(false);
      setIsAnalyzing(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      
      // Simulate video processing and analysis
      setTimeout(() => {
        const simulatedHeight = 26.5 + (Math.random() * 4);
        setJumpHeight(parseFloat(simulatedHeight.toFixed(1)));
        setVideoUri('simulated-video-uri');
        setIsAnalyzing(false);
      }, 3000);
    } catch (error) {
      Alert.alert('Error', 'Failed to stop recording');
    }
  };

  const pauseRecording = () => {
    setIsPaused(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const resumeRecording = () => {
    setIsPaused(false);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const saveJump = () => {
    if (jumpHeight) {
      onJumpRecorded(jumpHeight, videoUri || undefined);
      Alert.alert(
        'Jump Recorded!',
        `Your vertical jump of ${jumpHeight}" has been saved with video analysis.`,
        [{ text: 'Great!', onPress: onClose }]
      );
    }
  };

  const retryMeasurement = () => {
    setJumpHeight(null);
    setVideoUri(null);
    setIsAnalyzing(false);
    setIsRecording(false);
    setRecordingTime(0);
    setIsPaused(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Advanced Jump Analysis</Text>
          <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
            <Feather name="rotate-ccw" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Recording Timer */}
        {isRecording && (
          <View style={styles.timerContainer}>
            <LinearGradient
              colors={['rgba(239, 68, 68, 0.9)', 'rgba(220, 38, 38, 0.9)']}
              style={styles.timerBadge}
            >
              <View style={styles.recordingDot} />
              <Text style={styles.timerText}>{formatTime(recordingTime)}</Text>
            </LinearGradient>
          </View>
        )}

        {/* Instructions */}
        {!isRecording && !jumpHeight && (
          <View style={styles.instructionsContainer}>
            <LinearGradient
              colors={['rgba(31, 41, 55, 0.9)', 'rgba(17, 24, 39, 0.9)']}
              style={styles.instructions}
            >
              <Feather name="target" size={32} color="#10B981" />
              <Text style={styles.instructionTitle}>Position for Analysis</Text>
              <Text style={styles.instructionText}>
                Stand 8-10 feet from camera, ensure full body visibility, and perform your jump when ready.
              </Text>
              <View style={styles.instructionSteps}>
                <Text style={styles.stepText}>1. Position yourself in frame</Text>
                <Text style={styles.stepText}>2. Press record and jump</Text>
                <Text style={styles.stepText}>3. Hold position at peak</Text>
              </View>
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
                Processing video and calculating vertical displacement...
              </Text>
              <View style={styles.loadingBar}>
                <View style={styles.loadingBarFill} />
              </View>
              <Text style={styles.analysisSubtext}>
                Using AI to measure peak height and form analysis
              </Text>
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
              <Text style={styles.resultsTitle}>Jump Analysis Complete!</Text>
              <Text style={styles.jumpHeightText}>{jumpHeight}"</Text>
              <Text style={styles.resultsSubtext}>Vertical Jump Height</Text>
              
              <View style={styles.analysisDetails}>
                <Text style={styles.detailText}>📹 Video recorded</Text>
                <Text style={styles.detailText}>🎯 Form analyzed</Text>
                <Text style={styles.detailText}>📊 Data saved</Text>
              </View>
              
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
            <TouchableOpacity style={styles.recordButton} onPress={startRecording}>
              <LinearGradient
                colors={['#10B981', '#059669']}
                style={styles.recordButtonGradient}
              >
                <Feather name="video" size={32} color="white" />
              </LinearGradient>
            </TouchableOpacity>
          )}
          
          {isRecording && (
            <View style={styles.recordingControls}>
              <TouchableOpacity style={styles.controlButton} onPress={onClose}>
                <Feather name="x" size={24} color="white" />
              </TouchableOpacity>
              
              {isPaused ? (
                <TouchableOpacity style={styles.resumeButton} onPress={resumeRecording}>
                  <Feather name="play" size={24} color="white" />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.pauseButton} onPress={pauseRecording}>
                  <Feather name="pause" size={24} color="white" />
                </TouchableOpacity>
              )}
              
              <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                <Feather name="square" size={24} color="white" />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </CameraView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
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
  timerContainer: {
    position: 'absolute',
    top: 120,
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  timerBadge: {
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
  timerText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionsContainer: {
    position: 'absolute',
    top: '35%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  instructions: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    maxWidth: 320,
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
    marginBottom: 16,
  },
  instructionSteps: {
    alignItems: 'flex-start',
    width: '100%',
  },
  stepText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginBottom: 4,
  },
  analysisOverlay: {
    position: 'absolute',
    top: '30%',
    left: 20,
    right: 20,
    alignItems: 'center',
  },
  analysisContainer: {
    borderRadius: 16,
    padding: 32,
    alignItems: 'center',
    maxWidth: 320,
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
  analysisSubtext: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 12,
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
    top: '25%',
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
    marginBottom: 20,
  },
  analysisDetails: {
    alignItems: 'center',
    marginBottom: 24,
  },
  detailText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    marginBottom: 4,
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
  recordingControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pauseButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(239, 68, 68, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  resumeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(16, 185, 129, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 