import pool from '../config/db.js'


export const getAllMovies = async () => {

  const query = `SELECT 
                    m.id,
                    m.title,
                    m.description,
                    m.director,
                    m.year,
                    m.poster_url,
                    GROUP_CONCAT(g.name) AS genres
                    FROM movies m
                    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                    LEFT JOIN genres g ON g.id = mg.genre_id
                    GROUP BY m.id; `

  const [results] = await pool.query(query);

  return results

}

export const getMovieById = async (id) => {

  //inyección de SQL

  const query = `SELECT 
                    m.id,
                    m.title,
                    m.description,
                    m.director,
                    m.year,
                    m.poster_url,
                    GROUP_CONCAT(g.name) AS genres
                    FROM movies m
                    LEFT JOIN movie_genres mg ON m.id = mg.movie_id
                    LEFT JOIN genres g ON g.id = mg.genre_id
										WHERE m.id = ?
                    GROUP BY m.id; `

  const [data] = await pool.query(query, [id]); //prevenir inyección de SQL

  return data
}

export const insertMovie = async (movie) => {

  const conn = await pool.getConnection()

  try {



    conn.beginTransaction()

    const { id, title, description, director, year, poster_url, genres } = movie

    //Preparar la consulta de movies
    const query = `INSERT INTO movies 
          (id, title, description, director, year, poster_url) 
          VALUES (?, ?, ?, ? ,? , ?);`

    await conn.execute(query, [id, title, description, director, year, poster_url])

    //Preparar la consulta de movie_genres
    // genres.forEach(async (genre) => {
    //   const genreQuery = `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?,?) `
    //   await conn.execute(genreQuery, [id, genre])
    // })

    await Promise.all(
      genres.map((genre) => {
        const genreQuery = `INSERT INTO movie_genres (movie_id, genre_id) VALUES (?,?) `
        return conn.execute(genreQuery, [id, genre])
      }))

    conn.commit()

    return movie

  } catch (error) {
    conn.rollback()
    throw error // lanzar el error para que lo maneje el controlador
  } finally {
    conn.release() // liberar la conexión
  }

}