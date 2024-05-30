const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/calificacion/doctor', async (req, res) => {
    const {usuario_doctor, calificacion, descripcion, usuario_paciente} = req.body

    try {
        const newCalificacion = {usuario_doctor, calificacion, descripcion, usuario_paciente}
        const new_calificacion = await pool.query ('INSERT INTO calificacion_doctores set ?', [newCalificacion])
        const calification = await pool.query ('SELECT * FROM calificacion_doctores WHERE id = ?', [new_calificacion.insertId])

        return res.json ({
            calificacion: calification[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            calificacion: {},
            success: false
        })
    }
})

router.get ('/api/calificacion/doctor/:id_calificacion', async (req, res) => {
    const {id_calificacion} = req.params

    try {
        const calificacion = await pool.query ('SELECT * FROM calificacion_doctores WHERE id = ?', [id_calificacion])
        return res.json ({
            calificacion: calificacion [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            calificacion: {},
            success: false
        })
    }
})

router.get ('/api/calificaciones/doctor/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const calificaciones = await pool.query ('SELECT * FROM calificacion_doctores WHERE usuario_doctor = ? ORDER BY calificacion DESC', [usuario])
        return res.json ({
            calificaciones: calificaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            calificaciones: calificaciones [0],
            success: false
        })
    }
})

router.get('/api/delete/calificacion/doctor/:usuario/:id_calificacion', async (req, res) => {
    const {id_calificacion, usuario} = req.params

    try {
        await pool.query ('DELETE FROM calificacion_doctores WHERE id = ?', [id_calificacion])
        const calificaciones = await pool.query ('SELECT * FROM calificacion_doctores WHERE usuario_doctor = ?', [usuario])

        return res.json ({
            calificaciones: calificaciones,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            calificaciones: [],
            success: false
        })
        
    }
})

module.exports = router