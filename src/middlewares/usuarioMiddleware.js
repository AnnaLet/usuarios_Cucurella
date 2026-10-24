const usuarioRepository = require('../repositories/usuarioRepository');

const autorizarCriacaoUsuario = (req, res, next) => {
    const { usuario_cargo } = req;
    const { cargo } = req.body;

    if (usuario_cargo === 'SuperAdmin') {
        if (!['admin', 'usuario'].includes(cargo)) {
            return res.status(400).json({
                mensagem: 'O SuperAdmin só pode criar contas admin ou usuario.'
            });
        }

        return next();
    }

    if (usuario_cargo === 'admin') {
        if (cargo !== 'usuario') {
            return res.status(403).json({
                mensagem: 'Administradores só podem criar contas usuario.'
            });
        }

        return next();
    }

    return res.status(403).json({
        mensagem: 'Você não tem permissão para criar usuários.'
    });
};

const autorizarExclusaoUsuario = async (req, res, next) => {
    try {
        const usuarioAlvo = await usuarioRepository.buscarPorId(req.params.id);

        if (!usuarioAlvo) {
            return res.status(404).json({
                mensagem: 'Usuário não encontrado.'
            });
        }

        const podeExcluir =
            (req.usuario_cargo === 'SuperAdmin' &&
                ['admin', 'usuario'].includes(usuarioAlvo.cargo)) ||
            (req.usuario_cargo === 'admin' && usuarioAlvo.cargo === 'usuario');

        if (!podeExcluir) {
            return res.status(403).json({
                mensagem: 'Você não tem permissão para excluir este usuário.'
            });
        }

        next();
    } catch (erro) {
        console.error('Erro ao autorizar exclusão de usuário:', erro.message);
        return res.status(500).json({
            mensagem: 'Erro ao verificar permissão para excluir usuário.'
        });
    }
};

module.exports = { autorizarCriacaoUsuario, autorizarExclusaoUsuario };