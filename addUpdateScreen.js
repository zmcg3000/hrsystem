import React, { useState, useEffect } from 'react';
import { ScrollView, TextInput, Pressable, Text, Alert, View, SafeAreaView } from 'react-native';
import CustomTabBar from './customTabBar.js';
import { styles } from './mobileStyles.js';

function AddUpdateScreen({ route, navigation }) {
    // Retrieve the staff ID from route parameters to determine if editing or adding
    const staffId = route.params?.staffId;
    // Boolean to check if in edit mode
    const isEditing = !!staffId;

    // Initial state setup for a new staff member
    const initialStaffState = {
        Id: 0,
        Name: '',
        Phone: '',
        DepartmentId: 0,
        Address: { Street: '', City: '', State: '', ZIP: '', Country: '' },
    };

    // State to hold and manage the staff member's data
    const [staffMember, setStaffMember] = useState(initialStaffState);

    // Effect to fetch data if in edit mode
    useEffect(() => {
        if (isEditing) {
            console.log(`Fetching URL: https://2642-180-150-7-92.ngrok-free.app/people/${staffId}`);
            // Fetch staff member's data for editing
            fetch(`https://2642-180-150-7-92.ngrok-free.app/people/${staffId}`)
                .then(response => response.json())
                .then(data => {
                    // Update state with fetched data
                    setStaffMember({
                        Id: parseInt(data.Id, 10), // Parsing Id as an integer
                        Name: data.Name,
                        Phone: data.Phone,
                        DepartmentId: parseInt(data.DepartmentId, 10), // Parsing DepartmentId as an integer
                        Address: {
                            Street: data.Address?.Street || '',
                            City: data.Address?.City || '',
                            State: data.Address?.State || '',
                            ZIP: data.Address?.ZIP || '',
                            Country: data.Address?.Country || '',
                        },
                    });
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.alert('Error', 'Could not load the staff member data.');
                });
        }
    }, [staffId, isEditing]);

    // Function to handle the save operation
    const handleSave = () => {
        // Validation to ensure all fields are filled
        if (!staffMember.Name || !staffMember.Phone || !staffMember.DepartmentId) {
            Alert.alert('Error', 'Please fill all the fields');
            return;
        }

        // Determine the HTTP method based on add or edit mode
        const method = isEditing ? 'PUT' : 'POST';
        const url = `https://2642-180-150-7-92.ngrok-free.app/people${isEditing ? `/${staffId}` : ''}`;

        // API call to save the staff member data
        fetch(url, {
            method: method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                ...staffMember,
                DepartmentId: parseInt(staffMember.DepartmentId, 10) // Ensure correct data type
            }),
        })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(() => {
                Alert.alert('Success', isEditing ? 'Staff member updated!' : 'New staff member added!');
                navigation.navigate('List');
            })
            .catch(error => {
                console.error('Error:', error);
                Alert.alert('Error', 'Failed to save the staff member');
            });
    };

    // Function to handle cancel operation
    const handleCancel = () => {
        navigation.goBack();
    };

    // Function to handle delete operation
    const handleDelete = () => {
        if (isEditing) {
            fetch(`https://2642-180-150-7-92.ngrok-free.app/people/${staffId}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (!response.ok) throw new Error('Network response was not ok');
                    Alert.alert('Success', 'Staff member deleted!');
                    navigation.navigate('List');
                })
                .catch(error => {
                    console.error('Error:', error);
                    Alert.alert('Error', 'Failed to delete the staff member');
                });
        }
    };

    // Main component render
    return (
        <SafeAreaView style={styles.mainContainer}>
            <ScrollView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={staffMember.Name}
                    onChangeText={(name) => setStaffMember({ ...staffMember, Name: name })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone"
                    value={staffMember.Phone}
                    onChangeText={(phone) => setStaffMember({ ...staffMember, Phone: phone })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Department ID"
                    value={String(staffMember.DepartmentId)}
                    onChangeText={(deptId) => setStaffMember({ ...staffMember, DepartmentId: deptId !== '' ? parseInt(deptId, 10) : '' })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Street"
                    value={staffMember.Address.Street}
                    onChangeText={(street) => setStaffMember({ ...staffMember, Address: { ...staffMember.Address, Street: street } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="City"
                    value={staffMember.Address.City}
                    onChangeText={(city) => setStaffMember({ ...staffMember, Address: { ...staffMember.Address, City: city } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="State"
                    value={staffMember.Address.State}
                    onChangeText={(state) => setStaffMember({ ...staffMember, Address: { ...staffMember.Address, State: state } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="ZIP Code"
                    value={staffMember.Address.ZIP}
                    onChangeText={(zip) => setStaffMember({ ...staffMember, Address: { ...staffMember.Address, ZIP: zip } })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Country"
                    value={staffMember.Address.Country}
                    onChangeText={(country) => setStaffMember({ ...staffMember, Address: { ...staffMember.Address, Country: country } })}
                />
            </ScrollView>
            <View style={styles.fixedActionButtonsContainer}>
                <Pressable style={[styles.button, { flex: isEditing ? 0.5 : 1 }]} onPress={handleSave}>
                    <Text style={styles.buttonText}>{isEditing ? 'Save' : 'Add'}</Text>
                </Pressable>
                {isEditing && (
                    <Pressable style={[styles.button, { flex: 0.5 }]} onPress={handleDelete}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </Pressable>
                )}
                {!isEditing && (
                    <Pressable style={[styles.button, { flex: 1 }]} onPress={handleCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                )}
            </View>
            <CustomTabBar navigation={navigation} />
        </SafeAreaView>
    );
}

export default AddUpdateScreen;
