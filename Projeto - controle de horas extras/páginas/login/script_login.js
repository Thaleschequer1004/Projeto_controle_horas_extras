document.addEventListener('DOMContentLoaded', function () {

    const formLogin = document.getElementById('formLogin');
    const inputUsuario = document.getElementById('usuario');
    const inputSenha = document.getElementById('senha');
    const msgErro = document.getElementById('msgErro');

    formLogin.addEventListener('submit', function (e) {
        e.preventDefault();

        const usuario = inputUsuario.value.toLowerCase().trim();
        const senha = inputSenha.value.trim();

        inputUsuario.classList.remove('erro-borda');
        inputSenha.classList.remove('erro-borda');
        msgErro.textContent = '';

        let destino = '';
        let loginValido = false;



        if (usuario === 'tecnico' && senha === '162534') {
            loginValido = true;
            destino = '../técnico/tecnico_minhas_horas.html';
        }

        else if (usuario === 'encarregado' && senha === '654321') {
            loginValido = true;
            destino = "../encarregado/encarregado_solicitacoes.html";
        }

        else if ((usuario === 'gerente') && senha === '123456') {
            loginValido = true;
            destino = '../gestor/gestor_dashboard.html';
        }

        if (loginValido) {
            window.location.href = destino;
        } else {
            msgErro.textContent = 'Usuário ou senha incorretos.';
            inputUsuario.classList.add('erro-borda');
            inputSenha.classList.add('erro-borda');

            inputSenha.value = '';
            inputSenha.focus();
        }
    });
});