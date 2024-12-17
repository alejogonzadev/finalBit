
const express = require("express")
global.app = express()
const mongoose = require('mongoose')
const cors = require("cors")
global.config = require('./config.js').config

var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
global.SHA256 = require('sha256')
const session = require('express-session')
const cookieParser = require('cookie-parser')

global.path = require('path')
global.AppRoot = path.resolve(__dirname)


app.all('*',function(req, res, next){

    var whitelist = req.headers.origin;
    console.log(whitelist)
    res.header('Access-Control-Allow-Origin', whitelist);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS,HEAD');
    res.header('Access-Control-Allow-Headers', "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    res.header("Access-Control-Allow-Credentials", "true");

    next();

});


mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
    
    console.log("Conexión Correcta a Mongo")
}).catch((error) => {
    console.log(error)
})

app.use(cors({
    origin:function(origin, callback){
        console.log(origin)
        if(!origin) return callback(null, true)
            if(config.origins.indexOf(origin) === -1){
                return callback("Error de CORS: Sin permisos", false)
            }
            else {
                return callback(null, true)
            }            
    }
}))


app.use(cookieParser())

app.use(session({
    secret: config.sesiones.secret,
    resave:true,
    saveUninitialized:true,
    cookie:{
        maxAge:config.sesiones.expiracion, httpOnly:true
    },
    name:"CookieApp",
    rolling:true
}))

//Metodo de fuerza bruta

// var mipass = '100abc'
// console.log(SHA256(mipass))//97c156254778ee8d8627cedef5fd96edb581a2e57eaa04c97474036b07a1436e

// var abecedario = ['a', 'b', 'c']

// for (let n = 0; n < 200; n++) {
//     for (let a = 0; a < abecedario.length; a++){
//         for (let b = 0; b < abecedario.length; b++){
//             for (let c = 0; c < abecedario.length; c++){
//                 var salida = n+abecedario[a] + abecedario[b] + abecedario[c]

//                 if(SHA256(salida) == '97c156254778ee8d8627cedef5fd96edb581a2e57eaa04c97474036b07a1436e'){
//                     console.log(salida)
//                 }
//             }
//         }
//     }    
// }

require('./rutas.js')

app.use('/Productos', express.static(__dirname + '/Productos'))

app.use('/Avatar', express.static(__dirname + '/Avatar'))

app.use('/', express.static(__dirname + '/Pagina'))

app.listen(3000, function(){
    console.log("Servidor funcionando por el puerto 3000")
})

