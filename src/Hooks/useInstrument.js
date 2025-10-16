import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import {db} from "../services/db.js";

const useInstrument = (instrumentId) => {
  const [instrument, setInstrument] = useState(null);


  const getInstrument = async () => {
    try {
      const docRef = doc(db, "instrumentos", instrumentId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setInstrument({ id: docSnap.id, ...docSnap.data() });
      } else {
        //console.log("Instrumento no encontrado");
      }
    } catch (error) {
      //console.error("Error al obtener instrumento:", error);
    };
};

  useEffect(() => {
    getInstrument();
  }, [instrumentId]);

  return { instrument };
};

export default useInstrument;
