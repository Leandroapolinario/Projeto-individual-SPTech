// usuarioController.js

var usuarioModel = require("../models/usuarioModel");

function cadastrar(req, res) {

    var nomeUsuario = req.body.nomeServer;
    var senha = req.body.senhaServer;

    if (nomeUsuario === undefined || senha === undefined) {
        res.status(400).send("Nome de usuário e senha são obrigatórios!");
    }

    usuarioModel.cadastrar(nomeUsuario, senha)
    .then(
        function (resultado) {
            res.json(resultado)
        }
    ).catch(
        function (erro) {
            console.log(erro)
            console.log(
                "\nHouve um erro ao realizar cadastro",
                erro.sqlMessage
            )
            res.status(500).json(erro.sqlMessage)
        }
    )
}

function logar(req, res) {
    var nomeUsuario = req.body.usuarioServer; // O front-end ainda envia como emailServer, vamos usar esse valor como nome
    var senha = req.body.senhaServer;

    if (nomeUsuario === undefined || senha === undefined) {
        res.status(400).send("Nome de usuário e senha são obrigatórios!");
        return false;
    }

    usuarioModel.logar(nomeUsuario, senha)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    const usuario = resultado[0];
                    if (senha === usuario.senha) { // *** AVISO: Inseguro em produção! Use hashing.
                        res.json({
                            idUsuario: usuario.idUsuario,
                            nome: usuario.nome,
                            descricao: usuario.descricao,
                            imagem_perfil: usuario.imagem_perfil
                        });
                    } else {
                        res.status(403).send("Senha incorreta!");
                    }
                } else {
                    res.status(404).send("Usuário com este nome não encontrado!");
                }
            }
        ).catch(
            function (erro) {
                console.error("\nHouve um erro ao realizar o login! Erro:", erro);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

module.exports = {
    cadastrar,
    logar
};