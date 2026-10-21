const usuarioRepository = require('../repositories/usuarioRepository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * GRUPO 1: CONTROLADOR DE USUÁRIOS
 */
const login = async (req, res) => {
    // TODO: Autenticar email/senha, e gerar JWT contendo { id, cargo }
    res.status(501).json({ mensagem: 'usuarioController.login ainda não implementado.' });
};

const criarUsuario = async (req, res) => {
    // TODO:
    // Regra RBAC de Cadastro:
    // - Se req.usuario_cargo === "SuperAdmin": pode criar "admin" ou "usuario"
    // - Se req.usuario_cargo === "admin": só pode criar "usuario"

    try {
        const { nome, email, senha, cargo } = req.body;
        if (cargo === "SuperAdmin") {
            if (!nome || !email || !senha || !(cargo === "admin") || !(cargo === "usuario")) {
                return res.status(400).json({ mensagem: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' });
            }

            const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com este e-mail.' });
            }

            const senha_hash = await bcrypt.hash(senha, 10);
            
            const novoUsuario = await usuarioRepository.criar(nome, email, senha_hash, cargo);
            return res.status(201).json(novoUsuario);
        }

        if (cargo === "admin") {
            if (!nome || !email || !senha || !(cargo === "usuario")) {
                return res.status(400).json({ mensagem: 'Dados incompletos. Por favor, preencha todos os campos obrigatórios.' });
            }

            const usuarioExistente = await usuarioRepository.buscarPorEmail(email);
            if (usuarioExistente) {
                return res.status(409).json({ mensagem: 'Já existe um usuário cadastrado com este e-mail.' });
            }

            const senha_hash = await bcrypt.hash(senha, 10);
            
            const novoUsuario = await usuarioRepository.criar(nome, email, senha_hash, cargo);
            return res.status(201).json(novoUsuario);
        }

        return res.status(403).json({ mensagem: 'Não permitido criar usuário.' })
        

        
    } catch (erro) {
        console.error('Erro ao criar usuário:', erro);
        return res.status(500).json({ mensagem: 'Ocorreu um erro ao criar o usuário. Por favor, tente novamente mais tarde.' });
    }
    
};

const verPerfil = async (req, res) => {
    // TODO: Buscar usuário por id (req.usuario_id)
    res.status(501).json({ mensagem: 'usuarioController.verPerfil ainda não implementado.' });
};

module.exports = { login, criarUsuario, verPerfil };