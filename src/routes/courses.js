const express = require('express');
const courseController = require('../app/controllers/CoursesController.js');
const router = express.Router();

router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.post('/handle-form-actions', courseController.handleFormActions);
router.get('/:id/edit', courseController.edit);
router.put('/:id', courseController.update); //PUT   : update nhiều fields dữ liệu
router.patch('/:id/restore', courseController.restore); //PATCH : update 1 field dữ liệu
router.delete('/:id', courseController.destroy);
router.delete('/:id/force', courseController.forceDestroy);

router.get('/:slug', courseController.show);
//router.get('/', courseController.index);

module.exports = router;
