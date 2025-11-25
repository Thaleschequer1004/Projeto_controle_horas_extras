// TEMA ESCURO
const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById('themeToggle');
    if(toggle) toggle.checked = true;
}

const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('change', function() {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('tema', 'escuro');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('tema', 'claro');
        }
    });
}

// -------------------------------------------------------------------------
// LÓGICA GLOBAL: BADGE DA SIDEBAR EM TODAS AS PÁGINAS
// -------------------------------------------------------------------------

// Verifica se já foi aprovado em alguma sessão anterior
const statusGlobal = localStorage.getItem('status_gestor_simulacao');

// Função auxiliar para atualizar o texto do badge se ele existir
function atualizarBadge(idElemento) {
    const badge = document.getElementById(idElemento);
    if (badge) {
        if (statusGlobal === 'aprovado_ok') badge.innerText = "1";
        else badge.innerText = "2";
    }
}

// Tenta atualizar em todas as possíveis páginas
atualizarBadge('badgeSidebar');         // Dashboard
atualizarBadge('badgeSidebarRelatorio'); // Relatórios
atualizarBadge('badgeSidebarRegras');    // Regras
atualizarBadge('badgeSidebarConfig');    // Configurações Gerais


// -------------------------------------------------------------------------
// LÓGICA DO DASHBOARD
// -------------------------------------------------------------------------
if (window.location.pathname.includes('dashboard') || document.title.includes('Dashboard')) {
    
    if (window.location.search.includes('status=')) {
        const alertaTopo = document.getElementById('alertaTopo');
        const numPendentes = document.getElementById('numPendentes');
        const linhaVM = document.getElementById('linhaVM');
        const areaConteudo = document.querySelector('.content');

        localStorage.setItem('status_gestor_simulacao', 'aprovado_ok');

        // Atualiza badges imediatamente na tela atual
        if (numPendentes) numPendentes.innerText = "1";
        atualizarBadge('badgeSidebar');
        
        const divSucesso = document.createElement('div');
        divSucesso.className = 'alert-box success';
        divSucesso.innerHTML = `<strong>Sucesso!</strong> Solicitação processada com êxito.`;
        
        if (areaConteudo && alertaTopo) {
            areaConteudo.insertBefore(divSucesso, alertaTopo);
        }

        if (linhaVM) {
            linhaVM.style.display = 'none';
        }
        
        mostrarToast("Ação realizada com sucesso!", "success");
    } else if (localStorage.getItem('status_gestor_simulacao') === 'aprovado_ok') {
        const numPendentes = document.getElementById('numPendentes');
        const linhaVM = document.getElementById('linhaVM');
        
        if (numPendentes) numPendentes.innerText = "1";
        if (linhaVM) linhaVM.style.display = 'none';
    }
}

// -------------------------------------------------------------------------
// REGRAS E CONFIGURAÇÕES (Página Regras)
// -------------------------------------------------------------------------
function atualizarImpacto() {
    const toggle = document.getElementById('toggleAutoApprove');
    const inputHoras = document.getElementById('inputHorasAuto');
    const textoImpacto = document.getElementById('textoImpacto');
    const displayHoras = document.getElementById('displayHoras');

    if (!toggle) return;

    if(displayHoras) displayHoras.innerText = inputHoras.value;

    if (toggle.checked) {
        const horas = inputHoras.value;
        textoImpacto.innerHTML = `Aproximadamente <strong>60% das solicitações</strong> serão aprovadas automaticamente (≤ ${horas}h).`;
        inputHoras.disabled = false;
        inputHoras.style.opacity = "1";
    } else {
        textoImpacto.innerHTML = "Todas as solicitações requerem aprovação manual (Padrão).";
        inputHoras.disabled = true;
        inputHoras.style.opacity = "0.5";
    }
}

function salvarRegras() {
    mostrarToast("Regras salvas com sucesso!", "success");
}

function restaurarPadroes() {
    if(confirm("Restaurar padrões?")) {
        document.getElementById('toggleAutoApprove').checked = false;
        document.getElementById('inputHorasAuto').value = 2;
        atualizarImpacto();
        mostrarToast("Padrões restaurados.", "success");
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('toggleAutoApprove')) {
        atualizarImpacto();
    }
});

// -------------------------------------------------------------------------
// OUTRAS FUNÇÕES (Relatórios, Modais, etc)
// -------------------------------------------------------------------------
function gerarPDFReal() {
    const elemento = document.getElementById('areaParaPDF');
    const btnExport = document.getElementById('badgeSucessoExport');
    const opcoes = { margin: 10, filename: 'Relatorio.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    if (typeof html2pdf !== 'undefined') {
        html2pdf().set(opcoes).from(elemento).save().then(() => {
            if(btnExport) { btnExport.style.display = 'inline-block'; setTimeout(() => { btnExport.style.display = 'none'; }, 4000); }
        });
    }
}
function salvarTemplate() {
    const btn = document.getElementById('btnSalvarTemplate');
    const textoOriginal = '<i class="far fa-save"></i> Salvar como Template';
    btn.innerHTML = '<i class="fas fa-check"></i> Template salvo';
    btn.classList.add('btn-verde-sucesso');
    setTimeout(() => { btn.innerHTML = textoOriginal; btn.classList.remove('btn-verde-sucesso'); }, 2000);
}
function simularExportacao() {
    const badge = document.getElementById('msgExportado');
    if (badge) { badge.style.display = 'inline-block'; setTimeout(() => { badge.style.display = 'none'; }, 3000); }
}
function atualizarVisualTabela() { console.log("Filtro visual atualizado"); }
function filtrarRelatorio() {
    /* Lógica visual simples de filtro (se necessário) */
}

// Modais
const modalReprovar = document.getElementById('modalReprovar');
function abrirModalReprovar() { if (modalReprovar) modalReprovar.style.display = 'flex'; }
function fecharModalReprovar() { if (modalReprovar) modalReprovar.style.display = 'none'; }
function simularAprovacao() { if (confirm("Tem certeza?")) window.location.href = "gestor_dashboard.html?status=aprovado"; }
function simularReprovacao() { window.location.href = "gestor_dashboard.html?status=reprovado"; }
window.onclick = function(e) { if (e.target == modalReprovar) fecharModalReprovar(); }
function mostrarToast(mensagem, tipo) {
    const toast = document.getElementById('toast');
    if(!toast) return;
    toast.innerText = mensagem;
    toast.className = "toast show";
    if (tipo === "success") { toast.classList.add("success"); toast.innerHTML = `<i class="fas fa-check-circle"></i> ${mensagem}`; }
    setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
}
// Filtros Dashboard
function filtrarDashboard() {
    const filtroObra = document.getElementById('filtroObra').value;
    const filtroStatus = document.getElementById('filtroStatus').value;
    const linhas = document.querySelectorAll('#tabelaDashboard tbody tr');
    linhas.forEach(linha => {
        const obra = linha.getAttribute('data-obra');
        const status = linha.getAttribute('data-status');
        // Se a linha foi removida visualmente, ignora
        if (linha.style.display === 'none' && linha.id === 'linhaVM') return;
        let mostrar = true;
        if (filtroObra !== 'todas' && obra !== filtroObra) mostrar = false;
        if (filtroStatus !== 'todos' && status !== filtroStatus) mostrar = false;
        linha.style.display = mostrar ? '' : 'none';
    });
}