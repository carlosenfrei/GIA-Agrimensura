import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import {db} from "../services/db.js";
const finalCategories = ["GEO PORTAL", "OTROS","INGRESO", "SPONSORS1"]; 
const capitalize = (s) => {
    if (!s) return '';
    // Pone la primera letra en mayúscula y el resto en minúscula
    return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};
const useCategory = () => {
    const[categories, setCategories]= useState([]);
    const [loading, setLoading] = useState(false);
    //console.log(categories)
    const getCategories = async ()=>{
        setLoading(true);
        try{
            const dataDb = await getDocs(collection(db,"categoria"));
            const data = dataDb.docs.map((categoriesDb) =>{
                categoriesDb.data()
                return {id: categoriesDb.id, ...categoriesDb.data()}
            })

            data.sort((a, b) => {
                // Normalizar la categoría a mayúsculas para la comparación
                const catA = a.Categoria?.toUpperCase().trim() || '';
                const catB = b.Categoria?.toUpperCase().trim() || '';
                
                // Obtener el índice si están en la lista de categorías finales
                const indexA = finalCategories.indexOf(catA);
                const indexB = finalCategories.indexOf(catB);

                // Determinar si A o B pertenecen a la lista final
                const aIsFinal = indexA !== -1;
                const bIsFinal = indexB !== -1;

                // Caso 1: Ambos están en la lista final (Ordenar por el orden predefinido)
                if (aIsFinal && bIsFinal) {
                    return indexA - indexB;
                }
                
                // Caso 2: Solo 'A' es una categoría final (A va después, retorna 1)
                if (aIsFinal) {
                    return 1;
                }
                
                // Caso 3: Solo 'B' es una categoría final (B va después, retorna -1)
                if (bIsFinal) {
                    return -1;
                }
                
                // Caso 4: Ninguno es una categoría final (Ordenar alfabéticamente)
                // Se usa localeCompare para un mejor ordenamiento de strings, incluyendo acentos
                return catA.localeCompare(catB);
                
            });
            const finalData = data.map(item => ({...item, Categoria: capitalize(item.Categoria)}));

            setCategories(finalData)
        }catch (error){
            //console.log(error)
        }finally {
            setLoading(false);
    }
    }
    useEffect(()=>{
        getCategories();
    }, [setCategories])
    return {categories, loading};
}

export default useCategory;