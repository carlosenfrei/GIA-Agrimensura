import { StyleSheet, Text, View, FlatList, Image, Pressable, useWindowDimensions,Alert } from 'react-native'
import React from 'react'
import FlatCard from '../components/FlatCard'
import imagesInstrumental from '../data/imagesInstrumental.js';
import { useSelector, useDispatch } from 'react-redux'
import { selectInstrumental } from '../store/slices/instrumentalSlice.js'
import { addItem, selectCartItems } from '../store/slices/cartSlice.js'

const ItemInstrumentalScreen = ({ navigation }) => {
  const { width } = useWindowDimensions(); //para luego poder una vez determinada el ancho y alto de la pantalla poder mejorar las imagenes ej heigth = {width * .7}

  const dispatch = useDispatch()
  const instrumento = useSelector((state) => state.instrumentalReducer.instrumentalSelect)

  const cartItems = useSelector(selectCartItems);
  const localId = useSelector((state) => state.userReducer.localId);
  


  if (!instrumento || Object.keys(instrumento).length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text>No se encontró información del instrumento.</Text>
      </View>
    )
  }
  const cantidad = instrumento.cantidad || 1;

  const unidades = Array.from({ length: cantidad }, (_, i) => ({
    ...instrumento,
    unidad: i + 1,
  }));

  const handleSelectUnidad = (unidad) => {
    dispatch(selectInstrumental(unidad))
    navigation.navigate('Detalle Instrumento')
  }

  const handleReservarUnidad = (unidad) => {
    const cleanInstrumento = {
            ID: unidad.ID,
            unidad: unidad.unidad,
            Marca: unidad.Marca,
            Modelo: unidad.Modelo,
            Categoria: unidad.Categoria,
            SubCategoria: unidad.SubCategoria,
            imageKey: unidad.imageKey,
            Ruta_manual: unidad.Ruta_manual,
            Estado: unidad.Estado,
            Descripción: unidad.Descripción,
            Patrimonio: unidad.Patrimonio, 
            Numero_de_Serie: unidad.Numero_de_Serie, 
        };
    dispatch(addItem(cleanInstrumento));
    Alert.alert('Añadido al carrito', `La unidad ${unidad.unidad} fue agregada a tu reserva.`);
  };

  const renderUnidad = ({ item }) => {
    const instrumentInCart = cartItems.some(cartItem => 
      cartItem.ID === item.ID && cartItem.unidad === item.unidad
    );
    const isDisabled = instrumentInCart || localId === "";
    return(
      <Pressable  onPress={() => handleReservarUnidad}>
        <FlatCard style={styles.card}>
          <Text style={styles.title}>
            {item.Categoria} - {item.SubCategoria}
          </Text>
          <Image
              source={imagesInstrumental[item.imageKey]}
              style={styles.instrumentImage}
              resizeMode="contain"
          />
          <Text style={styles.info}>Marca:
            <Text style={styles.infoBold}> {item.Marca || 'N/A'}   </Text>
            <Text style={styles.info}>Modelo:
                <Text style={styles.infoBold}> {item.Modelo || 'N/A'}  </Text>
            </Text>
            <Text style={styles.info}>Estado:
                <Text style={styles.infoBold}> {item.Estado || 'N/A'}  </Text>
            </Text>
          </Text>
          {/* Descripción */}
          <Text style={styles.description}>Descripción breve: 
              <Text style={styles.infoBold}> {item.Descripción} </Text>
          </Text>
          <View style={styles.buttonContainer}>
            <Pressable style={[styles.button, styles.infoButton]} onPress={() => handleSelectUnidad(item)}>
              <Text style={styles.infoBold}>+ Info</Text>
            </Pressable>
            <Pressable 
                style={[styles.button, isDisabled ? styles.disabledButton : styles.reserveButton]} 
                onPress={() => handleReservarUnidad(item)} 
                disabled={isDisabled}
            >
              <Text style={styles.infoBold}>{instrumentInCart ? 'Reservado' : 'Reservar'}</Text>
            </Pressable>
          </View>

        </FlatCard>
      </Pressable>
    )
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={unidades}
        keyExtractor={(_, index) => index.toString()} //para evitar problems con el children porque tienen el mismo key que se genera en el filtrado  filterAndGroupInstrumental de INstrumemtalSlice
        renderItem={renderUnidad}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default ItemInstrumentalScreen

const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 16,
  },
  card: {
    marginBottom: 16,
    padding: 16,
  },
  instrumentImage: {
    width: 100,
    height: 100,
    marginBottom: 12,
    borderRadius:25,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    marginTop: 8,
    color: "#333",
    textAlign: "center",
  },
  info: {
    fontSize: 14,
    marginBottom: 4,
    color: "#666",
  },
  infoBold: {
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,  
  },
  description: {
    fontSize: 14,
    marginTop: 8,
    color: "#555",
    fontStyle: "italic",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 5,  
  },
  infoButton: {
    backgroundColor: "#4682B4",
  },
  reserveButton: {
    backgroundColor: "#3CB371",
  },
  disabledButton: {
    backgroundColor: "#706e6eff", 
  },

})