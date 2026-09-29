import { useEffect, useState } from 'react';
import ContactForm from './components/contactForm.jsx';
import ContactList from './components/contactList.jsx';
import { createContact, deleteContact, getContact, getContacts, updateContact } from './api/contactsApi.js';
import './App.css';

// Define el tiempo previo al inicio de la transición de salida de la pantalla de introducción.
const INTRO_DURATION = 1500;

// Estado inicial utilizado por el formulario de creación.
const EMPTY_CONTACT = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: '',
};

function App() {
    // Estado principal de los contactos.
    const [contacts, setContacts] = useState([]);

    // Guarda el ID del contacto cuyo panel está abierto.
    const [expandedContact, setExpandedContact] = useState(null);

    // Guarda los datos del contacto que está siendo editado.
    const [editingContact, setEditingContact] = useState(null);

    // Estado de carga compartido por las operaciones de red.
    const [loading, setLoading] = useState(false);

    // Estado actual del error recibido durante una operación.
    const [error, setError] = useState(null);

    // Controla la pantalla inicial y su desaparición mediante CSS.
    const [showIntro, setShowIntro] = useState(true);
    const [introFading, setIntroFading] = useState(false);

    // Carga los contactos cuando la aplicación se monta.
    useEffect(() => {
        // Evita actualizar el estado si el componente se desmonta durante la petición.
        let isMounted = true;

        const loadContacts = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getContacts();

                if (isMounted) {
                    setContacts(data);
                }
            }
            catch (requestError) {
                if (isMounted) {
                    setError({
                        message: requestError.message,
                        field: requestError.field,
                    });
                }
            }
            finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        loadContacts();

        return () => {
            isMounted = false;
        };
    }, []);

    // Controla los tiempos de inicio y finalización de la pantalla de introducción.
    useEffect(() => {
        const fadeTimer = window.setTimeout(() => {
            setIntroFading(true);
        }, INTRO_DURATION);

        const removeTimer = window.setTimeout(() => {
            setShowIntro(false);
        }, INTRO_DURATION + 650);

        return () => {
            window.clearTimeout(fadeTimer);
            window.clearTimeout(removeTimer);
        };
    }, []);

    // Abre o cierra el panel de un contacto y obtiene su detalle desde la API.
    const handleToggleContact = async (contactId) => {
        if (expandedContact === contactId) {
            setExpandedContact(null);
            return;
        }

        setExpandedContact(contactId);
        setError(null);

        try {
            const detail = await getContact(contactId);
            setContacts(
                (currentContacts) => currentContacts.map(
                    (contact) => contact.id === contactId ? { ...contact, ...detail } : contact
                )
            );
        }
        catch (requestError) {
            setExpandedContact(null);
            setError({
                message: requestError.message,
                field: requestError.field,
            });
        }
    };

    // Activa el modo edición utilizando los datos actuales del contacto.
    const handleStartEditing = (contactId) => {
        const contact = contacts.find((item) => item.id === contactId);
        if (!contact) {
            return;
        }

        setEditingContact({
            id: contact.id,
            nombre: contact.nombre ?? '',
            apellido: contact.apellido ?? '',
            email: contact.email ?? '',
            telefono: contact.telefono ?? '',
        });

        setError(null);
    };

    // Cancela la edición y restablece el formulario a su estado normal.
    const handleCancelEditing = () => {
        setEditingContact(null);
        setError(null);
    };

    // Crea un nuevo contacto mediante POST.
    const handleCreateContact = async (contactData) => {
        setLoading(true);
        setError(null);

        try {
            const newContact = await createContact(contactData);
            setContacts((currentContacts) => [...currentContacts, newContact]);
            return newContact;
        }
        catch (requestError) {
            setError({
                message: requestError.message,
                field: requestError.field,
            });
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    // Actualiza el contacto actualmente en edición mediante PUT.
    const handleUpdateContact = async (contactData) => {
        if (!editingContact) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const updatedContact = await updateContact(
                editingContact.id,
                contactData
            );

            setContacts(
                (currentContacts) => currentContacts.map(
                    (contact) => contact.id === editingContact.id ? updatedContact : contact
                )
            );

            setEditingContact(null);
        }
        catch (requestError) {
            setError({
                message: requestError.message,
                field: requestError.field,
            });
            return null;
        }
        finally {
            setLoading(false);
        }
    };

    // Elimina el contacto actualmente en edición mediante DELETE.
    const handleDeleteContact = async () => {
        if (!editingContact) {
            return;
        }

        setLoading(true);
        setError(null);

        try {
            await deleteContact(editingContact.id);
            setContacts(
                (currentContacts) => currentContacts.filter(
                    (contact) => contact.id !== editingContact.id
                )
            );
            setExpandedContact(null);
            setEditingContact(null);
        }
        catch (requestError) {
            setError({
                message: requestError.message,
                field: requestError.field,
            });
        }
        finally {
            setLoading(false);
        }
    };

    // Evita mostrar la aplicación principal mientras la introducción sigue activa.
    if (showIntro) {
        return (
            <div className={`intro-screen ${introFading ? 'intro-screen--fading' : ''}`}>
                <h1>
                    Tu app favorita <br />
                    de contactos
                </h1>
            </div>
        );
    }

    return (
        <div className="app">
            {/* Header permanente que funciona como referencia espacial. */}
            <header className="app-header">CONTACTOS</header>

            {/* Contenido principal de la aplicación. */}
            <main className="app-main">
                {loading && contacts.length === 0 && (
                    <div className="app-loading" aria-live="polite">
                        Cargando contactos…
                    </div>
                )}

                {!loading && contacts.length === 0 && !error && (
                    <div className="app-empty">
                        No hay contactos.
                    </div>
                )}

                <ContactList
                    contacts={contacts}
                    expandedContact={expandedContact}
                    onToggleContact={handleToggleContact}
                    onEditContact={handleStartEditing}
                />
            </main>

            {/* Barra inferior fija utilizada tanto para crear como para editar. */}
            <ContactForm
                editingContact={editingContact}
                loading={loading}
                error={error}
                onCreateContact={handleCreateContact}
                onUpdateContact={handleUpdateContact}
                onCancelEditing={handleCancelEditing}
                onDeleteContact={handleDeleteContact}
                emptyContact={EMPTY_CONTACT}
            />
        </div>
    );
}

export default App;
