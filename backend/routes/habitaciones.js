const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/habitacion/paciente', async (req, res) => {
    const {numero, usuario_paciente, tipo_habitacion, fecha_inicio, fecha_alta, foto_paciente} = req.body

    try {
        const newHabitacion = {numero, usuario_paciente, tipo_habitacion, fecha_inicio, fecha_alta, foto_paciente}

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
    const {numero, tipo_habitacion, fecha_inicio, fecha_alta, foto_paciente} = req.body

    try {
        const newHabitacion = {numero, tipo_habitacion, fecha_inicio, fecha_alta, foto_paciente}

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

router.get ('/api/habitaciones/pacientes/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
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

router.get ('/api/delete/habitaicon/paciente/:id_habitacion', async (req, res) => {
    const {id_habitacion} = req.params

    try {
        await pool.query ('DELETE FROM habitaciones_pacientes WHERE id = ?', [id_habitacion])
        const habitaciones = await pool.query ('SELECT * FROM habitaciones_pacientes ORDER BY numero ASC LIMIT 0, 16')
        const total_habitaciones = await pool.query (`SELECT COUNT (id) FROM habitaciones_pacientes`)
        return res.json ({
            habitaciones: habitaciones,
            total_habitaciones: total_habitaciones[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            habitaciones: [],
            success: false
        })
    }
})

router.post ('/api/tipo/habitacion', async (req, res) => {
    const {nombre, cantidad, disponibles, departamento} = req.body

    try {
        const newTipo = {nombre, cantidad, disponibles, departamento}
        const new_tipo = await pool.query ('INSERT INTO tipo_habitacion set ?', [newTipo])
        const tipo_habitacion = await pool.query ('SELECT * FROM tipo_habitacion WHERE id = ?', [new_tipo.insertId])
        return res.json ({
            tipo_habitacion: tipo_habitacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_habitacion: {},
            success: false
        })
    }
})

router.post ('/api/tipo/habitacion/:id_tipo', async (req, res) => {
    const {nombre, cantidad, disponibles} = req.body
    const {id_tipo} = req.params

    try {
        const updateTipo = {nombre, cantidad, disponibles}
        await pool.query ('UPDATE tipo_habitacion set ? WHERE id = ?', [updateTipo, id_tipo])
        const tipo_habitacion = await pool.query ('SELECT * FROM tipo_habitacion WHERE id = ?', [id_tipo])
        return res.json ({
            tipo_habitacion: tipo_habitacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_habitacion: {},
            success:false
        })
    }
})

router.get ('/api/tipo/habitacion/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params

    try {
        const tipo_habitacion = await pool.query ('SELECT * FROM tipo_habitacion WHERE id = ?', [id_tipo])
        return res.json ({
            tipo_habitacion: tipo_habitacion[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_habitacion: {},
            success: false
        })
    }
})

router.get ('/api/tipos/habitaciones/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const tipo_habitaciones = await pool.query (`SELECT * FROM tipo_habitacion ORDER BY nombre ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tipo_habitaciones = await pool.query (`SELECT COUNT (id) FROM tipo_habitacion`)
                return res.json ({
                    tipo_habitaciones: tipo_habitaciones,
                    total_tipo_habitaciones: total_tipo_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const tipo_habitaciones = await pool.query (`SELECT * FROM tipo_habitacion ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tipo_habitaciones = await pool.query (`SELECT COUNT (id) FROM tipo_habitacion`)
                return res.json ({
                    tipo_habitaciones: tipo_habitaciones,
                    total_tipo_habitaciones: total_tipo_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const tipo_habitaciones = await pool.query (`SELECT * FROM tipo_habitacion WHERE nombre LIKE '%${search}%' ORDER BY nombre ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tipo_habitaciones = await pool.query (`SELECT COUNT (id) FROM tipo_habitacion`)
                return res.json ({
                    tipo_habitaciones: tipo_habitaciones,
                    total_tipo_habitaciones: total_tipo_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const tipo_habitaciones = await pool.query (`SELECT * FROM tipo_habitacion WHERE nombre LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tipo_habitaciones = await pool.query (`SELECT COUNT (id) FROM tipo_habitacion`)
                return res.json ({
                    tipo_habitaciones: tipo_habitaciones,
                    total_tipo_habitaciones: total_tipo_habitaciones[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            tipo_habitaciones: [],
            success: false
        })
    }
})

module.exports = router