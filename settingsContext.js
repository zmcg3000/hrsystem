import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Creating a Context for global settings
export const SettingsContext = createContext({
    settings: {
        textSize: 14,
        brightness: 1,
        soundEnabled: true,
    },
    saveSettings: () => { },
});

// Provider component to wrap around the app for providing global settings
export const SettingsProvider = ({ children }) => {
    // State to hold and manage the settings
    const [settings, setSettings] = useState({
        textSize: 14,
        brightness: 1,
        soundEnabled: true,
    });

    // useEffect hook to load settings from AsyncStorage when the app starts
    useEffect(() => {
        // Function to load settings from AsyncStorage
        const loadSettings = async () => {
            try {
                const jsonSettings = await AsyncStorage.getItem('accessibilitySettings');
                if (jsonSettings != null) {
                    setSettings(JSON.parse(jsonSettings));
                }
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        };

        loadSettings();
    }, []);

    // Function to save settings to AsyncStorage
    const saveSettings = async (newSettings) => {
        try {
            const jsonSettings = JSON.stringify(newSettings);
            await AsyncStorage.setItem('accessibilitySettings', jsonSettings);
            setSettings(newSettings);
        } catch (e) {
            console.error('Error saving settings:', e);
        }
    };

    // Providing the settings and saveSettings function to the child components
    return (
        <SettingsContext.Provider value={{ settings, saveSettings }}>
            {children}
        </SettingsContext.Provider>
    );
};
