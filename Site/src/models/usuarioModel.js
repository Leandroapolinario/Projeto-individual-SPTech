var database = require("../database/config");

function cadastrar(nome, senha) {
    console.log("ACESSEI O USUARIO MODEL PARA CADASTRO:", nome, senha);
    var instrucaoSql = `
         INSERT INTO Usuario (nome, senha) VALUES ('${nome}', '${senha}')`;
    // ... (seu código de cadastro)
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}


function logar(nomeUsuario,senha) { // Alteramos o parâmetro para nomeUsuario
    console.log("ACESSEI O USUARIO MODEL PARA LOGIN COM NOME: ", nomeUsuario);

    var instrucaoSql = `
        SELECT idUsuario, nome, senha
        FROM Usuario
        WHERE nome = '${nomeUsuario}' and senha = '${senha}';
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    cadastrar,
    logar
};