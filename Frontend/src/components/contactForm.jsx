import { useEffect, useState } from 'react';
import { Check, Plus, Trash2, X } from 'lucide-react';
import './contactForm.css';

function ContactForm({
    editingContact,
    loading,
    error,
    onCreateContact,
    onUpdateContact,
    onCancelEditing,
    onDeleteContact,
    emptyContact,
}) {
    // Mantiene localmente los valores actuales del formulario.
    const [formValues, setFormValues] = useState(emptyContact);

    // Sincroniza el formulario con el contacto en edición o los restablece al estado inicial.
    useEffect(() => {
        if (editingContact) {
            setFormValues({
                nombre: editingContact.nombre ?? '',
                apellido: editingContact.apellido ?? '',
                email: editingContact.email ?? '',
                telefono: editingContact.telefono ?? '',
            });
            return;
        }

        setFormValues(emptyContact);
    }, [editingContact, emptyContact]);

    // Actualiza solamente el campo que el usuario está modificando.
    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormValues((currentValues) => ({
            ...currentValues,
            [name]: value,
        }));
    };

    // Gestiona el envío tanto del formulario de creación como del de edición.
    const handleSubmit = async (event) => {
        event.preventDefault();

        const contactData = {
            nombre: formValues.nombre.trim(),
            apellido: formValues.apellido.trim(),
            email: formValues.email.trim() || null,
            telefono: formValues.telefono.trim() || null,
        };
        if (editingContact) {
            await onUpdateContact(contactData);
            return;
        }
        const createdContact = await onCreateContact(contactData);

        // Restablece el formulario después de una creación exitosa.
        if (createdContact) {
            setFormValues(emptyContact);
        }
    };

    // Restablece el formulario y cancela el modo de edición.
    const handleCancel = () => {
        setFormValues(emptyContact);
        onCancelEditing();
    };

    return (
        <div className="contact-form-shell">
            <form
                noValidate
                className={`contact-form ${editingContact ? 'contact-form--editing' : ''}`}
                onSubmit={handleSubmit}
            >
                {/* Acciones de edición, visibles solamente en ese modo. */}
                <div
                    className={`contact-form__actions contact-form__actions--leading ${editingContact ? 'contact-form__actions--visible' : ''}`}
                    aria-hidden={!editingContact}
                >
                    <button
                        type={editingContact ? 'submit' : 'button'}
                        className="contact-form__icon-button"
                        aria-label="Guardar cambios"
                        title="Guardar"
                        disabled={loading || !editingContact}
                    >
                        <Check size={19} strokeWidth={1.9} aria-hidden="true" />
                    </button>
                    <button
                        type="button"
                        className="contact-form__icon-button"
                        onClick={handleCancel}
                        aria-label="Cancelar edición"
                        title="Cancelar"
                        disabled={loading || !editingContact}
                    >
                        <X size={19} strokeWidth={1.9} aria-hidden="true" />
                    </button>
                </div>

                {/* Campos comunes a creación y edición. */}
                <div className="contact-form__fields">
                    <label className="contact-form__field contact-form__field--name">
                        <span className="sr-only">Nombre</span>
                        <input
                            type="text"
                            name="nombre"
                            value={formValues.nombre}
                            onChange={handleChange}
                            placeholder="Nombre"
                            autoComplete="given-name"
                            disabled={loading}
                            required
                            className={error?.field === 'nombre' ? 'contact-form__input--error' : ''}
                        />
                    </label>
                    <label className="contact-form__field contact-form__field--name">
                        <span className="sr-only">Apellido</span>
                        <input
                            type="text"
                            name="apellido"
                            value={formValues.apellido}
                            onChange={handleChange}
                            placeholder="Apellidos"
                            autoComplete="family-name"
                            disabled={loading}
                            required
                            className={error?.field === 'apellido' ? 'contact-form__input--error' : ''}
                        />
                    </label>
                    <label className="contact-form__field contact-form__field--email">
                        <span className="sr-only">Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formValues.email}
                            onChange={handleChange}
                            placeholder="E-mail"
                            autoComplete="email"
                            disabled={loading}
                            className={error?.field === 'email' ? 'contact-form__input--error' : ''}
                        />
                    </label>
                    <label className="contact-form__field contact-form__field--phone">
                        <span className="sr-only">Teléfono</span>
                        <input
                            type="tel"
                            name="telefono"
                            value={formValues.telefono}
                            onChange={handleChange}
                            placeholder="Teléfono"
                            autoComplete="tel"
                            disabled={loading}
                            className={error?.field === 'telefono' ? 'contact-form__input--error' : ''}
                        />
                    </label>
                </div>

                {/* Acción final: crear en modo creación, eliminar en modo edición. */}
                <div className={
                    `contact-form__actions contact-form__actions--trailing ${
                        editingContact ? 'contact-form__actions--visible' : ''
                    }`
                }>
                    {editingContact ? (
                        <button
                            type="button"
                            className="contact-form__icon-button"
                            onClick={onDeleteContact}
                            aria-label="Eliminar contacto"
                            title="Eliminar"
                            disabled={loading || !editingContact}
                        >
                            <Trash2 size={19} strokeWidth={1.9} aria-hidden="true" />
                        </button>
                    ) : (
                        <button
                            type="submit"
                            className="contact-form__icon-button"
                            aria-label="Agregar contacto"
                            title="Agregar contacto"
                            disabled={loading}
                        >
                            <Plus size={19} strokeWidth={1.9} aria-hidden="true" />
                        </button>
                    )}
                </div>
            </form>

            {error && (
                <div className="app-error" role="alert">
                    {error.message}
                </div>
            )}
        </div>
    );
}

export default ContactForm;