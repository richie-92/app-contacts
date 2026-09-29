import { useEffect, useRef } from 'react';
import { Edit3, Mail, Phone } from 'lucide-react';
import './contactItem.css';

function ContactItem({
    contact,
    isExpanded,
    onToggle,
    onEdit,
}) {
    // Referencia al panel expandible para calcular su posición en la ventana.
    const panelRef = useRef(null);

    // Ajusta el desplazamiento de la ventana cuando el panel expandido queda fuera del área visible.
    useEffect(() => {
        if (!isExpanded || !panelRef.current) {
            return;
        }

        const panel = panelRef.current;

        const scrollTimer = window.setTimeout(() => {
            const panelRect = panel.getBoundingClientRect();
            const formShell = document.querySelector('.contact-form-shell');

            if (!formShell) {
                return;
            }

            const formRect = formShell.getBoundingClientRect();
            const bottomMargin = 65;
            const visibleBottom = formRect.top - bottomMargin;

            if (panelRect.bottom > visibleBottom) {
                window.scrollBy({
                    top: panelRect.bottom - visibleBottom,
                    behavior: 'smooth',
                });
            } else if (panelRect.top < 0) {
                window.scrollBy({
                    top: panelRect.top,
                    behavior: 'smooth',
                });
            }
        }, 180);

        return () => {
            window.clearTimeout(scrollTimer);
        };
    }, [isExpanded]);

    return (
        <article className="contact-item">
            {/* Tarjeta principal que permite alternar la expansión del panel del contacto. */}
            <button
                type="button"
                className="contact-card"
                onClick={onToggle}
                aria-expanded={isExpanded}
                aria-controls={`contact-panel-${contact.id}`}
            >
                <span className="contact-card__name">
                    <span className="contact-card__last-name">{contact.apellido || 'Sin apellido'}</span>
                    <span className="contact-card__first-name">{contact.nombre || 'Sin nombre'}</span>
                </span>
            </button>
            {/* Controla la expansión del panel y su participación en el flujo vertical. */}
            <div
                ref={panelRef}
                id={`contact-panel-${contact.id}`}
                className={`contact-panel ${isExpanded ? 'contact-panel--open' : ''}`}
                aria-hidden={!isExpanded}
            >
                {/* Contenedor intermedio que separa el mecanismo de expansión del contenido del panel. */}
                <div className="contact-panel__wrapper">
                    {/* Presenta los datos disponibles del contacto y la acción de edición. */}
                    <div className="contact-panel__content">
                        <div className="contact-panel__details">
                            <div className="contact-panel__detail">
                                <Mail size={17} strokeWidth={1.7} aria-hidden="true" />
                                <span>{contact.email || 'Sin email'}</span>
                            </div>
                            <div className="contact-panel__detail">
                                <Phone size={17} strokeWidth={1.7} aria-hidden="true" />
                                <span>{contact.telefono || 'Sin teléfono'}</span>
                            </div>
                        </div>
                        {/* Inicia la edición sin propagar el evento hacia la tarjeta contenedora. */}
                        <button
                            type="button"
                            className="contact-panel__edit"
                            onClick={(event) => {
                                event.stopPropagation();
                                onEdit();
                            }}
                            aria-label={`Editar a ${contact.nombre || 'contacto'}`}
                            title="Editar"
                            disabled={!isExpanded}
                        >
                            <Edit3 size={16} strokeWidth={1.7} aria-hidden="true" />
                        </button>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default ContactItem;