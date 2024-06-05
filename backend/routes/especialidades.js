const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/especialidad', async (req, res) => {
    const {nombre_especialidad, usuario_doctor, descripcion} = req.body

    try {
        const newHabitacion = {nombre_especialidad, usuario_doctor, descripcion}

        const new_especialidad = await pool.query ('INSERT INTO especialidades set ?', [newHabitacion])
        const especialidad = await pool.query ('SELECT * FROM especialidades WHERE id = ?', [new_especialidad.insertId])
        return res.json ({
            especialidad: especialidad [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            especialidad: {},
            success: false
        })
    }
})

router.post ('/api/especialidad/:id_especialidad', async (req, res) => {
    const {id_especialidad} = req.params
    const {nombre_especialidad, usuario_doctor, descripcion} = req.body

    try {
        const newEsepcalidad = {nombre_especialidad, usuario_doctor, descripcion}

        await pool.query ('UPDATE especialidades set ? WHERE id = ?', [newEsepcalidad, id_especialidad])
        const especialidad = await pool.query ('SELECT * FROM especialidades WHERE id = ?', [id_especialidad])
        return res.json ({
            especialidad: especialidad [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            especialidad: {},
            success: false
        })
    }
})

router.get ('/api/especialidad/:id_especialidad', async (req, res) => {
    const {id_especialidad} = req.params

    try {
        const especialidad = await pool.query ('SELECT * FROM especialidades WHERE id = ?', [id_especialidad])
        return res.json ({
            especialidad: especialidad [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            especialidad: {},
            success: false
        })
    }
})

router.get ('/api/especialidades/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const especialidades = await pool.query (`SELECT * FROM especialidades ORDER BY nombre_especialidad ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_especialidades = await pool.query (`SELECT COUNT (id) FROM especialidades`)
                return res.json ({
                    especialidades: especialidades,
                    total_especialidades: total_especialidades[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const especialidades = await pool.query (`SELECT * FROM especialidades ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_especialidades = await pool.query (`SELECT COUNT (id) FROM especialidades`)
                return res.json ({
                    especialidades: especialidades,
                    total_especialidades: total_especialidades[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const especialidades = await pool.query (`SELECT * FROM especialidades WHERE nombre_especialidad LIKE '%${search}%' OR descripcion LIKE '%${search}%' ORDER BY nombre_especialidad ASC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_especialidades = await pool.query (`SELECT COUNT (id) FROM especialidades WHERE nombre_especialidad LIKE '%${search}%' OR descripcion LIKE '%${search}%'`)
                return res.json ({
                    especialidades: especialidades,
                    total_especialidades: total_especialidades[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const especialidades = await pool.query (`SELECT * FROM especialidades WHERE nombre_especialidad LIKE '%${search}%' OR descripcion LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_especialidades = await pool.query (`SELECT COUNT (id) FROM especialidades WHERE nombre_especialidad LIKE '%${search}%' OR descripcion LIKE '%${search}%'`)
                return res.json ({
                    especialidades: especialidades,
                    total_especialidades: total_especialidades[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            especialidades: [],
            success: false
        })
    }
})

module.exports = router