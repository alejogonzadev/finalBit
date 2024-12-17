var usuariosModel = {}
var bdusuarios = []

const mongoose = require('mongoose')
var Schema = mongoose.Schema

var usuariosSchema = new Schema ({
    nombre: String,
    apellido: String,
    email: String,
    password: String,
    errorlogin: Number,
    fechalogin:Date,
    azar:String,
    estado:String,
    codepass:String,
    ultlogin:Date,
    rol:String
})

const Mymodel = mongoose.model("usuarios", usuariosSchema)


usuariosModel.ActualizarErrores = function (post, callback) {
    Mymodel.findOneAndUpdate ({email: post.email},
        {
            errorlogin:post.cantidad,
            fechalogin: new Date()
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}


usuariosModel.Guardar = function (post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.email = post.email
    instancia.password = post.password
    instancia.fechalogin = new Date()
    instancia.errorlogin = 0;
    instancia.estado = "1"
    instancia.rol = post.rol  // 1 para admin, 2 para vendedor, 3 para cliente

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Guardado"})
    }).catch ((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Se presentó un error al guardar el usuario"})
    })


    // bdusuarios.push(post)
    // return callback ({state:true, mensaje:"Usuario Guardado"})

}

usuariosModel.Registrar = function (post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.apellido = post.apellido
    instancia.email = post.email
    instancia.password = post.password
    instancia.fechalogin = new Date()
    instancia.errorlogin = 0;
    instancia.estado = "0"
    instancia.azar = post.azar
    instancia.rol = "3"
    

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Usuario Guardado"})
    }).catch ((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Se presentó un error al guardar el usuario"})
    })


    // bdusuarios.push(post)
    // return callback ({state:true, mensaje:"Usuario Guardado"})

}

usuariosModel.ValidaLogin = function(post,callback) {
    Mymodel.findOne({email:post.email},{fechalogin:1, errorlogin:1}).then((respuesta)=>{
        return callback(respuesta)
    }).catch((error) =>{
        return callback(error)
    })
}

usuariosModel.Existeemail = function(post, callback){

    Mymodel.findOne({email:post.email},{}).then((respuesta) => {
        if(respuesta == null){
            return callback ({existe:'No'})
        }
        else {
            if (respuesta.length == 0){
                return callback ({existe:'No'})
            }
            else{
                return callback({existe: 'Si'})
            }
            
        }
    })

}

usuariosModel.Login = function (post,callback){
    Mymodel.find({email:post.email,password:post.password, estado:"1"},{})
    .then((respuesta) => {
        if(respuesta.length == 1){
            return callback ({state:true, mensaje:"Bienvenido: " + respuesta[0].nombre, data:respuesta})
        }
        else{
            return callback ({state:false, mensaje:"Credenciales Invalidas o cuenta inactiva"})
        }        
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al ingresar"})
    })     
    
}

usuariosModel.Filtro = function(post, callback){
    var datos =bdusuarios.filter((item) => item.nombre = post.nombre)
    return callback({state:true, datos:datos})
}

usuariosModel.Listar = function (post,callback){

    Mymodel.find({},{password:0})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

usuariosModel.ListarId = function (post,callback){

    Mymodel.find({_id:post._id},{password:0})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

usuariosModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate ({_id: post._id},
        {
            nombre:post.nombre,
            apellido:post.apellido,
            rol:post.rol,
            estado:post.estado
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

usuariosModel.ActualizarFechaLogin = function (post, callback) {
    Mymodel.findOneAndUpdate ({email: post.email, password: post.password},
        {
            ultlogin: new Date()
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

usuariosModel.Activar = function (post, callback) {
    Mymodel.findOneAndUpdate ({email: post.email, azar:post.azar},
        {
            estado:"1"
            
            
        }).then((respuesta) => {
            console.log(respuesta)
            if(respuesta == null){
                return callback({state:false, mensaje:"El email y código no son correctos para activar la cuenta"})
            }
            else{
                return callback({state:true, mensaje:"Cuenta activada exitosamente!"})
            }
            //return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            //return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

usuariosModel.GuardarCodigoRecuperacion = function(post, callback){
    Mymodel.findOneAndUpdate ({email: post.email},
        {
            codepass:post.codigo
            
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Te hemos enviado un correo electrónico con el código"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al generar código", error:error})
        })
}

usuariosModel.recuperarpass = function(post, callback){
    Mymodel.findOneAndUpdate ({email: post.email, codepass:post.codigo},
        {
            password:post.password
            
            
        }).then((respuesta) => {
            console.log(respuesta)
            if(respuesta==null){
                return callback({state:false})
            }
            else{
                return callback({state:true})
            }
            
        }).catch((error) => {
            return callback({state:false})
        })
}

usuariosModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete ({_id: post._id})
        .then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento eliminado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al eliminar", error:error})
        })
}


module.exports = {
    usuariosModel:usuariosModel,
    Mymodel:Mymodel
}