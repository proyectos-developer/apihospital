const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/paciente', async (req, res) => {
    const {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion, usuario_pacientes} = req.body

    try {
        const newPaciente = {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion, usuario_pacientes}
        const new_paciente = await pool.query ('INSERT INTO info_pacientes set ?', [newPaciente])
        const newpaciente = await pool.query ('SELECT * FROM info_pacientes WHERE id = ?', [new_paciente.insertId])

        return res.json ({
            paciente: newpaciente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            paciente: {},
            success: false
        })
    }
})

router.post ('/api/paciente/:usuario', async (req, res) => {
    const {usuario} = req.params
    const {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion, usuario_pacientes} = req.body

    try {
        const updatePaciente = {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion, usuario_pacientes}
        await pool.query ('UPDATE info_pacientes set ? WHERE usuario_paciente = ?', [updatePaciente, usuario])
        const update_paciente = await pool.query ('SELECT * FROM info_pacientes WHERE usuario_paciente = ?', [usuario])

        return res.json ({
            paciente: update_paciente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            paciente: {},
            success: false
        })
    }
})

router.get ('/api/paciente/:usuario', async(req, res) => {
    const {usuario} = req.params

    try {
        const paciente = await pool.query ('SELECT * FROM info_pacientes WHERE usuario_paciente = ?', [usuario])
        return res.json ({
            paciente: paciente [0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            paciente: {},
            success: false
        })
    }
})

router.get ('/api/pacientes/search/:search/order/:orderby/:order/:begin/:amount', async (req, res) => {
    const {search, orderby, order, begin, amount} = req.params

    try {
        if (search === '0' && orderby === '0'){
            const pacientes = await pool.query (`SELECT * FROM info_pacientes LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pacientes = await pool.query ('SELECT COUNT (id) FROM info_pacientes')
                return res.json ({
                    pacientes: pacientes,
                    total_pacientes: total_pacientes[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    pacientes: pacientes,
                    success: true
                })
            }
        }else if (search === '0' && orderby !== '0'){
            const pacientes = await pool.query (`SELECT * FROM info_pacientes  
                        ORDER BY ${orderby} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pacientes = await pool.query ('SELECT COUNT (id) FROM info_pacientes')
                return res.json ({
                    pacientes: pacientes,
                    total_pacientes: total_pacientes[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    pacientes: pacientes,
                    success: true
                })
            }
        }else if (search !== '0' && orderby === '0'){
            const pacientes = await pool.query (`SELECT * FROM info_pacientes  
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%' LIMIT
                        ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pacientes = await pool.query (`SELECT COUNT (id) FROM info_pacientes 
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%'`)
                return res.json ({
                    pacientes: pacientes,
                    total_pacientes: total_pacientes[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    pacientes: pacientes,
                    success: true
                })
            }
        } else if (search !== '0' && orderby !== '0'){
            const pacientes = await pool.query (`SELECT * FROM info_pacientes  
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%'
                        ORDER BY ${orderby} ${order} LIMIT ${begin},${amount}`)
            if (parseInt(begin) === 0){
                const total_pacientes = await pool.query (`SELECT COUNT (id) FROM info_pacientes 
                        WHERE nombres LIKE '%${search}%' OR apellidos LIKE '%${search}%' OR descripcion LIKE '%${search}%'`)
                return res.json ({
                    pacientes: pacientes,
                    total_pacientes: total_pacientes[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    pacientes: pacientes,
                    success: true
                })
            }
        }    
    } catch (error) {
        console.log (error)
        return res.json ({
            pacientes: [],
            sucess: true
        })
    }
})

router.get ('/api/delete/paciente/:usuario', async (req, res) => {
    const {usuario} = req.params

    try {
        await pool.query ('DELETE FROM info_pacientes WHERE usuario_paciente = ?', [usuario])
        const pacientes = await pool.query ('SELECT * FROM info_pacientes ORDER BY nombres ASC')
        return res.json ({
            pacientes: pacientes,
            success: true
        })        
    } catch (error) {
        console.log (error)
        return res.json ({
            pacientes: [],
            success: false
        })
    }
})

router.post ('/api/valores/paciente', async (req, res) => {
    const {usuario_paciente, down_cluster, down_fiber, waterfowl_feathers, quill, landfowl, blood_preasure, heart_beat, haemoglobin, sugar, fecha, hora} = req.body

    try {
        const newValores = {usuario_paciente, down_cluster, down_fiber, waterfowl_feathers, quill, landfowl, blood_preasure, heart_beat, haemoglobin, sugar, fecha, hora}

        const valores = await pool.query ('INSERT INTO valores_paciente set ?', [newValores])
        const valores_paciente = await pool.query ('SELECT * FROM valores_paciente WHERE id = ?', [valores.insertId])

        return res.json ({
            valores_paciente: valores_paciente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            valores_medicos: {},
            success: false
        })
    }
})

router.post ('/api/valores/paciente/:id_valor', async (req, res) => {
    const {id_valor} = req.params
    const {down_cluster, down_fiber, waterfowl_feathers, quill, landfowl, blood_preasure, heart_beat, haemoglobin, sugar, fecha, hora} = req.body

    try {
        const updateValores = {down_cluster, down_fiber, waterfowl_feathers, quill, landfowl, blood_preasure, heart_beat, haemoglobin, sugar, fecha, hora}
        await pool.query ('UPDATE valores_paciente set ? WHERE id = ?', [updateValores, id_valor])
        const valores_paciente = await pool.query ('SELECT * FROM valores_paciente WHERE id = ?', [id_valor])

        return res.json ({
            valores_paciente: valores_paciente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            valores_paciente: {},
            success: false
        })
    }
})

router.get ('/api/valores/paciente/:id_valor', async (req, res) => {
    const {id_valor} = req.params

    try {
        const valores_paciente = await pool.query ('SELECT * FROM valores_paciente WHERE id = ?', [id_valor])
        return res.json ({
            valores_paciente: valores_paciente[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            valores_paciente: {},
            success: false
        })
    }
})

router.get ('/api/valores/paciente/:usuario/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {order_by, order, begin, amount, usuario} = req.params

    try {
        if (order_by === '0'){
            const valores_paciente = await pool.query (`SELECT * FROM valores_paciente WHERE usuario_paciente = ? ORDER BY fecha DESC, hora DESC LIMIT ${begin},${amount}`, [usuario])

            if (parseInt(begin) === 0){
                const total_valores = await pool.query (`SELECT COUNT (id) FROM valores_paciente WHERE usuario_paciente = ?`, [usuario])
                return res.json ({
                    valores_paciente: valores_paciente,
                    total_valores: total_valores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    valores_pacientes: valores_pacientes,
                    success: true
                })
            }
        }else if (order_by !== '0'){
            const valores_paciente = await pool.query (`SELECT * FROM valores_paciente WHERE usuario_paciente = ? ORDER BY ${order_by} ${order} LIMIT ${begin},${amount}`, [usuario])

            if (parseInt(begin) === 0){
                const total_valores = await pool.query (`SELECT COUNT (id) FROM valores_paciente WHERE usuario_paciente = ?`, [usuario])
                return res.json ({
                    valores_paciente: valores_paciente,
                    total_valores: total_valores[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    valores_pacientes: valores_pacientes,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            valores_paciente: [],
            success: false
        })
    }
})

router.post ('/api/tratamiento/paciente', async (req, res) => {
    const {usuario_paciente, usuario_doctor, tratamiento, fecha, cargo} = req.body

    try {
        const newTratamiento = {usuario_paciente, usuario_doctor, tratamiento, fecha, cargo}
        const new_tratamiento = await pool.query ('INSERT INTO tratamiento_pacientes set ?', [newTratamiento])
        const treatment = await pool.query ('SELECT * FROM tratamiento_pacientes WHERE id = ?', [new_tratamiento.insertId])
        return res.json ({
            tratamiento: treatment[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tratamiento: {},
            success: false
        })
    }
})

router.post ('/api/tratamiento/paciente/:id_tratamiento', async (req, res) => {
    const {id_tratamiento} = req.params
    const {usuario_paciente, usuario_doctor, tratamiento, fecha, cargo} = req.body

    try {
        const updateTratamiento = {usuario_paciente, usuario_doctor, tratamiento, fecha, cargo}
        await pool.query ('UPDATE tratamiento_pacientes set ? WHERE id = ?', [updateTratamiento, id_tratamiento])
        const treatment = await pool.query ('SELECT * FROM tratamiento_pacientes WHERE id = ?', [id_tratamiento])
        return res.json ({
            tratamiento: treatment[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tratamiento: {},
            success: false
        })
    }
})

router.get ('/api/tratamiento/paciente/:id_tratamiento', async (req, res) => {
    const {id_tratamiento} = req.params

    try {
        const treatment = await pool.query ('SELECT * FROM tratamiento_pacientes WHERE id = ?', [id_tratamiento])
        return res.json ({
            tratamiento: treatment[0],
            success: true
        })
    } catch (error) {
        console.log (error)
        return res.json ({
            tratamiento: {},
            success: false
        })
    }
})

router.get ('/api/tratamiento/paciente/:usuario/order/:order_by/:order/:begin/:amount', async (req, res) => {
    const {usuario, order_by, order, begin, amount} = req.params

    try {
        if (order_by === '0'){
            const tratamientos = await pool.query (`SELECT * FROM tratamiento_pacientes WHERE usuario_paciente = ? LIMIT ${begin},${amount}`, [usuario])
            if (parseInt(begin) === 0){
                const total_tratamientos = await pool.query (`SELECT COUNT (id) FROM tratamiento_pacientes WHERE usuario_paciente = ?`, [usuario])
                return res.json ({
                    tratamientos: tratamientos,
                    total_tratamientos: total_tratamientos[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    tratamientos: tratamientos,
                    success: true
                })
            }
        }else if (order_by !== '0'){
            const tratamientos = await pool.query (`SELECT * FROM tratamiento_pacientes WHERE usuario_paciente = ? ORDER BY ${order_by}  ${order} LIMIT ${begin},${amount}`, [usuario])
            if (parseInt(begin) === 0){
                const total_tratamientos = await pool.query (`SELECT COUNT (id) FROM tratamiento_pacientes WHERE usuario_paciente = ?`, [usuario])
                return res.json ({
                    tratamientos: tratamientos,
                    total_tratamientos: total_tratamientos[0][`COUNT (id)`],
                    success: true
                })
            }else{
                return res.json ({
                    tratamientos: tratamientos,
                    success: true
                })
            }
        }
    } catch (error) {
        console.log (error)
        return res.json ({
            tratamientos: [],
            success: false
        })
    }
})

module.exports = router