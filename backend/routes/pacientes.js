const express = require('express')
const router = express.Router()

const pool = require('../database')
const { isLoggedIn } = require('../lib/auth')

router.post ('/api/paciente', async (req, res) => {
    const {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion} = req.body

    try {
        const newPaciente = {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion}
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

router.post ('/api/paciente/:id_paciente', async (req, res) => {
    const {id_paciente} = req.params
    const {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion} = req.body

    try {
        const updatePaciente = {nombres, apellidos, fecha_nacimiento, edad, genero, correo, nro_telefono, descripcion, doctor, personal, pabellon, fecha_ingreso, direccion}
        await pool.query ('UPDATE info_pacientes set ? WHERE id = ?', [updatePaciente, id_paciente])
        const update_paciente = await pool.query ('SELECT * FROM info_pacientes WHERE id = ?', [id_paciente])

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

router.get ('/api/paciente/:id_paciente', async(req, res) => {
    const {id_paciente} = req.params

    try {
        const paciente = await pool.query ('SELECT * FROM info_pacientes WHERE id = ?', [id_paciente])
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

router.get ('/api/delete/paciente/:id_paciente', async (req, res) => {
    const {id_paciente} = req.params

    try {
        await pool.query ('DELETE FROM info_pacientes WHERE id = ?', [id_paciente])
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

module.exports = router