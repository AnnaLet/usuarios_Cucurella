const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: CONTROLADOR DE USUÁRIOS
 */
const login = async (req, res) => {
    try {
   
    
const { email, senha } = req.body;

    // 1. Busca se o email existe no banco
    const usuario = await usuarioRepository.buscarPorEmail(email);
    if (!usuario) {
        // Por segurança, não confirmamos qual campo errou.
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 2. Comparando a senha (bcrypt cuida de extrair o Salt sozinho)
    const senhaValida = await bcrypt.compare(senha, usuario.senha_hash); // 👈 Comparação segura

    if (!senhaValida) {
        return res.status(401).json({ mensagem: 'Credenciais inválidas.' });
    }

    // 3. Sucesso!
    const token = jwt.sign(
      { id: usuario.id, cargo: usuario.cargo}, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ 
      mensagem: 'Login realizado com sucesso!', 
      token: token 
    });
      } catch (erro) {
        console.error(erro);
        res.status(500).json({ mensagem: 'Erro interno ao realizar login.' });
    }
};

const criarUsuario = async (req, res) => {
    // TODO:
    // Regra RBAC de Cadastro:
    // - Se req.usuario_cargo === "SuperAdmin": pode criar "admin" ou "usuario"
    // - Se req.usuario_cargo === "admin": só pode criar "usuario"
    res.status(501).json({ mensagem: 'usuarioController.criarUsuario ainda não implementado.' });
};

const verPerfil = async (req, res) => {
    // TODO: Buscar usuário por id (req.usuario_id)
    res.status(501).json({ mensagem: 'usuarioController.verPerfil ainda não implementado.' });
};

module.exports = { login, criarUsuario, verPerfil };