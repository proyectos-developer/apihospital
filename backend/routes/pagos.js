const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/pago', async (req, res) => {
    const {fecha_pago, usuario_paciente, usuario_doctor, cargos, impuesto, descuento} = req.body

    try {
        const newPago = {fecha_pago, usuario_paciente, usuario_doctor, cargos, impuesto, descuento}

        const new_pago = await pool.query ('INSERT INTO pagos set ?', [newPago])
        const pago = await pool.query ('SELECT * FROM pagos WHERE id = ?', [new_pago.insertId])
        return res.json ({
            pago: pago [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            pago: {},
            success: false
        })
    }
})

router.post ('/api/pago/:id_pago', async (req, res) => {
    const {id_pago} = req.params
    const {fecha_pago, usuario_paciente, usuario_doctor, cargos, impuesto, descuento} = req.body

    try {
        const newPago = {fecha_pago, usuario_paciente, usuario_doctor, cargos, impuesto, descuento}

        await pool.query ('UPDATE pagos set ? WHERE id = ?', [newPago, id_pago])
        const pago = await pool.query ('SELECT * FROM pagos WHERE id = ?', [id_pago])
        return res.json ({
            pago: pago [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            pago: {},
            success: false
        })
    }
})

router.get ('/api/pago/:id_pago', async (req, res) => {
    const {id_pago} = req.params

    try {
        const pago = await pool.query ('SELECT * FROM pagos WHERE id = ?', [id_pago])
        return res.json ({
            pago: pago [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            pago: {},
            success: false
        })
    }
})

router.get ('/api/pagos/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const pagos = await pool.query (`SELECT * FROM pagos ORDER BY fecha_pago DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pagos = await pool.query (`SELECT COUNT (id) FROM pagos`)
                return res.json ({
                    pagos: pagos,
                    total_pagos: total_pagos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const pagos = await pool.query (`SELECT * FROM pagos ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pagos = await pool.query (`SELECT COUNT (id) FROM pagos`)
                return res.json ({
                    pagos: pagos,
                    total_pagos: total_pagos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const pagos = await pool.query (`SELECT * FROM pagos WHERE numero LIKE '%${search}%' OR fecha_pago LIKE '%${search}%' ORDER BY fecha_pago DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pagos = await pool.query (`SELECT COUNT (id) FROM pagos WHERE numero LIKE '%${search}%' OR fecha_pago LIKE '%${search}%'`)
                return res.json ({
                    pagos: pagos,
                    total_pagos: total_pagos[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const pagos = await pool.query (`SELECT * FROM pagos WHERE numero LIKE '%${search}%' OR fecha_pago LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pagos = await pool.query (`SELECT COUNT (id) FROM pagos WHERE numero LIKE '%${search}%' OR fecha_pago LIKE '%${search}%'`)
                return res.json ({
                    pagos: pagos,
                    total_pagos: total_pagos[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            pagos: [],
            success: false
        })
    }
})

module.exports = router