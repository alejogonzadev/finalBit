var carritoModel = {}


const mongoose = require('mongoose')
var Schema = mongoose.Schema

var carritoSchema = new Schema ({
    nombre: String,
    _idProducto: String,
    cantidad:Number,
    precio:Number,
    _idUsuario:String

})

const Mymodel = mongoose.model("carrito", carritoSchema)


carritoModel.Guardar = function (post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia._idProducto = post._idProducto
    instancia.precio = post.precio
    instancia.cantidad = post.cantidad
    instancia._idUsuario = post._idUsuario
    


    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Elemento Guardado"})
    }).catch ((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Se presentó un error al guardar el carrito"})
    })



}

carritoModel.Existecodigo = function(post, callback){

    Mymodel.findOne({_idProducto:post._idProducto, _idUsuario:post._idUsuario},{}).then((respuesta) => {
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

carritoModel.Listar = function (post,callback){

    Mymodel.find({_idUsuario:post._idUsuario},{})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

carritoModel.ListarId = function (post,callback){

    Mymodel.find({_id:post._id},{})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

carritoModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate ({_id: post._id,_idUsuario:post._idUsuario},
        {
            cantidad:post.cantidad
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

carritoModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete ({_id: post._id, _idUsuario: post._idUsuario})
        .then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento eliminado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al eliminar", error:error})
        })
}


module.exports.carritoModel = carritoModel