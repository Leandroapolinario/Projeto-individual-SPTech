// usuarioModel.js

var database = require("../database/config");

function cadastrar(nome, senha) {
    // ... (seu código de cadastro)
}

function logar(nomeUsuario) { // Alteramos o parâmetro para nomeUsuario
    console.log("ACESSEI O USUARIO MODEL PARA LOGIN COM NOME: ", nomeUsuario);

    var instrucaoSql = `
        SELECT idUsuario, nome, senha, descricao, imagem_perfil
        FROM usuario
        WHERE nome = '${nomeUsuario}'; // Buscamos pelo nome
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    logar
};