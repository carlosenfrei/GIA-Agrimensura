import { StyleSheet, Text, View, Image, Pressable, Alert } from 'react-native'
import React from 'react'
import {colors} from '../theme/color.js'
import FlatCard from '../components/FlatCard'
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList } from 'react-native';
import imagesInstrumental from '../data/imagesInstrumental.js';
import { useSelector, useDispatch } from 'react-redux';
//import { addItem, removeItem,clearCart } from '../store/slices/cartSlice.js';
import { selectCartItems, removeItem, clearCart } from '../store/slices/cartSlice.js'
import useUserData from '../Hooks/useUserData.js';

const CartScreen = ({navigation}) => {

  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const total = cartItems.length;
  const localId = useSelector((state) => state.userReducer.localId);
  const { userData } = useUserData(localId);

  const handleRemove = (index) => dispatch(removeItem(index));

  const handleClearCart = () => dispatch(clearCart());

  const handleConfirm = () => {
    navigation.navigate('Home', { screen: 'Confirmacion', params: {cartItems, userData}});
  };

  
  const renderCartItem =({item, index}) =>(
    <FlatCard style={styles.cartContainer}>
      <View style={styles.cartDescription}>
        <Image
          source={imagesInstrumental[item.imageKey]}
          style={styles.cartInstrumentImage}
          resizeMode="contain"
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.Categoria} - {item.SubCategoria}</Text>
          <Text style={styles.info}>
            Marca: <Text style={styles.infoBold}>{item.Marca}</Text>
          </Text>
          <Text style={styles.info}>
            Modelo: <Text style={styles.infoBold}>{item.Modelo}</Text>
          </Text>
          <Text style={styles.info}>
            {item.Patrimonio && item.Patrimonio !== 'sin dato'
              ? `Patrimonio: ${item.Patrimonio}`
              : item.Numero_de_Serie && item.Numero_de_Serie !== 'sin dato'
                ? `N° Serie: ${item.Numero_de_Serie}`
                : 'sin dato'}
          </Text>
        </View>
        <Pressable onPress={() => handleRemove(index)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={22} color={colors.texto1} />
        </Pressable>
      </View>
    </FlatCard>
  )

  const renderfooter = ()=>(
    <View style={styles.footer}>
      <Pressable style={[styles.footerButton, styles.clearButton]} onPress={handleClearCart}>
        <Ionicons name="trash-outline" size={22} color="#fff" />
        <Text style={styles.footerText}>Vaciar</Text>
      </Pressable>
      <Pressable style={[styles.footerButton, styles.confirmButton]} onPress={handleConfirm}>
        <Ionicons name="checkmark-circle-outline" size={22} color="#fff" />
        <Text style={styles.footerText}>Confirmar ({total})</Text>
      </Pressable>
    </View>
  )
  return (
    <View>
      {
        cartItems.length>0
        ?
        <FlatList
          data={cartItems}
          keyExtractor={(item, index) => `${item.ID}-${item.unidad}-${index}`}
          renderItem={renderCartItem}
          ListHeaderComponent={<Text style={styles.infoBold}> "Tu reserva es de: "{total} </Text>}
          ListFooterComponent={renderfooter}
        />
        :
        <Text style={styles.infoBold}> No tienes instrumentos para reservar </Text>
        
      }
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  cartContainer: {
    marginVertical: 6,
    padding: 10,
  },
  cartDescription: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cartInstrumentImage: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    color: '#333',
  },
  info: {
    fontSize: 13,
    color: '#555',
  },
  infoBold: {
    fontWeight: 'bold',
    color: '#222',
  },
  deleteButton: {
    padding: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 8,
  },
  clearButton: {
    backgroundColor: '#B22222',
  },
  confirmButton: {
    backgroundColor: '#3CB371',
  },
  footerText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
  },
  infoBold: {
    textAlign: 'center',
    marginTop: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    },
})