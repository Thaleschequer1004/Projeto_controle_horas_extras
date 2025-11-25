// 1. TEMA ESCURO
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
}

// ============================================
// LÓGICA DO DASHBOARD (CONSULTAR HORAS)
// ============================================
const filtroObra = document.getElementById('filtroObra');
const dataInicio = document.getElementById('dataInicio');
const dataFim = document.getElementById('dataFim');
const tabela = document.getElementById('tabelaRegistros');
const modal = document.getElementById('modalConfirmacao');
const msgSemResultados = document.getElementById('msgSemResultados');

if (tabela) {
    function filtrarTabela() {
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
            dataLinha.setHours(0,0,0,0);

            let obraOk = (obraSelecionada === 'todas') || textoObra.includes(obraSelecionada);
            let dataOk = true;

            if (dataIniVal) {
                dataIniVal.setHours(0,0,0,0);
                if (dataLinha < dataIniVal) dataOk = false;
            }
            if (dataFimVal && dataOk) {
                dataFimVal.setHours(0,0,0,0);
                if (dataLinha > dataFimVal) dataOk = false;
            }

            if (obraOk && dataOk) {
                linha.style.display = '';
                encontrouAlgo = true;
            } else {
                linha.style.display = 'none';
            }
        }
        
        if(msgSemResultados) msgSemResultados.style.display = encontrouAlgo ? 'none' : 'block';
    }

    if(filtroObra) filtroObra.addEventListener('change', filtrarTabela);
    if(dataInicio) dataInicio.addEventListener('change', filtrarTabela);
    if(dataFim) dataFim.addEventListener('change', filtrarTabela);
}

function limparFiltros() {
    if(filtroObra) {
        filtroObra.value = 'todas';
        dataInicio.value = '';
        dataFim.value = '';
        filtrarTabela();
    }
}

// --- MODAL E BIOMETRIA ---
function abrirModal() {
    if(modal) {
        modal.style.display = 'flex';
        document.querySelector('.biometria-area').classList.remove('bio-sucesso');
        document.getElementById('iconeBio').innerText = '🖐️';
        document.getElementById('textoBio').innerText = 'Posicione o dedo no sensor biométrico';
    }
}

function fecharModal() {
    if(modal) modal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == modal) fecharModal();
}

function validarBiometria() {
    const areaBio = document.querySelector('.biometria-area');
    const icone = document.getElementById('iconeBio');
    const texto = document.getElementById('textoBio');
    const btn = document.querySelector('.btn-validar');

    if(btn) {
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

        if(contadorConfirmadas) contadorConfirmadas.innerText = "3";
        if(contadorPendentes) contadorPendentes.innerText = "0";
        if (totalHorasElement) {
            let horasAtuais = parseInt(totalHorasElement.innerText.replace('h', ''));
            let novasHoras = horasAtuais + 2;
            totalHorasElement.innerText = novasHoras + "h";
        }
        alert("Presença confirmada! Banco de horas atualizado.");
    }
}


// ============================================
// LÓGICA DO FORMULÁRIO (NOVA SOLICITAÇÃO)
// ============================================
const form = document.getElementById('formSolicitacao');
const boxErro = document.getElementById('boxErro');
const listaErros = document.getElementById('listaErros');

if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let erros = [];
        const obra = document.getElementById('obra').value;
        const data = document.getElementById('data').value;
        const horaInicio = document.getElementById('horaInicio').value;
        const horaFim = document.getElementById('horaFim').value;
        const justificativa = document.getElementById('justificativa').value;

        if (!obra) erros.push("Obra é obrigatória");
        if (!data) erros.push("Data é obrigatória");
        if (!horaInicio) erros.push("Hora de início é obrigatória");
        if (!horaFim) erros.push("Hora de fim é obrigatória");
        if (!justificativa) erros.push("Justificativa é obrigatória");

        if (erros.length > 0) {
            boxErro.style.display = 'flex';
            listaErros.innerHTML = ''; 
            erros.forEach(erro => {
                const li = document.createElement('li');
                li.textContent = erro;
                listaErros.appendChild(li);
            });
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            boxErro.style.display = 'none';
            alert("Solicitação enviada com sucesso!");
        }
    });
}

// UPLOAD
const btnUpload = document.querySelector('.btn-select-file');
const fileInput = document.getElementById('fileInput');

if (btnUpload && fileInput) {
    btnUpload.addEventListener('click', () => { fileInput.click(); });
    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            btnUpload.textContent = `${fileInput.files.length} arquivo(s) selecionado(s)`;
        }
    });
}