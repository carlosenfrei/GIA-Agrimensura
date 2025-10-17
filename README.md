# GIA Gestion de Instrumental de Agrimenusura

!['icono GIA' ](assets/icon.png)

Proyecto desarrollado en curso **desarrollo de aplicaciones**

Esta alicacion esta construida en **"expo": "54.0.13"** que emplea las siguentes librerias
    "@react-native-async-storage/async-storage": "2.2.0",
    "@react-native-community/datetimepicker": "8.4.4",
    "@react-navigation/bottom-tabs": "^7.4.7",
    "@react-navigation/native": "^7.1.17",
    "@react-navigation/native-stack": "^7.3.26",
    "@react-navigation/stack": "^7.4.8",
    "@reduxjs/toolkit": "^2.9.0",
    "dotenv": "^17.2.3",
    "expo": "54.0.13",
    "expo-file-system": "~19.0.17",
    "expo-font": "14.0.9",
    "expo-image-picker": "~17.0.8",
    "expo-print": "~15.0.7",
    "expo-sharing": "~14.0.7",
    "expo-splash-screen": "~31.0.10",
    "expo-status-bar": "~3.0.8",
    "firebase": "^12.4.0",
    "react": "19.1.0",
    "react-native": "0.81.4",
    "react-native-safe-area-context": "~5.6.0",
    "react-native-screens": "~4.16.0",
    "react-redux": "^9.2.0"
---
# Estructura de carpetas y archivos
📦src
 ┣ 📂assets
 ┃ ┣ 📜canasto.jpg
 ┃ ┣ 📜disto.png
 ┃ ┣ 📜drone.png
 ┃ ┣ 📜estacion_total.png
 ┃ ┣ 📜fondo_app.png
 ┃ ┣ 📜gis.png
 ┃ ┣ 📜gnss.png
 ┃ ┣ 📜ingreso.png
 ┃ ┣ 📜nivel.png
 ┃ ┣ 📜salir.png
 ┃ ┣ 📜sin_fotos.png
 ┃ ┗ 📜teodolito.png
 ┣ 📂components
 ┃ ┣ 📂customText
 ┃ ┃ ┗ 📜TextRobotoExtraBold.jsx
 ┃ ┣ 📜Camera.jsx
 ┃ ┣ 📜Counter.jsx
 ┃ ┣ 📜FlatCard.jsx
 ┃ ┣ 📜GenerarPDF.jsx
 ┃ ┣ 📜Header.jsx
 ┃ ┗ 📜Search.jsx
 ┣ 📂context
 ┃ ┗ 📜CartContext.jsx
 ┣ 📂data
 ┃ ┣ 📜imagesCategories.js
 ┃ ┗ 📜imagesInstrumental.js
 ┣ 📂Hooks
 ┃ ┣ 📜useAuth.js
 ┃ ┣ 📜useAuthlis.js
 ┃ ┣ 📜useCategory.js
 ┃ ┣ 📜useFileDownload.js
 ┃ ┣ 📜useImageUpload.js
 ┃ ┣ 📜useInstrument.js
 ┃ ┣ 📜useInstruments.js
 ┃ ┣ 📜useReservas.js
 ┃ ┣ 📜useSubCategories.js
 ┃ ┗ 📜useUserData.js
 ┣ 📂navigation
 ┃ ┣ 📜AuthStackNavigator.jsx
 ┃ ┣ 📜BottonTabNavigation.jsx
 ┃ ┣ 📜CartStackNavigation.jsx
 ┃ ┣ 📜MainNavigator.jsx
 ┃ ┣ 📜ProfileStackNavigator.jsx
 ┃ ┗ 📜VirtualInstrumentRoom.jsx
 ┣ 📂screens
 ┃ ┣ 📜CargaConfirmacionScreen.jsx
 ┃ ┣ 📜CartScreen.jsx
 ┃ ┣ 📜CategoriesScreen.jsx
 ┃ ┣ 📜DetailInstrumentalScreen.jsx
 ┃ ┣ 📜index.js
 ┃ ┣ 📜InstrumentalScreen.jsx
 ┃ ┣ 📜ItemInstrumentalScreen.jsx
 ┃ ┣ 📜ProfileScreen.jsx
 ┃ ┣ 📜SessionScreen.jsx
 ┃ ┗ 📜SubProductsScreen.jsx
 ┣ 📂services
 ┃ ┣ 📜db.js
 ┃ ┗ 📜node_db.js NO SE SUBE A GIT HUB POR SEGURIDAD ES PARA PODER LOS ARCHIVO JS DENTRO DE LA CARPETA DE UTILIADES
 ┣ 📂store
 ┃ ┣ 📂slices
 ┃ ┃ ┣ 📜cartSlice.js
 ┃ ┃ ┣ 📜instrumentalSlice.js
 ┃ ┃ ┗ 📜userSlice.js
 ┃ ┗ 📜index.js
 ┣ 📂theme
 ┃ ┗ 📜color.js
 ┗ 📂utilidades
 ┃ ┣ 📜seedCategories.js
 ┃ ┗ 📜seedInstrumental.js

---
Antes de instalar y ejecutar la app, necesitás tener instalados:

Node.js (versión 20 o superior recomendada)
Expo CLI (global)
Git
Una cuenta de Firebase con proyecto configurado (opcional, para autenticación y base de datos). (Aclarar estructura de datos)

---
# Descripcion de la app
La aplicación (o App) tiene por finalidad centralizar la información del Salón de Instrumental y facilitar a estudiantes de Agrimensura u otras carreras afines:

Información sobre instrumentos manuales y dónde comprarlos.

La reserva de instrumentos para prácticas o repetición de trabajos prácticos, siempre bajo la supervisión de un docente.

A los docentes, les permite reservar instrumental o acceder fácilmente a los manuales cuando necesiten realizar una práctica.

Condiciones de Reserva:

La reserva estará únicamente disponible para estudiantes o docentes registrados e identificados (o con sesión iniciada/logueados).

Cualquier persona interesada podrá visualizar la información, pero no reservar.

Escalabilidad y Evolución Futura:

Se espera incorporar una nueva categoría ADMIN para la modificación de datos en la base de datos.

Restringir la reserva de instrumentos solo a usuarios de una determinada institución.

Proveer a los usuarios registrados acceso a datos meteorológicos para vuelos con VANT (Vehículos Aéreos No Tripulados).

Poder emigrar a una base de datos postgres dejando FIRESTORE DATABASE

---
Instalación y configuración
Cloná el repositorio
Instalá las dependencias:
npm install

Configurá las variables de entorno para Firebase
Crea un archivo .env en la raíz del proyecto con las siguientes variables (usá tus datos de Firebase):

Iniciá la aplicación en modo desarrollo:
npx expo start
Abre la aplicación en un emulador o en un celular con Expo Go