// esto no tiene ningun efecto en la ejecucion
// console.log(window)
// console.log(globalThis)
// console.log('olii')

// Variables

let nombre = 'Juan' // Alcance de bloque
// nombre = 'Pedro' // ✅ es valido

// var apellido = 'Perez' // alcance global
console.log(apellido)

console.log(nombre)

// constante
const edad = 31 // Alcance de bloque
// edad = 20 // ❌ no es valido

{
    // un ambito diferente
    let nombre = 'Enrique'
    console.log(nombre)
    // edad = 30
    console.log(edad)

    var apellido = 'Alvarenga' // alcance global

}

console.log(nombre)
console.log(apellido)