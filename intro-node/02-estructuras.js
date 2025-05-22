// listas (array) y mapas / objetos / diccionarios

const numeros = [1, 2, 3, 4, 5]
numeros.splice(2, 1) // elimina el tercer elemento
numeros.push(6) // añade un elemento al final
numeros.unshift(0) // añade un elemento al principio
numeros.pop() // elimina el ultimo elemento
numeros.shift() // elimina el primer elemento
numeros[0] // 1



// numeros = true
console.log(numeros)

// mapas

// clave -> valor

// se crea un objeto inmutable
const masctoaInmutable = Object.freeze({
    'nombre': 'Apolo',
    'edad': 3,
    'comida favorita': 'pollito',
    'raza': 'terrier',
})

const mascota = {
    'nombre': 'Apolo',
    'edad': 3,
    'comida favorita': 'pollito',
    'raza': 'terrier',
    // 'raza': 'Doberman',
}

const vacunas = ['rabia', 'parvovirus']

mascota.apodo = 'Apolito'
mascota.vacunas = vacunas

delete mascota.edad
// delete mascota['raza']

console.log(mascota.nombre)
console.log(mascota['comida favorita'])
console.log(mascota['raza'])
console.log(mascota)