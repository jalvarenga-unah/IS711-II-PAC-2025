import zod from 'zod';


// zod.array(z.string()).min(1).max(3).nonempty(),
//  z.enum([
//         "Action",
//         "Adventure",
//         "Comedy",
//         "Drama",
//         "Fantasy",
//         "Horror",
//         "Mystery",
//         "Romance",
//         "Science Fiction",
//         "Thriller"
//     ])
// Definir como debe "verse" una movie para crearse
const movieSchema = zod.object({
    "title": zod.string({
        message: "El titulo es un string"
    }).max(100),
    "description": zod.string().min(30).max(200),
    "director": zod.string().min(5),
    "year": zod.number().int().gte(1888).lte(new Date().getFullYear()),
    "poster_url": zod.string().url(),
    "genres": zod.array(zod.string().uuid({ version: "v4" })).min(1).nonempty(),
}).strict()

export const validateMovie = (movie) => {
    return movieSchema.safeParse(movie)
}