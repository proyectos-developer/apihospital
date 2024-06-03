const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/factura/paciente', async (req, res) => {
    const {numero, usuario_paciente, usuario_doctor, monto, estado, fecha_emitida} = req.body

    try {
        const newFactura = {numero, usuario_paciente, usuario_doctor, monto, estado, fecha_emitida}
        const new_factura = await pool.query ('INSERT INTO facturas_pacientes set ?', [newFactura])
        const factura = await pool.query ('SELECT * FROM facturas_pacientes WHERE id = ?', [new_factura.insertId])
        return res.json ({
            factura: factura[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            factura: {},
            success: false
        })
    }
})

router.post ('/api/factura/paciente/:id_factura', async (req, res) => {
    const {id_factura} = req.params
    const {numero, usuario_paciente, usuario_doctor, monto, estado, fecha_emitida} = req.body

    try {
        const updateFactura = {numero, usuario_paciente, usuario_doctor, monto, estado, fecha_emitida}
        await pool.query ('UPDATE facturas_pacientes set ? WHERE id = ?', [updateFactura, id_factura])
        const factura = await pool.query ('SELECT * FROM facturas_pacientes WHERE id = ?', [id_factura])
        return res.json ({
            factura: factura[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            factura: {},
            success: false
        })
    }
})

router.get ('/api/factura/paciente/:id_factura', async (req, res) => {
    const {id_factura} = req.params

    try {
        const factura = await pool.query ('SELECT * FROM facturas_pacientes WHERE id = ?', [id_factura])
        return res.json ({
            factura: factura[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            factura: {},
            success: false
        })
    }
})

router.get ('/api/facturas/paciente/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        const factura = await pool.query ('SELECT * FROM facturas_pacientes WHERE usuario_paciente = ?', [usuario])
        
        return res.json ({
            factura: factura[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            factura: {},
            success: false
        })
    }
})

router.get ('/api/facturas/pacientes/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order, order_by, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const facturas = await pool.query (`SELECT * FROM facturas_pacientes ORDER BY fecha_emitida DESC LIMIT ${begin}, ${amount}`)

            if (parseInt(begin) === 0){
                const total_facturas = await pool.query (`SELECT COUNT (id) FROM facturas_pacientes`)
                return res.json ({
                    facturas: facturas,
                    total_facturas: total_facturas[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    facturas: facturas,
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const facturas = await pool.query (`SELECT * FROM facturas_pacientes ORDER BY ${order_by} ${order} LIMIT ${begin}, ${amount}`)

            if (parseInt(begin) === 0){
                const total_facturas = await pool.query (`SELECT COUNT (id) FROM facturas_pacientes`)
                return res.json ({
                    facturas: facturas,
                    total_facturas: total_facturas[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    facturas: facturas,
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const facturas = await pool.query (`SELECT * FROM facturas_pacientes WHERE numero LIKE '%${search}%' ORDER BY fecha_emitida DESC LIMIT ${begin}, ${amount}`)

            if (parseInt(begin) === 0){
                const total_facturas = await pool.query (`SELECT COUNT (id) FROM facturas_pacientes WHERE numero LIKE '%${search}%'`)
                return res.json ({
                    facturas: facturas,
                    total_facturas: total_facturas[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    facturas: facturas,
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const facturas = await pool.query (`SELECT * FROM facturas_pacientes WHERE numero LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin}, ${amount}`)

            if (parseInt(begin) === 0){
                const total_facturas = await pool.query (`SELECT COUNT (id) FROM facturas_pacientes WHERE numero LIKE '%${search}%'`)
                return res.json ({
                    facturas: facturas,
                    total_facturas: total_facturas[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    facturas: facturas,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            facturas: [],
            success: false
        })
    }
})

router.delete ('/api/delete/factura/:id_factura', async (req, res) => {
    const {id_factura} = req.params

    try {
        await pool.query ('DELETE FROM facturas WHERE id = ?', [id_factura])

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