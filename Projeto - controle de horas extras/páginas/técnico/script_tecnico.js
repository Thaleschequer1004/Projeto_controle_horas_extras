const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
}

const filtroObra = document.getElementById('filtroObra');
const dataInicio = document.getElementById('dataInicio');
const dataFim = document.getElementById('dataFim');
const tabela = document.getElementById('tabelaRegistros');
const modal = document.getElementById('modalConfirmacao');
const msgSemResultados = document.getElementById('msgSemResultados');

function filtrarTabela() {
    if (!tabela) return;

    const obraSelecionada = filtroObra.value.toLowerCase();
    const dataIniVal = dataInicio.value ? new Date(dataInicio.value) : null;
    const dataFimVal = dataFim.value ? new Date(dataFim.value) : null;

    const linhas = tabela.getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let encontrouAlgo = false;

    for (let i = 0; i < linhas.length; i++) {
        let linha = linhas[i];
        const textoData = linha.cells[0].innerText.trim();
        const textoObra = linha.cells[1].innerText.toLowerCase();

        const partesData = textoData.split('/');
        const dataLinha = new Date(`${partesData[2]}-${partesData[1]}-${partesData[0]}`);
        dataLinha.setHours(0, 0, 0, 0);

        let obraOk = (obraSelecionada === 'todas') || textoObra.includes(obraSelecionada);
        let dataOk = true;

        if (dataIniVal) {
            dataIniVal.setHours(0, 0, 0, 0);
            if (dataLinha < dataIniVal) dataOk = false;
        }
        if (dataFimVal && dataOk) {
            dataFimVal.setHours(0, 0, 0, 0);
            if (dataLinha > dataFimVal) dataOk = false;
        }

        if (obraOk && dataOk) {
            linha.style.display = '';
            encontrouAlgo = true;
        } else {
            linha.style.display = 'none';
        }
    }

    if (msgSemResultados) {
        msgSemResultados.style.display = encontrouAlgo ? 'none' : 'block';
    }
}

if (filtroObra) filtroObra.addEventListener('change', filtrarTabela);
if (dataInicio) dataInicio.addEventListener('change', filtrarTabela);
if (dataFim) dataFim.addEventListener('change', filtrarTabela);

function limparFiltros() {
    if (filtroObra) filtroObra.value = 'todas';
    if (dataInicio) dataInicio.value = '';
    if (dataFim) dataFim.value = '';
    filtrarTabela();
}

function abrirModal() {
    if (modal) {
        modal.style.display = 'flex';
        document.querySelector('.biometria-area').classList.remove('bio-sucesso');
        document.getElementById('iconeBio').innerText = '🖐️';
        document.getElementById('textoBio').innerText = 'Posicione o dedo no sensor biométrico';
    }
}

function fecharModal() {
    if (modal) modal.style.display = 'none';
}

window.onclick = function (event) {
    if (event.target == modal) fecharModal();
}

function validarBiometria() {
    const areaBio = document.querySelector('.biometria-area');
    const icone = document.getElementById('iconeBio');
    const texto = document.getElementById('textoBio');
    const btn = document.querySelector('.btn-validar');

    btn.disabled = true;
    btn.innerText = "Lendo...";
    icone.innerText = "⏳";
    texto.innerText = "Aguarde, processando...";
    areaBio.classList.add('bio-animando');

    setTimeout(() => {
        areaBio.classList.remove('bio-animando');
        areaBio.classList.add('bio-sucesso');
        icone.innerText = "✅";
        texto.innerText = "Identidade Confirmada!";
        btn.innerText = "Sucesso!";

        setTimeout(() => {
            fecharModal();
            atualizarStatusNaTabela();
            btn.disabled = false;
            btn.innerText = "Validar Biometria";
        }, 1000);

    }, 2000);
}

function atualizarStatusNaTabela() {
    const celulaStatus = document.getElementById('celulaStatus');
    const celulaAcao = document.getElementById('celulaAcao');
    const contadorConfirmadas = document.getElementById('contadorConfirmadas');
    const contadorPendentes = document.getElementById('contadorPendentes');
    const totalHorasElement = document.getElementById('totalHoras');

    if (celulaStatus && celulaAcao) {
        celulaStatus.innerHTML = '<span class="badge confirmada">Confirmada</span>';
        celulaAcao.innerHTML = '';

        if (contadorConfirmadas) contadorConfirmadas.innerText = "3";
        if (contadorPendentes) contadorPendentes.innerText = "0";

        if (totalHorasElement) {
            let horasAtuais = parseInt(totalHorasElement.innerText.replace('h', ''));
            let novasHoras = horasAtuais + 2;
            totalHorasElement.innerText = novasHoras + "h";
        }

        alert("Presença confirmada! Banco de horas atualizado.");
    }
}