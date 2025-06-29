-- Crear tabla de usuarios con UUID BINARY(16), campos extra y bandera de cambio de contraseña
CREATE TABLE users (
  id BINARY(16) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password_hash VARCHAR(255) NOT NULL,
  must_change_password BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla de géneros
CREATE TABLE genres (
  id CHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Crear tabla de películas
CREATE TABLE movies (
  id CHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  director VARCHAR(100),
  year INT,
  poster_url TEXT
);

-- Tabla pivote: películas-géneros
CREATE TABLE movie_genres (
  movie_id CHAR(36),
  genre_id CHAR(36),
  PRIMARY KEY (movie_id, genre_id),
  FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
  FOREIGN KEY (genre_id) REFERENCES genres(id) ON DELETE CASCADE
);

-- Insertar géneros
INSERT INTO genres (id, name) VALUES 
  (UUID(), 'Science Fiction'),
  (UUID(), 'Thriller');

-- Insertar película (Inception)
SET @movie_id = UUID();
INSERT INTO movies (id, title, description, director, year, poster_url)
VALUES (
  @movie_id,
  'Inception',
  'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
  'Christopher Nolan',
  2010,
  'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
);

-- Asignar géneros a la película Inception
INSERT INTO movie_genres (movie_id, genre_id)
SELECT @movie_id, id FROM genres WHERE name IN ('Science Fiction', 'Thriller');

-- Insertar usuario de ejemplo
INSERT INTO users (id, name, email, phone, password_hash, must_change_password)
VALUES (
  UUID_TO_BIN(UUID()),
  'Juan Alvarenga',
  'jealvarengar@unah.edu.hn',
  '+50499999999',
  '$2y$10$secrethash', 
  true                 
);
