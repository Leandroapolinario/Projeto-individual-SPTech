create database individual;
use individual;




CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY,
    nome varchar (45)
);

CREATE TABLE pontuacao (
	idPontuacao INT,
    pkUsuario INT,
    pkQuiz INT,
    pontos INT,
    PRIMARY KEY (pkUsuario, pkQuiz, idPontuacao),
    FOREIGN KEY (pkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (pkQuiz) REFERENCES Quiz(idQuiz)
);

CREATE TABLE pergunta (
    idPergunta INT PRIMARY KEY,
    pkQuiz INT,
    questao varchar (45),
    FOREIGN KEY (pkQuiz) REFERENCES Quiz(idQuiz)
 );
 
 CREATE TABLE alternativa (
    idAlternativa INT PRIMARY KEY,
    pkPergunta INT,
    opcao varchar (45),
    FOREIGN KEY (pkPergunta) REFERENCES Pergunta(idPergunta)
 );