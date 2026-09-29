// Representa errores producidos cuando los datos no cumplen las reglas de validación.
class ValidationError extends Error {
    constructor(message, field) {
        super(message);
        this.name = 'ValidationError';
        this.field = field;
    }
}

// Representa errores producidos cuando el contacto solicitado no existe.
class NotFoundError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NotFoundError';
    }
}

module.exports = {
    ValidationError,
    NotFoundError,
};
