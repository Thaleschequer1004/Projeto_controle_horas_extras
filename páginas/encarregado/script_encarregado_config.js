document.addEventListener('DOMContentLoaded', function () {

    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    const temaSalvo = localStorage.getItem('tema');

    if (temaSalvo === 'escuro') {
        body.classList.add('dark-mode');
        if (themeToggle) themeToggle.checked = true;
    }

    if (themeToggle) {
        themeToggle.addEventListener('change', function () {
            if (this.checked) {
                body.classList.add('dark-mode');
                localStorage.setItem('tema', 'escuro'); 
            } else {
                body.classList.remove('dark-mode');
                localStorage.setItem('tema', 'claro');   
            }
        });
    }

});