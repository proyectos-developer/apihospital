const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    host: 'developer-ideas.com',
    secure: true,
    port: 465,
    auth: {
        user: 'admin@developer-ideas.com',
        pass: '206@Dev2702ideas732'
    },
    tls: {
        rejectUnauthorized: false
    }
}))

// point to the template folder
const handlebarOptions = {
    viewEngine: {
        extName: '.hbs',
        partialsDir: path.resolve (__dirname, 'template'),
        defaultLayout: false,
    },
    viewPath: path.resolve (__dirname, 'template'),
    extName: '.hbs'
};

transporter.use('compile', hbs(handlebarOptions))


router.post ('/api/cliente/', async (req, res) => {
    const {nombres, apellidos, correo, nro_telefono, usuario, tipo_documento, nro_documento, razon_social, nro_ruc} = req.body
    try {
        const newCliente = {nombres, apellidos, correo, nro_telefono, usuario, tipo_documento, nro_documento, razon_social, nro_ruc}
        const new_cliente = await pool.query (`INSERT INTO info_clientes set ?`, [newCliente])
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE id = ?', [new_cliente.insertId])

        return res.json ({
            cliente: cliente[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.get ('/api/cliente/:usuario', async (req, res) => {
    const {usuario} = req.params
    
    try {
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        console.log (cliente)
        return res.json ({
            cliente: cliente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/cliente/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {nombres, apellidos, tipo_documento, nro_documento, razon_social, nro_ruc} = req.body

    try {
        const updateCliente = {nombres, apellidos, tipo_documento, nro_documento, razon_social, nro_ruc}
        await pool.query ('UPDATE info_clientes set ? WHERE usuario = ?', [updateCliente, usuario])
        const cliente = await pool.query ('SELECT * FROM info_clientes WHERE usuario = ?', [usuario])
        return res.json ({
            cliente: cliente[0],
            success: true
        })

    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/suscripcion/cliente', async (req, res) => {
    const {correo} = req.body

    try {
        const suscripcion = await pool.query ('Select * from suscripcion where correo = ?', [correo])
        console.log (suscripcion)

        if (suscripcion.length > 0){
            return res.json ({
                message: '1',
                success: true
            })

        }else{
            const newSuscriptor = {correo}
            await pool.query('INSERT INTO suscripcion set ?', [newSuscriptor])
            
            
            var mailOptions = {
                from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
                to: correo, // list of receivers
                subject: 'Se a agregado a la lista de suscripción',
                template: 'suscripcion', // the name of the template file i.e email.handlebars
                context:{
                 // replace {{name}} with Adebola
            }
            }
    
        // trigger the sending of the E-mail
            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return res.json ({
                        message: 'error: ' + error,
                        success: false
                    })
                }
            
                return res.json ({
                    success: true,
                    message: info
                })
            }); 
        }   
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })      
    }
})

module.exports = router