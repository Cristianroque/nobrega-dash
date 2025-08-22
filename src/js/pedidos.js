// Pedidos JS - Nóbrega Confecções

// Dados simulados dos pedidos
let pedidosData = [
    {
        id: 1,
        codigo: 'PED001',
        cliente: 'João Silva',
        email: 'joao@email.com',
        produto: 'Camisa Social',
        quantidade: 5,
        valor: 1250.00,
        status: 'pendente',
        prioridade: 'alta',
        data: '2024-03-28',
        prazo: '2024-04-05'
    },
    {
        id: 2,
        codigo: 'PED002',
        cliente: 'Maria Santos',
        email: 'maria@email.com',
        produto: 'Vestido Festa',
        quantidade: 2,
        valor: 800.00,
        status: 'producao',
        prioridade: 'media',
        data: '2024-03-27',
        prazo: '2024-04-10'
    },
    {
        id: 3,
        codigo: 'PED003',
        cliente: 'Carlos Oliveira',
        email: 'carlos@email.com',
        produto: 'Terno Completo',
        quantidade: 1,
        valor: 2500.00,
        status: 'finalizado',
        prioridade: 'alta',
        data: '2024-03-25',
        prazo: '2024-04-01'
    },
    {
        id: 4,
        codigo: 'PED004',
        cliente: 'Ana Costa',
        email: 'ana@email.com',
        produto: 'Blusa Casual',
        quantidade: 3,
        valor: 450.00,
        status: 'entregue',
        prioridade: 'baixa',
        data: '2024-03-20',
        prazo: '2024-03-30'
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializePedidos();
    setupEventListeners();
    updateStats();
});

function initializePedidos() {
    renderPedidosTable();
    updateStats();
}

function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('searchPedidos');
    if (searchInput) {
        searchInput.addEventListener('input', filterPedidos);
    }

    // Filtros
    const statusFilter = document.getElementById('filterStatus');
    const prioridadeFilter = document.getElementById('filterPrioridade');
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterPedidos);
    }
    
    if (prioridadeFilter) {
        prioridadeFilter.addEventListener('change', filterPedidos);
    }
}

function renderPedidosTable(data = pedidosData) {
    const tableBody = document.getElementById('pedidosTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    data.forEach(pedido => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <div class="cliente-info">
                    <div class="cliente-avatar">${getInitials(pedido.cliente)}</div>
                    <div class="cliente-details">
                        <h4>${pedido.cliente}</h4>
                        <span>${pedido.email}</span>
                    </div>
                </div>
            </td>
            <td>
                <strong>${pedido.codigo}</strong><br>
                <span style="color: #666; font-size: 0.85rem;">${pedido.produto}</span>
            </td>
            <td>${pedido.quantidade}</td>
            <td>R$ ${pedido.valor.toFixed(2).replace('.', ',')}</td>
            <td><span class="status-badge status-${pedido.status}">${getStatusText(pedido.status)}</span></td>
            <td><span class="prioridade-badge prioridade-${pedido.prioridade}">${getPrioridadeText(pedido.prioridade)}</span></td>
            <td>${formatDate(pedido.prazo)}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" title="Editar" onclick="editarPedido(${pedido.id})">📝</button>
                    <button class="btn-view" title="Visualizar" onclick="visualizarPedido(${pedido.id})">👁️</button>
                    <button class="btn-delete" title="Excluir" onclick="excluirPedido(${pedido.id})">🗑️</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterPedidos() {
    const searchTerm = document.getElementById('searchPedidos')?.value.toLowerCase() || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';
    const prioridadeFilter = document.getElementById('filterPrioridade')?.value || '';

    const filteredData = pedidosData.filter(pedido => {
        const matchesSearch = pedido.cliente.toLowerCase().includes(searchTerm) ||
                            pedido.codigo.toLowerCase().includes(searchTerm) ||
                            pedido.produto.toLowerCase().includes(searchTerm);
        
        const matchesStatus = !statusFilter || pedido.status === statusFilter;
        const matchesPrioridade = !prioridadeFilter || pedido.prioridade === prioridadeFilter;

        return matchesSearch && matchesStatus && matchesPrioridade;
    });

    renderPedidosTable(filteredData);
}

function updateStats() {
    const stats = {
        pendente: pedidosData.filter(p => p.status === 'pendente').length,
        producao: pedidosData.filter(p => p.status === 'producao').length,
        finalizado: pedidosData.filter(p => p.status === 'finalizado').length,
        entregue: pedidosData.filter(p => p.status === 'entregue').length
    };

    // Atualizar cards de estatísticas se existirem
    Object.keys(stats).forEach(status => {
        const element = document.querySelector(`.stat-card .stat-icon.${status} + .stat-info h3`);
        if (element) {
            element.textContent = stats[status];
        }
    });
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getStatusText(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'producao': 'Em Produção',
        'finalizado': 'Finalizado',
        'entregue': 'Entregue'
    };
    return statusMap[status] || status;
}

function getPrioridadeText(prioridade) {
    const prioridadeMap = {
        'alta': 'Alta',
        'media': 'Média',
        'baixa': 'Baixa'
    };
    return prioridadeMap[prioridade] || prioridade;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Funções de ação
function novoPedido() {
    alert('Funcionalidade de novo pedido será implementada');
}

function editarPedido(id) {
    const pedido = pedidosData.find(p => p.id === id);
    if (pedido) {
        alert(`Editando pedido: ${pedido.codigo} - ${pedido.cliente}`);
    }
}

function visualizarPedido(id) {
    const pedido = pedidosData.find(p => p.id === id);
    if (pedido) {
        alert(`Visualizando pedido: ${pedido.codigo}\nCliente: ${pedido.cliente}\nProduto: ${pedido.produto}\nValor: R$ ${pedido.valor.toFixed(2)}`);
    }
}

function excluirPedido(id) {
    const pedido = pedidosData.find(p => p.id === id);
    if (pedido && confirm(`Tem certeza que deseja excluir o pedido ${pedido.codigo}?`)) {
        pedidosData = pedidosData.filter(p => p.id !== id);
        renderPedidosTable();
        updateStats();
        alert('Pedido excluído com sucesso!');
    }
}

// Função para alterar status do pedido
function alterarStatus(id, novoStatus) {
    const pedido = pedidosData.find(p => p.id === id);
    if (pedido) {
        pedido.status = novoStatus;
        renderPedidosTable();
        updateStats();
    }
}
