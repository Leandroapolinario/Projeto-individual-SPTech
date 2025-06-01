

let proximaAtualizacao; // Variável para controlar o timeout de atualização

// Ajuste para exibir o nome do usuário assim que a página carrega, se houver
window.onload = function() {
    if (sessionStorage.NOME_USUARIO) {
        document.getElementById('b_usuario').innerHTML = sessionStorage.NOME_USUARIO;
    }
    exibirAquariosDoUsuario();
};

function exibirAquariosDoUsuario() {
    // Certifique-se de que sessionStorage.AQUARIOS existe e é um JSON válido
    // Se não houver aquários, o placeholder inicial será exibido
    if (!sessionStorage.AQUARIOS || sessionStorage.AQUARIOS === "null") {
        console.warn("Nenhum aquário encontrado em sessionStorage.AQUARIOS. Verifique se os dados estão sendo armazenados corretamente.");
        document.getElementById("placeholder-inicial").style.display = "flex"; // Garante que o placeholder seja visível
        return;
    }

    var aquarios = JSON.parse(sessionStorage.AQUARIOS);
    const btnAquarioContainer = document.getElementById("btnAquario");
    const graficosContainer = document.getElementById("graficos");

    // Limpa o conteúdo dos containers antes de adicionar novos
    btnAquarioContainer.innerHTML = '';
    graficosContainer.innerHTML = '';

    // Adiciona o placeholder inicial caso não haja aquários
    graficosContainer.innerHTML += `
        <div class="map-placeholder" id="placeholder-inicial">
            Selecione um treino para ver o gráfico.
        </div>
    `;

    // Esconde o placeholder se houver aquários
    if (aquarios.length > 0) {
        document.getElementById("placeholder-inicial").style.display = "none";
    }

    aquarios.forEach(item => {
        // Cria o botão para cada aquário
        btnAquarioContainer.innerHTML += `
            <button class="btn-chart btn-white" onclick="exibirAquario(${item.id})" id="btnAquario${item.id}">${item.descricao}</button>
        `;

        // Cria a estrutura para cada gráfico
        graficosContainer.innerHTML += `
            <div id="grafico${item.id}" class="display-none">
                <h3 class="tituloGraficos">
                    <span id="tituloAquario${item.id}">${item.descricao}</span>
                </h3>
                <div class="graph">
                    <canvas id="myChartCanvas${item.id}"></canvas>
                </div>
                <div class="label-captura">
                    <p id="avisoCaptura${item.id}"></p>
                </div>
            </div>
        `;

        // Inicia a obtenção de dados para o gráfico
        obterDadosGrafico(item.id);
    });

    // Exibe o primeiro aquário se houver algum
    if (aquarios.length > 0) {
        exibirAquario(aquarios[0].id);
    }
}

function alterarTitulo(idAquario) {
    var tituloAquario = document.getElementById(`tituloAquario${idAquario}`);
    // Verifica se sessionStorage.AQUARIOS existe e é um JSON válido
    if (!sessionStorage.AQUARIOS || sessionStorage.AQUARIOS === "null") {
        console.error("sessionStorage.AQUARIOS não encontrado ou inválido ao tentar alterar o título.");
        return;
    }
    var aquarios = JSON.parse(sessionStorage.AQUARIOS);
    var descricao = aquarios.find(item => item.id == idAquario)?.descricao; // Usa optional chaining para evitar erro se não encontrar
    if (descricao) {
        tituloAquario.innerHTML = "Últimas medidas de Temperatura e Umidade do <span style='color: #e6005a'>" + descricao + "</span>";
    } else {
        tituloAquario.innerHTML = "Dados do Treino: <span style='color: #e6005a'>Treino Não Encontrado</span>";
    }
}

function exibirAquario(idAquario) {
    // Esconde o placeholder inicial se algum aquário for selecionado
    const placeholderInicial = document.getElementById("placeholder-inicial");
    if (placeholderInicial) {
        placeholderInicial.style.display = "none";
    }

    if (!sessionStorage.AQUARIOS || sessionStorage.AQUARIOS === "null") {
        console.error("sessionStorage.AQUARIOS não encontrado ou inválido ao tentar exibir aquário.");
        return;
    }
    let todosOsGraficos = JSON.parse(sessionStorage.AQUARIOS);

    for (let i = 0; i < todosOsGraficos.length; i++) {
        const currentId = todosOsGraficos[i].id;
        const elementoAtual = document.getElementById(`grafico${currentId}`);
        const btnAtual = document.getElementById(`btnAquario${currentId}`);

        if (elementoAtual) { // Verifica se o elemento existe
            if (currentId != idAquario) {
                elementoAtual.classList.remove("display-block");
                elementoAtual.classList.add("display-none");
                if (btnAtual) {
                    btnAtual.classList.remove("btn-pink");
                    btnAtual.classList.add("btn-white");
                }
            } else {
                elementoAtual.classList.remove("display-none");
                elementoAtual.classList.add("display-block");
                if (btnAtual) {
                    btnAtual.classList.remove("btn-white");
                    btnAtual.classList.add("btn-pink");
                }
            }
        }
    }
}

// As funções obterDadosGrafico, plotarGrafico e atualizarGrafico
// permanecem praticamente as mesmas, mas com os ajustes para as novas classes de CSS
// e a lógica de limpeza de timeout para evitar múltiplas atualizações.

function obterDadosGrafico(idAquario) {
    alterarTitulo(idAquario);

    if (window[`chart_${idAquario}`] != undefined) {
        window[`chart_${idAquario}`].destroy(); // Destrói o gráfico anterior para evitar sobreposição
    }

    if (proximaAtualizacao != undefined) {
        clearTimeout(proximaAtualizacao);
    }

    fetch(`/medidas/ultimas/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos para gráfico ${idAquario}: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta, idAquario);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API para ' + idAquario);
            // Continua tentando atualizar mesmo se não encontrar dados, mas com um log de erro
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, {}, window[`chart_${idAquario}`]), 2000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico ${idAquario}: ${error.message}`);
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, {}, window[`chart_${idAquario}`]), 2000);
    });
}

function plotarGrafico(resposta, idAquario) {
    console.log('iniciando plotagem do gráfico para aquário ' + idAquario + '...');

    let labels = [];
    let dados = {
        labels: labels,
        datasets: [{
            label: 'Umidade',
            data: [],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        },
        {
            label: 'Temperatura',
            data: [],
            fill: false,
            borderColor: 'rgb(199, 52, 52)',
            tension: 0.1
        }]
    };

    console.log('----------------------------------------------');
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":');
    console.log(resposta);

    for (let i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.momento_grafico);
        dados.datasets[0].data.push(registro.umidade);
        dados.datasets[1].data.push(registro.temperatura);
    }

    console.log('----------------------------------------------');
    console.log('O gráfico será plotado com os respectivos valores:');
    console.log('Labels:');
    console.log(labels);
    console.log('Dados:');
    console.log(dados.datasets);
    console.log('----------------------------------------------');

    const config = {
        type: 'line',
        data: dados,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)', // Cor da grade X
                        borderColor: 'rgba(255, 255, 255, 0.2)' // Cor da borda do eixo X
                    },
                    ticks: {
                        color: 'white' // Cor dos labels do eixo X
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.1)', // Cor da grade Y
                        borderColor: 'rgba(255, 255, 255, 0.2)' // Cor da borda do eixo Y
                    },
                    ticks: {
                        color: 'white' // Cor dos labels do eixo Y
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white' // Cor dos labels da legenda
                    }
                }
            }
        }
    };

    // Cria e armazena o gráfico em uma variável global para poder destruí-lo depois
    window[`chart_${idAquario}`] = new Chart(
        document.getElementById(`myChartCanvas${idAquario}`),
        config
    );

    // Inicia a atualização periódica do gráfico
    proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, window[`chart_${idAquario}`]), 2000);
}

function atualizarGrafico(idAquario, dados, myChart) {
    fetch(`/medidas/tempo-real/${idAquario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (novoRegistro) {
                // Se o Chart não foi inicializado ainda, retorna.
                if (!myChart) {
                    console.warn("Gráfico não inicializado para o aquário " + idAquario + ". Tentando novamente em 2 segundos.");
                    proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
                    return;
                }

                // obterdados(idAquario); // Essa função não está definida no código que você me enviou, pode ser removida ou implementada
                // alertar(novoRegistro, idAquario); // Essa função não está definida no código que você me enviou, pode ser removida ou implementada

                let avisoCaptura = document.getElementById(`avisoCaptura${idAquario}`);
                if (avisoCaptura) { // Verifica se o elemento existe
                    avisoCaptura.innerHTML = "";
                }

                if (novoRegistro.length === 0 || (novoRegistro[0].momento_grafico === dados.labels[dados.labels.length - 1] && dados.labels.length > 0)) {
                    console.log("---------------------------------------------------------------");
                    console.log(`Como não há dados novos para captura no aquário ${idAquario}, o gráfico não atualizará.`);
                    if (avisoCaptura) {
                        avisoCaptura.innerHTML = "<i class='fa-solid fa-triangle-exclamation'></i> Foi trazido o dado mais atual capturado pelo sensor. <br> Como não há dados novos a exibir, o gráfico não atualizará.";
                    }
                } else {
                    // Adiciona o novo registro e remove o mais antigo para manter o histórico
                    if (dados.labels.length >= 10) { // Limita o número de pontos no gráfico (ex: 10 pontos)
                        dados.labels.shift();
                        dados.datasets[0].data.shift();
                        dados.datasets[1].data.shift();
                    }
                    dados.labels.push(novoRegistro[0].momento_grafico);
                    dados.datasets[0].data.push(novoRegistro[0].umidade);
                    dados.datasets[1].data.push(novoRegistro[0].temperatura);

                    myChart.update(); // Atualiza o gráfico
                }

                // Continua a atualização para o próximo ciclo
                proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API para ' + idAquario);
            // Se houver um erro na API, tenta novamente
            proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
        }
    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico ${idAquario}: ${error.message}`);
        // Em caso de erro de rede, tenta novamente
        proximaAtualizacao = setTimeout(() => atualizarGrafico(idAquario, dados, myChart), 2000);
    });
}