var database = require('../database/config');

function buscarPerguntas() {
    const instrucaoSQL = `
    SELECT 
        p.idPergunta, 
        p.questao AS pergunta, 
        a.idAlternativa, 
        a.opcao, 
        a.correta
    FROM alternativa as a 
    JOIN pergunta as p 
    ON fkPergunta = idPergunta;
    `;
    console.log("Executando a instrução SQL:\n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

function acertos(idUsuario, pontuacao) {
    const instrucaoSQL = `
    INSERT INTO pontuacao (fkUsuario, fkQuiz, pontos) VALUES
    (${idUsuario}, 1, ${pontuacao})
    `;
    console.log("Executando a instrução SQL:\n" + instrucaoSQL);
    return database.executar(instrucaoSQL);
}

module.exports = {
    buscarPerguntas,
    acertos
}