const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/cita', async (req, res) => {
    const {nombre_paciente, genero, nro_telefono, correo, fecha, hora, usuario_doctor, condicion_medica} = req.body

    try {
        const newCita = {nombre_paciente, genero, nro_telefono, correo, fecha, hora, usuario_doctor, condicion_medica}

        const new_cita = await pool.query ('INSERT INTO citas set ?', [newCita])
        const cita = await pool.query ('SELECT * FROM citas WHERE id = ?', [new_cita.insertId])
        return res.json ({
            cita: cita [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            cita: {},
            success: false
        })
    }
})

router.post ('/api/cita/:id_cita', async (req, res) => {
    const {id_cita} = req.params
    const {nombre_paciente, genero, nro_telefono, correo, fecha, hora, usuario_doctor, condicion_medica} = req.body

    try {
        const newCita = {nombre_paciente, genero, nro_telefono, correo, fecha, hora, usuario_doctor, condicion_medica}

        await pool.query ('UPDATE citas set ? WHERE id = ?', [newCita, id_cita])
        const cita = await pool.query ('SELECT * FROM citas WHERE id = ?', [id_cita])
        return res.json ({
            cita: cita [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            cita: {},
            success: false
        })
    }
})

router.get ('/api/cita/:id_cita', async (req, res) => {
    const {id_cita} = req.params

    try {
        const cita = await pool.query ('SELECT * FROM citas WHERE id = ?', [id_cita])
        return res.json ({
            cita: cita [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            cita: {},
            success: false
        })
    }
})

router.get ('/api/citas/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const citas = await pool.query (`SELECT * FROM citas ORDER BY fecha DESC, hora DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_citas = await pool.query (`SELECT COUNT (id) FROM citas`)
                return res.json ({
                    citas: citas,
                    total_citas: total_citas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const citas = await pool.query (`SELECT * FROM citas ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_citas = await pool.query (`SELECT COUNT (id) FROM citas`)
                return res.json ({
                    citas: citas,
                    total_citas: total_citas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const citas = await pool.query (`SELECT * FROM citas WHERE nombre_paciente LIKE '%${search}%' OR condicion_medica LIKE '%${search}%' ORDER BY fecha DESC, hora DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_citas = await pool.query (`SELECT COUNT (id) FROM citas`)
                return res.json ({
                    citas: citas,
                    total_citas: total_citas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const citas = await pool.query (`SELECT * FROM citas WHERE nombre_paciente LIKE '%${search}%' OR condicion_medica LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_citas = await pool.query (`SELECT COUNT (id) FROM citas`)
                return res.json ({
                    citas: citas,
                    total_citas: total_citas[0][`COUNT (id)`],
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

router.delete ('/api/delete/cita/:id_cita', async (req, res) => {
    const {id_cita} = req.params

    try {
        await pool.query ('DELETE FROM citas WHERE id = ?', [id_cita])

        return res.json ({
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

module.exports = router