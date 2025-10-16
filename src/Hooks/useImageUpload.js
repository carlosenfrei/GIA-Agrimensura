import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';
import { setProfilePicture } from '../store/slices/userSlice.js';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/db';
import { Alert } from 'react-native';

const useImageUpload = () => {
    const dispatch = useDispatch();

    const uploadImage = async (localId) => {
        // 1. Tomar la foto
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.6,
            base64: true,
        });

        if (!result.canceled) {
            const imgBase64 = `data:image/jpeg;base64,${result.assets[0].base64}`;
            
            // 2. Guardar en Redux (actualización inmediata de la UI)
            dispatch(setProfilePicture(imgBase64)); 

            // 3. Persistir en Firestore
            try {
                if (localId) {
                    const userDocRef = doc(db, "usuarios", localId); 
                    await updateDoc(userDocRef, { 
                        img64: imgBase64,
                    });
                    Alert.alert('Éxito', 'Foto de perfil actualizada correctamente.');
                } else {
                    Alert.alert("Error", "No hay sesión activa para guardar la foto.");
                }
            } catch (error) {
                console.error("Error al guardar la imagen en Firestore:", error);
                Alert.alert("Error", "No se pudo guardar la foto en la base de datos.");
            }
        }
    };

    return { uploadImage };
};

export default useImageUpload;