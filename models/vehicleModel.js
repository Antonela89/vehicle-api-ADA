// Importación de modulos necesarios 
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// El modulo EMS, no podemos utilizar variables globales (__dirname)
// solución -> "recrearlas";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// guardamos en una variable la url a la base de datos
const pathFile = path.jpin(__dirname, '../data/vehicles.json');

// Lógica 
// creación de un objeto que tiene los metodos de la lógica
const VehicleModel = {
    // leeemos el archivo json y obtenemos los vehiculos
    readVehicles: () => {
        const data = fs.readFileSync(pathFile);
        return JSON.parse(data);
    },

    // Escribir el archivo Json con la nueuva data
    writeVehicle: (vehicles) => {
        const jsonData = JSON.stringify(vehicles, null, 2);
        fs.writeFileSync(pathFile, jsonData);
    }
};

// Exportacion del objeto
export { VehicleModel};

