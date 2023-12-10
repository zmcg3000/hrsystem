import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { styles } from './mobileStyles.js';
import { SafeAreaView } from 'react-native-safe-area-context';

// CustomTabBar component used for navigation
const CustomTabBar = ({ navigation }) => {
    return (
        // SafeAreaView ensures the tab bar is positioned correctly across different devices
        <SafeAreaView edges={['bottom']} style={styles.safeArea}>
            <View style={styles.tabContainer}>
                <Pressable onPress={() => navigation.navigate('List')} style={styles.tabButton}>
                    <Text style={styles.tabButtonText}>LIST</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('AddUpdate')} style={styles.tabButton}>
                    <Text style={styles.tabButtonText}>ADD</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

export default CustomTabBar;