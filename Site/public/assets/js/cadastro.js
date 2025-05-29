  function apagar() {
        input_senha.value = "";
        input_senhaConfirmacao.value = "";
        input_nome.value = "";
    }

    function mostrarSenha() {
        var inputSenha = document.getElementById("input_senha");
        var olhoFechadoImg = document.getElementById("olhoFechado");
        var olhoAbertoImg = document.getElementById("olhoAberto");

        if (inputSenha.type === "password") {
            inputSenha.type = "text";
            olhoFechadoImg.classList.add("hide");
            olhoAbertoImg.classList.remove("hide");

        } else {
            inputSenha.type = "password";
            olhoFechadoImg.classList.remove("hide");
            olhoAbertoImg.classList.add("hide");

        }
    }

    function mostrarConfirmacao() {
        var inputConfirmarSenha = document.getElementById("input_senhaConfirmacao");
        var olhoFechadoImgConfirmacao = document.getElementById("olhoFechadoConfirmacao");
        var olhoAbertoImgConfirmacao = document.getElementById("olhoAbertoConfirmacao");

        if (inputConfirmarSenha.type === "password") {
            inputConfirmarSenha.type = "text";
            olhoFechadoImgConfirmacao.classList.add("hide");
            olhoAbertoImgConfirmacao.classList.remove("hide");
        } else {
            inputConfirmarSenha.type = "password";
            olhoFechadoImgConfirmacao.classList.remove("hide");
            olhoAbertoImgConfirmacao.classList.add("hide");
        }
    }



    function voltar() {

        window.location.assign("index.html")
    }



    function cadastrar() {
        var maiuscula = /[A-Z]/;
        var minuscula = /[a-z]/;
        var simbolo = /[!@#$]/;
        var numero = /[0-9]/;

        var nomeVar = input_nome.value;
        var senhaVar = input_senha.value;
        var confirmarSenhaVar = input_senhaConfirmacao.value;

        var temMaiuscula = maiuscula.test(senhaVar);
        var temMinuscula = minuscula.test(senhaVar);
        var temSimbolo = simbolo.test(senhaVar);
        var temNumerico = numero.test(senhaVar);
        var temTamanho = senhaVar.length >= 8;

        var senhaForte = temMaiuscula && temMinuscula && temSimbolo && temNumerico && temTamanho;

        if (nomeVar == "" || senhaVar == "" || confirmarSenhaVar == "") {
            alert("Preencha todos os campos!");
        } else if (!senhaForte) {
            alert("Senha fraca! Deve conter 8 caracteres, maiúscula, minúscula, número e símbolo.");
        } else if (senhaVar !== confirmarSenhaVar) {
            alert("As senhas não coincidem.");
        } else {
            alert("Usuário cadastrado com sucesso!");

            console.log(`Estou no cadastro`)
            fetch("/usuarios/cadastrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                   
                    nomeServer: nomeVar,
                    senhaServer: senhaVar,
                })
            })
                .then(function (resposta) {
                    console.log("resposta: ", resposta);

                    if (resposta.ok) {

                        window.location = "./tela-login.html";

                    } else {

                        throw "Houve um erro ao tentar realizar o cadastro!";
                    }

                })
                .catch(function (resposta) {
                    console.log(`#ERRO: ${resposta}`);
                });

        }
        return false;

        
    }