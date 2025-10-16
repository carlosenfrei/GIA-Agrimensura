import db from "../services/db.js";
import {addDoc, collection} from "firebase/firestore"

const categories =
[
 {
  "ID": 1,
  "Categoria": "teodolito",
  "image": "teodolito"
 },
{
  "ID": 2,
  "Categoria": "distanciometro",
  "image": "disto"
 },
{
  "ID": 3,
  "Categoria": "drone",
  "image": "drone"
 },
{
  "ID": 4,
  "Categoria": "equialtimetro",
  "image": "nivel"
 },
{
  "ID": 5,
  "Categoria": "estacion total",
  "image": "estacion_total"
 },
{
  "ID": 6,
  "Categoria": "gnss",
  "image": "gnss"
 },
{
  "ID": 7,
  "Categoria": "otros",
  "image": "sin_fotos"
 },
 {
  "ID": 8,
  "Categoria": "Ingreso",
  "image": "ingreso"
 },
 {
  "ID": 9,
  "Categoria": "Geo Portal",
  "image": "gis"
 },
 {
  "ID": 10,
  "Categoria": "Sponsors1",
  "image": "sin_fotos"
 }
]

const seedCategories = () => {
    const categoriesRef = collection(db, "categoria")
        categories.map (({id, ...datosCategoria}) => {
            addDoc (categoriesRef, datosCategoria);
        })
        console.log("productos subidos");
        return
}

seedCategories();