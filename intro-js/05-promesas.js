

// que retorne o resueva una Promesa
const miPromesa = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const random = Math.random() // 0 y 1
            if (random < 0.5) {
                // si es menor que 0.5, se resuelve la promesa
                resolve('Hola mundo')
            } else {
                // si es mayor o igual que 0.5, se rechaza la promesa
                reject('Adios mundo')
            }
        }, 2000)

    })

}

// asincrono
// console.log("Inicio de la promesa")
// miPromesa().then((respuesta) => {
//     console.log("La promesa se ha resuelto")
//     console.log(respuesta)
// }).catch((error) => {
//     console.log("La promesa ha fallado")
//     console.log(error)
// }).finally(() => {
//     console.log("Esto se ejecuta siempre al final de la promesa")
// })
// console.log("Fin de la promesa")

// sincrono 
//(async () => {

//  })()


// async function ejecutarPromesa() { }

//sincrona 
const ejecutarPromesa = async () => {

    console.log("Inicio de la promesa")
    try {
        const resultado = await miPromesa()

        // ? se puede capturar el errot directo, para no usar try/catch
        // ? y retornar un valor por defecto (que se debe evaular siempre)
        //     .catch(() => {
        //     console.log("La promesa ha fallado")
        //     console.log("Error capturado en el catch")
        //     return "Valor por defecto"
        // })
        console.log("La promesa se ha resuelto")
        console.log(resultado)
    } catch (error) {
        console.log("La promesa ha fallado")
        console.log(error)
    }
    console.log('fin de la promesa')
}

ejecutarPromesa()