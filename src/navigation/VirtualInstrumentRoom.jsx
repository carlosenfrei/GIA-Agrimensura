import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartScreen, CategoriesScreen,SubProductsScreen,InstrumentalScreen, ItemInstrumentalScreen, DetailInstrumentalScreen,CargaConfirmacionScreen } from '../screens';
import Header from '../components/Header'; 


const Stack = createNativeStackNavigator();

const VirtualInstrumentRoom = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true); 
    return (
        <Stack.Navigator initialRouteName='Categorias' screenOptions={({route}) =>({
            //headerShown: false,
            header: ({ route }) => {
                        let subtitle = '';
                        if (route.name === 'Categorias') {
                            subtitle = 'Seleccionar Categoría';
                        } else if (route.params?.categoria && route.params?.subcategoria) {
                            // Ejemplo: Si estás en Instrumentos
                            subtitle = route.params.categoria + ' / ' + route.params.subcategoria;
                        } else if (route.params?.categoria) {
                            // Ejemplo: Si estás en Clasificación (SubProductsScreen)
                            subtitle = route.params.categoria;
                        } else if (route.name === 'Reserva') {
                            subtitle = 'Mi Reserva';
                        } else {
                            // Fallback para otros nombres de pantalla
                            subtitle = route.name;
                        }
                        return (
                            <Header subtitle={subtitle} isLoggedIn={isLoggedIn} />
                        )
                    }
            })}>
        <Stack.Screen name="Categorias" component={CategoriesScreen}/>
        <Stack.Screen name="Confirmacion" component={CargaConfirmacionScreen}/>
        <Stack.Screen name="Clasificacion" component={SubProductsScreen}/>
        <Stack.Screen name="Instrumentos" component={InstrumentalScreen}/>
        <Stack.Screen name="Instrumento" component={ItemInstrumentalScreen}/>
        <Stack.Screen name="Detalle Instrumento" component={DetailInstrumentalScreen}/>
        <Stack.Screen name="Reserva" component={CartScreen}/>
        
        </Stack.Navigator>
    )
}

export default VirtualInstrumentRoom

const styles = StyleSheet.create({})