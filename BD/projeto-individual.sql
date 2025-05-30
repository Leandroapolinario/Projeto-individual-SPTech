create database individual;
use individual;

CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY auto_increment,
    nome VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY,
    nome varchar (45)
);

CREATE TABLE pontuacao (
    idPontuacao INT AUTO_INCREMENT UNIQUE,
    fkUsuario INT,
    fkQuiz INT,
    pontos INT,
    PRIMARY KEY (fkUsuario, fkQuiz),
    FOREIGN KEY (fkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz)
);

CREATE TABLE pergunta (
    idPergunta INT PRIMARY KEY auto_increment,
    FkQuiz INT,
    questao varchar (100),
    FOREIGN KEY (fkQuiz) REFERENCES Quiz(idQuiz)
);

 CREATE TABLE alternativa (
    idAlternativa INT PRIMARY KEY auto_increment,
    fkPergunta INT,
    opcao varchar (50),
    correta TINYINT,
    FOREIGN KEY (fkPergunta) REFERENCES Pergunta(idPergunta)
);


INSERT INTO Quiz VALUES
    (1, 'Jujubinha');

INSERT INTO pergunta (FkQuiz, questao) VALUES
    (1, 'O mês que a Juju nasceu?'),
    (1, 'A Júlia é de que signo?'),
    (1, 'Qual o dia que a Júlia e o tio Lê se conheceram pessoalmente?'),
    (1, 'Quantos anos a Júlia tem?'),
    (1, 'Qual a personagem que a Jujuba ama?'),
    (1, 'Qual a cor favorita da Ju?'),
    (1, 'Que ano soubemos que a Juju iria vir?'),
    (1, 'Qual a cor do cabelo da Juju?'),
    (1, 'Eu sou parente da Juju de que forma?'),
    (1, 'A brincadeira favorita da Julia é:'),
    (1, 'Quantos bebês o tio Lê tinha pegado no colo. antes da Ju?'),
    (1, 'Qual o doce favorito da Julinha?'),
    (1, 'Qual a comida favorita da Julia?'),
    (1, 'Qual o nome dos pais da Julia?');

INSERT INTO alternativa (fkPergunta, opcao, correta) VALUES
    -- Qual o mês de aniversário dela?
    (1, 'Abril', 1),
    (1, 'Dezembro', 0),
    (1, 'Julho', 0),
    (1, 'Outubro', 0),
    -- Qual o signo da Julia?
    (2, 'Touro', 1),
    (2, 'Peixes', 0),
    (2, 'Capricórnio', 0),
    (2, 'Sagitário', 0),
    -- Qual dia nós se conhecemos pessoalmente?
    (3, '26', 1),  
    (3, '12', 0),
    (3, '15', 0),
    (3, '08', 0),
    -- Qual a idade dela?
    (4, '4 anos', 1),
    (4, '5 anos', 0),
    (4, '3 anos', 0),
    (4, '6 anos', 0),
    -- Qual personagem ela ama?
    (5, 'Sky, Patrulha Canina', 1),
    (5, 'Kristoff, de Frozen', 0),
    (5, 'Simba, do Rei Leão', 0),
    (5, 'Princesa Jujuba, da Hora da Aventura', 0),
    -- Qual a cor favorita da Julia?
    (6, 'Rosa', 1),
    (6, 'Lilás', 0),
    (6, 'Azul claro', 0),
    (6, 'Laranha', 0),
    -- Quando soubemos que ela viria ao mundo?
    (7, '2020', 1),
    (7, '2019', 0),
    (7, '2022', 0),
    (7, '2021', 0),
    -- Qual a cor do cabelo da Julia?
    (8, 'Loiro', 1),
    (8, 'Castanho claro', 0),
    (8, 'Preto', 0),
    (8, 'Castanho escuro', 0),
    -- Qual meu parentesco com a Julia?
    (9, 'Amigo próximo dos pais', 1),
    (9, 'Tio', 0),
    (9, 'Primo', 0),
    (9, 'Padrinho', 0),
    -- Qual a brincadeira favorita da Julia?
    (10, 'Brincar com mulheres', 1),
    (10, 'Boneca', 0),
    (10, 'Esconde-esconde', 0),
    (10, 'Pega-pega', 0),
    -- Quantos bebês eu tinha pegado no colo antes da Julia?
    (11, '0', 1),
    (11, '2', 0),
    (11, '10', 0),
    (11, '4', 0),
    -- Qual o doce favorito da Julia?
    (12, 'Brigadeiro', 1),
    (12, 'Barra de chocolate', 0),
    (12, 'Mousse', 0),
    (12, 'Sorvete', 0),
    -- Qual a comida favorita da Julia?
    (13, 'Macarrão', 1),
    (13, 'Lasanha', 0),
    (13, 'Arroz com feijão', 0),
    (13, 'Strogonoff', 0),
    -- Qual o nome dos pais da Julia?
    (14, 'Clara e Gustavo', 1),
    (14, 'João e Rebeca', 0),
    (14, 'Alexandre e Marina', 0),
    (14, 'Marina e Lucas', 0);
    
    select * from usuario;