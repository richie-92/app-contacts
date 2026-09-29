const express = require('express');
const cors = require('cors');
const contactsRouter = require('./routes/contactsRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Habilita solicitudes HTTP de origen cruzado para el cliente.
app.use(express.json()); // Configura el procesamiento automático de cuerpos de solicitud en formato JSON.
app.use('/', contactsRouter); // Registra las rutas HTTP correspondientes al recurso de contactos.

// Gestiona solicitudes dirigidas a rutas no definidas.
app.use((req, res) => {
    return res.status(404).json({
        error: 'Ruta no encontrada.',
    });
});

// Gestiona errores de procesamiento y excepciones no controladas durante la solicitud.
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && err.type === 'entity.parse.failed') {
        return res.status(400).json({
            error: 'JSON inválido.',
        });
    }
    
    return res.status(500).json({
        error: 'Error interno del servidor.',
    });
});

// Inicia el servidor.
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
