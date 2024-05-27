const express = require('express')
const router = express.Router()

const constapis = require('../util/config.js')

const pool = require('../../database')
const { isLoggedIn } = require('../../lib/auth')

const Mailjet = require('node-mailjet');
const configjet = Mailjet.Client.apiConnect(
    constapis.mailjet.keys.APIKEY_PUBLIC, 
    constapis.mailjet.keys.APIKEY_PRIVATE
)

router.post ('/send', (req, res) => {
    sendmail(req.body)
            .then ((response) => {
                console.log ('response => ', response.body)
                return res.json ({
                    response: response.body,
                    success: true
                })
            }).catch ((err) => {
                return res.json ({
                    error: err,
                    success: false
                })
            })
    return res.json ({
        success: false
    })
})

module.exports = router