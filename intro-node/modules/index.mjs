// npm -> node package manager

//  pasos: 
//  1 npm init (contestar todo)
//  2:npm install

import { version, freemem, totalmem, uptime } from 'node:os'
import { readFileSync } from 'node:fs'
import { readFile } from 'node:fs/promises'


console.log(version())
console.log(freemem() / 1024 / 1024)
console.log(totalmem() / 1024 / 1024)
console.log(uptime() / 60 / 60 / 24)

//leer un archivo de texto
const resultado = readFileSync('./texto1.txt', 'utf-8')
console.log(resultado)

//async / await
readFile('./texto1.txt', 'utf-8').then((r) => {
    console.log('lectura de archivo de forma asincrona con promesas')
    console.log(r)
})



