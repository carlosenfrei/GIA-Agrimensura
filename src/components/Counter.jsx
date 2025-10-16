import { StyleSheet, Text, View } from 'react-native'
import {useState} from 'react'

const Counter = () => {
    const [contador, setContador ] = useState(0);

const aumentar = ()=> {
    //contador = contador + 1;
    setContador(contador + 1);
}
const disminuir = ()=> {
    //contador = contador - 1;
    if (contador > 0){
        setContador (contador - 1);
    }
}

    return(
        <View style={styles.counter}>
            <button onClick={disminuir}>-</button>
            <p className="valor">Cantidad: {contador}</p>
            <button onClick={aumentar}>+</button>
            
        </View>
    )
}

export default Counter

const styles = StyleSheet.create({
    contador: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
},

valor: {
    fontSize: 24,
    fontWeight: "bold",
    minWidth: 40,
    textAlign: "center",
},
button: {
    padding: 10,
    fontSize: 20,
    cursor: "pointer",
}
})
