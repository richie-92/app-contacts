const crypto = require('crypto');

const contacts = require('../data/contactsStore');
const { ValidationError, NotFoundError } = require('../errors/contactErrors');

// Valida y normaliza los datos de un contacto.
function validateContactData(contactData) {
    if (!contactData || typeof contactData !== 'object' || Array.isArray(contactData)) {
        throw new ValidationError('Los datos del contacto son obligatorios.');
    }
    const { nombre, apellido, email, telefono } = contactData;

    const namePattern = /[^\W\d_]/u;
    if (typeof nombre !== 'string' || nombre.trim() === '' || !namePattern.test(nombre)) {
        throw new ValidationError('Introduce un nombre válido.', 'nombre');
    }

    if (typeof apellido !== 'string' || apellido.trim() === '' || !namePattern.test(apellido)) {
        throw new ValidationError('Introduce un apellido válido.', 'apellido');
    }

    let normalizedEmail = null;

    if (email !== undefined && email !== null) {
        if (typeof email !== 'string' || email.trim() === '') {
            throw new ValidationError('Introduce un correo válido.', 'email');
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email.trim())) {
            throw new ValidationError('Introduce un correo válido.', 'email');
        }

        normalizedEmail = email.trim();
    }

    let normalizedTelefono = null;

    if (telefono !== undefined && telefono !== null) {
        if (typeof telefono !== 'string' || telefono.trim() === '') {
            throw new ValidationError('Introduce un teléfono válido.', 'telefono');
        }

        const telefonoPattern = /^(?:\d{10}|\+52\d{10})$/;
        if (!telefonoPattern.test(telefono.trim())) {
            throw new ValidationError('Introduce un teléfono válido.', 'telefono');
        }

        normalizedTelefono = telefono.trim();
    }

    return {
        nombre: nombre.trim(),
        apellido: apellido.trim(),
        email: normalizedEmail,
        telefono: normalizedTelefono,
    };
}

// Retorna la colección completa de contactos almacenada en memoria.
function getAll() {
    return contacts;
}

// Busca un contacto por su identificador y genera un error si no existe.
function getById(id) {
    const contact = contacts.find((item) => item.id === id);
    if (!contact) {
        throw new NotFoundError('Contacto no encontrado.');
    }

    return contact;
}

// Valida, crea y almacena un nuevo contacto.
function create(contactData) {
    const validatedData = validateContactData(contactData);

    const contact = {
        id: crypto.randomUUID(),
        ...validatedData,
    };

    contacts.push(contact);

    return contact;
}

// Reemplaza los datos de un contacto existente.
function update(id, contactData) {
    getById(id);

    const validatedData = validateContactData(contactData);

    const updatedContact = {
        ...validatedData,
        id,
    };

    const index = contacts.findIndex((item) => item.id === id);

    contacts[index] = updatedContact;

    return updatedContact;
}

// Elimina y devuelve un contacto existente.
function deleteById(id) {
    const index = contacts.findIndex((item) => item.id === id);

    if (index === -1) {
        throw new NotFoundError('Contacto no encontrado.');
    }

    const [deletedContact] = contacts.splice(index, 1);

    return deletedContact;
}

module.exports = {
    getAll,
    getById,
    create,
    update,
    deleteById,
};
