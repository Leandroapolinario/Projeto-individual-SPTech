// usuarioModel.js

var database = require("../database/config");

function buscar(idUsuario) {
    console.log("ACESSEI A DASH MODEL PARA BUSCAR PONTUAÇÃO:", idUsuario);
    var instrucaoSql = `
   select SUM(p.pontos) as pontos, u.nome as nome FROM pontuacao AS p
    JOIN Quiz AS q ON q.idQuiz = p.fkQuiz
    JOIN Usuario AS u ON u.idUsuario = p.fkUsuario group by u.nome;`;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar
};