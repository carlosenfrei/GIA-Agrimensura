import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system/legacy';
import { Alert } from 'react-native';

/**
 * Genera y comparte un PDF con los datos de la solicitud de instrumental.
 @param {Object} data - Datos completos de la reserva (desde ConfirmationScreen).
 */
export const generarPDF = async (data) => {
  try {
    const {
      userName,
      userRole,
      materia,
      codigoMateria,
      tipoDePractica,
      lugarDePractica,
      fechaRetiro,
      fechaDevolucion,
      instrumentosReservados,
    } = data;

    const fechaActual = new Date().toLocaleDateString('es-AR');

    const htmlContent = `
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: Arial, sans-serif; padding: 32px; color: #222; }
            h1, h2, h3 { text-align: center; margin: 0; }
            h1 { font-size: 22px; color: #004080; }
            h2 { font-size: 18px; margin-top: 4px; }
            h3 { font-size: 15px; margin-top: 2px; }
            hr { margin: 14px 0; }
            p { font-size: 14px; line-height: 1.4; text-align: justify; }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 12px;
            }
            th, td {
              border: 1px solid #444;
              padding: 6px;
              font-size: 13px;
              text-align: left;
            }
            th {
              background-color: #e6e6e6;
            }
            footer {
              font-size: 11px;
              text-align: center;
              margin-top: 20px;
              color: #666;
            }
          </style>
        </head>
        <body>
          <h1>GIA</h1>
          <h2>Gestión de Instrumental de Agrimensura</h2>
          <h3>Departamento de Agrimensura - Facultad de Ingeniería (UBA)</h3>
          <hr />

          <h2>Informe de Solicitud de Instrumental</h2>
          <p><strong>Fecha de generación:</strong> ${fechaActual}</p>

          <p>La/el <strong>${userRole}</strong> <strong>${userName}</strong>, 
          para la materia <strong>${materia || '-'}</strong> (código: ${codigoMateria || '-'}),
          solicita instrumental desde el <strong>${fechaRetiro}</strong> hasta el <strong>${fechaDevolucion}</strong>, 
          para realizar la práctica <strong>${tipoDePractica || '-'}</strong> 
          en <strong>${lugarDePractica || '-'}</strong>.</p>

          <p>El siguiente cuadro detalla el instrumental solicitado:</p>

          <table>
            <thead>
              <tr>
                <th>Cant.</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              ${instrumentosReservados.map(item => `
                <tr>
                  <td>1</td>
                  <td>${item.Categoria || ''} - ${item.Marca || ''} ${item.Modelo || ''} (${item.Patrimonio})</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <footer>
            <p>Solicitud generada a través de la App GIA del Departamento de Agrimensura.</p>
            <p>La confirmación de disponibilidad será enviada dentro de las 48 horas hábiles.</p>
          </footer>
        </body>
      </html>
    `;

    // Generar el archivo PDF
    const { uri } = await Print.printToFileAsync({ html: htmlContent });
    console.log('PDF generado en:', uri);
    // Mover a ubicación compartible
    //const pdfUri = `${FileSystem.documentDirectory}Solicitud-GIA.pdf`;
   
    // Compartir el archivo (WhatsApp, correo, etc.)
    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
            mimeType: 'application/pdf',
            dialogTitle: 'Compartir Solicitud de Instrumental',
        });
    } else {
        Alert.alert('Error de Compartir', 'La función de compartir no está disponible en este dispositivo.');
    }
  } catch (error) {
    console.error('Error al generar el PDF:', error);
    Alert.alert('Error', 'No se pudo generar el PDF.');
  }
};