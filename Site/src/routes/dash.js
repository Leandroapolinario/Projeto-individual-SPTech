var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

// Rota para Logar
router.get("/buscarPontuacao/:id", function (req, res) {
    dashController.buscar(req, res);
});

// Rota para buscar o ranking
router.get("/buscarRanking", function (req, res) {
    dashController.buscarRanking(req, res);
});

// Rota para buscar a média
router.get("/buscarMedia", function (req, res) {
    dashController.buscarMedia(req, res);
});

// Rota para acertos totais
router.get("/acertosTotais", function (req, res) {
    dashController.acertosTotais(req, res);
});

// Nova rota para buscar o total de acertos do usuário logado
router.get("/acertosTotal/:idUsuario", function (req, res) {
    dashController.getAcertosTotal(req, res);
});

// Nova rota para buscar a quantidade de tentativas do usuário logado
router.get("/quantidadeTentativa/:idUsuario", function (req, res) {
    dashController.getQuantidadeTentativa(req, res);
});

// Nova rota para buscar a média de acertos de TODOS os usuários
router.get("/mediaAcertosGlobal", function (req, res) {
    dashController.getMediaAcertosGlobal(req, res);
});

module.exports = router;