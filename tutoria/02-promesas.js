

// equivalente a "miPromesa"
fetch('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
        return response.json() // convierta la respuesta a JSON  
    }).then((data) => {
        console.log("Datos recibidos:", data) // muestra los datos recibidos
    }).catch((error) => {
        console.error("Error al obtener los datos:", error.message) // maneja el error
    })