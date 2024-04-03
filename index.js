const express = require('express');
const axios = require('axios');
const { v4: uuidv4 } = require('uuid');
const moment = require('moment');
const _ = require('lodash');
const chalk = require('chalk');

const app = express();
const port = 3000;

// Array para almacenar los usuarios registrados
let usuariosRegistrados = [];

// Endpoint para registrar nuevos usuarios
app.get('/registrar', async (req, res) => {
    try {
        // Consultar la API Random User
        const response = await axios.get('https://randomuser.me/api/?results=20');
        const usersData = response.data.results;

        // Mapear los datos de usuario para cada resultado
        const users = usersData.map(userData => {
            // Generar ID único
            const userID = uuidv4();

            // Formatear timestamp
            const timestamp = moment().format('MMMM Do YYYY, h:mm:ss a');

            // Crear objeto de usuario
            return {
                id: userID,
                nombre: userData.name.first,
                apellido: userData.name.last,
                sexo: userData.gender,
                timestamp: timestamp
            };
        });

        // Almacenar los usuarios en la lista
        usuariosRegistrados = usuariosRegistrados.concat(users);

        // Imprimir lista de usuarios en consola con Chalk
        console.log(chalk.bgWhite.blue('Usuarios Registrados:'));
        console.log(chalk.blue(JSON.stringify(users, null, 2)));

        res.json(usuariosRegistrados);
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error al registrar usuario.');
    }
});

// Endpoint para consultar todos los usuarios registrados
app.get('/usuarios', async (req, res) => {
    try {
        // Dividir usuarios por sexo utilizando Lodash
        const mujeres = _.filter(usuariosRegistrados, { 'sexo': 'female' });
        const hombres = _.filter(usuariosRegistrados, { 'sexo': 'male' });

        // Imprimir lista de usuarios en consola con Chalk
        console.log(chalk.bgWhite.blue('Usuarios Femeninos:'));
        console.log(chalk.blue(JSON.stringify(mujeres, null, 2)));
        console.log(chalk.bgWhite.blue('Usuarios Masculinos:'));
        console.log(chalk.blue(JSON.stringify(hombres, null, 2)));

        // Enviar lista de usuarios al cliente
        res.json({ mujeres, hombres });
    } catch (error) {
        console.error('Error al consultar usuarios:', error);
        res.status(500).send('Error al consultar usuarios.');
    }
});


// Levantar el servidor con Nodemon
app.listen(port, () => {
    console.log(`Servidor levantado en el puerto ${port}`);
});
