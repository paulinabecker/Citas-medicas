# Citas-medicas

Descripción
La clínica DENDE Spa ha tenido un problema con su software de gestión de citas y necesita
urgentemente una aplicación capaz de registrar a los nuevos usuarios almacenando su
nombre, apellido, sexo, hora en la que fue registrado e indispensablemente un código
identificador.
Deberás crear un servidor que disponibilice una ruta para la consulta de todos los usuarios
registrados. 

Requerimientos
1. El registro de los usuarios debe hacerse con la API Random User usando axios para
consultar la data. 
2. Cada usuario registrado debe tener un campo id único generado por el paquete UUID.
3. Cada usuario debe tener un campo timestamp almacenando la fecha de registro
obtenida y formateada por el paquete Moment. 
4. Por cada consulta realizada al servidor, se debe devolverle al cliente una lista con los
datos de todos los usuarios registrados usando Lodash para dividir el arreglo en 2
separando los usuarios por sexo. 
5. En cada consulta también se debe imprimir por la consola del servidor la misma lista
de usuarios pero con fondo blanco y color de texto azul usando el paquete Chalk. 
6. El servidor debe ser levantado con el comando Nodemon.
