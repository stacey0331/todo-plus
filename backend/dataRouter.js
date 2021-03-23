const express = require('express')
const dataCtrl = require('./dataCtrl')
const router = express.Router()

router.post('/addItem', dataCtrl.addItem);
router.get('/getTodoList', dataCtrl.getTodoList);
router.delete('/deleteItem/:id', dataCtrl.deleteItem);
// router.get('/movie/:id', MovieCtrl.getMovieById)
// router.put('/movie/:id', MovieCtrl.updateMovie)

module.exports = router;