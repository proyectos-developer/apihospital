const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/tarea', async (req, res) => {
    const {usuario_paciente, nombre_tarea, detalles_tarea, equipo_acargo, hora, fecha} = req.body

    try {
        const newTarea = {usuario_paciente, nombre_tarea, detalles_tarea, equipo_acargo, hora, fecha}

        const new_tarea = await pool.query ('INSERT INTO tareas set ?', [newTarea])
        const tarea = await pool.query ('SELECT * FROM tareas WHERE id = ?', [new_tarea.insertId])
        return res.json ({
            tarea: tarea [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tarea: {},
            success: false
        })
    }
})

router.post ('/api/tarea/:id_tarea', async (req, res) => {
    const {id_tarea} = req.params
    const {nombre_tarea, detalles_tarea, equipo_acargo, hora, fecha} = req.body

    try {
        const newTarea = {nombre_tarea, detalles_tarea, equipo_acargo, hora, fecha}

        await pool.query ('UPDATE tareas set ? WHERE id = ?', [newTarea, id_tarea])
        const tarea = await pool.query ('SELECT * FROM tareas WHERE id = ?', [id_tarea])
        return res.json ({
            tarea: tarea [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tarea: {},
            success: false
        })
    }
})

router.get ('/api/tarea/:id_tarea', async (req, res) => {
    const {id_tarea} = req.params

    try {
        const tarea = await pool.query ('SELECT * FROM tareas WHERE id = ?', [id_tarea])
        return res.json ({
            tarea: tarea [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tarea: {},
            success: false
        })
    }
})

router.get ('/api/tareas/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const tareas = await pool.query (`SELECT * FROM tareas ORDER BY fecha DESC, hora DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas = await pool.query (`SELECT COUNT (id) FROM tareas`)
                return res.json ({
                    tareas: tareas,
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const tareas = await pool.query (`SELECT * FROM tareas ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas = await pool.query (`SELECT COUNT (id) FROM tareas`)
                return res.json ({
                    tareas: tareas,
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const tareas = await pool.query (`SELECT * FROM tareas WHERE equipo_acargo LIKE '%${search}%' OR detalles_tarea LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas = await pool.query (`SELECT COUNT (id) FROM tareas WHERE equipo_acargo LIKE '%${search}%' OR detalles_tarea LIKE '%${search}%'`)
                return res.json ({
                    tareas: tareas,
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const tareas = await pool.query (`SELECT * FROM tareas WHERE equipo_acargo LIKE '%${search}%' OR detalles_tarea LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_tareas = await pool.query (`SELECT COUNT (id) FROM tareas WHERE equipo_acargo LIKE '%${search}%' OR detalles_tarea LIKE '%${search}%'`)
                return res.json ({
                    tareas: tareas,
                    total_tareas: total_tareas[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            tareas: [],
            success: false
        })
    }
})

router.get('/api/delete/tarea/:id_tarea', async(req, res) => {
    const {id_tarea} = req.params

    try {
        await pool.query ('DELETE FROM tareas WHERE id = ?', [id_tarea])
        const tareas = await pool.query ('SELECT * FROM tareas ORDER BY fecha LIMIT 0,16')
        const total_tareas = await pool.query (`SELECT COUNT (id) FROM tareas`)
        return res.json ({
            tareas: tareas,
            total_tareas: total_tareas[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tareas:[],
            success: false
        })
    }
})

module.exports = router