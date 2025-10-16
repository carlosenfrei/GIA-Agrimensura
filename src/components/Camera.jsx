import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../theme/color';


const Camera = () => {
    return (
        <View style={styles.iconContainer}>
        <Ionicons name="camera-outline" size={32} color={colors.dptoAgrim} />
        </View>
    )
}

export default Camera

const styles = StyleSheet.create({
    iconContainer:{
        justifyContent: "center",
        alignItems:"center",
        backgroundColor: colors.sombra2,
        width:40,
        heigth:40,
        borderRadius:40
    }
})