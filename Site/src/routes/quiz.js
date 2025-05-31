var express = require("express");
var router = express.Router();

var quizController = require("../controllers/quizController");

router.get("/perguntas", function (req, res) {
    quizController.buscarPerguntas(req, res);
})

router.post("/acertos", function (req, res) {
    quizController.acertos(req, res);
})


module.exports = router;