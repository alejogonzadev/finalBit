var carritoModel  = require('../modelos/carritoModel.js').carritoModel

var carritoController = {}


carritoController.Guardar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        _idProducto: request.body._idProducto,
        cantidad: request.body.cantidad,
        precio: request.body.precio,
        _idUsuario: request.session._id
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post._idProducto == undefined || post._idProducto == null || post._idProducto == ""){
        response.json({state:false, mensaje:"El campo _idProducto es obligatorio"})
        return false
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }


    if (post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }



    //Guardar en el modelo
    carritoModel.Existecodigo(post,function(res){
        if (res.existe == 'Si'){
            response.json({state:false, mensaje: "El producto ya existe en el carrito de compras!"})
        }
        else {
            carritoModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })   

        }
    })

}

carritoController.Listar = function(request, response){

    var post = {
        _idUsuario: request.session._id
    }

    if (post._idUsuario == undefined || post._idUsuario == null || post._idUsuario == ""){
        response.json({state:false, mensaje:"El campo _idUsuario es obligatorio"})
        return false
    }


    carritoModel.Listar(post,function (respuesta){
        response.json(respuesta)
    })
}

carritoController.ListarId = function(request, response){

    var post = {
        _id:request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    carritoModel.ListarId(post,function (respuesta){
        response.json(respuesta)
    })
}

carritoController.Actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        _idUsuario: request.session._id,
        cantidad: request.body.cantidad
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    carritoModel.Actualizar(post, function(respuesta){
        response.json(respuesta)
    })
}

carritoController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
        _idUsuario: request.session._id

        
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    carritoModel.Eliminar(post, function(respuesta){
        response.json(respuesta)
    })
}


module.exports.carritoController = carritoController