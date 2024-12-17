//const { test, beforeEach } = require('test');
const request = require('supertest')
const mongoose = require('mongoose')
const config = require('../../config.js').config

var Mymodel = require('../modelos/usuariosModel.js').Mymodel

var dominio = 'http://localhost'
var puerto = '3000'

describe('Grupo de testing para Backend', () => {

    beforeAll(async () => {
        //antes de cada prueba

         await mongoose.connect("mongodb://127.0.0.1:27017/" + config.bd).then((respuesta) => {
            
            console.log("Conexión Correcta a Mongo")
        }).catch((error) => {
            console.log(error)
        }) 
    });

    // afterAll(async () => {
    //     //Borrar conexión

    //     /*awaitMymodel.findOneAndDelete({})*/

    // });

    it('Registrar un usuario sin mandar el nombre, debe fallar', (done) => {
        
        request(`${dominio}:${puerto}`)
        .post('/usuarios/Registro')
        .send({apellido:'Cardona', email:'dianac@gmail.com', password:'123456'})
        .then(response => {
            expect(response.body).toEqual({state:false, mensaje:"El campo nombre es obligatorio"})
            done()
        })
    })

    it('Registrar un usuario sin mandar el email, debe fallar', (done) => {
        
        request(`${dominio}:${puerto}`)
        .post('/usuarios/Registro')
        .send({nombre:'Diana', apellido:'Cardona', password:'123456'})
        .then(response => {
            expect(response.body).toEqual({state:false, mensaje:"El campo email es obligatorio"})
            done()
        })
    })

    it('Registrar un usuario sin mandar el apellido, debe fallar', (done) => {
        
        request(`${dominio}:${puerto}`)
        .post('/usuarios/Registro')
        .send({nombre:'Diana', email:'dianac@gmail.com', password:'123456'})
        .then(response => {
            expect(response.body).toEqual({state:false, mensaje:"El campo apellido es obligatorio"})
            done()
        })
    })

    it('Registrar un usuario sin mandar el password, debe fallar', (done) => {
        
        request(`${dominio}:${puerto}`)
        .post('/usuarios/Registro')
        .send({nombre:'Diana', apellido:'Cardona', email:'dianac@gmail.com'})
        .then(response => {
            expect(response.body).toEqual({state:false, mensaje:"El campo password es obligatorio"})
            done()
        })
    })

    it('Registrar un usuario con todos los datos corrertos, debe permitirlo', (done) => {
        
        request(`${dominio}:${puerto}`)
        .post('/usuarios/Registro')
        .send({nombre:'Diana', apellido:'Cardona', email:'dianac@gmail.com', password:'123456'})
        .then(response => {
            expect(response.body).toEqual({state:true, mensaje:"Usuario Guardado"})
            done()
        })
    })

    it('Registrar un usuario con todos los datos corrertos, pero el usuario ya existe', (done) => {
        
        request(`${dominio}:${puerto}`)
       .post('/usuarios/Registro')
       .send({nombre:'Alejandro', apellido:'Gonzalez', email:'alejogonza@gmail.com', password:'123456'})
       .then(response => {
           expect(response.body).toEqual({state:false, mensaje: "El email ya esta registrado"})
           done()
       })
   })

   it('Debe eliminar el usuario', (done) => {

    Mymodel.findOne({email:'dianac@gmail.com'}).then((respuesta) => {

        request(`${dominio}:${puerto}`)
        .post('/usuarios/Eliminar')
        .send({_id:respuesta._id})
        .then(response => {
            expect(response.body).toEqual({state:true, mensaje: "Elemento eliminado"})
            done()
        })      
    })
        
})

})