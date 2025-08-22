// ConfigPedidos JS - Nóbrega Confecções

// Dados simulados das configurações de pedidos
let configPedidosData = {
    workflow: [
        {
            id: 1,
            numero: 1,
            titulo: 'Recebido',
            descricao: 'Pedido recebido e aguardando processamento',
            tempoEstimado: '1 dia',
            ativo: true
        },
        {
            id: 2,
            numero: 2,
            titulo: 'Em Produção',
            descricao: 'Pedido sendo confeccionado',
            tempoEstimado: '5-7 dias',
            ativo: true
        },
        {
            id: 3,
            numero: 3,
            titulo: 'Finalizado',
            descricao: 'Produção concluída, pronto para entrega',
            tempoEstimado: '1 dia',
            ativo: true
        },
        {
            id: 4,
            numero: 4,
            titulo: 'Entregue',
            descricao: 'Pedido entregue ao cliente',
            tempoEstimado: '2-3 dias',
            ativo: true
        }
    ],
    status: [
        {
            id: 1,
            nome: 'Pendente',
            cor: '#f39c12',
            descricao: 'Aguardando início da produção',
            ativo: true
        },
        {
            id: 2,
            nome: 'Em Produção',
            cor: '#3498db',
            descricao: 'Sendo confeccionado',
            ativo: true
        },
        {
            id: 3,
            nome: 'Finalizado',
            cor: '#27ae60',
            descricao: 'Produção concluída',
            ativo: true
        },
        {
            id: 4,
            nome: 'Entregue',
            cor: '#2ecc71',
            descricao: 'Entregue ao cliente',
            ativo: true
        },
        {
            id: 5,
            nome: 'Cancelado',
            cor: '#e74c3c',
            descricao: 'Pedido cancelado',
            ativo: true
        }
    ],
    prioridades: {
        alta: {
            prazoMaximo: 3,
            desconto: 0,
            notificacoes: true,
            cor: '#e74c3c'
        },
        media: {
            prazoMaximo: 7,
            desconto: 5,
            notificacoes: true,
            cor: '#f39c12'
        },
        baixa: {
            prazoMaximo: 14,
            desconto: 10,
            notificacoes: false,
            cor: '#95a5a6'
        }
    },
    notificacoes: {
        pedidos: {
            novoPedido: true,
            statusAlterado: true,
            prazoVencendo: true,
            pedidoCancelado: true
        },
        producao: {
            inicioProducao: true,
            producaoConcluida: true,
            atrasoProducao: true
        },
        entrega: {
            prontoEntrega: true,
            entregaRealizada: true,
            tentativaEntrega: true
        }
    }
};


    initializeConfigPedidos();
    setupEventListeners();
    loadConfigData();

function initializeConfigPedidos() {
    showConfigTab('workflow');
    renderWorkflowSteps();
    renderStatusList();
    renderPriorityCards();
    renderNotificationSettings();
}

function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showConfigTab(tabName);
        });
    });

    // Toggle switches para notificações
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const notificationKey = this.id;
            handleNotificationToggle(notificationKey, this.checked);
        });
    });
}

function showConfigTab(tabName) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adicionar classe active na tab selecionada
    const activeTab = document.querySelector(`[onclick="showConfigTab('${tabName}')"]`);
    const activeContent = document.getElementById(tabName);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function loadConfigData() {
    // Carregar configurações de notificações
    const notificationToggles = {
        'novoPedido': configPedidosData.notificacoes.pedidos.novoPedido,
        'statusAlterado': configPedidosData.notificacoes.pedidos.statusAlterado,
        'prazoVencendo': configPedidosData.notificacoes.pedidos.prazoVencendo,
        'pedidoCancelado': configPedidosData.notificacoes.pedidos.pedidoCancelado,
        'inicioProducao': configPedidosData.notificacoes.producao.inicioProducao,
        'producaoConcluida': configPedidosData.notificacoes.producao.producaoConcluida,
        'atrasoProducao': configPedidosData.notificacoes.producao.atrasoProducao,
        'prontoEntrega': configPedidosData.notificacoes.entrega.prontoEntrega,
        'entregaRealizada': configPedidosData.notificacoes.entrega.entregaRealizada,
        'tentativaEntrega': configPedidosData.notificacoes.entrega.tentativaEntrega
    };

    Object.keys(notificationToggles).forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.checked = notificationToggles[toggleId];
        }
    });
}

function renderWorkflowSteps() {
    const workflowContainer = document.querySelector('.workflow-steps');
    if (!workflowContainer) return;

    workflowContainer.innerHTML = '';

    configPedidosData.workflow.forEach(step => {
        const stepElement = document.createElement('div');
        stepElement.className = `workflow-step ${step.ativo ? 'active' : ''}`;
        
        stepElement.innerHTML = `
            <div class="step-number">${step.numero}</div>
            <h4 class="step-title">${step.titulo}</h4>
            <p class="step-desc">${step.descricao}</p>
            <span class="step-time">${step.tempoEstimado}</span>
        `;
        
        workflowContainer.appendChild(stepElement);
    });
}

function renderStatusList() {
    const statusContainer = document.querySelector('.status-list');
    if (!statusContainer) return;

    statusContainer.innerHTML = '';

    configPedidosData.status.forEach(status => {
        const statusElement = document.createElement('div');
        statusElement.className = `status-item ${status.nome.toLowerCase().replace(' ', '')}`;
        
        statusElement.innerHTML = `
            <div class="status-info">
                <div class="status-icon">⚫</div>
                <div class="status-details">
                    <h4>${status.nome}</h4>
                    <p>${status.descricao}</p>
                </div>
            </div>
            <div class="status-actions">
                <button class="btn-icon btn-edit" title="Editar" onclick="editarStatus(${status.id})">📝</button>
                <button class="btn-icon btn-delete" title="Excluir" onclick="excluirStatus(${status.id})">🗑️</button>
            </div>
        `;
        
        statusContainer.appendChild(statusElement);
    });
}

function renderPriorityCards() {
    const priorityContainer = document.querySelector('.priority-grid');
    if (!priorityContainer) return;

    priorityContainer.innerHTML = '';

    Object.keys(configPedidosData.prioridades).forEach(prioridadeKey => {
        const prioridade = configPedidosData.prioridades[prioridadeKey];
        const priorityElement = document.createElement('div');
        priorityElement.className = `priority-card ${prioridadeKey}`;
        
        const prioridadeNome = prioridadeKey.charAt(0).toUpperCase() + prioridadeKey.slice(1);
        const icone = prioridadeKey === 'alta' ? '🔴' : prioridadeKey === 'media' ? '🟡' : '🟢';
        
        priorityElement.innerHTML = `
            <div class="priority-header">
                <div class="priority-icon">${icone}</div>
                <h4 class="priority-title">Prioridade ${prioridadeNome}</h4>
            </div>
            <p class="priority-desc">Configurações para pedidos de prioridade ${prioridadeKey}</p>
            <div class="priority-settings">
                <div class="setting-item">
                    <span class="setting-label">Prazo Máximo:</span>
                    <span class="setting-value">${prioridade.prazoMaximo} dias</span>
                </div>
                <div class="setting-item">
                    <span class="setting-label">Desconto:</span>
                    <span class="setting-value">${prioridade.desconto}%</span>
                </div>
                <div class="setting-item">
                    <span class="setting-label">Notificações:</span>
                    <span class="setting-value">${prioridade.notificacoes ? 'Ativas' : 'Inativas'}</span>
                </div>
            </div>
        `;
        
        priorityContainer.appendChild(priorityElement);
    });
}

function renderNotificationSettings() {
    // As configurações de notificação já estão no HTML
    // Esta função pode ser usada para atualizações dinâmicas
}

function handleNotificationToggle(notificationKey, value) {
    // Atualizar dados locais baseado na chave da notificação
    if (notificationKey === 'novoPedido') {
        configPedidosData.notificacoes.pedidos.novoPedido = value;
    } else if (notificationKey === 'statusAlterado') {
        configPedidosData.notificacoes.pedidos.statusAlterado = value;
    } else if (notificationKey === 'prazoVencendo') {
        configPedidosData.notificacoes.pedidos.prazoVencendo = value;
    } else if (notificationKey === 'pedidoCancelado') {
        configPedidosData.notificacoes.pedidos.pedidoCancelado = value;
    } else if (notificationKey === 'inicioProducao') {
        configPedidosData.notificacoes.producao.inicioProducao = value;
    } else if (notificationKey === 'producaoConcluida') {
        configPedidosData.notificacoes.producao.producaoConcluida = value;
    } else if (notificationKey === 'atrasoProducao') {
        configPedidosData.notificacoes.producao.atrasoProducao = value;
    } else if (notificationKey === 'prontoEntrega') {
        configPedidosData.notificacoes.entrega.prontoEntrega = value;
    } else if (notificationKey === 'entregaRealizada') {
        configPedidosData.notificacoes.entrega.entregaRealizada = value;
    } else if (notificationKey === 'tentativaEntrega') {
        configPedidosData.notificacoes.entrega.tentativaEntrega = value;
    }

    showNotification(`Notificação ${notificationKey} ${value ? 'ativada' : 'desativada'}`);
}

function showNotification(message) {
    // Criar notificação temporária
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #8c30f5 0%, #7422cb 100%);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(140, 48, 245, 0.3);
        z-index: 1000;
        font-weight: 500;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Funções de ação para Workflow
function adicionarEtapa() {
    const novaEtapa = {
        id: Date.now(),
        numero: configPedidosData.workflow.length + 1,
        titulo: 'Nova Etapa',
        descricao: 'Descrição da nova etapa',
        tempoEstimado: '1 dia',
        ativo: true
    };
    
    configPedidosData.workflow.push(novaEtapa);
    renderWorkflowSteps();
    showNotification('Nova etapa adicionada ao workflow');
}

function editarEtapa(id) {
    const etapa = configPedidosData.workflow.find(e => e.id === id);
    if (etapa) {
        const novoTitulo = prompt('Novo título da etapa:', etapa.titulo);
        if (novoTitulo) {
            etapa.titulo = novoTitulo;
            renderWorkflowSteps();
            showNotification('Etapa atualizada com sucesso');
        }
    }
}

function excluirEtapa(id) {
    const etapa = configPedidosData.workflow.find(e => e.id === id);
    if (etapa && confirm(`Excluir etapa "${etapa.titulo}"?`)) {
        configPedidosData.workflow = configPedidosData.workflow.filter(e => e.id !== id);
        renderWorkflowSteps();
        showNotification('Etapa excluída com sucesso');
    }
}

// Funções de ação para Status
function adicionarStatus() {
    const novoStatus = {
        id: Date.now(),
        nome: 'Novo Status',
        cor: '#666666',
        descricao: 'Descrição do novo status',
        ativo: true
    };
    
    configPedidosData.status.push(novoStatus);
    renderStatusList();
    showNotification('Novo status adicionado');
}

function editarStatus(id) {
    const status = configPedidosData.status.find(s => s.id === id);
    if (status) {
        const novoNome = prompt('Novo nome do status:', status.nome);
        if (novoNome) {
            status.nome = novoNome;
            renderStatusList();
            showNotification('Status atualizado com sucesso');
        }
    }
}

function excluirStatus(id) {
    const status = configPedidosData.status.find(s => s.id === id);
    if (status && confirm(`Excluir status "${status.nome}"?`)) {
        configPedidosData.status = configPedidosData.status.filter(s => s.id !== id);
        renderStatusList();
        showNotification('Status excluído com sucesso');
    }
}

// Funções de ação para Prioridades
function editarPrioridade(prioridadeKey) {
    const prioridade = configPedidosData.prioridades[prioridadeKey];
    if (prioridade) {
        const novoPrazo = prompt('Novo prazo máximo (dias):', prioridade.prazoMaximo);
        if (novoPrazo && !isNaN(novoPrazo)) {
            prioridade.prazoMaximo = parseInt(novoPrazo);
            renderPriorityCards();
            showNotification(`Prioridade ${prioridadeKey} atualizada`);
        }
    }
}

// Funções de salvamento
function salvarWorkflow() {
    showNotification('Configurações de workflow salvas com sucesso!');
}

function salvarStatus() {
    showNotification('Configurações de status salvas com sucesso!');
}

function salvarPrioridades() {
    showNotification('Configurações de prioridades salvas com sucesso!');
}

function salvarNotificacoes() {
    showNotification('Configurações de notificações salvas com sucesso!');
}

// Função para resetar configurações
function resetarConfiguracoes() {
    if (confirm('Tem certeza que deseja resetar todas as configurações para os valores padrão?')) {
        location.reload();
    }
}

// Função para exportar configurações
function exportarConfigPedidos() {
    const config = JSON.stringify(configPedidosData, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nobrega-config-pedidos-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Configurações de pedidos exportadas!');
}
