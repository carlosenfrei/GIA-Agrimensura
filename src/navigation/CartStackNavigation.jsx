import { View, Text } from 'react-native'
import React from 'react'
import { GestureHandlerRefContext } from '@react-navigation/stack'
import Header from '../components/Header'; 
const CartStackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName='Categorias' screenOptions = {{ header: ({route}) => <Header subtitle= {route.name}/>
    }}>
    <Stack.Screen name="Carrito" component={CartScreen}/>
    </Stack.Navigator>
  );
}

export default CartStackNavigation