var serviciosModel  = require('../modelos/serviciosModel.js').serviciosModel

var serviciosController = {}


serviciosController.Guardar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }


    //Guardar en el modelo
    serviciosModel.Existecodigo(post,function(res){
        if (res.existe == 'Si'){
            response.json({state:false, mensaje: "El codigo ya esta registrado"})
        }
        else {
            serviciosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })   

        }
    })

}

serviciosController.Listar = function(request, response){
    serviciosModel.Listar(null,function (respuesta){
        response.json(respuesta)
    })
}

serviciosController.ListarId = function(request, response){

    var post = {
        _id:request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    serviciosModel.ListarId(post,function (respuesta){
        response.json(respuesta)
    })
}

serviciosController.Actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    serviciosModel.Actualizar(post, function(respuesta){
        response.json(respuesta)
    })
}

serviciosController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
        
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    serviciosModel.Eliminar(post, function(respuesta){
        response.json(respuesta)
    })
}


module.exports.serviciosController = serviciosController