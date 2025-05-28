
// var saludo = "Hola, mundo! desde una variable";


function saludo() {
    console.log("Hola, mundo!");
}


// función anónima, al ser una constante, no se puede sobreescribir su valor
const saludo2 = function () {
    console.log("Hola, mundo desde una función anónima!");
}

// saludo2 = "Holaaa"
console.log(saludo);
saludo()
saludo2()

// funci;on de flecha
const saludo3 = (nombre) => {

    // no tiene acceso a "this" en su lugar
    // use "globalThis" 
    // console.log('Hola' + nombre)
    console.log(`Hola ${nombre ?? ''} `) // '' o ""

}


saludo3('Pedro')
saludo3()


// bool
const isNumber = (value) => {

    const resultado = Number(value)

    // if (resultado >= 0 || resultado < 0) return true
    // else return false

    return !isNaN(resultado)
}

// función corta para retorna en una sola línea
const isNumber2 = (value) => !isNaN(Number(value))

console.log(isNumber(5))
console.log(isNumber('5'))
console.log(isNumber('5e'))
console.log(isNumber(0))
console.log(isNumber(-1))


const crearPersona = ({ nombre, edad = 0 }) => {
    console.log(`Creando persona ${nombre} de ${edad} años`)
}

const params = { edad: 31, nombre: 'Juan', apellido: 'Perez' }

crearPersona({ nombre: 'Pedro' }) // argumentos "con nombre"
crearPersona(params)