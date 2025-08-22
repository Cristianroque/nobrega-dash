// Lojas JS - Nóbrega Confecções

// Dados simulados das lojas
let lojasData = [
    {
        id: 1,
        nome: 'Loja Centro',
        endereco: 'Rua XV de Novembro, 123 - Centro',
        cidade: 'São Paulo',
        estado: 'SP',
        gerente: 'Maria Silva',
        telefone: '(11) 3333-1111',
        funcionarios: 8,
        status: 'ativa',
        vendas: 45200.00,
        meta: 50000.00,
        performance: 90,
        badges: ['destaque', 'premium']
    },
    {
        id: 2,
        nome: 'Loja Shopping Norte',
        endereco: 'Shopping Norte, Loja 245',
        cidade: 'São Paulo',
        estado: 'SP',
        gerente: 'João Santos',
        telefone: '(11) 3333-2222',
        funcionarios: 12,
        status: 'ativa',
        vendas: 62800.00,
        meta: 60000.00,
        performance: 105,
        badges: ['destaque']
    },
    {
        id: 3,
        nome: 'Loja Vila Madalena',
        endereco: 'Rua Harmonia, 456 - Vila Madalena',
        cidade: 'São Paulo',
        estado: 'SP',
        gerente: 'Carlos Oliveira',
        telefone: '(11) 3333-3333',
        funcionarios: 6,
        status: 'ativa',
        vendas: 38900.00,
        meta: 45000.00,
        performance: 86,
        badges: ['nova']
    },
    {
        id: 4,
        nome: 'Loja ABC Paulista',
        endereco: 'Av. Paulista, 789 - Bela Vista',
        cidade: 'São Paulo',
        estado: 'SP',
        gerente: 'Ana Costa',
        telefone: '(11) 3333-4444',
        funcionarios: 15,
        status: 'ativa',
        vendas: 78500.00,
        meta: 70000.00,
        performance: 112,
        badges: ['destaque', 'premium']
    },
    {
        id: 5,
        nome: 'Loja Campinas',
        endereco: 'Rua Barão de Jaguara, 321 - Centro',
        cidade: 'Campinas',
        estado: 'SP',
        gerente: 'Pedro Almeida',
        telefone: '(19) 3333-5555',
        funcionarios: 10,
        status: 'manutencao',
        vendas: 0.00,
        meta: 55000.00,
        performance: 0,
        badges: []
    },
    {
        id: 6,
        nome: 'Loja Santos',
        endereco: 'Rua do Comércio, 654 - Centro',
        cidade: 'Santos',
        estado: 'SP',
        gerente: 'Lucia Ferreira',
        telefone: '(13) 3333-6666',
        funcionarios: 7,
        status: 'ativa',
        vendas: 41200.00,
        meta: 40000.00,
        performance: 103,
        badges: ['nova']
    }
];

// Função para mostrar aba específica
function showTab(tabName) {
    // Remover classe active de todas as abas
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Ocultar todo o conteúdo das abas
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Ativar a aba clicada
    const activeTab = document.querySelector(`.tab[onclick="showTab('${tabName}')"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // Mostrar o conteúdo da aba correspondente
    const activeContent = document.getElementById(tabName);
    if (activeContent) {
        activeContent.classList.add('active');
    }
}

// Inicialização

    initializeLojas();
    setupEventListeners();
    updateStats();

    showTab('livramento');

function initializeLojas() {
    renderLojasGrid();
    updateStats();
}

function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('searchLojas');
    if (searchInput) {
        searchInput.addEventListener('input', filterLojas);
    }

    // Filtros
    const estadoFilter = document.getElementById('filterEstado');
    const statusFilter = document.getElementById('filterStatus');
    
    if (estadoFilter) {
        estadoFilter.addEventListener('change', filterLojas);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterLojas);
    }
}

function renderLojasGrid(data = lojasData) {
    const lojasGrid = document.getElementById('lojasGrid');
    if (!lojasGrid) return;

    lojasGrid.innerHTML = '';

    data.forEach(loja => {
        const card = document.createElement('div');
        card.className = 'loja-card';
        
        const badgesHtml = loja.badges.map(badge => 
            `<span class="badge badge-${badge}">${getBadgeText(badge)}</span>`
        ).join('');

        card.innerHTML = `
            <div class="loja-header">
                <h3 class="loja-title">${loja.nome}</h3>
                <p class="loja-endereco">${loja.endereco}</p>
            </div>
            <div class="loja-content">
                <span class="status-badge status-${loja.status}">${getStatusText(loja.status)}</span>
                
                ${badgesHtml ? `<div class="loja-badges">${badgesHtml}</div>` : ''}
                
                <div class="loja-info">
                    <div class="info-item">
                        <div class="info-label">Cidade</div>
                        <div class="info-value">${loja.cidade}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Estado</div>
                        <div class="info-value">${loja.estado}</div>
                    </div>
                </div>

                <div class="loja-gerente">
                    <div class="gerente-avatar">${getInitials(loja.gerente)}</div>
                    <div class="gerente-info">
                        <h4>${loja.gerente}</h4>
                        <p>Gerente • ${loja.telefone}</p>
                    </div>
                </div>

                <div class="loja-stats">
                    <div class="stat-item">
                        <span class="stat-value">R$ ${formatCurrency(loja.vendas)}</span>
                        <span class="stat-label">Vendas</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${loja.funcionarios}</span>
                        <span class="stat-label">Funcionários</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${loja.performance}%</span>
                        <span class="stat-label">Meta</span>
                        <div class="performance-indicator">
                            <div class="performance-bar" style="width: ${Math.min(loja.performance, 100)}%"></div>
                        </div>
                    </div>
                </div>

                <div class="action-buttons">
                    <button class="btn-edit" onclick="editarLoja(${loja.id})">📝 Editar</button>
                    <button class="btn-view" onclick="visualizarLoja(${loja.id})">📊 Relatórios</button>
                    <button class="btn-settings" onclick="configurarLoja(${loja.id})">⚙️ Config</button>
                </div>
            </div>
        `;
        
        lojasGrid.appendChild(card);
    });
}

function filterLojas() {
    const searchTerm = document.getElementById('searchLojas')?.value.toLowerCase() || '';
    const estadoFilter = document.getElementById('filterEstado')?.value || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';

    const filteredData = lojasData.filter(loja => {
        const matchesSearch = loja.nome.toLowerCase().includes(searchTerm) ||
                            loja.cidade.toLowerCase().includes(searchTerm) ||
                            loja.gerente.toLowerCase().includes(searchTerm);
        
        const matchesEstado = !estadoFilter || loja.estado === estadoFilter;
        const matchesStatus = !statusFilter || loja.status === statusFilter;

        return matchesSearch && matchesEstado && matchesStatus;
    });

    renderLojasGrid(filteredData);
}

function updateStats() {
    const stats = {
        total: lojasData.length,
        ativas: lojasData.filter(l => l.status === 'ativa').length,
        vendas: lojasData.reduce((sum, loja) => sum + loja.vendas, 0),
        funcionarios: lojasData.reduce((sum, loja) => sum + loja.funcionarios, 0)
    };

    // Atualizar cards de estatísticas se existirem
    const totalElement = document.querySelector('.stat-card:nth-child(1) .stat-info h3');
    const ativasElement = document.querySelector('.stat-card:nth-child(2) .stat-info h3');
    const vendasElement = document.querySelector('.stat-card:nth-child(3) .stat-info h3');
    const funcionariosElement = document.querySelector('.stat-card:nth-child(4) .stat-info h3');

    if (totalElement) totalElement.textContent = stats.total;
    if (ativasElement) ativasElement.textContent = stats.ativas;
    if (vendasElement) vendasElement.textContent = `R$ ${formatCurrency(stats.vendas)}`;
    if (funcionariosElement) funcionariosElement.textContent = stats.funcionarios;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusText(status) {
    const statusMap = {
        'ativa': 'Ativa',
        'inativa': 'Inativa',
        'manutencao': 'Manutenção'
    };
    return statusMap[status] || status;
}

function getBadgeText(badge) {
    const badgeMap = {
        'destaque': 'Destaque',
        'nova': 'Nova',
        'premium': 'Premium'
    };
    return badgeMap[badge] || badge;
}

function formatCurrency(value) {
    return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Funções de ação
function novaLoja() {
    alert('Funcionalidade de nova loja será implementada');
}

function editarLoja(id) {
    const loja = lojasData.find(l => l.id === id);
    if (loja) {
        alert(`Editando loja: ${loja.nome}\nGerente: ${loja.gerente}\nEndereço: ${loja.endereco}`);
    }
}

function visualizarLoja(id) {
    const loja = lojasData.find(l => l.id === id);
    if (loja) {
        const relatorio = `
Relatório da ${loja.nome}
------------------------
Vendas: R$ ${formatCurrency(loja.vendas)}
Meta: R$ ${formatCurrency(loja.meta)}
Performance: ${loja.performance}%
Funcionários: ${loja.funcionarios}
Status: ${getStatusText(loja.status)}
Gerente: ${loja.gerente}
        `;
        alert(relatorio);
    }
}

function configurarLoja(id) {
    const loja = lojasData.find(l => l.id === id);
    if (loja) {
        alert(`Configurações da ${loja.nome} será implementada`);
    }
}

function excluirLoja(id) {
    const loja = lojasData.find(l => l.id === id);
    if (loja && confirm(`Tem certeza que deseja excluir a loja "${loja.nome}"?`)) {
        lojasData = lojasData.filter(l => l.id !== id);
        renderLojasGrid();
        updateStats();
        alert('Loja excluída com sucesso!');
    }
}

// Função para alterar status da loja
function alterarStatusLoja(id, novoStatus) {
    const loja = lojasData.find(l => l.id === id);
    if (loja) {
        loja.status = novoStatus;
        renderLojasGrid();
        updateStats();
        alert(`Status da ${loja.nome} alterado para: ${getStatusText(novoStatus)}`);
    }
}

// Função para atualizar meta da loja
function atualizarMeta(id, novaMeta) {
    const loja = lojasData.find(l => l.id === id);
    if (loja) {
        loja.meta = novaMeta;
        loja.performance = Math.round((loja.vendas / loja.meta) * 100);
        renderLojasGrid();
        alert(`Meta da ${loja.nome} atualizada para: R$ ${formatCurrency(novaMeta)}`);
    }
}

// Função para gerar relatório consolidado
function gerarRelatorioConsolidado() {
    const totalVendas = lojasData.reduce((sum, loja) => sum + loja.vendas, 0);
    const totalMeta = lojasData.reduce((sum, loja) => sum + loja.meta, 0);
    const performanceGeral = Math.round((totalVendas / totalMeta) * 100);
    
    const relatorio = `
RELATÓRIO CONSOLIDADO - NÓBREGA CONFECÇÕES
==========================================

Total de Lojas: ${lojasData.length}
Lojas Ativas: ${lojasData.filter(l => l.status === 'ativa').length}
Lojas em Manutenção: ${lojasData.filter(l => l.status === 'manutencao').length}

Vendas Totais: R$ ${formatCurrency(totalVendas)}
Meta Total: R$ ${formatCurrency(totalMeta)}
Performance Geral: ${performanceGeral}%

Total de Funcionários: ${lojasData.reduce((sum, loja) => sum + loja.funcionarios, 0)}

RANKING DE PERFORMANCE:
${lojasData
    .sort((a, b) => b.performance - a.performance)
    .map((loja, index) => `${index + 1}. ${loja.nome} - ${loja.performance}%`)
    .join('\n')}
    `;
    
    alert(relatorio);
}

// Função para exportar dados das lojas
function exportarDadosLojas() {
    const dados = JSON.stringify(lojasData, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nobrega-lojas-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    alert('Dados das lojas exportados com sucesso!');
}

// Função para sincronizar dados
function sincronizarDados() {
    alert('Sincronizando dados com o servidor...');
    
    // Simular sincronização
    setTimeout(() => {
        alert('Dados sincronizados com sucesso!');
        renderLojasGrid();
        updateStats();
    }, 2000);
}
