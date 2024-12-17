var productosModel  = require('../modelos/productosModel.js').productosModel

var productosController = {}


productosController.Guardar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        codigo: request.body.codigo,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen,
        estado: request.body.estado,
        cantidad:request.body.cantidad
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    if (post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }


    //Guardar en el modelo
    productosModel.Existecodigo(post,function(res){
        if (res.existe == 'Si'){
            response.json({state:false, mensaje: "El codigo ya esta registrado"})
        }
        else {
            productosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })   

        }
    })

}

productosController.Listar = function(request, response){
    productosModel.Listar(null,function (respuesta){
        response.json(respuesta)
    })
}

productosController.ListarProductosActivos = function(request, response){
    productosModel.ListarProductosActivos(null,function (respuesta){
        response.json(respuesta)
    })
}

productosController.ListarId = function(request, response){

    var post = {
        _id:request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productosModel.ListarId(post,function (respuesta){
        response.json(respuesta)
    })
}

productosController.Actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        precio: request.body.precio,
        descripcion: request.body.descripcion,
        imagen: request.body.imagen,
        estado: request.body.estado,
        cantidad:request.body.cantidad
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    if (post.precio == undefined || post.precio == null || post.precio == ""){
        response.json({state:false, mensaje:"El campo precio es obligatorio"})
        return false
    }

    if (post.descripcion == undefined || post.descripcion == null || post.descripcion == ""){
        response.json({state:false, mensaje:"El campo descripcion es obligatorio"})
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    if (post.cantidad == undefined || post.cantidad == null || post.cantidad == ""){
        response.json({state:false, mensaje:"El campo cantidad es obligatorio"})
        return false
    }

    productosModel.Actualizar(post, function(respuesta){
        response.json(respuesta)
    })
}

productosController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
        
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    productosModel.Eliminar(post, function(respuesta){
        response.json(respuesta)
    })
}


module.exports.productosController = productosController