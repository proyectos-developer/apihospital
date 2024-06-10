const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/personal', async (req, res) => {
    const {nombres, apellidos, genero, nro_telefono, correo, direccion, designacion, especialidad, fecha_ingreso, fecha_nacimiento, edad, tipo_documento, nro_documento,
            usuario_personal
    } = req.body

    try {
        const newNota = {nombres, apellidos, genero, nro_telefono, correo, direccion, designacion, especialidad, fecha_ingreso, fecha_nacimiento, edad, tipo_documento, nro_documento,
                usuario_personal
        }

        const new_personal = await pool.query ('INSERT INTO personal set ?', [newNota])
        const nuevo_personal = await pool.query ('SELECT * FROM personal WHERE id = ?', [new_personal.insertId])
        return res.json ({
            personal: nuevo_personal [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            personal: {},
            success: false
        })
    }
})

router.post ('/api/personal/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {nombres, apellidos, genero, nro_telefono, correo, direccion, designacion, especialidad, fecha_ingreso, fecha_nacimiento, edad, tipo_documento, nro_documento
    } = req.body

    try {
        const updatePersonal = {nombres, apellidos, genero, nro_telefono, correo, direccion, designacion, especialidad, fecha_ingreso, fecha_nacimiento, edad, tipo_documento, nro_documento}

        await pool.query ('UPDATE personal set ? WHERE usuario_personal = ?', [updatePersonal, usuario])
        const update_personal = await pool.query ('SELECT * FROM personal WHERE usuario_personal = ?', [usuario])
        return res.json ({
            personal: update_personal [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            personal: {},
            success: false
        })
    }
})

router.get ('/api/personal/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const personal = await pool.query ('SELECT * FROM personal WHERE usuario_personal = ?', [usuario])
        return res.json ({
            personal: personal [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            personal: {},
            success: false
        })
    }
})

router.get ('/api/personal/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal ORDER BY created_at DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal`)
                return res.json ({
                    personal: personal,
                    total_personal: total_personal[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal`)
                return res.json ({
                    personal: personal,
                    total_personal: total_personal[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                    especialidad LIKE '%${search}%' OR designacion LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                        especialidad LIKE '%${search}%' OR designacion LIKE '%${search}%'`)
                return res.json ({
                    personal: personal,
                    total_personal: total_personal[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const personal = await pool.query (`SELECT * FROM personal WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                    especialidad LIKE '%${search}%' OR designacion LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_personal = await pool.query (`SELECT COUNT (id) FROM personal WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                        especialidad LIKE '%${search}%' OR designacion LIKE '%${search}%'`)
                return res.json ({
                    personal: personal,
                    total_personal: total_personal[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            personal: [],
            success: false
        })
    }
})

router.get('/api/delete/personal/:usuario', async(req, res) => {
    const {usuario} = req.params

    try {
        await pool.query ('DELETE FROM personal WHERE usuario_personal = ?', [usuario])
        const personal = await pool.query ('SELECT * FROM personal ORDER BY created_at DESC LIMIT 0,16')
        const total_personal = await pool.query (`SELECT COUNT (id) FROM personal`)
        return res.json ({
            personal: personal,
            total_personal: total_personal[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            personal:[],
            success: false
        })
    }
})

module.exports = router