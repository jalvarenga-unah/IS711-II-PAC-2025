
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


