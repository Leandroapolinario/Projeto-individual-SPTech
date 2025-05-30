var quizModel = require("../models/quizModel");

function buscarPerguntas(req, res) {
    quizModel.buscarPerguntas()
        .then(resultado => res.json(resultado)) 
        .catch(erro => {
            console.error("Erro ao buscar perguntas:", erro)
            res.status(500).json({ erro: "Erro ao buscar perguntas" })
        });
}

module.exports = {
    buscarPerguntas
}