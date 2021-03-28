const express = require('express')
const dataCtrl = require('./dataCtrl')
const router = express.Router()

router.post('/addItem', dataCtrl.addItem);
router.get('/getTodoList', dataCtrl.getTodoList);
router.delete('/deleteItem/:id', dataCtrl.deleteItem);
router.put('/updateTodo/:id', dataCtrl.updateTodo);
router.post('/addCategory', dataCtrl.addCategory);
router.get('/getCategories', dataCtrl.getCategories);

module.exports = router;