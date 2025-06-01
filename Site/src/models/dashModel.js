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

function getAcertosTotal(idUsuario) {
    console.log(`ACESSEI A DASH MODEL PARA BUSCAR O TOTAL DE ACERTOS DO USUÁRIO: ${idUsuario}`);
    // Soma a pontuação do usuário específico na tabela 'pontuacao'
    var instrucaoSql = `
        SELECT
            SUM(pontos) AS totalAcertos
        FROM
            pontuacao
        WHERE
            fkUsuario = ${idUsuario};
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getQuantidadeTentativa(idUsuario) {
    console.log(`ACESSEI A DASH MODEL PARA BUSCAR A QUANTIDADE DE TENTATIVAS DO USUÁRIO: ${idUsuario}`);
    // Conta quantas entradas (tentativas) o usuário específico tem na tabela 'pontuacao'
    var instrucaoSql = `
        SELECT
            COUNT(idPontuacao) AS totalTentativas
        FROM
            pontuacao
        WHERE
            fkUsuario = ${idUsuario};
    `;
    // Assumi que 'idPontuacao' é a PK da sua tabela 'pontuacao'. Ajuste se for outro nome.
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function getMediaAcertosGlobal() {
    console.log("ACESSEI A DASH MODEL PARA BUSCAR A MÉDIA DE ACERTOS GLOBAL");
    // Calcula a média das pontuações de *todos* os usuários na tabela 'pontuacao'
    var instrucaoSql = `
        SELECT
            AVG(pontos) AS mediaAcertos
        FROM
            pontuacao;
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

module.exports = {
    buscar,
    getAcertosTotal,
    getQuantidadeTentativa,
    getMediaAcertosGlobal
};