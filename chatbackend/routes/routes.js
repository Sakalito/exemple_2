const [Router] = require('express')

const {connexion, inscription} = require('../controllers/ctrl')

const router = Router()

router.post('/inscription', inscription )
router.post('/connexion', connexion )

module.exports = router