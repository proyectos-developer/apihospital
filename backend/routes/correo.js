const express = require('express')
const router = express.Router()

const hbs = require('nodemailer-express-handlebars')
const path = require('path')

const pool = require('../database')

const nodemailer = require('nodemailer')
const SMTPTransport = require('nodemailer/lib/smtp-transport')

var transporter = nodemailer.createTransport( new SMTPTransport ({
    service: "hotmail", // hostname
    secure: false, // use SSL
    port: 587, // port for secure SMTP
    auth: {
        user: 'jp.portocarrero.jp@hotmail.com',
        pass: 'J4027@4060r'
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

router.post('/api/correo/nuevo/password', async (req, res) => {
    const { correo } = req.body

    const usuarios = await pool.query ('SELECT * FROM clientes JOIN info_clientes ON clientes.usuario = info_clientes.usuario WHERE clientes.correo = ?', [correo])
    if (usuarios.length === 1){
        var mailOptions = {
            from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
            to: correo, // list of receivers
            subject: 'Olvide mi contraseña Developer Ideas',
            template: 'olvidepassword', // the name of the template file i.e email.handlebars
            context:{
                usuario: usuarios[0].usuario,
                 // replace {{name}} with Adebola
            }
        }
    
        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.json ({
                    message: 'error: ' + error
                })
            }
            
            return res.json ({
                usuario: usuarios[0],
                message: info
            })
        });        
    }else{
        return res.json ({
            message: '1'
        })
    }
})

router.post('/api/correo/mensaje/web', async (req, res) => {
    const { correo, nombres, apellidos, telefono, mensaje } = req.body

    var mailOptions = {
        from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
        to: 'proyectos@developer-ideas.com, developer.ideas2017@gmail.com', // list of receivers
        subject: 'Mensaje de la web Developer Ideas',
        template: 'mensajewebadmin', // the name of the template file i.e email.handlebars
        context:{
            nombres: nombres,
            apellidos: apellidos,
            telefono: telefono,
            mensaje: mensaje // replace {{name}} with Adebola
        }
    }

    // trigger the sending of the E-mail
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return res.json ({
                message: 'error: ' + error
            })
        }

        var mailOptions = {
            from: '"Developer Ideas" <admin@developer-ideas.com>', // sender address
            to: correo,
            subject: `Mensaje de la web Developer Ideas`,
            template: 'mensajewebcliente', // the name of the template file i.e email.handlebars
            context:{
                nombres: nombres,
                apellidos: apellidos,
                telefono: telefono,
                mensaje: mensaje // replace {{name}} with Adebola
            }
        }

        // trigger the sending of the E-mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return res.json ({
                    message: 'error: ' + error
                })
            }
            
            return res.json ({
                message: info
            })
        }); 
        
        return res.json ({
            message: info
        })
    });        
})

router.post('/api/correo/suscriptor', async (req, res) => {
    const { correo } = req.body

    try {
        const suscripcion = await pool.query ('Select * from suscripcion where correo = ?', [correo])

        if (suscripcion.length > 0){
            return res.json ({
                message: '1',
                success: true
            })

        }else{
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
                    sucess: true,
                    message: info
                })
            }); 
            
        }
    } catch (error) {
        
    }       
})

module.exports = router