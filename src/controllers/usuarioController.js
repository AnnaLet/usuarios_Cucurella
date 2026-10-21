const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: CONTROLADOR DE USUÁRIOS
 */
const login = async (req, res) => {
    // TODO: Autenticar email/senha, e gerar JWT contendo { id, cargo }
    
const { email, senha } = req.body;

    // 1. Busca se o email existe no banco
    const conta = await ContaRepository.buscarContaPorEmail(email);
    if (!conta) {
        // Por segurança, não confirmamos qual campo errou.
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 2. Comparando a senha (bcrypt cuida de extrair o Salt sozinho)
    const senhaValida = await bcrypt.compare(senha, conta.senha_hash); // 👈 Comparação segura

    if (!senhaValida) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 3. Sucesso!
    const token = jwt.sign(
      { id: conta.id }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      mensagem: 'Login realizado com sucesso!', 
      token: token 
    });
};

const criarUsuario = async (req, res) => {
    // TODO:
    // Regra RBAC de Cadastro:
    // - Se req.usuario_cargo === "SuperAdmin": pode criar "admin" ou "usuario"
    // - Se req.usuario_cargo === "admin": só pode criar "usuario"
    res.status(501).json({ mensagem: 'usuarioController.criarUsuario ainda não implementado.' });
};

const verPerfil = async (req, res) => {
    try {
        const id = req.usuario_id;
        const usuario = await usuarioRepository.buscarPorId(id);
        res.json(usuario);
    } catch (erro) {
        res.status(500).json({mensagem: "Erro busca perfil."});
    }
    // TODO: Buscar usuário por id (req.usuario_id)
    res.status(501).json({ mensagem: 'usuarioController.verPerfil ainda não implementado.' });
};

module.exports = { login, criarUsuario, verPerfil };