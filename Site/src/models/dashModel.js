// dashModel.js

var database = require("../database/config");

function buscar(idUsuario) {
    console.log("ACESSEI A DASH MODEL PARA BUSCAR PONTUAÇÃO (TOP 10):", idUsuario);
    var instrucaoSql = `
    SELECT
        SUM(p.pontos) AS pontos,
        u.nome AS nome
    FROM
        pontuacao AS p
    JOIN
        Quiz AS q ON q.idQuiz = p.fkQuiz
    JOIN
        Usuario AS u ON u.idUsuario = p.fkUsuario
    GROUP BY
        u.nome
    ORDER BY
        pontos DESC  -- Ordena os resultados pela pontuação de forma descendente
    LIMIT 10;        -- Limita a consulta aos 10 primeiros resultados
    `;

    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar
};