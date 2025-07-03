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