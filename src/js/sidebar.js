// SPA Router simplificado para o sistema Nóbrega
const contentContainer = document.getElementById("content");

// Mapeamento das rotas com HTML e JavaScript
const rotas = {
  dashboard: {
    html: "../subPages/dashboard.html",
    js: "../js/dashboard.js"
  },
  pedidos: {
    html: "../subPages/pedidos.html",
    js: "../js/pedidos.js"
  },
  clientes: {
    html: "../subPages/clientes.html",
    js: "../js/clientes.js"
  },
  blog: {
    html: "../subPages/blog.html",
    js: "../js/blog.js"
  },
  chat: {
    html: "../subPages/chat.html",
    js: "../js/chat.js"
  },

  // ADM OPTIONS
  usuarios: {
    html: "../subPages/usuarios.html",
    js: "../js/usuarios.js"
  },
  lojas: {
    html: "../subPages/lojas.html",
    js: "../js/lojas.js"
  },
  caixa: {
    html: "../subPages/caixa.html",
    js: "../js/caixa.js"
  }, 
  configPedidos: {
    html: "../subPages/configPedidos.html",
    js: "../js/configPedidos.js"
  }
};

function esconderIndicadores() {
  const indicators = [
    "IndicatorInicial", "IndicatorPedidos", "IndicatorVendas", 
    "IndicatorChat", "IndicatorBlog", "IndicatorUser", 
    "IndicatorLoja", "IndicatorCaixa", "IndicatorOrderConfig"
  ];
  
  indicators.forEach(id => {
    const indicator = document.querySelector(`#${id}`);
    if (indicator) indicator.style.display = "none";
  });
}

function ativarIndicador(rota) {
  esconderIndicadores();
  
  const indicadoresPorRota = {
    'dashboard': 'IndicatorInicial',
    'pedidos': 'IndicatorPedidos',
    'clientes': 'IndicatorVendas',
    'blog': 'IndicatorBlog',
    'chat': 'IndicatorChat',
    'usuarios': 'IndicatorUser',
    'lojas': 'IndicatorLoja',
    'caixa': 'IndicatorCaixa',
    'configPedidos': 'IndicatorOrderConfig'
  };
  
  const indicadorId = indicadoresPorRota[rota];
  if (indicadorId) {
    const indicator = document.querySelector(`#${indicadorId}`);
    if (indicator) indicator.style.display = "block";
  }
}

function updateActiveState(activeRoute) {
  // Remove active class de todos os links
  document.querySelectorAll('.menu li a').forEach(link => {
    link.classList.remove('active');
  });
  
  // Adiciona active class ao link atual
  const activeLink = document.querySelector(`#btn${activeRoute.charAt(0).toUpperCase() + activeRoute.slice(1)}`);
  if (activeLink) {
    activeLink.classList.add('active');
  }
  
  // Casos especiais para IDs diferentes
  const specialCases = {
    'dashboard': '#btnInicial',
    'clientes': '#btnVendas',
    'usuarios': '#btnUser',
    'configPedidos': '#btnOrderConfig'
  };
  
  if (specialCases[activeRoute]) {
    const specialLink = document.querySelector(specialCases[activeRoute]);
    if (specialLink) {
      specialLink.classList.add('active');
    }
  }
}

async function carregarArquivo(arquivo) {
  try {
    const resposta = await fetch(arquivo);
    if (!resposta.ok) throw new Error(`Erro ${resposta.status}`);
    return await resposta.text();
  } catch (erro) {
    return `<p>Erro ao carregar conteúdo: ${erro.message}</p>`;
  }
}

function carregarJavaScript(jsPath) {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = jsPath;
    script.setAttribute("data-dinamico", "true");
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

async function carregarRota(rota) {
  if (!rotas[rota]) {
    contentContainer.innerHTML = "<p>Página não encontrada.</p>";
    return;
  }

  // Limpar gráficos do dashboard se estiver saindo dessa página
  if (window.cleanupCharts && typeof window.cleanupCharts === 'function') {
    window.cleanupCharts();
  }

  const { html, js } = rotas[rota];
  
  ativarIndicador(rota);
  
  try {
    // Carregar HTML
    const conteudo = await carregarArquivo(html);
    contentContainer.innerHTML = conteudo;
    
    // Atualiza estado ativo do sidebar
    updateActiveState(rota);
    
    // Carregar JavaScript específico da página
    if (js) {
      try {
        await carregarJavaScript(js);
        console.log(`Script ${js} carregado com sucesso`);
        
        // Aguardar um pouco para garantir que o script foi executado
        setTimeout(() => {
          if (rota === 'clientes') {
            console.log('Página de clientes carregada, verificando funcionalidades...');
          }
          // Reinicializar gráficos se for a página do dashboard
          if (rota === 'dashboard' && window.initializeCharts && typeof window.initializeCharts === 'function') {
            window.initializeCharts();
          }
        }, 100);
        
      } catch (error) {
        console.error(`Erro ao carregar script ${js}:`, error);
      }
    }
    
  } catch (erro) {
    contentContainer.innerHTML = `<p>Erro ao carregar a página: ${erro.message}</p>`;
    console.error('Erro ao carregar rota:', erro);
  }
}

window.sidebar = function(local) {
  carregarRota(local);
};

// Função para toggle do dropdown de configurações
function toggleConfigDropdown() {
  const dropdown = document.getElementById('configDropdown');
  if (!dropdown) {
    console.error('Elemento configDropdown não encontrado');
    return;
  }
  
  const dropdownItem = dropdown.closest('.dropdown-item');
  if (!dropdownItem) {
    console.error('Elemento dropdown-item não encontrado');
    return;
  }
  
  if (dropdown.classList.contains('show')) {
    dropdown.classList.remove('show');
    dropdownItem.classList.remove('open');
  } else {
    // Fechar outros dropdowns se houver
    document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
      menu.classList.remove('show');
      const item = menu.closest('.dropdown-item');
      if (item) item.classList.remove('open');
    });
    
    dropdown.classList.add('show');
    dropdownItem.classList.add('open');
  }
}

// Funções para abrir configurações específicas
function openSystemSettings() {
  showConfigModal('Sistema', `
    <div class="config-section">
      <h3>Informações da Empresa</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>Nome da Empresa</label>
          <input type="text" value="Nóbrega Confecções" readonly>
        </div>
        <div class="form-group">
          <label>CNPJ</label>
          <input type="text" value="12.345.678/0001-90" readonly>
        </div>
        <div class="form-group">
          <label>Telefone</label>
          <input type="text" value="(11) 99999-9999">
        </div>
        <div class="form-group">
          <label>Email</label>
          <input type="email" value="contato@nobrega.com">
        </div>
      </div>
    </div>
    <div class="config-section">
      <h3>Configurações do Sistema</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>Fuso Horário</label>
          <select>
            <option>América/São_Paulo</option>
            <option>América/Recife</option>
            <option>América/Manaus</option>
          </select>
        </div>
        <div class="form-group">
          <label>Moeda</label>
          <select>
            <option>Real (R$)</option>
            <option>Dólar (US$)</option>
          </select>
        </div>
        <div class="form-group">
          <label>Idioma</label>
          <select>
            <option>Português (BR)</option>
            <option>English</option>
          </select>
        </div>
      </div>
    </div>
  `);
}

function openSecuritySettings() {
  showConfigModal('Segurança', `
    <div class="config-section">
      <h3>Status de Segurança</h3>
      <div class="security-grid">
        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="security-info">
            <h4>SSL/TLS</h4>
            <span class="status-badge ativo">Ativo</span>
          </div>
        </div>
        <div class="security-card">
          <div class="security-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="security-info">
            <h4>Firewall</h4>
            <span class="status-badge ativo">Ativo</span>
          </div>
        </div>
      </div>
    </div>
    <div class="config-section">
      <h3>Configurações de Acesso</h3>
      <div class="form-grid">
        <div class="form-group">
          <label>Tempo de Sessão (minutos)</label>
          <input type="number" value="60">
        </div>
        <div class="form-group">
          <label>Máximo de Tentativas de Login</label>
          <input type="number" value="3">
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="forcePasswordChange" checked>
          <label for="forcePasswordChange">Forçar troca de senha no primeiro login</label>
        </div>
        <div class="form-group checkbox-group">
          <input type="checkbox" id="enableTwoFactor">
          <label for="enableTwoFactor">Habilitar autenticação de dois fatores</label>
        </div>
      </div>
    </div>
  `);
}

function openBackupSettings() {
  showConfigModal('Backup', `
    <div class="config-section">
      <h3>Status dos Backups</h3>
      <div class="backup-grid">
        <div class="backup-card">
          <div class="backup-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5-5 5 5m-5-5v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="backup-details">
            <h4>Último Backup</h4>
            <p>20/08/2024 às 03:00</p>
            <span class="status-badge sucesso">Sucesso</span>
          </div>
        </div>
        <div class="backup-card">
          <div class="backup-icon">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <div class="backup-details">
            <h4>Próximo Backup</h4>
            <p>21/08/2024 às 03:00</p>
            <span class="status-badge agendado">Agendado</span>
          </div>
        </div>
      </div>
    </div>
    <div class="config-section">
      <h3>Ações de Backup</h3>
      <div class="backup-actions">
        <button class="btn-primary" onclick="executarBackup()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m4-5l5-5 5 5m-5-5v12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Executar Backup Agora
        </button>
        <button class="btn-secondary" onclick="baixarBackup()">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m-4-5l5 5 5-5m-5 5V3" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          Baixar Último Backup
        </button>
      </div>
    </div>
  `);
}

function showConfigModal(title, content) {
  // Fechar dropdown
  const dropdown = document.getElementById('configDropdown');
  const dropdownItem = dropdown.closest('.dropdown-item');
  dropdown.classList.remove('show');
  dropdownItem.classList.remove('open');

  // Criar modal
  const modal = document.createElement('div');
  modal.className = 'config-modal-overlay';
  modal.innerHTML = `
    <div class="config-modal">
      <div class="config-modal-header">
        <h2>${title}</h2>
        <button class="config-modal-close" onclick="closeConfigModal()">&times;</button>
      </div>
      <div class="config-modal-content">
        ${content}
      </div>
      <div class="config-modal-footer">
        <button class="btn-primary" onclick="salvarConfiguracoes()">Salvar</button>
        <button class="btn-secondary" onclick="closeConfigModal()">Cancelar</button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
}

function closeConfigModal() {
  const modal = document.querySelector('.config-modal-overlay');
  if (modal) {
    modal.remove();
  }
}

function salvarConfiguracoes() {
  alert('Configurações salvas com sucesso!');
  closeConfigModal();
}

function executarBackup() {
  alert('Backup executado com sucesso!');
}

function baixarBackup() {
  alert('Download do backup iniciado!');
}

// Função simples para toggle dos itens administrativos
function toggleAdminItems() {
  const adminItems = document.querySelectorAll('.admin-item');
  const configBtn = document.getElementById('btnConfigAdm');
  const isExpanded = configBtn.classList.contains('expanded');
  
  if (isExpanded) {
    // Fechar - remover classes de animação
    adminItems.forEach((item, index) => {
      setTimeout(() => {
        item.classList.remove('show');
        setTimeout(() => {
          item.style.display = 'none';
        }, 400);
      }, index * 50);
    });
    configBtn.classList.remove('expanded');
  } else {
    // Abrir - adicionar classes de animação
    configBtn.classList.add('expanded');
    adminItems.forEach((item, index) => {
      item.style.display = 'block';
      // Forçar reflow antes de adicionar a classe show
      item.offsetHeight;
      setTimeout(() => {
        item.classList.add('show');
      }, 10 + (index * 80));
    });
  }
}

// Função para controlar visibilidade de itens admin
function setupAdminVisibility() {
  // Verificar se o usuário é admin (pode ser baseado em localStorage, sessionStorage, etc.)
  const userRole = localStorage.getItem('userRole') || 'vendedor'; // default vendedor
  
  if (userRole === 'admin') {
    document.body.classList.add('admin');
  } else {
    document.body.classList.remove('admin');
  }
}

// Inicializar controle de visibilidade quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
  setupAdminVisibility();
});

// Disponibilizar funções globalmente
window.toggleConfigDropdown = toggleConfigDropdown;
window.openSystemSettings = openSystemSettings;
window.openSecuritySettings = openSecuritySettings;
window.openBackupSettings = openBackupSettings;
window.closeConfigModal = closeConfigModal;
window.salvarConfiguracoes = salvarConfiguracoes;
window.executarBackup = executarBackup;
window.baixarBackup = baixarBackup;
window.toggleAdminItems = toggleAdminItems;

carregarRota('dashboard');
