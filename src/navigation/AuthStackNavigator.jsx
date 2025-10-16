import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SessionScreen from '../screens/SessionScreen.jsx'

import React from 'react'

const Stack = createNativeStackNavigator();

const AuthStackNavigator = () => {
  
  return (
    <Stack.Navigator screenOptions={{headerShown: false,}}>
      <Stack.Screen name="Session" component={SessionScreen} />

    </Stack.Navigator>
  )
}

export default AuthStackNavigator

const styles = StyleSheet.create({})