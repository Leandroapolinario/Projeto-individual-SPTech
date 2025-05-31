var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

// Rota para Logar
router.get("/buscarPontuacao/:id", function (req, res) {
    dashController.buscar(req, res);
});


router.get("/buscarRanking", function (req, res) {
    dashController.buscarRanking(req, res);
});

router.get("/buscarMedia", function (req, res) {
    dashController.buscarMedia(req, res);
});

router.get("/acertosTotais", function (req, res) {
    dashController.acertosTotais(req, res);
});


module.exports = router;