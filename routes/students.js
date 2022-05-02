let express = require('express')
let router = express.Router()

let c = require('../controller/student')

router.get('/', c.get)
router.post('/', c.post)

module.exports = router;