const temaSalvo = localStorage.getItem('tema');
if (temaSalvo === 'escuro') {
    document.body.classList.add('dark-mode');
    const toggle = document.getElementById('themeToggle');
    if (toggle) toggle.checked = true;
}
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('tema', 'escuro');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('tema', 'claro');
        }
    });
}

if (window.location.search.includes('status=')) {
    const alertaTopo = document.getElementById('alertaTopo');
    const numPendentes = document.getElementById('numPendentes');
    const badgeSidebar = document.getElementById('badgeSidebar');
    const linhaVM = document.getElementById('linhaVM');
    const areaConteudo = document.querySelector('.content');

    if (numPendentes) numPendentes.innerText = "1";
    if (badgeSidebar) badgeSidebar.innerText = "1";

    const divSucesso = document.createElement('div');
    divSucesso.className = 'alert-box success';
    divSucesso.innerHTML = `<strong>Sucesso!</strong> Solicitação processada com êxito.`;

    if (areaConteudo && alertaTopo) {
        areaConteudo.insertBefore(divSucesso, alertaTopo);
    }

    if (linhaVM) {
        linhaVM.style.display = 'none';
    }
}

function atualizarImpacto() {
    const toggle = document.getElementById('toggleAutoApprove');
    const input = document.getElementById('inputHorasAuto');
    const texto = document.getElementById('textoImpacto');
    if (!toggle) return;
    if (toggle.checked) {
        texto.innerHTML = `Aproximadamente <strong>60% das solicitações</strong> serão aprovadas automaticamente (≤ ${input.value}h).`;
        input.disabled = false; input.style.opacity = "1";
    } else {
        texto.innerHTML = "Todas as solicitações requerem aprovação manual (Padrão).";
        input.disabled = true; input.style.opacity = "0.5";
    }
}
function salvarRegras() { mostrarToast("Regras salvas!", "success"); }
function restaurarPadroes() {
    if (confirm("Restaurar padrões?")) {
        document.getElementById('toggleAutoApprove').checked = false;
        document.getElementById('inputHorasAuto').value = 2;
        atualizarImpacto();
    }
}
document.addEventListener('DOMContentLoaded', () => { if (document.getElementById('toggleAutoApprove')) atualizarImpacto(); });

function gerarPDFReal() {
    const el = document.getElementById('areaParaPDF');
    const btn = document.getElementById('badgeSucessoExport');
    const opt = { margin: 10, filename: 'Relatorio.pdf', image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2 }, jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' } };
    if (typeof html2pdf !== 'undefined') html2pdf().set(opt).from(el).save().then(() => {
        if (btn) { btn.style.display = 'inline-block'; setTimeout(() => { btn.style.display = 'none'; }, 4000); }
    });
}
function salvarTemplate() {
    const btn = document.getElementById('btnSalvarTemplate');
    const textoOriginal = '<i class="far fa-save"></i> Salvar como Template';
    btn.innerHTML = '<i class="fas fa-check"></i> Template salvo';
    btn.classList.add('btn-verde-sucesso');
    setTimeout(() => { btn.innerHTML = textoOriginal; btn.classList.remove('btn-verde-sucesso'); }, 2000);
}
function simularExportacao() { alert("Exportado!"); }
function atualizarVisualTabela() { console.log("Filtro visual atualizado"); }
function filtrarDashboard() { console.log("Filtro Dashboard"); }

const modalReprovar = document.getElementById('modalReprovar');
const toast = document.getElementById('toast');

function abrirModalReprovar() { if (modalReprovar) modalReprovar.style.display = 'flex'; }
function fecharModalReprovar() { if (modalReprovar) modalReprovar.style.display = 'none'; }
function simularAprovacao() { if (confirm("Aprovar?")) window.location.href = "gestor_dashboard.html?status=aprovado"; }
function simularReprovacao() { window.location.href = "gestor_dashboard.html?status=reprovado"; }
window.onclick = function (e) { if (e.target == modalReprovar) fecharModalReprovar(); }
function mostrarToast(msg, tipo) {
    if (!toast) return;
    toast.innerText = msg; toast.className = "toast show";
    if (tipo === "success") toast.classList.add("success");
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}