create database individual;
use individual;




CREATE TABLE Usuario (
    idUsuario INT PRIMARY KEY,
    nome VARCHAR(45),
    senha VARCHAR(45)
);

CREATE TABLE Quiz (
    idQuiz INT PRIMARY KEY,
    acerto INT,
    erro INT
);

CREATE TABLE pontuacao (
    pkUsuario INT,
    pkQuiz INT,
    pontos INT,
    PRIMARY KEY (pkUsuario, pkQuiz),
    FOREIGN KEY (pkUsuario) REFERENCES Usuario(idUsuario),
    FOREIGN KEY (pkQuiz) REFERENCES Quiz(idQuiz)
);
