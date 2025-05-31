
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
    document.getElementById('btnTentarNovamente').style.display = "none";
    document.getElementById('btnDashboard').style.display = "none"; // Esconde o botão Dashboard
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

    document.getElementById('btnSubmeter').style.display = "inline-block";
    document.getElementById('btnProx').style.display = "none";
    document.getElementById('btnTentarNovamente').style.display = "none";
    document.getElementById('btnDashboard').style.display = "none"; // Garante que Dashboard esteja escondido
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
    document.getElementById('btnDashboard').style.display = "none"; // Garante que Dashboard esteja escondido
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

        // LINHAS ADICIONADAS AQUI PARA A TRANSFORMAÇÃO DO BOTÃO:
        document.getElementById('btnSubmeter').style.display = "none"; // Esconde o botão "Submeter resposta"
        document.getElementById('btnProx').style.display = "inline-block"; // Mostra o botão "Avançar para próxima questão"
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
    // LINHA ADICIONADA AQUI:
    document.getElementById('btnDashboard').style.display = "inline-block"; // Mostra o botão Dashboard




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


