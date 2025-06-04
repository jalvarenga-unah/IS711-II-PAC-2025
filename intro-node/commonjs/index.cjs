// npm -> node package manager

//  pasos: 
//  1 npm init (contestar todo)
//  2:npm install

const os = require('node:os')
const fs = require('node:fs')
const fsp = require('node:fs/promises')


console.log(os.version())
console.log(os.freemem() / 1024 / 1024)
console.log(os.totalmem() / 1024 / 1024)
console.log(os.uptime() / 60 / 60 / 24)

//leer un archivo de texto
const resultado = fs.readFileSync('./texto1.txt', 'utf-8')
console.log(resultado)

//async / await
fsp.readFile('./texto1.txt', 'utf-8').then((r) => {
    console.log('lectura de archivo de forma asincrona con promesas')
    console.log(r)
})



