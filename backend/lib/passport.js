const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const pool = require ('../database')

const helpers = require ('./helpers')
 
passport.use('local.signin', new LocalStrategy ({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {
    const rows = await pool.query('SELECT * FROM clientes WHERE correo = ? OR nro_telefono = ?', [correo, correo])
    const session_id = await pool.query ('SELECT * FROM sessions')
    if (rows.length > 0){
        const usuario = rows [0]
        const validPassword = await helpers.matchPassword (password, usuario.password)
        const user = {user: usuario, session_id: session_id[session_id.length - 1].session_id}
        if (validPassword){
            done (null, user, req.flash('success', 'Bienvenido '))
        } else {
            done(null, false, {info: 'Contraseña incorrecta'})
        }
    } else {
        done(null, false, { info: 'No existe el usuario ingresado' })
    }
}))

passport.use('local.signup', new LocalStrategy({
    usernameField: 'correo',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, correo, password, done) => {
    const { usuario, nro_telefono, nombres } = req.body
    const newUser = {
        correo,
        password,
        usuario,
        nro_telefono
    }
    const rows = await pool.query('SELECT * FROM clientes WHERE correo = ? || nro_telefono = ?', [correo, nro_telefono])
    if (rows.length > 0) {
        done(null, false, { info: 'El correo ya se encuentra registrado' })
    } else {
        newUser.password = await helpers.encryptPassword(password)
        const result = await pool.query('INSERT INTO clientes set ?', [newUser])
        const newCliente = {correo, usuario, nombres, nro_telefono}
        await pool.query('INSERT INTO info_clientes set ?', [newCliente])
        const session_id = await pool.query ('SELECT * FROM sessions')
        newUser.id = result.insertId
        const user = {user: newUser, session_id: session_id.length > 0 ? session_id[session_id.length - 1].session_id : '' }
        done(null, user, req.flash('success', 'Bienvenido '))
    }
}))

passport.serializeUser((user, done) => {
    done (null, user.id)
})

passport.deserializeUser(async (id, done) => {
    let rows
    rows = await pool.query(`SELECT * FROM users WHERE id = '${id}'`)
    done(null, rows)
})