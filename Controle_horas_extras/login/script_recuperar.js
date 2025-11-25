document.getElementById('formRecuperar').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    
    // Simulação de envio
    alert('Um código de verificação foi enviado para: ' + email);
    
    // Opcional: Voltar pro login automaticamente após o OK
    // window.location.href = 'login.html';
});