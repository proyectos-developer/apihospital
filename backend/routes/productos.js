const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/producto', async (req, res) => {
    const {producto, descripcion, categoria, id_categoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
        caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
        caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, foto, 
        precio, oferta, precio_mensual, precio_anual, comentarios} = req.body

    try {
        const newProducto = {producto, descripcion, categoria, id_categoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, foto, 
            precio, oferta, precio_mensual, precio_anual, comentarios}
        const nuevo = await pool.query ('INSERT INTO producto set ?', [newProducto])
        const productos = await pool.query ('SELECT * FROM producto WHERE id = ?', [nuevo.insertId])

        return res.json ({
            producto: productos[0],
            success: false
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.post ('/api/producto/:id_producto', async (req, res) => {
    const {producto, descripcion, categoria, id_categoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
        caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
        caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, foto, 
        precio, oferta, precio_mensual, precio_anual, comentarios} = req.body
    const {id_producto} = req.params

    try {
        const updateProducto = {producto, descripcion, categoria, id_categoria, caracteristica_1, caracteristica_2, caracteristica_3, caracteristica_4, caracteristica_5, 
            caracteristica_6, caracteristica_7, caracteristica_8, caracteristica_9, caracteristica_10, caracteristica_11, caracteristica_12, caracteristica_13,
            caracteristica_14, caracteristica_15, caracteristica_16, caracteristica_17, caracteristica_18, caracteristica_19, caracteristica_20, servicio, foto, 
            precio, oferta, precio_mensual, precio_anual, comentarios}
        await pool.query ('UPDATE producto set ? WHERE id = ?', [updateProducto, id_producto])
        const productos = await pool.query ('SELECT * FROM producto WHERE id = ?', [id_producto])

        return res.json ({
            producto: productos[0],
            success: false
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.get ('/api/productos/search/:search/categoria/:id_categoria/precio/:minimo/:maximo/orderby/:order_by/:order/:begin/:amount', async (req, res) => {
    const {search, id_categoria, order_by, order, begin, amount, minimo, maximo} = req.params
    try {
        if (minimo === '0' && search === '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
                        producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
                        producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
                        producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
                        producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria ORDER BY producto.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM producto')

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search === '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria ORDER BY ${order_by} ${order}  LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM producto')

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search === '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE producto.id_categoria = ? ORDER BY producto.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM producto WHERE id_categoria = ?', [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search === '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE producto.id_categoria = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query ('SELECT COUNT (id) FROM producto WHERE id_categoria = ?', [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search !== '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
                LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
                LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
                LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) ORDER BY producto.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10)`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search !== '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10)`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search !== '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND producto.id_categoria = ? ORDER BY producto.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo === '0' && search !== '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND producto.id_categoria = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ?`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search === '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY producto.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (precio > ${minimo} AND precio < ${maximo})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search === '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY ${order_by} ${order}  LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (precio > ${minimo} AND precio < ${maximo})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search === '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo}) ORDER BY producto.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE producto.id_categoria = ? AND (producto.precio > ${minimo} AND producto.precio < ${maximo})`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search === '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE producto.id_categoria = ? AND (producto.precio > ${minimo} AND producto.precio < ${maximo})ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search !== '0' && id_categoria === '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY producto.created_at LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${minimo} AND precio < ${maximo})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search !== '0' && id_categoria === '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND (precio > ${minimo} AND precio < ${maximo})`)

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search !== '0' && id_categoria !== '0' && order_by === '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND producto.id_categoria = ? AND (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY producto.created_at LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }else if (minimo !== '0' && search !== '0' && id_categoria !== '0' && order_by !== '0'){
            const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
            producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
            producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
            producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku, 
            producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE (producto.producto LIKE '%${search}%' OR producto.descripcion LIKE '%${search}%' OR producto.categoria 
            LIKE '%${search}%' OR producto.caracteristica_1 LIKE '%${search}%' OR producto.caracteristica_2 LIKE '%${search}%' OR producto.caracteristica_3 LIKE '%${search}%' OR producto.caracteristica_4 
            LIKE '%${search}%' OR producto.caracteristica_5 LIKE '%${search}%' OR producto.caracteristica_6 LIKE '%${search}%' OR producto.caracteristica_7 LIKE '%${search}%' OR producto.caracteristica_8
            LIKE '%${search}%' OR producto.caracteristica_9 LIKE '%${search}%' OR producto.caracteristica_10) AND producto.id_categoria = ? AND (producto.precio > ${minimo} AND producto.precio < ${maximo}) ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [id_categoria])
            if (parseInt(begin) === 0){
                const total_productos = await pool.query (`SELECT COUNT (id) FROM producto WHERE (producto LIKE '%${search}%' OR descripcion LIKE '%${search}%' OR categoria 
                LIKE '%${search}%' OR caracteristica_1 LIKE '%${search}%' OR caracteristica_2 LIKE '%${search}%' OR caracteristica_3 LIKE '%${search}%' OR caracteristica_4 
                LIKE '%${search}%' OR caracteristica_5 LIKE '%${search}%' OR caracteristica_6 LIKE '%${search}%' OR caracteristica_7 LIKE '%${search}%' OR caracteristica_8
                LIKE '%${search}%' OR caracteristica_9 LIKE '%${search}%' OR caracteristica_10) AND id_categoria = ? AND (precio > ${minimo} AND precio < ${maximo})`, [id_categoria])

                return res.json ({
                    total_productos: total_productos[0][`COUNT (id)`],
                    productos: productos,
                    success: true
                })
            }else{
                return res.json ({
                    productos: productos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            productos: []
        })
    }
})

router.get ('/api/producto/:sku', async (req, res) => {
    const {sku} = req.params

    try {
        const productos = await pool.query (`SELECT producto.id_categoria, categorias.descripcion as descripcion_categoria, categorias.categoria, producto.producto,
        producto.foto, producto.descripcion as descripcion_producto, producto.caracteristica_1, producto.caracteristica_2, producto.caracteristica_3,
        producto.caracteristica_4, producto.caracteristica_5, producto.caracteristica_6, producto.caracteristica_7, producto.caracteristica_8,
        producto.caracteristica_9, producto.caracteristica_10, producto.precio, producto.oferta, producto.servicio, producto.sku,
        producto.comentarios, producto.id FROM producto JOIN categorias ON categorias.id = producto.id_categoria WHERE sku = ?`, [sku])

        return res.json ({
            producto: productos[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            success: false,
            producto: {}
        })
    }
})

router.get ('/api/delete/producto/:id_producto', async (req, res) => {
    const {id_producto} = req.params

    try {
        await pool.query ('DELETE FROM producto WHERE id = ?', [id_producto])
        const productos = await pool.query ('SELECT * FROM producto ORDER BY producto ASC, descripcion DESC')
        return res.json ({
            producto: productos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            error: error,
            productos: [],
            success: true
        })
    }
})

module.exports = router