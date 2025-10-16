import { StyleSheet,  View, TextInput } from 'react-native'
import React from 'react'
import { colors } from '../theme/color'
const Search = ({setKeyword, keyword}) => {
  return (
    <View style={styles.searchContainer}>
      <TextInput onChangeText={(text)=>setKeyword(text)} placeholder='Buscar insrumento' style={styles.TextInput} value={keyword}/>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchContainer:{
        flexDirection:"row",
        justifyContent: "center",
        margin:10,
    },
    TextInput:{
        borderWidth:1,
        borderColor: colors.texto3,
        borderRadius:16,
        width:"90%",
        paddingLeft:25,
    }
})