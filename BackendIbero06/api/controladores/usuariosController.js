var usuariosModel  = require('../modelos/usuariosModel.js').usuariosModel
var nodemailer = require('nodemailer')

function tiempoTranscurridoEnMinutos (fechaTexto) {
    //Convertir la fecha en texto a un objeto Date
    const fechaComparar = new Date(fechaTexto);

    //Obtener la fecha actual
    const fechaActual = new Date();

    //Calcular la diferencia en milisegundos
    const diferenciaMilisegundos = fechaActual - fechaComparar;

    //Convertir la diferencia a minutos (1 minuto = 60000 milisegundos)
    const diferenciaMinutos = Math.floor(diferenciaMilisegundos / 60000);

    return diferenciaMinutos;
}

var usuariosController = {}

usuariosController.Registro = function(request, response){

    var post = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        email: request.body.email,
        password: request.body.password
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.apellido == undefined || post.apellido == null || post.apellido == ""){
        response.json({state:false, mensaje:"El campo apellido es obligatorio"})
        return false
    }

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if (post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.palabraclave)

    //Guardar en el modelo
    usuariosModel.Existeemail(post,function(res){
        if (res.existe == 'Si'){
            response.json({state:false, mensaje: "El email ya esta registrado"})
            return false
        }
        else {

            var azar = 'G-' + Math.floor(Math.random() * (9999-1000) + 1000);
            post.azar = azar

            usuariosModel.Registrar(post,function(respuesta){

                //Crear el transportador
                const transporter = nodemailer.createTransport({
                    host:config.email.host,
                    port:config.email.port,
                    secure:false,
                    requireTLS:true,
                    auth:{
                        user:config.email.user,
                        pass:config.email.pass
                    }
                })




                var mailOptions = {
                    from: config.email.user,
                    to: post.email,
                    subject: "Verifica tu cuenta con el código: " + azar,
                    html:`<div style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">

                            <table width="100%" style="margin: 20px 0; padding: 0;">
                                <tr>
                                    <td align="center">
                                        <table width="600" style="background-color: #ffffff; border: 1px solid #dddddd; border-radius: 5px; overflow: hidden;">
                                            <tr>
                                                <td style="padding: 20px 0; text-align: center; background-color: #723f14; color: white;">
                                                    <h1 style="margin: 0; font-size: 24px;">Activación de Cuenta</h1>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 20px; text-align: center;">
                                                    <p style="font-size: 16px; color: #333333;">Hola,</p>
                                                    <p style="font-size: 16px; color: #333333;">Gracias por registrarte. Haz clic en el siguiente botón para activar tu cuenta en Nazario:</p>
                                                    <a href="http://localhost:4200/activar/${post.email}/${azar}" style="display: inline-block; background-color: #723f14; color: white; padding: 10px 20px; text-decoration: none; font-size: 16px; border-radius: 5px; margin: 20px 0;">Activar Cuenta</a>
                                                    
                                                    <p style="font-size: 16px; color: #333333;">O utiliza el siguiente código de activación:</p>
                                                    <p style="font-size: 18px; font-weight: bold; color: #723f14; background-color: #f9f9f9; padding: 10px; border-radius: 5px; display: inline-block;">${azar}</p>
                                                    
                                                    <p style="font-size: 14px; color: #333333; margin-top: 20px;">Si prefieres, también puedes copiar y pegar el siguiente enlace en tu navegador:</p>
                                                    <p style="font-size: 14px; color: #723f14; background-color: #f9f9f9; padding: 10px; border-radius: 5px; word-break: break-all;">
                                                        http://localhost:4200/activar/${post.email}/${azar}
                                                    </p>
                                                    
                                                    <p style="font-size: 14px; color: #666666;">Si no has solicitado esta cuenta, ignora este correo.</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td style="padding: 10px; background-color: #f4f4f4; text-align: center; font-size: 12px; color: #666666;">
                                                    &copy; 2024 Nazario Vehiculos. Todos los derechos reservados.
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>

                        </div>`
                }

                transporter.sendMail(mailOptions,(error, info) => {
                    if (error){
                        console.log(error)
                    }
                    else{
                        console.log(info)
                    }
                })



                response.json(respuesta)
            })   

        }
    })

}

usuariosController.Guardar = function(request, response){

    var post = {
        nombre: request.body.nombre,
        apellido:request.body.apellido,
        email: request.body.email,
        password: request.body.password,
        estado: request.body.estado,
        rol: request.body.rol
    }
    
    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.apellido == undefined || post.apellido == null || post.apellido == ""){
        response.json({state:false, mensaje:"El campo apellido es obligatorio"})
        return false
    }

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    if (post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    if (post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    

    //Guardar en el modelo
    usuariosModel.Existeemail(post,function(res){
        if (res.existe == 'Si'){
            response.json({state:false, mensaje: "El email ya esta registrado"})
        }
        else {
            usuariosModel.Guardar(post,function(respuesta){
                response.json(respuesta)
            })   

        }
    })

}

usuariosController.Listar = function(request, response){
    usuariosModel.Listar(null,function (respuesta){
        response.json(respuesta)
    })
}

usuariosController.ListarId = function(request, response){

    var post = {
        _id:request.body._id
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    usuariosModel.ListarId(post,function (respuesta){
        response.json(respuesta)
    })
}

usuariosController.Actualizar = function(request, response){
    var post = {
        _id: request.body._id,
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        rol: request.body.rol,
        estado: request.body.estado
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    if (post.rol == undefined || post.rol == null || post.rol == ""){
        response.json({state:false, mensaje:"El campo rol es obligatorio"})
        return false
    }

    if (post.estado == undefined || post.estado == null || post.estado == ""){
        response.json({state:false, mensaje:"El campo estado es obligatorio"})
        return false
    }

    if (post.apellido == undefined || post.apellido == null || post.apellido == ""){
        response.json({state:false, mensaje:"El campo apellido es obligatorio"})
        return false
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    usuariosModel.Actualizar(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.Eliminar = function(request, response){
    var post = {
        _id: request.body._id,
        
    }

    if (post._id == undefined || post._id == null || post._id == ""){
        response.json({state:false, mensaje:"El campo _id es obligatorio"})
        return false
    }

    usuariosModel.Eliminar(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.Login = function(request, response){

    var post = {
        email: request.body.email,
        password: request.body.password
    } 

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if (post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.palabraclave)

    usuariosModel.ValidaLogin(post,function(validacion){
        var tiempo =(tiempoTranscurridoEnMinutos(validacion.fechalogin))
    

        if(validacion.errorlogin < 3){
            usuariosModel.Login (post, function(respuesta){
                if (respuesta.state == false){
                    post.cantidad = validacion.errorlogin +1
                    usuariosModel.ActualizarErrores(post, function(act){
                        response.json(respuesta)
                    }) 
                }
                else{

                    usuariosModel.ActualizarFechaLogin(post, function(actfecha){

                    })

                    request.session.nombre = respuesta.data[0].nombre
                    request.session._id = respuesta.data[0]._id
                    request.session.ultimologin = respuesta.data[0].ultlogin
                    request.session.rol = respuesta.data[0].rol
                    response.json({state:true, mensaje:"Bienvenido: " + respuesta.data[0].nombre})
                }

            })
        }
        else{
            if(tiempo < 2){
                response.json({state:false, mensaje:"Debe esperar al menos 2 minutos. Han transcurrido: " + tiempo})
            }
            else{
                usuariosModel.Login (post, function(respuesta){
                    post.cantidad = 0
                    usuariosModel.ActualizarErrores(post, function(act){
                        response.json(respuesta)
                    })                   
                })
            }
        }
    })
}

usuariosController.FiltroNombre = function(request,response){
    var post = {
        nombre: request.body.nombre
    }

    if (post.nombre == undefined || post.nombre == null || post.nombre == ""){
        response.json({state:false, mensaje:"El campo nombre es obligatorio"})
        return false
    }

    usuariosModel.Filtro(post, function(midata){
        response.json(midata)
    })
}

usuariosController.activar = function(request, response){
    var post = {
        
        email: request.body.email,
        azar: request.body.azar
    }

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if (post.azar == undefined || post.azar == null || post.azar == ""){
        response.json({state:false, mensaje:"El campo azar es obligatorio"})
        return false
    }

    usuariosModel.Activar(post, function(respuesta){
        response.json(respuesta)
    })
}

usuariosController.solicitarcodigo = function(request, response){

    var post = {

        email: request.body.email,
        
    }

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }


    //Guardar en el modelo
    usuariosModel.Existeemail(post,function(res){
        if (res.existe == 'No'){
            response.json({state:false, mensaje: "El email no se encuentra registrado"})
            return false
        }
        else {

            var codigo = 'PASS-' + Math.floor(Math.random() * (9999-1000) + 1000);
            post.codigo = codigo

            usuariosModel.GuardarCodigoRecuperacion(post,function(respuesta){

                //Crear el transportador
                const transporter = nodemailer.createTransport({
                    host:config.email.host,
                    port:config.email.port,
                    secure:false,
                    requireTLS:true,
                    auth:{
                        user:config.email.user,
                        pass:config.email.pass
                    }
                })




                var mailOptions = {
                    from: config.email.user,
                    to: post.email,
                    subject: "Recupera tu contraseña con el código: " + codigo,
                    html:`<div style="font-family: Arial, sans-serif; background-color: white; padding: 20px;">
    <div style="max-width: 600px; margin: 0 auto; background-color: black; padding: 20px; border-radius: 10px; box-shadow: 0 2px 5px rgba(255, 255, 255, 0.1);">
        <h2 style="color: #723f14; text-align: center;">Recuperación de contraseña</h2>
        <p style="color: white; font-size: 16px; line-height: 1.6;">
            Hola, 
        </p>
        <p style="color: white; font-size: 16px; line-height: 1.6;">
            Has solicitado restablecer tu contraseña. Para continuar con el proceso, usa el siguiente código de recuperación:
        </p>
        <p style="text-align: center;">
            <span style="display: inline-block; background-color: #723f14; border: 1px solid #ddd; padding: 10px 20px; font-size: 18px; font-weight: bold; color: white; letter-spacing: 2px;">
                ${codigo}
            </span>
        </p>
        <p style="color: white; font-size: 16px; line-height: 1.6;">
            Si no solicitaste este cambio, por favor ignora este correo. Tu contraseña no se modificará hasta que uses este código en nuestra página web.
        </p>
        <p style="color: white; font-size: 16px; line-height: 1.6;">
            Gracias,<br>
            El equipo de Soporte Nazario Vehiculos
        </p>
        <hr style="border: 0; border-top: 1px solid white; margin: 20px 0;">
        <p style="color: #cccccc; font-size: 12px; text-align: center;">
            Este correo fue enviado de forma automática. Por favor, no respondas a este mensaje.
        </p>
    </div>
</div>`
                }

                transporter.sendMail(mailOptions,(error, info) => {
                    if (error){
                        console.log(error)
                    }
                    else{
                        console.log(info)
                    }
                })



                response.json(respuesta)
            })   

        }
    })

}

usuariosController.recuperarpass = function(request, response){

    var post = {

        email: request.body.email,
        codigo: request.body.codigo,
        password: request.body.password

    }


    if (post.codigo == undefined || post.codigo == null || post.codigo == ""){
        response.json({state:false, mensaje:"El campo codigo es obligatorio"})
        return false
    }

    if (post.email == undefined || post.email == null || post.email == ""){
        response.json({state:false, mensaje:"El campo email es obligatorio"})
        return false
    }

    if (post.password == undefined || post.password == null || post.password == ""){
        response.json({state:false, mensaje:"El campo password es obligatorio"})
        return false
    }

    post.password = SHA256(post.password + config.palabraclave)

    usuariosModel.recuperarpass(post, function(respuesta){
        if(respuesta.state == true){
            response.json({state:true, mensaje:"Se ha cambiado correctamente tu contraseña"})
        }
        else{
            response.json({state:false, mensaje:"Se presentó un error al cambiar el password"})
        }
    })

}




module.exports.usuariosController = usuariosController