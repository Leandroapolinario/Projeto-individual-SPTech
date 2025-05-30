var express = require("express");
var router = express.Router();

var dashController = require("../controllers/dashController");

// Rota para Logar
router.get("/buscarPontuacao/:id", function (req, res) {
    dashController.buscar(req, res);
});

module.exports = router;