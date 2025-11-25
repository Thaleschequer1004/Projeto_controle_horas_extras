// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    const formLogin = document.getElementById('formLogin');
    const inputUsuario = document.getElementById('usuario');
    const inputSenha = document.getElementById('senha');
    const msgErro = document.getElementById('msgErro');

    formLogin.addEventListener('submit', function(e) {
        e.preventDefault(); // Impede o recarregamento da página

        // Pega os valores e limpa espaços
        const usuario = inputUsuario.value.toLowerCase().trim();
        const senha = inputSenha.value.trim();

        // Reset visual (remove bordas vermelhas antes de validar)
        inputUsuario.classList.remove('erro-borda');
        inputSenha.classList.remove('erro-borda');
        msgErro.textContent = '';

        let destino = '';
        let loginValido = false;

        // ======================================================
        // LÓGICA DE VALIDAÇÃO E REDIRECIONAMENTO
        // ======================================================

        // 1. Técnico
        if (usuario === 'tecnico' && senha === '162534') {
            loginValido = true;
            // Caminho: sobe uma pasta (..), entra em paginas/tecnico
            destino = '../paginas/tecnico/tecnico_minhas_horas.html';
        } 
        
        // 2. Encarregado
        else if (usuario === 'encarregado' && senha === '654321') {
            loginValido = true;
            // Caminho: sobe uma pasta (..), entra em paginas/encarregado
            destino = '../paginas/encarregado/encarregado_solicitacoes.html';
        } 
        
        // 3. Gerente / Gestor
        // Aceitei "gestor" também pq no print o placeholder diz "gestor.789"
        else if ((usuario === 'gerente' || usuario === 'gestor') && senha === '123456') {
            loginValido = true;
            // Caminho: sobe uma pasta (..), entra em paginas/gestor
            destino = '../paginas/gestor/gestor_dashboard.html';
        }

        // ======================================================
        // AÇÃO FINAL
        // ======================================================
        
        if (loginValido) {
            // Sucesso
            // alert('Login realizado! Redirecionando...'); // Opcional
            window.location.href = destino;
        } else {
            // Erro (Heurística: Feedback Visual)
            msgErro.textContent = 'Usuário ou senha incorretos.';
            inputUsuario.classList.add('erro-borda');
            inputSenha.classList.add('erro-borda');
            
            // Limpa senha e foca para tentar de novo
            inputSenha.value = '';
            inputSenha.focus();
        }
    });
});