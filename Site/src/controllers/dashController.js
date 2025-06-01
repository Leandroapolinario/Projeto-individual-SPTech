var dashModel = require("../models/dashModel");

function buscar(req, res) {
    var idUsuario = req.params.id;

    dashModel.buscar(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado);
        })
        .catch(erro => {
            console.error("Erro ao buscar perguntas:", erro);
            res.status(500).json({ erro: "Erro ao buscar perguntas" });
        });
}

// --- NOVAS FUNÇÕES PARA O CONTROLADOR ---

function getAcertosTotal(req, res) {
    const idUsuario = req.params.idUsuario; // Pega o ID do usuário da rota

    dashModel.getAcertosTotal(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Retorna o primeiro (e único) resultado esperado
                res.status(200).json({ totalAcertos: resultado[0].totalAcertos || 0 });
            } else {
                res.status(200).json({ totalAcertos: 0 }); // Retorna 0 se não encontrar
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar total de acertos:", erro);
            res.status(500).json({ erro: "Erro ao buscar total de acertos" });
        });
}

function getQuantidadeTentativa(req, res) {
    const idUsuario = req.params.idUsuario; // Pega o ID do usuário da rota

    dashModel.getQuantidadeTentativa(idUsuario)
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json({ totalTentativas: resultado[0].totalTentativas || 0 });
            } else {
                res.status(200).json({ totalTentativas: 0 });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar quantidade de tentativas:", erro);
            res.status(500).json({ erro: "Erro ao buscar quantidade de tentativas" });
        });
}

function getMediaAcertosGlobal(req, res) {
    dashModel.getMediaAcertosGlobal()
        .then(function (resultado) {
            if (resultado.length > 0) {
                // Retorna a média formatada ou 0 se for null
                res.status(200).json({ mediaAcertos: resultado[0].mediaAcertos ? parseFloat(resultado[0].mediaAcertos).toFixed(2) : 0 });
            } else {
                res.status(200).json({ mediaAcertos: 0 });
            }
        })
        .catch(erro => {
            console.error("Erro ao buscar média de acertos global:", erro);
            res.status(500).json({ erro: "Erro ao buscar média de acertos global" });
        });
}


module.exports = {
    buscar,
    // Adicione as novas funções ao seu module.exports
    getAcertosTotal,
    getQuantidadeTentativa,
    getMediaAcertosGlobal
};