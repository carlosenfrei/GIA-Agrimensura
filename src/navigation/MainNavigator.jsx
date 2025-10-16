import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottonTabNavigation from './BottonTabNavigation';
import AuthStackNavigator from './AuthStackNavigator';
import React from 'react';
import { useSelector } from 'react-redux';
import useAuthlis from '../Hooks/useAuthlis'; // Tu custom hook

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
    
    // Mantiene el estado de sesión (localId) sincronizado en Redux en segundo plano.
    useAuthlis(); 

    return (
        <Stack.Navigator initialRouteName="AppTabs" screenOptions={{ headerShown: false }}>

            <Stack.Screen name="AppTabs" component={BottonTabNavigation} />

            <Stack.Screen name="AuthStack" component={AuthStackNavigator} options={{ presentation: 'modal' }} />
            
        </Stack.Navigator>
    );
};

export default MainNavigator;