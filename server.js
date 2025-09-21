import net from 'net';
import VehicleController from './controllers/vehicleController';
import { v4 as uuidv4} from 'uuid';

// función para validar si una cadena es un json

const isJson = (string) => {
    return string.startsWidth('{') && string.endsWidth('}')
};

// creacion del servidor tcp
const server = net.createServer((socket) => {
    console.log(`Cliente conectado...`);
    
    // Evento 'data' -> se dispara cuando el servidor recibe datos del cliente

    socket.on('data', (data) => {
        const comand = data.toString().trim();

        if (comand.toUpperCase() === 'GET VEHICLES') {
            // obtener los datos de todos los vehiculos
            const response = VehicleController.getVehicles();

            socket.write(response);
        } else if (comand.toUpperCase() === 'ADD VEHICLE') {
            const vehicleDataString = comand.replace('ADD VEhICLE', '');
            //exstraemos los datos del comando

            // verificacion para saber si el comando el json
            if (isJson(vehicleDataString)) {
                // convertimos los datos a json si los datos son validos
                const vehicleData = JSON.parse(vehicleDataString);

                // verificamos que los datos sean un objeto
                if (vehicleData && typeof(vehicleData) === 'objet') {
                    // creamos un objeto con id único
                    const newVehicle = { id: uuidv4(), ...vehicleData};
                    const response = VehicleController.addVehicle(newVehicle);
                    socket.write(response)
                } else {
                    socket.write(`Datos del vehículo inválidos.`)
                }

            } else {
                socket.write(`Error: Formato de Json no válido.`)
            }
        } else {
            socket.write(`Comando no reconocido.`)
        }
    });

    socket.on('end', () => {
        console.log(`Cliente desconectado`);
    });

    socket.on('close', () => {
        console.log(`Cerrando la conexión`);
    });

    socket.on('error', (err) => {
        console.error(`Error: ${err.message}`);
    })
})

server.listen(8080, () => {
    console.log(`Servidor escuchando en el puerto: 8080`);
})


