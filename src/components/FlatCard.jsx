import { StyleSheet, Text, View } from 'react-native'

import { colors } from '../theme/color.js'
const FlatCard = ({children, style}) => {
  return (
    <View style={[styles.container, style]}>
        {children}
    </View>
  )
}

export default FlatCard

const styles = StyleSheet.create({
    container:{
          flex: 1, //para que las cards ocupen la mitad de la fila
          margin: 8,
          backgroundColor: colors.fondo1,
          padding: 16,
          borderRadius: 8,
          elevation: 5,
          shadowOpacity: 0.4,
          shadowRadius: 4.00,
          shadowColor: colors.fondo5,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          flexDirection: 'column', 
          alignItems: 'center',
          justifyContent: 'center',
    }
})