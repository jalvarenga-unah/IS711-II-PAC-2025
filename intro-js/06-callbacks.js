
const lista = ['Hola', 1, 2, 3, 4, 5, 'mundo', 6, 7, 8, 9, 10];

//? FOR CONVENCIONAL
// for (let i = 0; i < lista.length; i++) {
//     console.log(lista[i]);
// }

//? FOR PARA ACCEDER A LOS INDICES DE UNA LISTA 
// for (const index in lista) {
//     console.log(lista[index]);
// }

//? FOR PARA ACCEDER A LOS VALORES DE UNA LISTA
// for (const valor of lista) {
//     console.log(valor);
// }

//? FOREACH, PARA PODER RECORRER Y OBTENER VALORES E INDICES EN UNA LISTA
// lista.forEach((valor, index) => {
//     console.log(`El valor: ${valor} está en la posición: ${index}`);
// })

//? me sirve para hacer una nueva referencia
// const soloNumeros = lista.map((valor, index) => {
//     console.log(`El valor: ${valor} está en la posición: ${index}`);

//     if (typeof valor === 'number') // number | string
//         return valor

//     // return
// })

const isNumber = ({ valor, index }) => {
    return !isNaN(Number(valor))
}


const soloNumerosDeVerdad = lista.filter((valor, index) => isNumber({ valor, index }))

console.log(soloNumerosDeVerdad)