const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/contacto', async (req, res) => {
    const {nombres, apellidos, genero, nro_telefono, correo, especialidad, fecha_nacimiento, tipo_documento, nro_documento, facebook, instagram, linkedin, tiktok} = req.body

    try {
        const newContacto = {nombres, apellidos, genero, nro_telefono, correo, especialidad, fecha_nacimiento, tipo_documento, nro_documento, facebook, instagram, linkedin, tiktok}

        const new_contacto = await pool.query ('INSERT INTO contactos set ?', [newContacto])
        const nuevo_contacto = await pool.query ('SELECT * FROM contactos WHERE id = ?', [new_contacto.insertId])
        return res.json ({
            contacto: nuevo_contacto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            contacto: {},
            success: false
        })
    }
})

router.post ('/api/contacto/:id_contacto', async (req, res) => {
    const {id_contacto} = req.params
    const {nombres, apellidos, genero, nro_telefono, correo, especialidad, fecha_nacimiento, tipo_documento, nro_documento, facebook, instagram, linkedin, tiktok} = req.body

    try {
        const updateContact = {nombres, apellidos, genero, nro_telefono, correo, especialidad, fecha_nacimiento, tipo_documento, nro_documento, facebook, instagram, linkedin, tiktok}

        await pool.query ('UPDATE contactos set ? WHERE id = ?', [updateContact, id_contacto])
        const update_contacto = await pool.query ('SELECT * FROM contactos WHERE id = ?', [id_contacto])
        return res.json ({
            contacto: update_contacto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            contacto: {},
            success: false
        })
    }
})

router.get ('/api/contacto/:id_contacto', async (req, res) => {
    const {id_contacto} = req.params

    try {
        const contacto = await pool.query ('SELECT * FROM contactos WHERE id = ?', [id_contacto])
        return res.json ({
            contacto: contacto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            contacto: {},
            success: false
        })
    }
})

router.get ('/api/contactos/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const contactos = await pool.query (`SELECT * FROM contactos ORDER BY nombres DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_contactos = await pool.query (`SELECT COUNT (id) FROM contactos`)
                return res.json ({
                    contactos: contactos,
                    total_contactos: total_contactos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const contactos = await pool.query (`SELECT * FROM contactos ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_contactos = await pool.query (`SELECT COUNT (id) FROM contactos`)
                return res.json ({
                    contactos: contactos,
                    total_contactos: total_contactos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const contactos = await pool.query (`SELECT * FROM contactos WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                    especialidad LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_contactos = await pool.query (`SELECT COUNT (id) FROM contactos WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                        especialidad LIKE '%${search}%'`)
                return res.json ({
                    contactos: contactos,
                    total_contactos: total_contactos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const contactos = await pool.query (`SELECT * FROM contactos WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                    especialidad LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_contactos = await pool.query (`SELECT COUNT (id) FROM contactos WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR
                        especialidad LIKE '%${search}%'`)
                return res.json ({
                    contactos: contactos,
                    total_contactos: total_contactos[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            contactos: [],
            success: false
        })
    }
})

router.get('/api/delete/contacto/:id_contacto', async(req, res) => {
    const {id_contacto} = req.params

    try {
        await pool.query ('DELETE FROM contactos WHERE id = ?', [id_contacto])
        const contactos = await pool.query ('SELECT * FROM contactos ORDER BY nombres DESC LIMIT 0,16')
        const total_contactos = await pool.query (`SELECT COUNT (id) FROM contactos`)
        return res.json ({
            contactos: contactos,
            total_contactos: total_contactos[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            contactos:[],
            success: false
        })
    }
})

module.exports = router