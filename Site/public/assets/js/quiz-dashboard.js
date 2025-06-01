const idUsuario = sessionStorage.ID_USUARIO;
const b_usuario = document.getElementById('b_usuario');

// Define o nome do usuário na top-bar, se estiver disponível na sessionStorage
if (sessionStorage.NOME_USUARIO) {
    b_usuario.textContent = sessionStorage.NOME_USUARIO;
} else {
    b_usuario.textContent = 'Usuário'; // Valor padrão caso não encontre
}