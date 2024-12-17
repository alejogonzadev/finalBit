var config = {
    email:{},
    sesiones:{},
    modo:'produccion'   //produccion, test
}

config.email.host = "smtp.gmail.com"
config.email.port = 587
config.email.user = "nazarioconcesionario@gmail.com"
config.email.pass = "lxqjlceqyzqvmhke"


config.sesiones.secret = "guachurname"
config.sesiones.expiracion = 60000*5


if (config.modo == 'produccion'){
    config.bd = "FinalIbero06"
}
else{
    config.bd = "Prueba"
}
config.palabraclave = "nñasbndaubvjasbdluaibf165165135351"
config.origins = [
    "http://localhost:4200",
    "http://localhost:9876"
]
    

module.exports.config = config