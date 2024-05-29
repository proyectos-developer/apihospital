const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/doctor', async (req, res) => {
    const {nombres, apellidos, correo, nro_telefono, usuario, fecha_nacimiento, genero, especialidad, descripcion} = req.body
    try {
        const newDoctor = {nombres, apellidos, correo, nro_telefono, usuario, fecha_nacimiento, genero, especialidad, descripcion}
        const new_doctor = await pool.query (`INSERT INTO info_doctores set ?`, [newDoctor])
        const doctor = await pool.query ('SELECT * FROM info_doctores WHERE id = ?', [new_doctor.insertId])

        return res.json ({
            doctor: doctor[0],
            success: true
        })
    } catch (error) {
        return res.json ({
            error: error,
            success: false
        })
    }
})

router.post ('/api/doctor/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {nombres, apellidos, correo, nro_telefono, fecha_nacimiento, genero, especialidad, descripcion} = req.body

    try {
        const updateDoctor = {nombres, apellidos, correo, nro_telefono, fecha_nacimiento, genero, especialidad, descripcion}
        
        await pool.query ('UPDATE info_doctores set ? WHERE usuario = ?', [updateDoctor, usuario])
        const doctor = await pool.query ('SELECT * FROM info_doctores WHERE usuario = ?', [usuario])
        return res.json ({
            doctor: doctor[0],
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

router.get ('/api/doctor/:usuario', async (req, res) => {
    const {usuario} = req.params
    
    try {
        const doctor = await pool.query ('SELECT * FROM info_doctores WHERE usuario = ?', [usuario])
        const red_doctor = await pool.query ('SELECT * FROM redes_doctores WHERE usuario = ?', [usuario])
        return res.json ({
            doctor: doctor[0],
            red_doctor: red_doctor[0],
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

router.get ('/api/doctores/search/:search/order/:orderby/:order/:begin/:amount', async (req, res) => {
    const {search, orderby, order, begin, amount} = req.params

    try {
        if (search === '0' && orderby === '0'){
            console.log ('entra 1')
            const doctores = await pool.query (`SELECT * FROM info_doctores LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                console.log ('entra 2')
                const total_doctores = await pool.query ('SELECT COUNT (id) FROM info_doctores')
                return res.json ({
                    doctores: doctores,
                    total_doctores: total_doctores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    doctores: doctores,
                    success: true
                })
            }
        }else if (search === '0' && orderby !== '0'){
            const doctores = await pool.query (`SELECT * FROM info_doctores  
                        ORDER BY ${orderby} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_doctores = await pool.query ('SELECT COUNT (id) FROM info_doctores')
                return res.json ({
                    doctores: doctores,
                    total_doctores: total_doctores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    doctores: doctores,
                    success: true
                })
            }
        }else if (search !== '0' && orderby === '0'){
            const doctores = await pool.query (`SELECT * FROM info_doctores  
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR especialidad LIKE '%${search}%' LIMIT
                        ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_doctores = await pool.query (`SELECT COUNT (id) FROM info_doctores 
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR especialidad LIKE '%${search}%'`)
                return res.json ({
                    doctores: doctores,
                    total_doctores: total_doctores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    doctores: doctores,
                    success: true
                })
            }
        } else if (search !== '0' && orderby !== '0'){
            const doctores = await pool.query (`SELECT * FROM info_doctores  
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR especialidad LIKE '%${search}%'
                        ORDER BY ${orderby} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_doctores = await pool.query (`SELECT COUNT (id) FROM info_doctores 
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR especialidad LIKE '%${search}%'`)
                return res.json ({
                    doctores: doctores,
                    total_doctores: total_doctores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    doctores: doctores,
                    success: true
                })
            }
        }    
    } catch (error) {
        console.log (error)
        return res.json ({
            doctores: [],
            success: false
        })
    }
})

router.post ('/api/red/doctor', async (req, res) => {
    const {url_facebook, url_instagram, url_twitter, url_linkedin, usuario} = req.body

    try {
        const newRed = {url_facebook, url_instagram, url_twitter, url_linkedin, usuario}
        const new_red = await pool.query ('INSERT INTO redes_doctores set ?', [newRed])
        const red_doctor = await pool.query ('SELECT * FROM redes_doctores WHERE id = ?', [new_red.insertId])

        return res.json ({
            red_doctor: red_doctor[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

router.post ('/api/red/doctor/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {url_facebook, url_instagram, url_twitter, url_linkedin} = req.body

    try {
        const updateRed = {url_facebook, url_instagram, url_twitter, url_linkedin}
        await pool.query ('UPDATE redes_doctores set ? WHERE usuario = ?', [updateRed, usuario])
        const red_doctor = await pool.query ('SELECT * FROM redes_doctores WHERE usuario = ?', [usuario])

        return res.json ({
            red_doctor: red_doctor[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

router.get ('/api/red/doctor/:usuario', async (req, res) => {
    const {usuario} = req.params
    console.log (usuario)
    try {
        const red_doctor = await pool.query ('SELECT * FROM redes_doctores WHERE usuario = ?', [usuario])
        return res.json ({
            red_doctor: red_doctor,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            red_doctor: {},
            success: false
        })    
    }
})


module.exports = router