import net from 'net';
import readline from 'readline';

// creamos la interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

// creamos al cliente
const client = net.createConnection({ port: 8080 }, () => {
    console.log(`Conectado con el servidor`);
    rl.question(`Escribe un comando: \nGET VEHICLES \nADD VEHICLE {}`, (comand) => {
        client.write(comand) // enviamos el comando al servidor.
    })
});

client.on('data', (data) => {
    console.log(`Respuesta del servidor:`);
    console.log(`${data.toString()}`); // convertimos en una cadena de texto
    rl.close(); // cerramos la interface
    client.destroy() // cerramos la conexion y liberamos recursos
})

client.on('close', () => {
    console.log(`El servidor a cerrado la conexión`);
})
