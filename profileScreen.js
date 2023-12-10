import React, { useState, useEffect } from 'react';
import { Text, View, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { fetchEmployeeData } from './dataManager.js';
import CustomTabBar from './customTabBar.js';
import { styles } from './mobileStyles.js';

function ProfileScreen({ route, navigation }) {
    // Get staffId from navigation parameters
    const { staffId } = route.params;
    // State to store employee data
    const [staffMember, setStaffMember] = useState(null);

    useEffect(() => {
        // Fetching employee data on component mount or staffId change
        fetchEmployeeData(staffId)
            .then(data => {
                setStaffMember(data); // Set fetched data to state
            })
            .catch(error => {
                // Error handling logic can be added here
                console.error('Error fetching data:', error);
            });
    }, [staffId]); // Dependency array with staffId ensures effect runs when staffId changes

    // Display loading text if staff data is not yet available
    if (!staffMember) {
        return <Text style={styles.normalText}>Loading...</Text>;
    }

    // Main component render
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <View style={styles.profileSection}>
                    <Text style={styles.heading2}>Staff ID: {staffMember.StaffId}</Text>
                    <Text style={styles.heading2}>Name: {staffMember.Name}</Text>
                    <Text style={styles.normalText}>Phone: {staffMember.Phone}</Text>
                    <Text style={styles.normalText}>Department: {staffMember.Department}</Text>
                    <Text style={styles.normalText}>Street: {staffMember.Address.Street}</Text>
                    <Text style={styles.normalText}>City: {staffMember.Address.City}</Text>
                    <Text style={styles.normalText}>State: {staffMember.Address.State}</Text>
                    <Text style={styles.normalText}>ZIP: {staffMember.Address.ZIP}</Text>
                    <Text style={styles.normalText}>Country: {staffMember.Address.Country}</Text>
                </View>
            </ScrollView>

            <View style={styles.fixedActionButtonsContainer}>
                <Pressable style={[styles.button, { flex: 1 }]} onPress={() => navigation.goBack()}>
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
                <Pressable style={[styles.button, { flex: 1 }]} onPress={() => navigation.navigate('AddUpdate', { staffId: staffId })}>
                    <Text style={styles.buttonText}>Edit</Text>
                </Pressable>
            </View>

            <CustomTabBar navigation={navigation} />

        </SafeAreaView>
    );
}

export default ProfileScreen;