import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import VirtualInstrumentRoom from './VirtualInstrumentRoom'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/color.js'
import { useSelector } from 'react-redux';
import { selectCartCount  } from '../store/slices/cartSlice.js'
import CartScreen from '../screens/CartScreen.jsx' 
import ProfileStackNavigagtor from './ProfileStackNavigator.jsx';
const Tab = createBottomTabNavigator();


const BottonTabNavigation = () => {
  const cartCount = useSelector(selectCartCount); 
  return (
    <Tab.Navigator 
      initialRouteName='Home' 
      screenOptions={{
          headerShown: false, 
          tabBarStyle: styles.tabBar, 
          tabBarShowLabel:false
      } }
    >

        <Tab.Screen 
          name="Home" 
          component ={VirtualInstrumentRoom} 
          options={{tabBarIcon: ({focused}) => <Ionicons name="home-outline" size={32} color={focused?colors.institucional : colors.fondo4} />  }}
        />
        <Tab.Screen name="Carrito" component ={CartScreen} options={{tabBarIcon: ({focused}) => <Ionicons name="cart-outline" size={32} color={focused?colors.institucional : colors.fondo4} />, tabBarBadge: cartCount > 0 ? cartCount : null, }}/>
        <Tab.Screen name="Profile" component ={ProfileStackNavigagtor} options={{tabBarIcon: ({focused}) => <Ionicons name="person-outline" size={32} color={focused?colors.institucional : colors.fondo4} />}}/>
    </Tab.Navigator>

    
  )
}

export default BottonTabNavigation

const styles = StyleSheet.create ({
  tabBar:{
    backgroundColor:colors.dptoAgrim,
    height:50,
    paddingBottom:90,
  }
})
