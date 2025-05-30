var dashModel = require("../models/dashModel");

function buscar(req, res) {

    var idUsuario = req.params.id

    dashModel.buscar(idUsuario)
        .then(function (resultado) {
            res.status(200).json(resultado)
        })
        .catch(erro => {
            console.error("Erro ao buscar perguntas:", erro)
            res.status(500).json({ erro: "Erro ao buscar perguntas" })
        });
}

module.exports = {
    buscar
}