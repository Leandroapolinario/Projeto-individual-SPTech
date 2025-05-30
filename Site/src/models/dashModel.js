// usuarioModel.js

var database = require("../database/config");

function buscar(idUsuario) {
    console.log("ACESSEI A DASH MODEL PARA BUSCAR PONTUAÇÃO:", idUsuario);
    var instrucaoSql = `
         SELECT * FROM pontuacao WHERE fkUsuario = ${idUsuario}`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar
};