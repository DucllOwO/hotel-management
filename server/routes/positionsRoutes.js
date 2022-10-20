const { route } = require('./authRoute');

const router = require('express').Router();

// create router to manage feature when display position
router.use('/features',positionFeatureRoutes);

router.get('/')
router.get('/:id')
router.post('/')
router.put('/:id')
router.delete('/:id')

module.exports = router;