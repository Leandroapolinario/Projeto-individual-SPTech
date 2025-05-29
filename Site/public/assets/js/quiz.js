 function voltar() {

            window.location.assign("index.html")
        }

        const listaDeQuestoes = [
            {
                pergunta: "O mês que a Juju nasceu?",
                alternativaA: "Janeiro",
                alternativaB: "Dezembro",
                alternativaC: "Abril",
                alternativaD: "Junho",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "A Júlia é de que signo?",
                alternativaA: "Áries",
                alternativaB: "Peixes",
                alternativaC: "Escorpião",
                alternativaD: "Touro",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Qual o dia que a Júlia e o tio Lê se conheceram pessoalmente?",
                alternativaA: "31",
                alternativaB: "22",
                alternativaC: "18",
                alternativaD: "26",
                alternativaCorreta: "alternativaD"
            },
            {
                pergunta: "Quantos anos a Júlia tem?",
                alternativaA: "4 anos",
                alternativaB: "5 anos",
                alternativaC: "2 anos",
                alternativaD: "3 anos",
                alternativaCorreta: "alternativaA"
            },
            {
                pergunta: "Qual a personagem que a Jujuba ama?",
                alternativaA: "Kristoff, de Frozen",
                alternativaB: "Simba, do Rei Leão",
                alternativaC: "Sky, Patrulha Canina",
                alternativaD: "Princesa Jujuba, da Hora da Aventura",
                alternativaCorreta: "alternativaC"
            },
            {
                pergunta: "Qual a cor favorita da Ju?",
                alternativaA: "Lilás",
                alternativaB: "Azul Claro",
                alternativaC: "Laranja",
                alternativaD: "Rosa",
                alternativaCorreta: "alternativaD"
            }

        ];

        let numeroDaQuestaoAtual = 0;
        let pontuacaoFinal = 0;
        let certas = 0;
        let erradas = 0;
        const quantidadeDeQuestoes = listaDeQuestoes.length;

        function onloadEsconder() {
            document.getElementById('pontuacao').style.display = "none";
            document.getElementById('jogo').style.display = "none";
            document.getElementById('pontuacaoFinalJogo').style.display = "none";
        }

        function iniciarQuiz() {
            document.getElementById('pontuacao').style.display = "flex";
            document.getElementById('jogo').style.display = "flex";
            document.getElementById('btnIniciarQuiz').style.display = "none";

            document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes;
            document.getElementById('spanCertas').innerHTML = certas;
            document.getElementById('spanErradas').innerHTML = erradas;


            preencherHTMLcomQuestaoAtual(0);

            document.getElementById('btnSubmeter').disabled = false;
            document.getElementById('btnProx').disabled = true;
            document.getElementById('btnTentarNovamente').disabled = true;
        }

        function preencherHTMLcomQuestaoAtual(index) {
            habilitarAlternativas(true);
            const questaoAtual = listaDeQuestoes[index];
            numeroDaQuestaoAtual = index;
            document.getElementById("spanNumeroDaQuestaoAtual").innerHTML = Number(index) + 1;
            document.getElementById("spanQuestaoExibida").innerHTML = questaoAtual.pergunta;
            document.getElementById("labelOpcaoUm").innerHTML = questaoAtual.alternativaA;
            document.getElementById("labelOpcaoDois").innerHTML = questaoAtual.alternativaB;
            document.getElementById("labelOpcaoTres").innerHTML = questaoAtual.alternativaC;
            document.getElementById("labelOpcaoQuatro").innerHTML = questaoAtual.alternativaD;
        }

        function submeter() {
            const options = document.getElementsByName("option");
            let selectedOption = null;

            for (let i = 0; i < options.length; i++) {
                if (options[i].checked) {
                    selectedOption = options[i];
                    break;
                }
            }

            if (!selectedOption) {
                alert("Não há alternativas escolhidas. Escolha uma opção.");
            } else {
                document.getElementById('btnSubmeter').disabled = true;
                document.getElementById('btnProx').disabled = false;
                habilitarAlternativas(false);
                checarResposta(selectedOption.value);
            }
        }

        function habilitarAlternativas(trueOrFalse) {
            const options = document.getElementsByName("option");
            for (let i = 0; i < options.length; i++) {
                options[i].disabled = !trueOrFalse;
            }
        }

        function avancar() {
            document.getElementById('btnProx').disabled = true;
            document.getElementById('btnSubmeter').disabled = false;

            desmarcarRadioButtons();
            limparCoresBackgroundOpcoes();

            if (numeroDaQuestaoAtual < quantidadeDeQuestoes - 1) {
                numeroDaQuestaoAtual++;
                preencherHTMLcomQuestaoAtual(numeroDaQuestaoAtual);
            } else {
                finalizarJogo();
            }
        }

        function tentarNovamente() {
            window.location.reload();
        }

        function checarResposta(respostaUsuario) {
            const questaoAtual = listaDeQuestoes[numeroDaQuestaoAtual];
            const respostaCorretaDaQuestao = questaoAtual.alternativaCorreta;

            const options = document.getElementsByName("option");
            let labelCorretaId = null;

            options.forEach((option) => {
                if (option.value === respostaCorretaDaQuestao) {
                    labelCorretaId = option.labels[0].id;
                }
            });

            if (respostaUsuario === respostaCorretaDaQuestao) {
                document.getElementById(labelCorretaId).classList.add("text-success-with-bg");
                pontuacaoFinal++;
                certas++;
            } else {
                const labelErradaId = document.querySelector(`input[value="${respostaUsuario}"]`).labels[0].id;
                document.getElementById(labelErradaId).classList.add("text-danger-with-bg");
                document.getElementById(labelCorretaId).classList.add("text-success-with-bg");
                erradas++;
            }
            document.getElementById("spanCertas").innerHTML = certas;
            document.getElementById("spanErradas").innerHTML = erradas;
        }

        function limparCoresBackgroundOpcoes() {
            const options = document.getElementsByName("option");
            options.forEach((option) => {
                document.getElementById(option.labels[0].id).classList.remove("text-danger-with-bg");
                document.getElementById(option.labels[0].id).classList.remove("text-success-with-bg");
            });
        }

        function desmarcarRadioButtons() {
            const options = document.getElementsByName("option");
            for (let i = 0; i < options.length; i++) {
                options[i].checked = false;
            }
        }

        function finalizarJogo() {
            let textoParaMensagemFinal = null;
            let classComCoresParaMensagemFinal = null;
            const porcentagemFinalDeAcertos = pontuacaoFinal / quantidadeDeQuestoes;

            if (porcentagemFinalDeAcertos <= 0.3) {
                textoParaMensagemFinal = "Parece que você não estudou...";
                classComCoresParaMensagemFinal = "text-danger-with-bg";
            } else if (porcentagemFinalDeAcertos > 0.3 && porcentagemFinalDeAcertos < 0.9) {
                textoParaMensagemFinal = "Pode melhorar na próxima, hein!";
                classComCoresParaMensagemFinal = "text-warning-with-bg";
            } else if (porcentagemFinalDeAcertos >= 0.9) {
                textoParaMensagemFinal = "Uau, parabéns!";
                classComCoresParaMensagemFinal = "text-success-with-bg";
            }


            textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões.";

            document.getElementById('jogo').style.display = "flex";  // Não esconda o container inteiro
            document.getElementById('infoQuestao').style.display = "none";
            document.getElementById('perguntaDaQuestaoAtual').style.display = "none";
            document.getElementById('infoAlternativas').style.display = "none";
            document.getElementById('opcoes').style.display = "none";
            document.getElementById('btnSubmeter').style.display = "none";
            document.getElementById('btnProx').style.display = "none";
            document.getElementById('btnTentarNovamente').disabled = false;
            document.getElementById('btnTentarNovamente').style.display = "inline-block";

        }