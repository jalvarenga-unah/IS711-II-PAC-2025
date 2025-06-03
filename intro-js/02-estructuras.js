// listas (array) y mapas / objetos / diccionarios

const numeros = [1, 2, 3, 4, 5]
const copia = [...numeros] // operador spread
numeros.splice(2, 1) // elimina el tercer elemento
numeros.push(6) // añade un elemento al final
numeros.push(61) // añade un elemento al final
numeros.push(16) // añade un elemento al final
numeros.unshift(0) // añade un elemento al principio
numeros.pop() // elimina el ultimo elemento
numeros.shift() // elimina el primer elemento
numeros[0] // 1



// numeros = true
console.log(numeros)
console.log(copia)

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

// Desestructuración (...) // spread / rest

const [primer, segundo, tercer, ...restantes] = copia
// const primero = copia[0]
// const segundo = copia[1]
// const tercero = copia[2]

console.log(primer)
console.log(segundo)
console.log(tercer)
console.log(restantes)
console.log(copia)

//Desestructuración de objetos

const nombre = 'Juan Perez'

const copiaMascota = { ...mascota }

const { vacunas: vacunasAplicadas, nombre: nombreMascota, 'comida favorita': comidaFavoria, gato, apodo } = mascota
// const nombre = mascota.nombre
// const apodo = mascota.apodo

console.log(nombre)
console.log(apodo)
console.log(comidaFavoria)
console.log(vacunasAplicadas)

const persona = {
    nombre: 'Juan',
    apellido: 'Perez',
    edad: 30,
    direccion: {
        calle: 'Falsa',
        numero: 123,
        ciudad: 'Springfield',
        geo: {
            lat: -34.6037,
            lng: -58.3816
        }
    }
}

// const { direccion: { ciudad, geo: { lat, lng } } } = persona
// ⬆️ esta instrucción es equivalente a las siguientes: ⬇️
const { direccion } = persona
const { ciudad, geo } = direccion
const { lat, lng } = geo

console.log(ciudad)
console.log(lat)
console.log(lng)