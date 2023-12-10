import React, { useState, useContext, useEffect } from 'react';
import { Modal, View, Text, Switch, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import { styles } from './mobileStyles';
import { SettingsContext } from './settingsContext';

const AccessibilitySettings = ({ isVisible, onClose }) => {
    // Access global settings from context
    const { settings, saveSettings } = useContext(SettingsContext);
    // Log settings from context
    console.log('Context settings:', settings);

    // Local states for managing accessibility settings within the modal
    const [textSize, setTextSize] = useState(settings.textSize);
    const [brightness, setBrightness] = useState(settings.brightness);
    const [soundEnabled, setSoundEnabled] = useState(settings.soundEnabled);

    // Handler for changing text size
    const handleTextSizeChange = (size) => {
        // Log new text size
        console.log('handleTextSizeChange - newSize:', size);
        setTextSize(size);
    };

    // Handler for changing screen brightness
    const handleBrightnessChange = (newBrightness) => {
        // Log new brightness
        console.log('handleBrightnessChange - newBrightness:', newBrightness);
        setBrightness(newBrightness);
    };

    // Toggle for enabling or disabling sound effects
    const handleSoundToggle = () => {
        // Log new sound state
        console.log('handleSoundToggle - new soundEnabled state:', !soundEnabled);
        setSoundEnabled(previousState => !previousState);
    };

    // Save the updated settings and close the modal
    const handleSaveSettings = () => {
        // Log settings being saved
        console.log('handleSaveSettings - saving:', { textSize, brightness, soundEnabled });
        saveSettings({ textSize, brightness, soundEnabled });
        onClose();
    };

    // Update local states when global settings change
    useEffect(() => {
        console.log('useEffect - updating states with context values');
        setTextSize(settings.textSize);
        setBrightness(settings.brightness);
        setSoundEnabled(settings.soundEnabled);
    }, [settings]);

    // Component render
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContent}>
                    <Text>Text Size: {textSize}</Text>
                    <Slider
                        value={textSize}
                        onValueChange={handleTextSizeChange}
                        minimumValue={10}
                        maximumValue={30}
                        step={1}
                    />

                    <Text>Brightness: {brightness.toFixed(1)}</Text>
                    <Slider
                        value={brightness}
                        onValueChange={handleBrightnessChange}
                        minimumValue={0}
                        maximumValue={1}
                        step={0.1}
                    />

                    <Text>Sound Effects: {soundEnabled ? 'Enabled' : 'Disabled'}</Text>
                    <Switch
                        onValueChange={handleSoundToggle}
                        value={soundEnabled}
                    />

                    <View style={styles.modalButtonContainer}>
                        <Button
                            title="Save"
                            onPress={handleSaveSettings}
                            color={styles.button.backgroundColor}
                        />
                        <Button
                            title="Close"
                            onPress={onClose}
                            color={styles.button.backgroundColor}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default AccessibilitySettings;
