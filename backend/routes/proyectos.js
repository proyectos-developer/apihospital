const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

/**Tipo Proyecto */
router.post ('/api/tipo_proyecto', async (req, res) => {
    const {nombre, descripcion} = req.body

    try {
        const newTipoProyecto = {nombre, descripcion}

        const nuevo_tipo = await pool.query ('INSERT INTO tipo_proyecto set ?', [newTipoProyecto])
        const tipo_proyecto = await pool.query('SELECT * FROM tipo_proyecto WHERE id = ?', [nuevo_tipo.insertId])

        return res.json ({
            tipo_proyecto: tipo_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
        
    }
})

router.get ('/api/tipo_proyectos', async (req, res) => {
    try {
        const tipo_proyectos = await pool.query ('SELECT * FROM tipo_proyecto')
        return res.json({
            tipo_proyectos: tipo_proyectos,
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

router.get ('/api/tipo_proyecto/:id_tipo', async (req, res) => {
    const {id_tipo} = req.params
    try {
        const tipo_proyecto = await pool.query ('SELECT * FROM tipo_proyecto WHERE id = ?', [id_tipo])
        return res.json({
            tipo_proyecto: tipo_proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

/**Nuevo proyecto */
router.post ('/api/proyecto', async (req, res) => {
    const {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido} = req.body

    try {
        const newProyecto = {id_tipo_proyecto, tipo_proyecto, nombre_proyecto, cliente, descripcion, url_imagen, url_contenido}

        const nuevo_proyecto = await pool.query ('INSERT INTO proyectos set ?', [newProyecto])
        const proyecto = await pool.query('SELECT * FROM proyectos WHERE id = ?', [nuevo_proyecto.insertId])

        return res.json ({
            proyecto: proyecto [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
        
    }
}) 

router.get ('/api/proyectos/search/:search/tipo/:id_tipo', async (req, res) => {
    const {search, id_tipo} = req.params

    try {
        if (search === '0' && id_tipo === '0'){
            const proyectos = await pool.query ('SELECT * FROM proyectos')
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search === '0' && id_tipo !== '0'){
            const proyectos = await pool.query ('SELECT * FROM proyectos WHERE id_tipo_proyecto = ?', [id_tipo])
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search !== '0' && id_tipo === '0'){
            const proyectos = await pool.query (`SELECT * FROM proyectos WHERE tipo_proyecto LIKE '%${search}%' OR nombre_proyecto LIKE '%${search}%' OR
                        descripcion LIKE '%${search}%'`)
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }else if (search !== '0' && id_tipo !== '0'){
            console.log ('2', search, id_tipo)
            const proyectos = await pool.query (`SELECT * FROM proyectos WHERE (tipo_proyecto LIKE '%${search}%' OR nombre_proyecto LIKE '%${search}%' OR
                        descripcion LIKE '%${search}%') AND id_tipo_proyecto = ?`, [id_tipo])
            return res.json({
                proyectos: proyectos,
                success: true
            })
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

router.get ('/api/proyecto/:id', async (req, res) => {
    const {id} = req.params
    try {
        const proyectos = await pool.query ('SELECT * FROM proyectos WHERE id = ?', [id])
        return res.json({
            proyecto: proyectos [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            success: false
        })
    }
})

module.exports = router