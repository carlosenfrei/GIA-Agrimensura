import { useState, useEffect } from "react";

import {db} from "../services/db.js";

import { collection, getDocs, query, where } from "firebase/firestore";

const useInstruments = (selectCategory, selectSubCategory) => {
    const[instruments, setinstruments]= useState([]);
    

    const getInstruments = async ()=>{
        
        if (!selectCategory || !selectSubCategory) {
            setinstruments([]);
            return;
        }

        try{
            const q = query(
            collection(db, "instrumentos"),
            where("Categoria", "==", selectCategory),
            where("SubCategoria", "==", selectSubCategory)
            );
            const dataDb = await getDocs(q);
            const data = dataDb.docs.map((data_instruments) =>({id: data_instruments.id, ...data_instruments.data()}));
            setinstruments(data)
        }catch (error){
            //console.log("Error al obtener instrumentos: ", error)
            
        }
    }
    useEffect(()=>{
        getInstruments();
    },[selectCategory, selectSubCategory])
    return {instruments};
}

export default useInstruments;