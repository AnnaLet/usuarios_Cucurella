const pool = require('../config/db');

/**
 * GRUPO 1: USUÁRIOS
 */

// Insere um novo usuário e retorna o registro criado
const criar = async (nome, email, senha_hash, cargo) => {
    const sql = 'INSERT INTO usuarios (nome, email, senha_hash, cargo) VALUES ($1, $2, $3, $4) RETURNING id, nome, email, cargo, criado_em';
    const resultado = await pool.query(sql, [nome, email, senha_hash, cargo]);

    return resultado.rows[0];
    // TODO: Implementar SQL INSERT INTO usuarios ... RETURNING id, nome, email, cargo, criado_em
};

// Atualiza os dados do usuário e retorna o registro atualizado
const atualizar = async (nome, email, senha_hash, id) => {
    const sql = `UPDATE usuarios
        SET nome = COALESCE(NULLIF($1, ''), nome),
            email = COALESCE(NULLIF($2, ''), email),
            senha_hash = COALESCE(NULLIF($3, ''), senha_hash)
        WHERE id = $4
        RETURNING id, nome, email, cargo, criado_em`;
    const resultado = await pool.query(sql, [nome, email, senha_hash, id]);
    return resultado.rows[0];
};

// Atualiza o nome do usuário
const atualizarNome = async (nome, id) => {
    const sql = 'UPDATE usuarios SET nome = $1 WHERE id = $2 RETURNING nome';
    const resultado = await pool.query(sql, [ nome, id ]);
    return resultado.rows[0];
}

// Atualiza o email do usuário
const atualizarEmail = async (email, id) => {
    const sql = 'UPDATE usuarios SET email = $1 WHERE id = $2 RETURNING email';
    const resultado = await pool.query(sql, [ email, id ]);
    return resultado.rows[0];
};

// Atualiza a senha do usuário
const atualizarSenha = async (senha_hash, id) => {
    const sql = 'UPDATE usuarios SET senha_hash = $1 WHERE id = $2 RETURNING senha_hash';
    const resultado = await pool.query(sql, [ senha_hash, id ]);
    return resultado.rows[0];
}

// Busca usuário por email para login
const buscarPorEmail = async (email) => {
    const sql = 'SELECT * FROM usuarios WHERE email = $1';
    const resultado = await pool.query(sql, [email]);
    return resultado.rows[0];
    };

// Busca usuário por ID para o perfil
const buscarPorId = async (id) => {
    const sql = 'SELECT id, nome, email, cargo, criado_em FROM usuarios WHERE id = $1';
    const resultado = await pool.query(sql, [id]);
    return resultado.rows[0];
};

// Deleta um usuário por ID
const deletarUsuario = async (id) => {
    const sql = 'DELETE FROM usuarios WHERE id = $1';
    await pool.query(sql, [id]);
};

module.exports = {
    criar, 
    buscarPorEmail, 
    buscarPorId, 
    atualizar, 
    atualizarNome, 
    atualizarEmail, 
    atualizarSenha, 
    deletarUsuario 
};