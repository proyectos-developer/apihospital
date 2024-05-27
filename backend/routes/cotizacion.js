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

router.get ('/api/nrocotizaciones', async (req, res) => {
    try {
        const cotizaciones = await pool.query ('SELECT * FROM cotizacion')
        return res.json ({
            nro_cotizaciones: cotizaciones.length,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            nro_cotizaciones: 0,
            success: false
        })
    }
})

router.get ('/api/cotizacion/:id_cotizacion/:nro_cotizacion', async (req, res) => {
    const {id_cotizacion, nro_cotizacion} = req.params

    try {
        const cotizacion = await pool.query ('SELECT * FROM cotizacion WHERE id = ? AND nro_cotizacion = ?', [id_cotizacion, nro_cotizacion])
        return res.json ({
            cotizacion: cotizacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            cotizacion: {},
            success: false
        })    
    }
})

router.post ('/api/correo/cotizacion', async (req, res) => {
    const {nro_cotizacion, fecha, cotizacion_domhost, cotizacion_web, cotizacion_app, cotizacion_marketing, cotizacion_software, cotizacion_cloud,
           tipo_negocio, nombres, rubro, nro_ruc, nro_telefono, correo, nombre_contacto,
           tipo_dominio, tipo_hosting, informacion_domhost,
           tipo_web, pestania_nosotros, pestania_servicios, pestania_productos, pestania_fotos, pestania_videos, pestania_contacto, pestania_cotizacion,
           pestania_tienda, pestania_carrito, pestania_pago, pestania_seguimiento, pestania_registro, pestania_login, pestania_perfil, pestania_favoritos,
           pestania_compras, pestania_administracion, informacion_web,
           tipo_aplicacion, pantalla_login, pantalla_registro, pantalla_presentacion, pantalla_perfil, pantalla_productos, pantalla_carrito,
           pantalla_pago, pantalla_ubicacion, pantalla_localizacion, pantalla_categorias, pantalla_comentarios, pantalla_galeria, pantalla_chat,
           pantalla_estadisticas, pantalla_anuncios, pantalla_informativa, pantalla_calendario, pantalla_agenda, pantalla_favoritos, pantalla_otro,
           informacion_aplicacion,
           tipo_marketing, informacion_marketing,
           tipo_software, informacion_software,
           tipo_cloud, informacion_cloud} = req.body

    try {
        const nuevaCotizacion = {nro_cotizacion, fecha, cotizacion_domhost, cotizacion_web, cotizacion_app, cotizacion_marketing, cotizacion_software, cotizacion_cloud,
                tipo_negocio, nombres, rubro, nro_ruc, nro_telefono, correo, nombre_contacto,
                tipo_dominio, tipo_hosting, informacion_domhost,
                tipo_web, pestania_nosotros, pestania_servicios, pestania_productos, pestania_fotos, pestania_videos, pestania_contacto, pestania_cotizacion,
                pestania_tienda, pestania_carrito, pestania_pago, pestania_seguimiento, pestania_registro, pestania_login, pestania_perfil, pestania_favoritos,
                pestania_compras, pestania_administracion, informacion_web,
                tipo_aplicacion, pantalla_login, pantalla_registro, pantalla_presentacion, pantalla_perfil, pantalla_productos, pantalla_carrito,
                pantalla_pago, pantalla_ubicacion, pantalla_localizacion, pantalla_categorias, pantalla_comentarios, pantalla_galeria, pantalla_chat,
                pantalla_estadisticas, pantalla_anuncios, pantalla_informativa, pantalla_calendario, pantalla_agenda, pantalla_favoritos, pantalla_otro,
                informacion_aplicacion,
                tipo_marketing, informacion_marketing,
                tipo_software, informacion_software,
                tipo_cloud, informacion_cloud}
        const newcotizacion = await pool.query ('INSERT INTO cotizacion set ?', [nuevaCotizacion])
        const cotizacion = await pool.query ('SELECT * FROM cotizacion WHERE id = ?', newcotizacion.insertId)

        var mailOptions = {
            from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
            to: correo, // list of receivers
            subject: 'Se envío su cotizacion (Soluciones Tecnológicas)',
            template: 'cotizacioncliente', // the name of the template file i.e email.handlebars
            context:{
                id_cotizacion: newcotizacion.insertId,
                nro_cotizacion: nro_cotizacion
             // replace {{name}} with Adebola
            }
        }

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.json ({
                    message: 'error: ' + error,
                    success: false
                })
            }

            var mailOptions = {
                from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
                to: "proyectos@developer-ideas.com", // list of receivers
                subject: 'Has recibido un nuevo pedido de cotizacion (Soluciones Tecnológicas)',
                template: 'cotizacionadmin', // the name of the template file i.e email.handlebars
                context:{
                    id_cotizacion: newcotizacion.insertId,
                    nro_cotizacion: nro_cotizacion
                }
            }

            transporter.sendMail(mailOptions, function(error, info){
                if(error){
                    return res.json ({
                        cotizacion: {},
                        message: 'error: ' + error,
                        success: false
                    })
                }
            
                return res.json ({
                    cotizacion: cotizacion[0],
                    success: true,
                    message: info
                })
            }); 
        }); 
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            cotizacion: {},
            success: false
        })
    }
})

module.exports = router