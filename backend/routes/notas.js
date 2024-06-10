const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/nota', async (req, res) => {
    const {usuario_doctor, nota, star} = req.body

    try {
        const newNota = {usuario_doctor, nota, star}

        const new_nota = await pool.query ('INSERT INTO notas set ?', [newNota])
        const nueva_nota = await pool.query ('SELECT * FROM notas WHERE id = ?', [new_nota.insertId])
        return res.json ({
            nota: nueva_nota [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            nota: {},
            success: false
        })
    }
})

router.post ('/api/nota/:id_nota', async (req, res) => {
    const {id_nota} = req.params
    const {nota, star} = req.body

    try {
        const updateNota = {nota, star}

        await pool.query ('UPDATE notas set ? WHERE id = ?', [updateNota, id_nota])
        const update_nota = await pool.query ('SELECT * FROM notas WHERE id = ?', [id_nota])
        return res.json ({
            nota: update_nota [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            nota: {},
            success: false
        })
    }
})

router.get ('/api/nota/:id_nota', async (req, res) => {
    const {id_nota} = req.params

    try {
        const nota = await pool.query ('SELECT * FROM notas WHERE id = ?', [id_nota])
        return res.json ({
            nota: nota [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            nota: {},
            success: false
        })
    }
})

router.get ('/api/notas/search/:search/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, order_by, order, begin, amount} = req.params

    try {
        if (search === '0' && order_by === '0'){
            const notas = await pool.query (`SELECT * FROM notas ORDER BY created_at DESC LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notas = await pool.query (`SELECT COUNT (id) FROM notas`)
                return res.json ({
                    notas: notas,
                    total_notas: total_notas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search === '0' && order_by !== '0'){
            const notas = await pool.query (`SELECT * FROM notas ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notas = await pool.query (`SELECT COUNT (id) FROM notas`)
                return res.json ({
                    notas: notas,
                    total_notas: total_notas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by === '0'){
            const notas = await pool.query (`SELECT * FROM notas WHERE nota LIKE '%${search}%' LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notas = await pool.query (`SELECT COUNT (id) FROM notas WHERE nota LIKE '%${search}%'`)
                return res.json ({
                    notas: notas,
                    total_notas: total_notas[0][`COUNT (id)`],
                    success: true
                })
            }
        }else if (search !== '0' && order_by !== '0'){
            const notas = await pool.query (`SELECT * FROM notas WHERE nota LIKE '%${search}%' ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_notas = await pool.query (`SELECT COUNT (id) FROM notas WHERE nota LIKE '%${search}%'`)
                return res.json ({
                    notas: notas,
                    total_notas: total_notas[0][`COUNT (id)`],
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            notas: [],
            success: false
        })
    }
})

router.get('/api/delete/nota/:id_nota', async(req, res) => {
    const {id_nota} = req.params

    try {
        await pool.query ('DELETE FROM notas WHERE id = ?', [id_nota])
        const notas = await pool.query ('SELECT * FROM notas ORDER BY created_at DESC LIMIT 0,16')
        const total_notas = await pool.query (`SELECT COUNT (id) FROM notas`)
        return res.json ({
            notas: notas,
            total_notas: total_notas[0][`COUNT (id)`],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            notas:[],
            success: false
        })
    }
})

module.exports = router