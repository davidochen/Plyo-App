# Camera Features Documentation

## Overview

The PlyoPlus app includes comprehensive camera functionality for measuring vertical jump height using computer vision technology. The camera system provides both basic and advanced measurement capabilities with a focus on accuracy and user experience.

## Components

### 1. JumpMeasurement.tsx
**Basic camera component for jump measurement**

**Features:**
- Real-time camera preview
- Permission handling
- Basic jump height calculation
- Simple UI with instructions
- Camera flip functionality
- Results display with save/retry options

**Usage:**
```typescript
<JumpMeasurement
  onClose={() => setShowCamera(false)}
  onJumpRecorded={(height) => handleJumpRecorded(height)}
/>
```

### 2. AdvancedCamera.tsx
**Advanced camera component with video recording**

**Features:**
- Video recording with timer
- Pause/resume functionality
- Advanced analysis with video processing
- Haptic feedback integration
- Enhanced UI with detailed instructions
- Multiple recording controls
- Video URI storage

**Usage:**
```typescript
<AdvancedCamera
  onClose={() => setShowAdvancedCamera(false)}
  onJumpRecorded={(height, videoUri) => handleAdvancedJumpRecorded(height, videoUri)}
/>
```

### 3. CameraSettings.tsx
**Camera configuration component**

**Features:**
- Resolution selection (720p, 1080p, 4K)
- Frame rate options (30, 60, 120 FPS)
- Analysis mode selection (Basic, Advanced, Pro)
- Toggle settings for HDR, stabilization, auto-save
- Sound effects and haptic feedback controls
- Performance tips and recommendations

**Usage:**
```typescript
<CameraSettings
  onClose={() => setShowSettings(false)}
  onSettingsChanged={(settings) => updateCameraSettings(settings)}
  currentSettings={cameraSettings}
/>
```

### 4. CameraTutorial.tsx
**Interactive tutorial for camera usage**

**Features:**
- Step-by-step guidance
- Progress tracking
- Pro tips for each step
- Skip functionality
- Comprehensive setup instructions
- Best practices for accurate measurements

**Usage:**
```typescript
<CameraTutorial
  onClose={() => setShowTutorial(false)}
  onComplete={() => handleTutorialComplete()}
/>
```

## Camera Settings Interface

```typescript
interface CameraSettings {
  resolution: '720p' | '1080p' | '4K';
  frameRate: 30 | 60 | 120;
  enableHDR: boolean;
  enableStabilization: boolean;
  analysisMode: 'basic' | 'advanced' | 'pro';
  autoSave: boolean;
  soundEffects: boolean;
  hapticFeedback: boolean;
}
```

## Integration with Main App

The camera features are integrated into the main app through the "Measure Jump" quick action. Users can choose between:

1. **Basic Camera**: Simple measurement with real-time analysis
2. **Advanced Camera**: Video recording with detailed analysis

### Camera Selection Flow

```typescript
const showCameraOptions = () => {
  Alert.alert(
    'Choose Camera Mode',
    'Select the type of jump measurement you want to use:',
    [
      { text: 'Basic Camera', onPress: () => setShowCamera(true) },
      { text: 'Advanced Camera', onPress: () => setShowAdvancedCamera(true) },
      { text: 'Cancel', style: 'cancel' },
    ]
  );
};
```

## Key Features

### Permission Handling
- Automatic camera permission requests
- User-friendly permission screens
- Graceful fallbacks for denied permissions

### Real-time Analysis
- Computer vision-based jump height calculation
- Form analysis and feedback
- Progress tracking and statistics

### Video Recording
- High-quality video capture
- Recording timer and controls
- Video storage and playback
- Advanced analysis with video processing

### User Experience
- Intuitive UI with clear instructions
- Haptic feedback for interactions
- Progress indicators and loading states
- Error handling and retry mechanisms

### Settings Management
- Comprehensive camera configuration
- Performance optimization options
- User preference storage
- Tutorial and help system

## Technical Implementation

### Dependencies
- `expo-camera`: Core camera functionality
- `expo-haptics`: Haptic feedback
- `expo-linear-gradient`: UI styling
- `@expo/vector-icons`: Icon system

### State Management
- Camera permissions
- Recording states
- Analysis progress
- Settings configuration
- Tutorial progress

### Error Handling
- Permission denials
- Camera initialization failures
- Recording errors
- Analysis failures

## Best Practices

### Camera Setup
1. Position device 8-10 feet from jumping area
2. Ensure stable mounting or tripod use
3. Maintain consistent lighting
4. Clear background for better analysis

### Recording Tips
1. Start recording before jump sequence
2. Keep camera steady throughout
3. Perform multiple attempts for accuracy
4. Review recordings for form improvement

### Analysis Accuracy
1. Use proper jump technique
2. Maintain consistent positioning
3. Enable stabilization for handheld recording
4. Choose appropriate resolution and frame rate

## Future Enhancements

### Planned Features
- AI-powered form analysis
- 3D motion tracking
- Comparative analysis with previous jumps
- Social sharing of achievements
- Integration with training programs
- Real-time coaching feedback

### Performance Optimizations
- GPU acceleration for video processing
- Optimized algorithms for mobile devices
- Battery usage optimization
- Storage management for video files

## Troubleshooting

### Common Issues
1. **Camera not working**: Check permissions and device compatibility
2. **Poor accuracy**: Ensure proper setup and lighting
3. **Recording failures**: Check storage space and device performance
4. **Analysis errors**: Verify camera positioning and jump technique

### Support
- In-app tutorial for setup guidance
- Settings panel for configuration
- Error messages with actionable solutions
- Performance tips and recommendations

## Security & Privacy

### Data Handling
- Local processing of video data
- Optional cloud storage with user consent
- Secure storage of measurement data
- Privacy-focused design

### Permissions
- Camera access for measurement only
- Optional storage access for video saving
- Transparent permission requests
- User control over data sharing

This camera system provides a comprehensive solution for vertical jump measurement with both basic and advanced capabilities, ensuring accurate results and excellent user experience. 