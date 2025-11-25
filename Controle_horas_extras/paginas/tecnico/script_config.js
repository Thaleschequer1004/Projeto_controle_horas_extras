document.addEventListener('DOMContentLoaded', function() {
    
    // Pegando elementos
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // 1. Verifica se já existe uma preferência salva
    const temaSalvo = localStorage.getItem('tema');

    if (temaSalvo === 'escuro') {
        body.classList.add('dark-mode');
        themeToggle.checked = true;
    }

    // 2. Evento de Clique no Botão
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            // Ativa modo escuro
            body.classList.add('dark-mode');
            localStorage.setItem('tema', 'escuro'); // Salva preferência
        } else {
            // Desativa modo escuro (volta pro claro)
            body.classList.remove('dark-mode');
            localStorage.setItem('tema', 'claro'); // Salva preferência
        }
    });

});