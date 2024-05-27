const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/carrito-compras', async (req, res) => {
    const {id_producto, producto, precio, cantidad, total, usuario, shop_id, tengo_dominio, dominio, extension} = req.body

    try {
        const newProductoCarrito = {id_producto, producto, precio, cantidad, total, usuario, shop_id, tengo_dominio, dominio, extension}
        const nuevo = await pool.query ('INSERT INTO carrito set ?', [newProductoCarrito])
        const carrito_compras = await pool.query ('SELECT * FROM carrito JOIN producto ON carrito.id_producto = producto.id WHERE carrito.shop_id = ?', [shop_id])

        return res.json ({
            carrito_compras: carrito_compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            carrito_compras: []
        })
    }
})

router.post ('/api/carrito-compras/:id_carrito', async (req, res) => {
    const {id_producto, producto, precio, cantidad, total, usuario, shop_id, tengo_dominio, dominio, extension} = req.body
    const {id_carrito} = req.params

    try {
        const updateProductoCarrito = {id_producto, producto, precio, cantidad, total, usuario, shop_id, tengo_dominio, dominio, extension}
        await pool.query ('UPDATE carrito set ? WHERE id = ?', [updateProductoCarrito, id_carrito])
        const carrito_compras = await pool.query ('SELECT * FROM carrito WHERE shop_id = ?', [shop_id])

        return res.json ({
            carrito_compras: carrito_compras,
            success: false
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            carrito_compras: []
        })
    }
})

router.get ('/api/carrito-compras/:shop_id', async (req, res) => {
    const {shop_id} = req.params

    try {
        const carrito_compras = await pool.query ('SELECT * FROM carrito WHERE shop_id = ?', [shop_id])

        return res.json ({
            carrito_compras: carrito_compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            carrito_compras: []
        })
    }
})


router.get ('/api/delete/carrito-compras/:id_carrito/:shop_id', async (req, res) => {
    const {id_carrito, shop_id} = req.params

    try {
        await pool.query ('DELETE FROM carrito WHERE id = ?', [id_carrito])
        const carrito_compras = await pool.query ('SELECT * FROM carrito WHERE shop_id = ?', [shop_id])
        return res.json ({
            producto: carrito_compras,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            carrito_compras: [],
            success: true
        })
    }
})

module.exports = router