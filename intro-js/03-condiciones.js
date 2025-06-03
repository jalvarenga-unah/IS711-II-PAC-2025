

// &&
// || 
// !

const a = 5; // int
const b = 5; // string

//? == compara los valores sin tener en cuenta el tipo
//? === compara los valores y el tipo de dato

if (a === b) {
    console.log('a es igual a b');
} else {
    console.log('Negativo!');
}

if (0 === !true) {
    console.log('se cumple');
}
else {
    console.log('no se cumple');
}
// truthy: 1, "hola", true
// falsy: "", false, 0
// nulish: null, undefined