# App Contacts

Aplicación full-stack de gestión de contactos desarrollada con **React, Vite, Node.js y Express**, conectada mediante una **API REST**.

El proyecto implementa operaciones CRUD para crear, consultar, editar y eliminar contactos. La información se gestiona en memoria mediante un arreglo en el Backend y la comunicación entre Frontend y Backend se realiza mediante solicitudes HTTP con respuestas en formato JSON.

## Descripción

**App Contacts** es una aplicación cliente-servidor desarrollada como ejercicio práctico de integración entre un Frontend en React y un Backend construido con Node.js y Express.

La aplicación separa la interfaz de usuario de la lógica de gestión de datos mediante una API REST. El Backend organiza la gestión de contactos utilizando rutas, controladores, modelos, almacenamiento en memoria y manejo específico de errores.

El Frontend estructura la interfaz mediante componentes de React y cuenta con una capa dedicada al consumo de la API.

## Funcionalidades

- Crear contactos.
- Listar contactos.
- Consultar un contacto individual.
- Editar contactos.
- Eliminar contactos.
- Validar los datos recibidos por la API.
- Gestionar respuestas de error del Backend.
- Mantener sincronizada la interfaz con las operaciones realizadas sobre los contactos.

## Arquitectura

El proyecto utiliza una arquitectura cliente-servidor compuesta por dos aplicaciones independientes:

```text
┌─────────────────────┐
│      Frontend       │
│                     │
│ React + Vite        │
│ Componentes         │
│ Capa API            │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           │
┌──────────▼──────────┐
│       Backend       │
│                     │
│ Node.js + Express   │
│ Routes              │
│ Controllers         │
│ Models              │
│ Data Store          │
│ Error Handling      │
└─────────────────────┘
```

El Frontend consume la API mediante `fetch`, mientras que el Backend procesa las solicitudes, modifica el almacenamiento en memoria y devuelve las respuestas correspondientes.

## Tecnologías

### Frontend

- React
- React DOM
- Vite
- JavaScript
- Fetch API
- Lucide React

### Backend

- Node.js
- Express
- CORS
- JavaScript
- API REST
- JSON

## Estructura del proyecto

```text
app-contacts/
│
├── Backend/
│   ├── controllers/
│   │   └── contactsController.js
│   ├── data/
│   │   └── contactsStore.js
│   ├── errors/
│   │   └── contactErrors.js
│   ├── models/
│   │   └── contact.js
│   ├── routes/
│   │   └── contactsRoutes.js
│   ├── package.json
│   ├── package-lock.json
│   └── server.js
│
├── Frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── contactsApi.js
│   │   ├── components/
│   │   │   ├── contactForm.css
│   │   │   ├── contactForm.jsx
│   │   │   ├── contactItem.css
│   │   │   ├── contactItem.jsx
│   │   │   ├── contactList.css
│   │   │   └── contactList.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── .gitignore
└── README.md
```

## API REST

La API expone los siguientes endpoints:

| Método | Endpoint | Descripción |
|---|---|---|
| `GET` | `/contacts` | Obtiene todos los contactos |
| `GET` | `/contacts/:id` | Obtiene un contacto por su ID |
| `POST` | `/contacts` | Crea un nuevo contacto |
| `PUT` | `/contacts/:id` | Actualiza un contacto existente |
| `DELETE` | `/contacts/:id` | Elimina un contacto |

Las respuestas de la API utilizan formato JSON.

## Validación y manejo de errores

El Backend incorpora validaciones para los datos recibidos:

- `nombre` es obligatorio.
- `apellido` es obligatorio.
- `email` es opcional, pero debe cumplir con un formato válido cuando se proporciona.
- `teléfono` es opcional, pero debe cumplir con un formato válido cuando se proporciona.
- Los campos opcionales pueden almacenarse como `null`.
- Los identificadores inexistentes generan una respuesta `404`.
- Los datos inválidos generan una respuesta `400`.
- Los errores relacionados con los contactos se encuentran organizados en un módulo específico.

Los identificadores de los contactos se generan mediante UUID.

## Instalación

El proyecto está dividido en dos aplicaciones y cada una administra sus propias dependencias.

### Backend

Desde la raíz del proyecto:

```bash
cd Backend
npm install
```

### Frontend

Desde la raíz del proyecto:

```bash
cd Frontend
npm install
```

## Ejecución

El Backend y el Frontend deben ejecutarse de manera independiente.

### 1. Iniciar el Backend

En una terminal:

```bash
cd Backend
npm start
```

El servidor quedará disponible en:

```text
http://localhost:3000
```

### 2. Iniciar el Frontend

En una segunda terminal:

```bash
cd Frontend
npm run dev
```

Vite proporcionará la dirección local para acceder a la aplicación desde el navegador.

## Almacenamiento

Los contactos se almacenan actualmente en un **arreglo en memoria** dentro del Backend.

Por esta razón, los datos no persisten después de detener o reiniciar el servidor.

Este comportamiento corresponde al alcance definido para el ejercicio y no utiliza una base de datos externa.

## Estado del proyecto

Proyecto funcional correspondiente a un ejercicio práctico de desarrollo **Full Stack**, con integración entre una interfaz React y una API REST desarrollada con Node.js y Express.

El proyecto se mantiene deliberadamente dentro del alcance definido para el ejercicio y utiliza almacenamiento en memoria en lugar de una base de datos persistente.