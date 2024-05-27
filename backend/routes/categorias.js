const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/categoria', async (req, res) => {
    const {categoria, descripcion} = req.body

    try {
        const newCategoria = {categoria, descripcion}
        const nueva = await pool.query ('INSERT INTO categorias set ?', newCategoria)
        const categorias = await pool.query ('SELECT * FROM categorias WHERE id = ?', [nueva.insertId])

        return res.json ({
            categoria: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categoria: {},
            success: false
        })
    }
})

router.post ('/api/categoria/:id_categoria', async (req, res) => {
    const {categoria, descripcion} = req.body
    const {id_categoria} = req.params

    try {
        const updateCategoria = {categoria, descripcion}
        await pool.query ('UPDATE categorias set ? WHERE id = ?', [updateCategoria, id_categoria])
        const categorias = await pool.query ('SELECT  * FROM categorias WHERE id = ?', [id_categoria])

        return res.json ({
            categorias: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            categoria: {}
        })
    }
})

router.get ('/api/categorias', async (req, res) => {
    try {
        const categorias = await pool.query ('SELECT * FROM categorias ORDER BY categoria ASC, descripcion ASC')
        return res.json ({
            categorias: categorias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categorias: [],
            success: true
        })
    }
})

router.get ('/api/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params

    try {
        const categorias = await pool.query ('SELECT * FROM categorias WHERE id = ?', [id_categoria])
        return res.json ({
            categoria: categorias[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categoria: {},
            success: true
        })
    }
})

router.get ('/api/delete/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params

    try {
        await pool.query ('DELETE FROM categorias WHERE id = ?', [id_categoria])
        const categorias = await pool.query ('SELECT * FROM categorias ORDER BY categoria ASC, descripcion DESC')
        return res.json ({
            categoria: categorias,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            categorias: [],
            success: true
        })
    }
})

router.get ('/api/productos/categoria/:id_categoria', async (req, res) => {
    const {id_categoria} = req.params

    try {
        const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
        producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
        producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
        producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku,
        producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE producto.id_categoria = ?`, [id_categoria])
        return res.json({
            productos: productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json({
            error: error,
            productos: [],
            success: false
        })
    }
})

module.exports = router