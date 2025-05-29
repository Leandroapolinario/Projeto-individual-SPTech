   function apagar() {
        document.getElementById("input_usuario").value = ``;
        input_senha.value = ``;
    }

function voltar() {

        window.location.assign("index.html")
    }


   function entrar() {
    var usuarioVar = input_usuario.value;
    var senhaVar = input_senha.value;

    if (usuarioVar == `` || senhaVar == ``) {
        div_condicao_cadastrar.innerHTML = `<div class="errado">Preencha todos os campos para efetivar o login</div>`;
    } else {
        fetch("/usuarios/logar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usuarioServer: usuarioVar,
                senhaServer: senhaVar
            })
        }).then(function (resposta) {
            console.log("Estou no THEN do login()");

            if (resposta.ok) {
                console.log(resposta);

                resposta.json().then(json => {
                    console.log(json);
                    console.log(JSON.stringify(json));

                    sessionStorage.ID_USUARIO = json.idUsuario;
                    sessionStorage.NOME_USUARIO = json.nome;
                    
                    console.log("window.location = site/explorer.html");
                    window.location.assign("tela-quiz.html")

                });
            } else {
                console.log("Houve um problema ao tentar realizar o login!");

                resposta.text().then(texto => {
                    console.error(texto);
                    div_condicao_cadastrar.innerHTML = `<div class="errado">${texto}</div>`; // ALTERAÇÃO: Exibe a mensagem do servidor
                    return true;
                });
            }
        }).catch(function (erro) {
            console.log(erro);
        });
        return false;
    }
}