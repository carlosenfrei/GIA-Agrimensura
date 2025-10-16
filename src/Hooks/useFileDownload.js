import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

/**
 * Hook para descargar archivos desde una URL y guardarlos localmente.
 * Utiliza FileSystem.downloadAsync.
 */

export const useFileDownload = () => {
    const downloadFile = async (fileUrl, fileName = "archivo_descargado.pdf") => {
        try {
            if (!fileUrl) {
                Alert.alert("Error", "No hay un archivo disponible para descargar.");
                return;
            }

            const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
            
            console.log("📁 Descargando archivo en:", fileUri);


            const { uri } = await FileSystem.downloadAsync(
                fileUrl,
                fileUri
            );
            
            console.log("✅ Archivo descargado en:", uri);

            // 3. Compartir el archivo
            if (await Sharing.isAvailableAsync()) {
                await Sharing.shareAsync(uri, {
                    // Opciones de Sharing para mejorar la experiencia
                    mimeType: 'application/pdf', 
                    dialogTitle: 'Compartir Manual',
                });
            } else {
                // Esto ocurre en Web o si Sharing no está disponible
                Alert.alert("Descarga completa", `Archivo guardado en: ${uri}`);
            }
        } catch (error) {
            console.error("Error al descargar archivo:", error);
            // Mensaje de error más informativo
            Alert.alert("Error de Descarga", "No se pudo descargar el archivo. Verifique la URL y su conexión.");
        }
    };

    return { downloadFile };
};