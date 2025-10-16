import { useState, useEffect } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import {db} from "../services/db.js";

const useSubcategory = (selectCategory) => {
  const [subcategories, setSubcategories] = useState([]);


  const getSubcategories = async () => {
    if (!selectCategory) return;

    try {
      const q = query(
        collection(db, "instrumentos"),
        where("Categoria", "==", selectCategory)
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      const uniqueSubcategoriesSet = new Set(data.map(item => item.SubCategoria?.trim()).filter(Boolean));
      setSubcategories([...uniqueSubcategoriesSet]);
    } catch (error) {
      console.error("Error al obtener subcategorías:", error);
  };
}

  useEffect(() => {
    getSubcategories();
  }, [selectCategory]);

  return {subcategories};
}
export default useSubcategory;