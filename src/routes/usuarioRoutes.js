const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { autorizarCriacaoUsuario, autorizarExclusaoUsuario } = require('../middlewares/usuarioMiddleware');

router.post('/login', usuarioController.login);
router.get('/me', authMiddleware, usuarioController.verPerfil);
router.post('/', authMiddleware, roleMiddleware('admin', 'SuperAdmin'), autorizarCriacaoUsuario, usuarioController.criarUsuario);
router.put('/:id', authMiddleware, usuarioController.atualizarUsuario);
router.delete(
    '/:id',
    authMiddleware,
    roleMiddleware('admin', 'SuperAdmin'),
    autorizarExclusaoUsuario,
    usuarioController.deletarUsuario
);


module.exports = router;