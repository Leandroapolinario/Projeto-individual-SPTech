const idUsuario = sessionStorage.ID_USUARIO

function voltar() {
    window.location.assign("index.html")
}

let numeroDaQuestaoAtual = 0;
let pontuacaoFinal = 0;
let certas = 0;
let erradas = 0;

function onloadEsconder() {
    document.getElementById('pontuacao').style.display = "none";
    document.getElementById('jogo').style.display = "none";
    document.getElementById('pontuacaoFinalJogo').style.display = "none";
    document.getElementById('btnProx').style.display = "none";
    document.getElementById('btnProx').classList.add("botao_invertido"); // Adiciona a classe invertida ao botão Avançar
    document.getElementById('btnTentarNovamente').style.display = "none";
    document.getElementById('btnDashboard').style.display = "none"; // Esconde o botão Dashboard do final do jogo
    document.getElementById('btnDashboardInicial').style.display = "inline-block"; // Garante que o botão inicial esteja visível ao carregar
}

function iniciarQuiz() {
    document.getElementById('pontuacao').style.display = "flex";
    document.getElementById('jogo').style.display = "flex";
    document.getElementById('btnIniciarQuiz').style.display = "none";
    document.getElementById('btnDashboardInicial').style.display = "none"; // Esconde o novo botão Dashboard ao iniciar o quiz

    document.getElementById('qtdQuestoes').innerHTML = quantidadeDeQuestoes;
    document.getElementById('spanCertas').innerHTML = certas;
    document.getElementById('spanErradas').innerHTML = erradas;

    preencherHTMLcomQuestaoAtual(0);

    document.getElementById('btnSubmeter').disabled = false;
    document.getElementById('btnProx').disabled = true;
    document.getElementById('btnTentarNovamente').disabled = true;

    // Assegura que o Submeter comece como "normal" e o Avançar como "invertido"
    document.getElementById('btnSubmeter').classList.remove("botao_invertido"); // Garante a classe correta
    document.getElementById('btnSubmeter').classList.add("botao_entrar");      // Adiciona a classe correta

    document.getElementById('btnProx').classList.remove("botao_entrar");       // Garante a classe correta
    document.getElementById('btnProx').classList.add("botao_invertido");      // Adiciona a classe correta

    document.getElementById('btnSubmeter').style.display = "inline-block";
    document.getElementById('btnProx').style.display = "none";
    document.getElementById('btnTentarNovamente').style.display = "none";
    document.getElementById('btnDashboard').style.display = "none"; // Garante que Dashboard do final esteja escondido
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

    document.getElementById('btnSubmeter').style.display = "inline-block";
    document.getElementById('btnProx').style.display = "none";
    document.getElementById('btnSubmeter').disabled = false;
    document.getElementById('btnProx').disabled = true;
    document.getElementById('btnDashboard').style.display = "none"; // Garante que Dashboard do final esteja escondido
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

        // Lógica de transformação do botão (display):
        document.getElementById('btnSubmeter').style.display = "none";
        document.getElementById('btnProx').style.display = "inline-block";
        
        // CORREÇÃO NAS LINHAS DE CLASSES:
        // O btnSubmeter vai sumir, mas deve ter a classe normal para a próxima questão
        document.getElementById('btnSubmeter').classList.remove("botao_invertido"); // Remove a classe invertida
        document.getElementById('btnSubmeter').classList.add("botao_entrar");      // Adiciona a classe normal

        // O btnProx vai aparecer e deve ter a classe invertida
        document.getElementById('btnProx').classList.remove("botao_entrar");       // Remove a classe normal
        document.getElementById('btnProx').classList.add("botao_invertido");      // Adiciona a classe invertida
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

    // CORREÇÃO NAS LINHAS DE CLASSES:
    // O btnSubmeter vai aparecer e deve ter a classe normal
    document.getElementById('btnSubmeter').classList.remove("botao_invertido"); // Garante que a invertida seja removida
    document.getElementById('btnSubmeter').classList.add("botao_entrar");      // Adiciona a classe normal

    // O btnProx vai sumir, mas deve ter a classe invertida para a próxima vez que aparecer
    document.getElementById('btnProx').classList.remove("botao_entrar");       // Garante que a normal seja removida
    document.getElementById('btnProx').classList.add("botao_invertido");      // Adiciona a classe invertida

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

    // Adiciona a pontuação final ao texto da mensagem
    textoParaMensagemFinal += "<br> Você acertou " + Math.round((porcentagemFinalDeAcertos) * 100) + "% das questões.";

    // Esconde os elementos do jogo e pontuação durante o jogo
    document.getElementById('infoQuestao').style.display = "none";
    document.getElementById('perguntaDaQuestaoAtual').style.display = "none";
    document.getElementById('infoAlternativas').style.display = "none";
    document.getElementById('opcoes').style.display = "none";
    document.getElementById('btnSubmeter').style.display = "none";
    document.getElementById('btnProx').style.display = "none";
    document.getElementById('pontuacaoDuranteJogo').style.display = "none";

    // Mostra a área de pontuação final
    document.getElementById('pontuacaoFinalJogo').style.display = "flex";

    // Preenche a pontuação final e a mensagem
    document.getElementById('spanPontuacaoFinal').innerHTML = `${pontuacaoFinal}/${quantidadeDeQuestoes}`;
    document.getElementById('msgFinal').innerHTML = textoParaMensagemFinal;
    document.getElementById('msgFinal').className = `final-message ${classComCoresParaMensagemFinal}`;

    // Habilita e mostra os botões "Tentar novamente" e "Dashboard"
    document.getElementById('btnTentarNovamente').disabled = false;
    document.getElementById('btnTentarNovamente').style.display = "inline-block";
    document.getElementById('btnDashboard').style.display = "inline-block"; // Mostra o botão Dashboard
    document.getElementById('btnDashboardInicial').style.display = "none"; // Garante que o botão inicial esteja escondido
    
    fetch("/quiz/acertos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            pontuacaoServer: pontuacaoFinal,
            idUsuarioServer: idUsuario,
        })
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                console.log(`Pontuação enviada para o banco de dados`)
            } else {
                throw "Houve um erro ao enviar sua pontuação";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function sortearAlternativas(alternativas) {
    for (var i = alternativas.length - 1; i > 0; i--) {
        const sortear = Math.floor(Math.random() * (i + 1));
        [alternativas[i], alternativas[sortear]] = [alternativas[sortear], alternativas[i]];
    }
    return alternativas;
}

var listaDeQuestoes = [];
var quantidadeDeQuestoes = 0;

window.onload = () => {
    fetch('/quiz/perguntas')
        .then(res => res.json())
        .then(data => {
            const perguntasAgrupadas = {};

            data.forEach(item => {
                if (!perguntasAgrupadas[item.idPergunta]) {
                    perguntasAgrupadas[item.idPergunta] = {
                        pergunta: item.pergunta,
                        respostas: []
                    };
                }

                perguntasAgrupadas[item.idPergunta].respostas.push({
                    texto: item.opcao,
                    correta: item.correta == 1
                });
            });

            listaDeQuestoes = Object.values(perguntasAgrupadas).map(p => {
                let alternativas = p.respostas;
                alternativas = sortearAlternativas(alternativas);

                return {
                    pergunta: p.pergunta,
                    alternativaA: alternativas[0]?.texto || '',
                    alternativaB: alternativas[1]?.texto || '',
                    alternativaC: alternativas[2]?.texto || '',
                    alternativaD: alternativas[3]?.texto || '',
                    alternativaCorreta:
                    alternativas[0]?.correta ? "alternativaA" :
                    alternativas[1]?.correta ? "alternativaB" :
                    alternativas[2]?.correta ? "alternativaC" :
                    alternativas[3]?.correta ? "alternativaD" : ""
                };
            });

            quantidadeDeQuestoes = listaDeQuestoes.length;
        })
        .catch(err => console.error("Erro ao carregar perguntas:", err));
};

