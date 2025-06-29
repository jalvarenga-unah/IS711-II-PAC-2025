# 🎬 Proyecto  - `movies_unah`

Este proyecto configura un contenedor de **MySQL 8** usando Docker incluyendo un script de inicialización con tablas para películas, géneros y usuarios, esto para la elaboración del API RESTful, de un sistema de autenticación con un catálogo de películas.

---

## 🚀 Instrucciones para iniciar

### 1. Requisitos

Asegúrate de tener instalados:

- [Docker](https://www.docker.com/)

### 2. Levantar el contenedor

Desde la raíz del proyecto donde se encuentra el archivo `docker-compose.yml`, ejecuta:

```bash
docker compose up -d 
```

Esto iniciará un contenedor MySQL con:

- Base de datos inicial: `movies_unah`
- Datos precargados (usuarios, géneros, películas)
- Tablas configuradas correctamente

---

## 🔐 Datos de conexión

Conéctate a la base de datos desde tu API, Workbench o cualquier cliente MySQL:

| Parámetro      | Valor         |
|----------------|---------------|
| Host           | `localhost`   |
| Puerto         | `3307`        |
| Base de datos  | `movies_unah` |
| Usuario        | `unah`        |
| Contraseña     | `unah1234`    |
| Usuario root   | `root`        |
| Contraseña root| `unah1234`    |

> ⚠️ El puerto 3307 fue elegido para evitar conflictos con instalaciones locales de MySQL.

---

## 🗂 Estructura del proyecto

```
.
├── docker-compose.yml         # Configuración de servicios Docker
├── init/
│   └── init.sql               # Script SQL para crear e insertar datos
├── README.md
```

---

## 🧱 Tablas creadas

### `users`
| Campo                | Tipo           | Descripción                           |
|----------------------|----------------|----------------------------------------|
| `id`                 | BINARY(16)     | UUID binario como PK                   |
| `name`               | VARCHAR(100)   | Nombre del usuario                     |
| `email`              | VARCHAR(255)   | Correo electrónico (único)             |
| `phone`              | VARCHAR(20)    | Número de teléfono                     |
| `password_hash`      | VARCHAR(255)   | Contraseña en hash (bcrypt)            |
| `must_change_password` | BOOLEAN      | Forzar cambio de contraseña            |
| `created_at`         | TIMESTAMP      | Fecha de creación                      |

### `movies`
| Campo        | Tipo         | Descripción                   |
|--------------|--------------|-------------------------------|
| `id`         | CHAR(36)     | UUID como texto               |
| `title`      | VARCHAR(255) | Título de la película         |
| `description`| TEXT         | Sinopsis                      |
| `director`   | VARCHAR(100) | Director                      |
| `year`       | INT          | Año                           |
| `poster_url` | TEXT         | URL del póster                |

### `genres`
| Campo | Tipo       | Descripción       |
|-------|------------|--------------------|
| `id`  | CHAR(36)   | UUID como texto    |
| `name`| VARCHAR(100)| Nombre del género |

### `movie_genres` (tabla pivote)
Relaciona películas con múltiples géneros.

---

## 📥 Datos iniciales insertados

### 🎬 Película: `Inception`

```json
{
  "title": "Inception",
  "description": "A thief who steals corporate secrets through the use of dream-sharing technology...",
  "director": "Christopher Nolan",
  "year": 2010,
  "genre": ["Science Fiction", "Thriller"],
  "poster_url": "https://m.media-amazon.com/images/M/....jpg",
  "id": "{uuid}"
}
```

---

## 🔍 Consultas útiles

### Ver todos los usuarios (UUID legible)

```sql
SELECT BIN_TO_UUID(id) AS id, name, email, phone, must_change_password, created_at
FROM users;
```

### Ver todas las películas con géneros

```sql
SELECT 
  m.id,
  m.title,
  m.description,
  m.director,
  m.year,
  m.poster_url,
  GROUP_CONCAT(g.name) AS genres
FROM movies m
JOIN movie_genres mg ON m.id = mg.movie_id
JOIN genres g ON g.id = mg.genre_id
GROUP BY m.id;
```

### Ver géneros disponibles

```sql
SELECT * FROM genres;
```