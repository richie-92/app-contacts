import ContactItem from './contactItem.jsx';
import './contactList.css';

function ContactList({
    contacts,
    expandedContact,
    onToggleContact,
    onEditContact,
}) {
    return (
        <section className="contact-list" aria-label="Lista de contactos">
            {/* Renderiza cada contacto como una tarjeta independiente. */}
            {contacts.map((contact) => (
                <ContactItem
                    key={contact.id}
                    contact={contact}
                    isExpanded={expandedContact === contact.id}
                    onToggle={() => onToggleContact(contact.id)}
                    onEdit={() => onEditContact(contact.id)}
                />
            ))}
        </section>
    );
}

export default ContactList;
