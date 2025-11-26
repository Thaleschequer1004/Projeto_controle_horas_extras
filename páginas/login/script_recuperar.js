document.getElementById('formRecuperar').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;

    alert('Um código de verificação foi enviado para: ' + email);
});