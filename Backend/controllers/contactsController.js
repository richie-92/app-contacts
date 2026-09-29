const contactModel = require('../models/contact');
const { ValidationError, NotFoundError } = require('../errors/contactErrors');

// Obtiene todos los contactos mediante el modelo y devuelve la colección como respuesta HTTP.
function getAll(req, res) {
    try {
        const contacts = contactModel.getAll();
        return res.status(200).json(contacts);
    } 
    catch (error) {
        return handleError(error, res);
    }
}

// Obtiene un contacto mediante su identificador y devuelve el recurso encontrado.
function getById(req, res) {
    try {
        const contact = contactModel.getById(req.params.id);
        return res.status(200).json(contact);
    }
    catch (error) {
        return handleError(error, res);
    }
}

// Crea un nuevo contacto utilizando los datos proporcionados en el cuerpo de la solicitud.
function create(req, res) {
    try {
        const contact = contactModel.create(req.body);
        return res.status(201).json(contact);
    }
    catch (error) {
        return handleError(error, res);
    }
}

// Actualiza un contacto existente utilizando su identificador y los datos recibidos.
function update(req, res) {
    try {
        const contact = contactModel.update(req.params.id, req.body);
        return res.status(200).json(contact);
    }
    catch (error) {
        return handleError(error, res);
    }
}

// Elimina un contacto mediante su identificador y devuelve el recurso eliminado.
function deleteById(req, res) {
    try {
        const contact = contactModel.deleteById(req.params.id);
        return res.status(200).json(contact);
    }
    catch (error) {
        return handleError(error, res);
    }
}

// Convierte los errores de dominio en respuestas HTTP según su tipo.
function handleError(error, res) {
    if (error instanceof ValidationError) {
        return res.status(400).json({
            error: error.message, field: error.field
        });
    }
    if (error instanceof NotFoundError) {
        return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error interno del servidor.' });
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
