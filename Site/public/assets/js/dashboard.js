
// Função chamada ao carregar a página para obter e processar os dados
function obterDados(){
  // Aqui seria a função que obteria os dados do banco de dados
  // No caso, aqui você colocaria o fetch que teria o endereço da sua rota que você criou na pasta /routes e chamaria a função plotarGraficoLinha nessa função. Exemplo:
 
  // fetch('/obterDados')
  // .then(function(response){
  //   return response.json();
  // })
  // .then(function(data){
  //   plotarGraficoLinha(data);
  //   plotarGraficoBarra(data);
  // })
  // .catch(function(err){
  //   console.log(err);
  // })

  // Como eu não configurei as rotas, eu criei um array com os dados para simular a obtenção dos dados
  var dados = [{
    jogador:'Endrick',
    votos: 10
  },
  {
    jogador:'João',
    votos: 5
  },
  {
    jogador:'Maria',
    votos: 15
  },
  {
    jogador:'José',
    votos: 20
  },
  {
    jogador:'Pedro',
    votos: 25
  },
  {
    jogador:'Ana',
    votos: 30
  }]

  // Chamando a função para plotar o gráfico de linha com os dados
  plotarGraficoLinha(dados);
  // Chamando a função para plotar o gráfico de barra com os dados
  plotarGraficoBarra(dados)
}

// Função para plotar o gráfico de linha
function plotarGraficoLinha(dados){
  
  // Separando os rótulos (labels) e os dados dos votos
  var votos = [];
  var jogadores = [];

  // Preenchendo os arrays com os dados
  for(var i = 0; i < dados.length; i++){
    votos.push(dados[i].votos);
    jogadores.push(dados[i].jogador);
  }

  // Capturando o elemento canvas pelo id 
  var ctx = document.getElementById('linha').getContext('2d');
  // Criando o gráfico de linha usando o Chart.js
  var myChart = new Chart(ctx, {
      type: 'line', // Tipo de gráfico: linha
      data: { // Dados para o gráfico
          labels: jogadores, // Rótulos no eixo X
          datasets: [{ 
              label: 'Votos', // Nome do conjunto de dados
              data: votos, // Dados dos votos
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)', // Cor de fundo das linhas
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)', // Cor da borda das linhas
              ],
              borderWidth: 1 // Largura da borda das linhas
          }]
      },
  });
} 

// Função para plotar o gráfico de barra
function plotarGraficoBarra(dados){

  var votos = [];
  var jogadores = [];

  // Preenchendo os arrays com os dados
  for(var i = 0; i < dados.length; i++){
    votos.push(dados[i].votos);
    jogadores.push(dados[i].jogador);
  }

  // Capturando o elemento canvas pelo id 
  var ctx = document.getElementById('barra').getContext('2d');
  // Criando o gráfico de barra usando o Chart.js
  var myChart = new Chart(ctx, {
      type: 'bar', // Tipo de gráfico: barra
      data: { // Dados para o gráfico
          labels: jogadores, // Rótulos no eixo X
          datasets: [{
              label: 'Votos', // Nome do conjunto de dados
              data: votos, // Dados dos votos
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)', // Cor de fundo das barras
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)', // Cor da borda das barras
              ],
              borderWidth: 1 // Largura da borda das barras
          }]
      },
  });
}