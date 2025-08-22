// ConfigAdm JS - Nóbrega Confecções

// Dados simulados das configurações
let configData = {
    sistema: {
        nomeEmpresa: 'Nóbrega Confecções',
        email: 'contato@nobregaconfeccoes.com',
        telefone: '(11) 99999-9999',
        endereco: 'Rua das Confecções, 123',
        cidade: 'São Paulo',
        estado: 'SP',
        cep: '01234-567',
        cnpj: '12.345.678/0001-90',
        versaoSistema: '2.1.4',
        ultimaAtualizacao: '2024-03-15'
    },
    usuarios: {
        registroAutomatico: true,
        aprovacaoManual: false,
        senhaMinima: 8,
        sessaoExpira: 30,
        tentativasLogin: 3
    },
    seguranca: {
        ssl: true,
        backup: true,
        logs: true,
        notificacoes: true,
        autenticacao2fa: false
    },
    backups: [
        {
            id: 1,
            nome: 'Backup Completo - Março 2024',
            data: '2024-03-28 02:00',
            tamanho: '2.3 GB',
            status: 'sucesso',
            tipo: 'completo'
        },
        {
            id: 2,
            nome: 'Backup Incremental - Março 2024',
            data: '2024-03-27 02:00',
            tamanho: '156 MB',
            status: 'sucesso',
            tipo: 'incremental'
        },
        {
            id: 3,
            nome: 'Backup Completo - Fevereiro 2024',
            data: '2024-02-28 02:00',
            tamanho: '2.1 GB',
            status: 'erro',
            tipo: 'completo'
        }
    ]
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeConfigAdm();
    setupEventListeners();
    loadConfigData();
});

function initializeConfigAdm() {
    showTab('sistema');
    renderBackupList();
    updateSecurityStatus();
}

// Funções para as ações dos botões
function salvarConfiguracoes() {
    showNotification('Configurações salvas com sucesso!');
}

function resetarConfiguracoes() {
    if (confirm('Tem certeza que deseja restaurar as configurações padrão?')) {
        showNotification('Configurações restauradas para os padrões!');
        loadConfigData();
    }
}

function executarBackup() {
    showNotification('Backup iniciado! Você será notificado quando concluído.');
    setTimeout(() => {
        showNotification('Backup concluído com sucesso!');
    }, 3000);
}

function baixarBackup() {
    showNotification('Download do backup iniciado!');
}

function adicionarUsuario() {
    showNotification('Funcionalidade de adicionar usuário em desenvolvimento.');
}

function editarUsuario(usuario) {
    showNotification(`Editando usuário: ${usuario}`);
}

function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.addEventListener('click', function() {
            const tabName = this.getAttribute('onclick').match(/'([^']+)'/)[1];
            showConfigTab(tabName);
        });
    });

    // Toggle switches
    document.querySelectorAll('.toggle-switch input').forEach(toggle => {
        toggle.addEventListener('change', function() {
            const configKey = this.id;
            handleToggleChange(configKey, this.checked);
        });
    });

    // Form submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const formType = this.getAttribute('data-form-type');
            handleFormSubmit(formType, new FormData(this));
        });
    });
}

function showTab(tabName) {
    // Remover classe active de todas as tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });

    // Adicionar classe active na tab selecionada
    const activeTab = document.querySelector(`[onclick="showTab('${tabName}')"]`);
    const activeContent = document.getElementById(tabName);
    
    if (activeTab) activeTab.classList.add('active');
    if (activeContent) activeContent.classList.add('active');
}

// Manter compatibilidade
function showConfigTab(tabName) {
    showTab(tabName);
}

function loadConfigData() {
    // Carregar dados do sistema
    const sistemaInputs = {
        'nomeEmpresa': configData.sistema.nomeEmpresa,
        'emailEmpresa': configData.sistema.email,
        'telefoneEmpresa': configData.sistema.telefone,
        'enderecoEmpresa': configData.sistema.endereco,
        'cidadeEmpresa': configData.sistema.cidade,
        'estadoEmpresa': configData.sistema.estado,
        'cepEmpresa': configData.sistema.cep,
        'cnpjEmpresa': configData.sistema.cnpj
    };

    Object.keys(sistemaInputs).forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.value = sistemaInputs[inputId];
        }
    });

    // Carregar configurações de usuários
    const usuariosInputs = {
        'senhaMinima': configData.usuarios.senhaMinima,
        'sessaoExpira': configData.usuarios.sessaoExpira,
        'tentativasLogin': configData.usuarios.tentativasLogin
    };

    Object.keys(usuariosInputs).forEach(inputId => {
        const input = document.getElementById(inputId);
        if (input) {
            input.value = usuariosInputs[inputId];
        }
    });

    // Carregar toggles
    const toggles = {
        'registroAutomatico': configData.usuarios.registroAutomatico,
        'aprovacaoManual': configData.usuarios.aprovacaoManual,
        'sslAtivo': configData.seguranca.ssl,
        'backupAutomatico': configData.seguranca.backup,
        'logsAtivados': configData.seguranca.logs,
        'notificacoesSeguranca': configData.seguranca.notificacoes,
        'autenticacao2fa': configData.seguranca.autenticacao2fa
    };

    Object.keys(toggles).forEach(toggleId => {
        const toggle = document.getElementById(toggleId);
        if (toggle) {
            toggle.checked = toggles[toggleId];
        }
    });
}

function handleToggleChange(configKey, value) {
    // Atualizar dados locais
    switch(configKey) {
        case 'registroAutomatico':
            configData.usuarios.registroAutomatico = value;
            break;
        case 'aprovacaoManual':
            configData.usuarios.aprovacaoManual = value;
            break;
        case 'sslAtivo':
            configData.seguranca.ssl = value;
            break;
        case 'backupAutomatico':
            configData.seguranca.backup = value;
            break;
        case 'logsAtivados':
            configData.seguranca.logs = value;
            break;
        case 'notificacoesSeguranca':
            configData.seguranca.notificacoes = value;
            break;
        case 'autenticacao2fa':
            configData.seguranca.autenticacao2fa = value;
            break;
    }

    updateSecurityStatus();
    showNotification(`Configuração ${configKey} ${value ? 'ativada' : 'desativada'}`);
}

function handleFormSubmit(formType, formData) {
    switch(formType) {
        case 'sistema':
            salvarConfigSistema(formData);
            break;
        case 'usuarios':
            salvarConfigUsuarios(formData);
            break;
        case 'seguranca':
            salvarConfigSeguranca(formData);
            break;
        default:
            console.log('Tipo de formulário não reconhecido:', formType);
    }
}

function salvarConfigSistema(formData) {
    // Simular salvamento
    showNotification('Configurações do sistema salvas com sucesso!');
}

function salvarConfigUsuarios(formData) {
    // Simular salvamento
    showNotification('Configurações de usuários salvas com sucesso!');
}

function salvarConfigSeguranca(formData) {
    // Simular salvamento
    showNotification('Configurações de segurança salvas com sucesso!');
}

function updateSecurityStatus() {
    const securityCards = document.querySelectorAll('.status-card');
    
    // SSL Status
    const sslCard = securityCards[0];
    if (sslCard && configData.seguranca.ssl) {
        sslCard.className = 'status-card secure';
        sslCard.querySelector('.status-desc').textContent = 'Certificado SSL ativo e válido';
    }

    // Backup Status
    const backupCard = securityCards[1];
    if (backupCard && configData.seguranca.backup) {
        backupCard.className = 'status-card secure';
        backupCard.querySelector('.status-desc').textContent = 'Backup automático ativo';
    }

    // 2FA Status
    const tfaCard = securityCards[2];
    if (tfaCard) {
        if (configData.seguranca.autenticacao2fa) {
            tfaCard.className = 'status-card secure';
            tfaCard.querySelector('.status-desc').textContent = 'Autenticação 2FA ativa';
        } else {
            tfaCard.className = 'status-card warning';
            tfaCard.querySelector('.status-desc').textContent = 'Recomendamos ativar 2FA';
        }
    }
}

function renderBackupList() {
    const backupList = document.querySelector('.backup-list');
    if (!backupList) return;

    backupList.innerHTML = '';

    configData.backups.forEach(backup => {
        const backupItem = document.createElement('div');
        backupItem.className = 'backup-item';
        
        backupItem.innerHTML = `
            <div class="backup-info">
                <h4>${backup.nome}</h4>
                <p>${backup.data} • ${backup.tamanho} • ${backup.tipo}</p>
            </div>
            <div class="backup-status">
                <span class="status-badge status-${backup.status}">${getStatusText(backup.status)}</span>
                <button class="btn-secondary btn-small" onclick="downloadBackup(${backup.id})">
                    📥 Baixar
                </button>
            </div>
        `;
        
        backupList.appendChild(backupItem);
    });
}

function getStatusText(status) {
    const statusMap = {
        'sucesso': 'Sucesso',
        'erro': 'Erro',
        'processando': 'Processando'
    };
    return statusMap[status] || status;
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

// Funções de ação
function criarBackup() {
    if (confirm('Deseja criar um novo backup completo do sistema?')) {
        const novoBackup = {
            id: Date.now(),
            nome: `Backup Manual - ${new Date().toLocaleDateString('pt-BR')}`,
            data: new Date().toLocaleString('pt-BR'),
            tamanho: 'Processando...',
            status: 'processando',
            tipo: 'completo'
        };
        
        configData.backups.unshift(novoBackup);
        renderBackupList();
        showNotification('Backup iniciado! Você será notificado quando concluído.');
        
        // Simular conclusão do backup
        setTimeout(() => {
            novoBackup.status = 'sucesso';
            novoBackup.tamanho = '2.4 GB';
            renderBackupList();
            showNotification('Backup concluído com sucesso!');
        }, 5000);
    }
}

function downloadBackup(backupId) {
    const backup = configData.backups.find(b => b.id === backupId);
    if (backup) {
        showNotification(`Download do backup "${backup.nome}" iniciado`);
    }
}

function restaurarBackup(backupId) {
    const backup = configData.backups.find(b => b.id === backupId);
    if (backup && confirm(`Tem certeza que deseja restaurar o backup "${backup.nome}"? Esta ação não pode ser desfeita.`)) {
        showNotification('Restauração iniciada. O sistema será reiniciado em breve.');
    }
}

function excluirBackup(backupId) {
    const backup = configData.backups.find(b => b.id === backupId);
    if (backup && confirm(`Tem certeza que deseja excluir o backup "${backup.nome}"?`)) {
        configData.backups = configData.backups.filter(b => b.id !== backupId);
        renderBackupList();
        showNotification('Backup excluído com sucesso!');
    }
}

function resetarSistema() {
    if (confirm('ATENÇÃO: Esta ação irá resetar todas as configurações para os valores padrão. Deseja continuar?')) {
        if (confirm('Esta ação não pode ser desfeita. Tem certeza absoluta?')) {
            showNotification('Sistema será resetado em 10 segundos...');
        }
    }
}

function exportarConfiguracoes() {
    const config = JSON.stringify(configData, null, 2);
    const blob = new Blob([config], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `nobrega-config-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    
    URL.revokeObjectURL(url);
    showNotification('Configurações exportadas com sucesso!');
}

function importarConfiguracoes() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    const importedConfig = JSON.parse(e.target.result);
                    if (confirm('Deseja importar as configurações? As configurações atuais serão substituídas.')) {
                        configData = importedConfig;
                        loadConfigData();
                        renderBackupList();
                        updateSecurityStatus();
                        showNotification('Configurações importadas com sucesso!');
                    }
                } catch (error) {
                    alert('Erro ao importar configurações. Verifique se o arquivo é válido.');
                }
            };
            reader.readAsText(file);
        }
    };
    
    input.click();
}
