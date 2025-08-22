// Caixa JS - Nóbrega Confecções

// Dados simulados das transações
let transacoesData = [
    {
        id: 1,
        data: '2024-03-28',
        descricao: 'Venda - Pedido #001',
        categoria: 'vendas',
        tipo: 'entrada',
        valor: 1250.00,
        responsavel: 'João Vendedor'
    },
    {
        id: 2,
        data: '2024-03-27',
        descricao: 'Pagamento Fornecedor - Tecidos',
        categoria: 'fornecedores',
        tipo: 'saida',
        valor: 850.00,
        responsavel: 'Maria Supervisora'
    },
    {
        id: 3,
        data: '2024-03-26',
        descricao: 'Venda - Pedido #002',
        categoria: 'vendas',
        tipo: 'entrada',
        valor: 3500.00,
        responsavel: 'Carlos Vendedor'
    },
    {
        id: 4,
        data: '2024-03-25',
        descricao: 'Salário - Março 2024',
        categoria: 'funcionarios',
        tipo: 'saida',
        valor: 12500.00,
        responsavel: 'Administrador'
    },
    {
        id: 5,
        data: '2024-03-24',
        descricao: 'Venda - Pedido #003',
        categoria: 'vendas',
        tipo: 'entrada',
        valor: 2100.00,
        responsavel: 'Ana Vendedora'
    },
    {
        id: 6,
        data: '2024-03-23',
        descricao: 'Conta de Energia',
        categoria: 'despesas',
        tipo: 'saida',
        valor: 450.00,
        responsavel: 'Administrador'
    }
];

// Dados das contas a receber/pagar
let contasData = {
    receber: [
        {
            id: 1,
            cliente: 'Cliente João Silva',
            descricao: 'Pedido #005 - Vencimento: 30/03/2024',
            valor: 2150.00,
            status: 'pendente',
            vencimento: '2024-03-30'
        },
        {
            id: 2,
            cliente: 'Cliente Maria Santos',
            descricao: 'Pedido #006 - Vencimento: 02/04/2024',
            valor: 1800.00,
            status: 'pendente',
            vencimento: '2024-04-02'
        }
    ],
    pagar: [
        {
            id: 1,
            fornecedor: 'Fornecedor ABC Tecidos',
            descricao: 'Fatura #123 - Vencimento: 01/04/2024',
            valor: 3200.00,
            status: 'vencendo',
            vencimento: '2024-04-01'
        },
        {
            id: 2,
            fornecedor: 'Energia Elétrica',
            descricao: 'Conta de Março - Vencimento: 05/04/2024',
            valor: 450.00,
            status: 'pendente',
            vencimento: '2024-04-05'
        }
    ]
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeCaixa();
    setupEventListeners();
    updateSummary();
});

function initializeCaixa() {
    showCaixaTab('transacoes');
    renderTransacoesTable();
    renderContasSection();
    updateSummary();
}

function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('searchTransacoes');
    if (searchInput) {
        searchInput.addEventListener('input', filterTransacoes);
    }

    // Filtros
    const tipoFilter = document.getElementById('filterTipo');
    const categoriaFilter = document.getElementById('filterCategoria');
    const dataFilter = document.getElementById('filterData');
    
    if (tipoFilter) {
        tipoFilter.addEventListener('change', filterTransacoes);
    }
    
    if (categoriaFilter) {
        categoriaFilter.addEventListener('change', filterTransacoes);
    }
    
    if (dataFilter) {
        dataFilter.addEventListener('change', filterTransacoes);
    }
}

function showCaixaTab(tabName) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adicionar classe active na tab selecionada
    const activeTab = document.querySelector(`[onclick="showCaixaTab('${tabName}')"]`);
    const activeContent = document.getElementById(tabName);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

function renderTransacoesTable(data = transacoesData) {
    const tableBody = document.getElementById('transacoesTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    data.forEach(transacao => {
        const row = document.createElement('tr');
        row.setAttribute('data-tipo', transacao.tipo);
        
        row.innerHTML = `
            <td>${formatDate(transacao.data)}</td>
            <td>${transacao.descricao}</td>
            <td><span class="categoria-badge cat-${transacao.categoria}">${getCategoriaText(transacao.categoria)}</span></td>
            <td><span class="tipo-badge tipo-${transacao.tipo}">${getTipoText(transacao.tipo)}</span></td>
            <td class="valor-${transacao.tipo}">
                ${transacao.tipo === 'entrada' ? '+' : '-'} R$ ${formatCurrency(transacao.valor)}
            </td>
            <td>${transacao.responsavel}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" title="Editar" onclick="editarTransacao(${transacao.id})">📝</button>
                    <button class="btn-view" title="Detalhes" onclick="visualizarTransacao(${transacao.id})">👁️</button>
                    <button class="btn-delete" title="Excluir" onclick="excluirTransacao(${transacao.id})">🗑️</button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

function renderContasSection() {
    // Renderizar contas a receber
    const contasReceberContainer = document.querySelector('#contas .contas-section:first-child .contas-list');
    if (contasReceberContainer) {
        contasReceberContainer.innerHTML = '';
        
        contasData.receber.forEach(conta => {
            const contaElement = document.createElement('div');
            contaElement.className = 'conta-item receber';
            
            contaElement.innerHTML = `
                <div class="conta-info">
                    <h4>${conta.cliente}</h4>
                    <p>${conta.descricao}</p>
                </div>
                <div class="conta-valor">R$ ${formatCurrency(conta.valor)}</div>
                <div class="conta-status">
                    <span class="status-badge status-${conta.status}">${getStatusText(conta.status)}</span>
                </div>
            `;
            
            contasReceberContainer.appendChild(contaElement);
        });
    }

    // Renderizar contas a pagar
    const contasPagarContainer = document.querySelector('#contas .contas-section:last-child .contas-list');
    if (contasPagarContainer) {
        contasPagarContainer.innerHTML = '';
        
        contasData.pagar.forEach(conta => {
            const contaElement = document.createElement('div');
            contaElement.className = 'conta-item pagar';
            
            contaElement.innerHTML = `
                <div class="conta-info">
                    <h4>${conta.fornecedor}</h4>
                    <p>${conta.descricao}</p>
                </div>
                <div class="conta-valor">R$ ${formatCurrency(conta.valor)}</div>
                <div class="conta-status">
                    <span class="status-badge status-${conta.status}">${getStatusText(conta.status)}</span>
                </div>
            `;
            
            contasPagarContainer.appendChild(contaElement);
        });
    }
}

function filterTransacoes() {
    const searchTerm = document.getElementById('searchTransacoes')?.value.toLowerCase() || '';
    const tipoFilter = document.getElementById('filterTipo')?.value || '';
    const categoriaFilter = document.getElementById('filterCategoria')?.value || '';
    const dataFilter = document.getElementById('filterData')?.value || '';

    const filteredData = transacoesData.filter(transacao => {
        const matchesSearch = transacao.descricao.toLowerCase().includes(searchTerm) ||
                            transacao.responsavel.toLowerCase().includes(searchTerm);
        
        const matchesTipo = !tipoFilter || transacao.tipo === tipoFilter;
        const matchesCategoria = !categoriaFilter || transacao.categoria === categoriaFilter;
        const matchesData = !dataFilter || transacao.data === dataFilter;

        return matchesSearch && matchesTipo && matchesCategoria && matchesData;
    });

    renderTransacoesTable(filteredData);
}

function updateSummary() {
    const entradas = transacoesData.filter(t => t.tipo === 'entrada').reduce((sum, t) => sum + t.valor, 0);
    const saidas = transacoesData.filter(t => t.tipo === 'saida').reduce((sum, t) => sum + t.valor, 0);
    const saldoAtual = entradas - saidas + 32070.50; // Saldo anterior simulado
    const lucroMes = entradas - saidas;

    // Atualizar cards de resumo
    const saldoElement = document.querySelector('.summary-card.saldo .summary-info h3');
    const entradasElement = document.querySelector('.summary-card.entradas .summary-info h3');
    const saidasElement = document.querySelector('.summary-card.saidas .summary-info h3');
    const lucroElement = document.querySelector('.summary-card.lucro .summary-info h3');

    if (saldoElement) saldoElement.textContent = `R$ ${formatCurrency(saldoAtual)}`;
    if (entradasElement) entradasElement.textContent = `R$ ${formatCurrency(entradas)}`;
    if (saidasElement) saidasElement.textContent = `R$ ${formatCurrency(saidas)}`;
    if (lucroElement) lucroElement.textContent = `R$ ${formatCurrency(lucroMes)}`;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

function formatCurrency(value) {
    return value.toFixed(2).replace('.', ',').replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function getCategoriaText(categoria) {
    const categoriaMap = {
        'vendas': 'Vendas',
        'fornecedores': 'Fornecedores',
        'funcionarios': 'Funcionários',
        'despesas': 'Despesas'
    };
    return categoriaMap[categoria] || categoria;
}

function getTipoText(tipo) {
    const tipoMap = {
        'entrada': 'Entrada',
        'saida': 'Saída'
    };
    return tipoMap[tipo] || tipo;
}

function getStatusText(status) {
    const statusMap = {
        'pendente': 'Pendente',
        'vencendo': 'Vencendo',
        'pago': 'Pago',
        'recebido': 'Recebido'
    };
    return statusMap[status] || status;
}

// Funções de ação
function novaTransacao() {
    const novaTransacao = {
        id: Date.now(),
        data: new Date().toISOString().split('T')[0],
        descricao: 'Nova Transação',
        categoria: 'vendas',
        tipo: 'entrada',
        valor: 0,
        responsavel: 'Usuário'
    };
    
    // Simular adição
    alert('Modal de nova transação será implementado');
}

function editarTransacao(id) {
    const transacao = transacoesData.find(t => t.id === id);
    if (transacao) {
        alert(`Editando transação: ${transacao.descricao}\nValor: R$ ${formatCurrency(transacao.valor)}\nTipo: ${getTipoText(transacao.tipo)}`);
    }
}

function visualizarTransacao(id) {
    const transacao = transacoesData.find(t => t.id === id);
    if (transacao) {
        const detalhes = `
DETALHES DA TRANSAÇÃO
--------------------
Data: ${formatDate(transacao.data)}
Descrição: ${transacao.descricao}
Categoria: ${getCategoriaText(transacao.categoria)}
Tipo: ${getTipoText(transacao.tipo)}
Valor: R$ ${formatCurrency(transacao.valor)}
Responsável: ${transacao.responsavel}
        `;
        alert(detalhes);
    }
}

function excluirTransacao(id) {
    const transacao = transacoesData.find(t => t.id === id);
    if (transacao && confirm(`Tem certeza que deseja excluir a transação "${transacao.descricao}"?`)) {
        transacoesData = transacoesData.filter(t => t.id !== id);
        renderTransacoesTable();
        updateSummary();
        showNotification('Transação excluída com sucesso!');
    }
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

// Funções para relatórios
function gerarRelatorioFluxo() {
    alert('Relatório de fluxo de caixa será gerado');
}

function baixarRelatorio(tipo) {
    alert(`Download do relatório ${tipo} iniciado`);
}

// Funções para contas
function marcarComoPago(tipo, id) {
    if (tipo === 'receber') {
        const conta = contasData.receber.find(c => c.id === id);
        if (conta) {
            conta.status = 'recebido';
        }
    } else if (tipo === 'pagar') {
        const conta = contasData.pagar.find(c => c.id === id);
        if (conta) {
            conta.status = 'pago';
        }
    }
    
    renderContasSection();
    showNotification('Status da conta atualizado!');
}

// Função para exportar dados financeiros
function exportarDadosFinanceiros() {
    const dadosCompletos = {
        transacoes: transacoesData,
        contas: contasData,
        resumo: {
            entradas: transacoesData.filter(t => t.tipo === 'entrada').reduce((sum, t) => sum + t.valor, 0),
            saidas: transacoesData.filter(t => t.tipo === 'saida').reduce((sum, t) => sum + t.valor, 0),
            dataExportacao: new Date().toISOString()
        }
    };
    
    const dados = JSON.stringify(dadosCompletos, null, 2);
    const blob = new Blob([dados], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nobrega-financeiro-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Dados financeiros exportados com sucesso!');
}

// Função para conciliar conta
function conciliarConta() {
    alert('Funcionalidade de conciliação bancária será implementada');
}

// Função para gerar backup financeiro
function backupFinanceiro() {
    if (confirm('Deseja criar um backup dos dados financeiros?')) {
        showNotification('Backup financeiro criado com sucesso!');
    }
}
