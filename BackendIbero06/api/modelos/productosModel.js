var productosModel = {}


const mongoose = require('mongoose')
var Schema = mongoose.Schema

var productosSchema = new Schema ({
    nombre: String,
    codigo: String,
    precio: Number,
    descripcion:String,
    imagen:String,
    estado:String,
    cantidad:Number

})

const Mymodel = mongoose.model("productos", productosSchema)


productosModel.Guardar = function (post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo
    instancia.precio = parseInt(post.precio)
    instancia.descripcion = post.descripcion
    instancia.estado = post.estado
    instancia.cantidad = post.cantidad
    
    if(post.imagen == undefined || post.imagen == null || post.imagen ==""){
        instancia.imagen = "/assets/imgs/noimage.jpg"
    }
    else{
        instancia.imagen = post.imagen
    }

    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Elemento Guardado"})
    }).catch ((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Se presentó un error al guardar el elemento"})
    })



}

productosModel.Existecodigo = function(post, callback){

    Mymodel.findOne({codigo:post.codigo},{}).then((respuesta) => {
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

productosModel.Listar = function (post,callback){

    Mymodel.find({},{})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

productosModel.ListarProductosActivos = function (post,callback){

    Mymodel.find({estado:"1"},{})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

productosModel.ListarId = function (post,callback){

    Mymodel.find({_id:post._id},{})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

productosModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate ({_id: post._id},
        {
            nombre:post.nombre,
            precio:post.precio,
            descripcion:post.descripcion,
            imagen:post.imagen,
            estado:post.estado,
            cantidad: post.cantidad

            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

productosModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete ({_id: post._id})
        .then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento eliminado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al eliminar", error:error})
        })
}


module.exports.productosModel = productosModel