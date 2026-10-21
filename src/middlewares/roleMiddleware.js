/**
 * GRUPO 1: MIDDLEWARE DE AUTORIZAÇÃO (RBAC)
 */
const autorizarCargos = (...cargosPermitidos) => {
    return (req, res, next) => {
        const cargoUsuario = req.usuario_cargo;
        if (!cargosPermitidos.includes(cargoUsuario)) {
            return res.status(403).json({ mensagem: 'Acesso negado. Você não tem permissão para acessar este recurso.' });
        }
        next();
    };
};

module.exports = autorizarCargos;