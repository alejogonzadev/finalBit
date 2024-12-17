
var SoloAdmin = function(request, response, next){

    if(request.session.rol == "1"){
        next()
    }
    else{
        response.json({state:false, mensaje: "Esta API es de uso exclusivo del administrador"})
    }
        
}


var usuariosController = require('./api/controladores/usuariosController.js').usuariosController

app.post('/usuarios/Registro', function(request,response){
    usuariosController.Registro(request,response)
})

app.post('/usuarios/Guardar', SoloAdmin, function(request,response){
    usuariosController.Guardar(request,response)
})

app.post('/usuarios/Listar', SoloAdmin, function(request,response){
    usuariosController.Listar(request,response)
})

app.post('/usuarios/ListarId', SoloAdmin, function(request,response){
    usuariosController.ListarId(request,response)
})

app.post('/usuarios/Actualizar', SoloAdmin, function(request,response){
    usuariosController.Actualizar(request,response)
})

app.post('/usuarios/Eliminar', function(request,response){
    usuariosController.Eliminar(request,response)
})

app.post('/usuarios/Login', function(request,response){
    usuariosController.Login(request,response)
})

app.post('/activar', function(request,response){
    usuariosController.activar(request,response)
})

app.post('/usuarios/FiltroNombre', function(request,response){
    usuariosController.FiltroNombre(request,response)
})

app.post('/usuarios/solicitarcodigo', function(request,response){
    usuariosController.solicitarcodigo(request,response)
})

app.post('/usuarios/recuperarpass', function(request,response){
    usuariosController.recuperarpass(request,response)
})

app.post('/status', function(request,response){
    response.json(request.session)
})

app.post('/logout', function(request,response){
    request.session.destroy()
    response.json({state:true, mensaje: "Se ha cerrado su sesión correctamente"})
})





// Segunda Tabla Maestra

var productosController = require('./api/controladores/productosController.js').productosController

app.post('/productos/Registro', function(request,response){
    productosController.Registro(request,response)
})

app.post('/productos/Guardar', function(request,response){
    productosController.Guardar(request,response)
})

app.post('/productos/Listar', function(request,response){
    productosController.Listar(request,response)
})

app.post('/productos/ListarProductosActivos', function(request,response){
    productosController.ListarProductosActivos(request,response)
})

app.post('/productos/ListarId', function(request,response){
    productosController.ListarId(request,response)
})

app.post('/productos/Actualizar', function(request,response){
    productosController.Actualizar(request,response)
})

app.post('/productos/Eliminar', function(request,response){
    productosController.Eliminar(request,response)
})


// Tercera tabla maestra

var serviciosController = require('./api/controladores/serviciosController.js').serviciosController

app.post('/servicios/Registro', function(request,response){
    serviciosController.Registro(request,response)
})

app.post('/servicios/Guardar', function(request,response){
    serviciosController.Guardar(request,response)
})

app.post('/servicios/Listar', function(request,response){
    serviciosController.Listar(request,response)
})

app.post('/servicios/ListarId', function(request,response){
    serviciosController.ListarId(request,response)
})

app.post('/servicios/Actualizar', function(request,response){
    serviciosController.Actualizar(request,response)
})

app.post('/servicios/Eliminar', function(request,response){
    serviciosController.Eliminar(request,response)
})

app.post('/servicios/Login', function(request,response){
    serviciosController.Login(request,response)
})

app.post('/servicios/FiltroNombre', function(request,response){
    serviciosController.FiltroNombre(request,response)
})

//Archivos

var archivosController = require('./api/controladores/archivosController.js').archivosController

app.post('/subirProductos/:nombre', function(request,response){
    archivosController.subirProductos(request,response)
})

app.post('/subirAvatar/:nombre', function(request,response){
    archivosController.subirAvatar(request,response)
})


//Carrito de Compra

var carritoController = require('./api/controladores/carritoController.js').carritoController



app.post('/carrito/Guardar', function(request,response){
    carritoController.Guardar(request,response)
})

app.post('/carrito/Listar', function(request,response){
    carritoController.Listar(request,response)
})

app.post('/carrito/ListarId', function(request,response){
    carritoController.ListarId(request,response)
})

app.post('/carrito/Actualizar', function(request,response){
    carritoController.Actualizar(request,response)
})

app.post('/carrito/Eliminar', function(request,response){
    carritoController.Eliminar(request,response)
})


