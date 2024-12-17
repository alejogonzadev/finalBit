var serviciosModel = {}


const mongoose = require('mongoose')
var Schema = mongoose.Schema

var serviciosSchema = new Schema ({
    nombre: String,
    codigo: String,

})

const Mymodel = mongoose.model("servicios", serviciosSchema)


serviciosModel.Guardar = function (post,callback){

    const instancia = new Mymodel
    instancia.nombre = post.nombre
    instancia.codigo = post.codigo


    instancia.save().then((respuesta) => {
        console.log(respuesta)
        return callback({state:true, mensaje:"Elemento Guardado"})
    }).catch ((error) => {
        console.log(error)
        return callback({state:false, mensaje:"Se presentó un error al guardar el elemento"})
    })



}

serviciosModel.Existecodigo = function(post, callback){

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

serviciosModel.Listar = function (post,callback){

    Mymodel.find({},{password:0})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

serviciosModel.ListarId = function (post,callback){

    Mymodel.find({_id:post._id},{password:0})
    .then((respuesta) => {
        return callback ({state:true, datos:respuesta})
    })
    .catch((error) => {
        return callback ({state:false, datos:[], error:error, mensaje: "Se presentó un error al listar"})
    })     
}

serviciosModel.Actualizar = function (post, callback) {
    Mymodel.findOneAndUpdate ({_id: post._id},
        {
            nombre:post.nombre
            
        }).then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento actualizado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al actualizar", error:error})
        })
}

serviciosModel.Eliminar = function (post, callback) {
    Mymodel.findOneAndDelete ({_id: post._id})
        .then((respuesta) => {
            console.log(respuesta)
            return callback({state:true, mensaje:"Elemento eliminado"})
        }).catch((error) => {
            return callback({state:false, mensaje:"Error al eliminar", error:error})
        })
}


module.exports.serviciosModel = serviciosModel