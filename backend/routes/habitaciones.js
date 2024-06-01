const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/habitacion/paciente', async (req, res) => {
    const {numero, usuario_paciente, tipo_habitacion, fecha_inicio, fecha_cargo, foto_paciente} = req.body

    try {
        const newHabitacion = {numero, usuario_paciente, tipo_habitacion, fecha_inicio, fecha_cargo, foto_paciente}

        const new_habitacion = await pool.query ('INSERT INTO habitaciones_pacientes set ?', [newHabitacion])
        const habitacion = await pool.query ('SELECT * FROM habitaciones_pacientes WHERE id = ?', [new_habitacion.insertId])
        return res.json ({
            habitacion: habitacion [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            habitacion: {},
            success: false
        })
    }
})

router.post ('/api/habitacion/paciente/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {numero, tipo_habitacion, fecha_inicio, fecha_cargo, foto_paciente} = req.body

    try {
        const newHabitacion = {numero, tipo_habitacion, fecha_inicio, fecha_cargo, foto_paciente}

        await pool.query ('UPDATE habitaciones_pacientes set ? WHERE usuario_paciente = ?', [newHabitacion, usuario])
        const habitacion = await pool.query ('SELECT * FROM habitaciones_pacientes WHERE usuario_paciente = ?', [usuario])
        return res.json ({
            habitacion: habitacion [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            habitacion: {},
            success: false
        })
    }
})

router.get ('/api/habitacion/paciente/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const habitacion = await pool.query ('SELECT * FROM habitaciones_pacientes WHERE usuario_paciente = ?', [usuario])
        return res.json ({
            habitacion: habitacion [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            habitacion: {},
            success: false
        })
    }
})

router.get ('/api/habitacion/paciente/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const habitaciones = await pool.query (`SELECT * FROM habitaciones_pacientes ORDER BY numero ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_habitaciones = await pool.query (`SELECT COUNT (id) FROM habitaciones_pacientes`)
                return res.json ({
                    habitaciones: habitaciones,
                    total_habitaciones: total_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const habitaciones = await pool.query (`SELECT * FROM habitaciones_pacientes ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_habitaciones = await pool.query (`SELECT COUNT (id) FROM habitaciones_pacientes`)
                return res.json ({
                    habitaciones: habitaciones,
                    total_habitaciones: total_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const habitaciones = await pool.query (`SELECT * FROM habitaciones_pacientes WHERE numero LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_habitaciones = await pool.query (`SELECT COUNT (id) FROM habitaciones_pacientes WHERE numero LIKE '%${search}%'`)
                return res.json ({
                    habitaciones: habitaciones,
                    total_habitaciones: total_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const habitaciones = await pool.query (`SELECT * FROM habitaciones_pacientes WHERE numero LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_habitaciones = await pool.query (`SELECT COUNT (id) FROM habitaciones_pacientes WHERE numero LIKE '%${search}%'`)
                return res.json ({
                    habitaciones: habitaciones,
                    total_habitaciones: total_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            habitaciones: [],
            success: false
        })
    }
})

module.exports = router