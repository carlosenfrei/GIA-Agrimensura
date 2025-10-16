import { StyleSheet, Text, View } from 'react-native'

import ProfileScreen from '../screens/ProfileScreen'
import React from 'react'

import { createStackNavigator } from '@react-navigation/stack'

const Stack = createStackNavigator();

const ProfileStackNavigator = () => {
    return (
        
        <Stack.Navigator initialRouteName="ProfileDetail" screenOptions={{headerShown: false,}}>
            <Stack.Screen name="ProfileDetail" component={ProfileScreen} />

        </Stack.Navigator>
    )
}

export default ProfileStackNavigator

const styles = StyleSheet.create({})