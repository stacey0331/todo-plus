const express = require('express')
const dataCtrl = require('./dataCtrl')
const router = express.Router()

router.post('/addItem', dataCtrl.addItem);
router.get('/getTodoList', dataCtrl.getTodoList);
// router.put('/movie/:id', MovieCtrl.updateMovie)
// router.delete('/movie/:id', MovieCtrl.deleteMovie)
// router.get('/movie/:id', MovieCtrl.getMovieById)

module.exports = router;