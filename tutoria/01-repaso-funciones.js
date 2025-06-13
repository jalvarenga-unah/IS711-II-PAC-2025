const postre1 = {
    nombre: 'Tarta de queso',
    precio: 5.50,
    ingredientes: ['queso', 'galleta', 'mantequilla'],
    calorias: 350
}

// nombre: 'Tarta de queso',
// precio: 5.50,
// ingredientes: ['queso', 'galleta', 'mantequilla'],
// calorias: 350
const postre2 = { ...postre1, isv: postre1.precio * 1.15 } // nueva referencia
console.log(postre2)

const numeros = [5, 4, 3, 8, 7, 9, 1, 0];

console.log(numeros);

// numeros.sort() // muta el objeto original
console.log(numeros.toSorted()) //NO muta el objeto original y devuelve un nuevo array ordenado

console.log(numeros);

// manejo de callbacks
const postres = [
    {
        nombre: 'Tarta de queso',
        precio: 5.50,
        ingredientes: ['queso', 'galleta', 'mantequilla'],
        calorias: 350
    },
    {
        nombre: 'Tarta de chocolate',
        precio: 6.00,
        ingredientes: ['chocolate', 'galleta', 'mantequilla'],
        calorias: 400
    },
    {
        nombre: 'Helado de vainilla',
        precio: 3.50,
        ingredientes: ['vainilla', 'leche', 'azúcar'],
        calorias: 200
    },
    {
        nombre: 'Flan de huevo',
        precio: 4.00,
        ingredientes: ['huevo', 'leche', 'azúcar', 'caramelo'],
        calorias: 250
    },
    {
        nombre: 'Brownie de nuez',
        precio: 5.00,
        ingredientes: ['nuez', 'chocolate', 'huevo', 'azúcar', 'harina'],
        calorias: 300
    }
]

const postresCaros = postres.filter((postre) => {
    return postre.precio >= 4
})

console.log(postresCaros);

const postresSinAzucar = postres.filter((postre) => {
    return !postre.ingredientes.includes('azúcar')
})

console.log(postresSinAzucar);

// muta el objeto original, pudiendo agregar o elimnar, e incluso modificar propiedades
const postresConISV = postres.map((postre) => {
    postre.isv = Math.ceil(postre.precio * 0.15 * 100) / 100; // redondea a dos decimales

    return postre; // muta el objeto original
})

console.log(postres);

const muchosIngredientes = postres.filter(({ ingredientes }) => {

    return ingredientes.length >= 4

})

console.log(muchosIngredientes);

const buscarPostre = (postre) => {

    return postres.find(({ nombre }) => {
        return nombre === postre
    }) || 'No se encontró el postre'

}
