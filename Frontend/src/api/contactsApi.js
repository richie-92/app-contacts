// Define la URL base utilizada para las solicitudes HTTP al Back-end.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

// Procesa las respuestas HTTP y transforma los errores en excepciones.
const handleResponse = async (response) => {
    if (response.ok) {
        if (response.status === 204) {
            return null;
        }
        return response.json();
    }
    
    // Intenta obtener el mensaje de error enviado por el Back-end.
    let message = 'Ha ocurrido un error al comunicarse con el servidor.';
    let field = null;
    try {
        const errorData = await response.json();
        if (typeof errorData?.error === 'string') {
            message = errorData.error;
        }
        if (typeof errorData?.field === 'string') {
            field = errorData.field;
        }
    }
    catch {
        // Si la respuesta no contiene JSON, se conserva el mensaje de error genérico.
    }
    const error = new Error(message);
    error.field = field;
    throw error;
};

// Obtiene todos los contactos.
export const getContacts = async () => {
    const response = await fetch(`${API_BASE_URL}/contacts`);
    return handleResponse(response);
};

// Obtiene un contacto específico mediante su identificador.
export const getContact = async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`);
    return handleResponse(response);
};

// Crea un contacto nuevo.
export const createContact = async (contact) => {
    const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    return handleResponse(response);
};

// Actualiza un contacto existente.
export const updateContact = async (id, contact) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
    });
    return handleResponse(response);
};

// Elimina un contacto existente.
export const deleteContact = async (id) => {
    const response = await fetch(`${API_BASE_URL}/contacts/${id}`, {
        method: 'DELETE',
    });
    return handleResponse(response);
};