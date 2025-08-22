// Sistema de Gerenciamento de Usuários - Nóbrega Confecções

// Dados dos usuários (simulando uma base de dados)
let usuarios = [
    {
        id: 1,
        nome: "Administrador",
        email: "admin@nobrega.com",
        cargo: "admin",
        status: "ativo",
        ultimoAcesso: "2024-03-28 14:30",
        permissoes: ["Acesso Total"],
        senha: "admin123"
    },
    {
        id: 2,
        nome: "João Vendedor",
        email: "joao.vendedor@nobrega.com",
        cargo: "vendedor",
        status: "ativo",
        ultimoAcesso: "2024-03-28 09:15",
        permissoes: ["Vendas", "Clientes", "Pedidos"],
        senha: "vend123"
    },
    {
        id: 3,
        nome: "Maria Supervisora",
        email: "maria.supervisor@nobrega.com",
        cargo: "supervisor",
        status: "ativo",
        ultimoAcesso: "2024-03-27 16:45",
        permissoes: ["Supervisão", "Vendas", "Clientes", "Relatórios", "Equipe"],
        senha: "supervisor123"
    },
    {
        id: 4,
        nome: "Carlos Produção",
        email: "carlos.producao@nobrega.com",
        cargo: "producao",
        status: "inativo",
        ultimoAcesso: "2024-03-25 08:30",
        permissoes: ["Produção", "Estoque", "Qualidade", "Cronograma"],
        senha: "producao123"
    },
    {
        id: 5,
        nome: "Ana Personalização",
        email: "ana.personalizacao@nobrega.com",
        cargo: "personalizacao",
        status: "ativo",
        ultimoAcesso: "2024-03-28 11:20",
        permissoes: ["Personalização", "Design", "Bordados"],
        senha: "personalizacao123"
    }
];

// Elementos DOM
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const usuariosTableBody = document.getElementById('usuariosTableBody');
const btnNovoUsuario = document.getElementById('btnNovoUsuario');
const usuarioModal = document.getElementById('usuarioModal');
const closeModal = document.getElementById('closeModal');
const cancelBtn = document.getElementById('cancelBtn');
const usuarioForm = document.getElementById('usuarioForm');
const modalTitle = document.getElementById('modalTitle');

let editandoUsuario = null;
let filtroAtivo = 'todos';

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    renderizarUsuarios();
    configurarEventListeners();
});

// Configurar event listeners
function configurarEventListeners() {
    // Busca
    searchInput.addEventListener('input', filtrarUsuarios);
    
    // Filtros
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            filtroAtivo = this.dataset.filter;
            filtrarUsuarios();
        });
    });
    
    // Modal
    btnNovoUsuario.addEventListener('click', abrirModalNovoUsuario);
    closeModal.addEventListener('click', fecharModal);
    cancelBtn.addEventListener('click', fecharModal);
    usuarioForm.addEventListener('submit', salvarUsuario);
    
    // Fechar modal ao clicar fora
    usuarioModal.addEventListener('click', function(e) {
        if (e.target === usuarioModal) {
            fecharModal();
        }
    });
}

// Renderizar tabela de usuários
function renderizarUsuarios(usuariosFiltrados = usuarios) {
    usuariosTableBody.innerHTML = '';
    
    usuariosFiltrados.forEach(usuario => {
        const tr = document.createElement('tr');
        tr.dataset.cargo = usuario.cargo;
        
        tr.innerHTML = `
            <td>
                <div class="usuario-info">
                    <div class="usuario-avatar ${usuario.cargo}-avatar">${obterIniciais(usuario.nome)}</div>
                    <div class="usuario-details">
                        <h4>${usuario.nome}</h4>
                        <span>${usuario.email}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="cargo-badge cargo-${usuario.cargo}">${formatarCargo(usuario.cargo)}</span>
            </td>
            <td>
                <span class="status-badge status-${usuario.status}">${formatarStatus(usuario.status)}</span>
            </td>
            <td>${usuario.ultimoAcesso}</td>
            <td>
                <div class="permissoes-info">
                    <span class="permissao-item">${usuario.permissoes[0] || 'Nenhuma'}</span>
                    <span class="permissao-count">+${usuario.permissoes.length - 1} permissões</span>
                </div>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" title="Editar" onclick="editarUsuario(${usuario.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <button class="btn-permissions" title="Gerenciar Permissões" onclick="gerenciarPermissoes(${usuario.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 13v-2a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L14 4.757V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L4.929 6.343a1 1 0 0 0 0 1.414l.536.536L4.757 10H4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535 1.707.707V20a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H20a1 1 0 0 0 1-1Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ${usuario.cargo !== 'admin' ? `
                    <button class="btn-delete" title="Excluir" onclick="excluirUsuario(${usuario.id})">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 6H5H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    ` : ''}
                </div>
            </td>
        `;
        
        usuariosTableBody.appendChild(tr);
    });
}

// Filtrar usuários
function filtrarUsuarios() {
    const termo = searchInput.value.toLowerCase();
    let usuariosFiltrados = usuarios;
    
    // Filtro por cargo
    if (filtroAtivo !== 'todos') {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => usuario.cargo === filtroAtivo);
    }
    
    // Filtro por busca
    if (termo) {
        usuariosFiltrados = usuariosFiltrados.filter(usuario => 
            usuario.nome.toLowerCase().includes(termo) ||
            usuario.email.toLowerCase().includes(termo) ||
            formatarCargo(usuario.cargo).toLowerCase().includes(termo)
        );
    }
    
    renderizarUsuarios(usuariosFiltrados);
}

// Abrir modal para novo usuário
function abrirModalNovoUsuario() {
    editandoUsuario = null;
    modalTitle.textContent = 'Novo Usuário';
    usuarioForm.reset();
    usuarioModal.style.display = 'block';
}

// Editar usuário
function editarUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    editandoUsuario = usuario;
    modalTitle.textContent = 'Editar Usuário';
    
    // Preencher formulário
    document.getElementById('nome').value = usuario.nome;
    document.getElementById('email').value = usuario.email;
    document.getElementById('cargo').value = usuario.cargo;
    document.getElementById('status').value = usuario.status;
    document.getElementById('senha').value = usuario.senha;
    document.getElementById('confirmarSenha').value = usuario.senha;
    
    usuarioModal.style.display = 'block';
}

// Salvar usuário
function salvarUsuario(e) {
    e.preventDefault();
    
    const formData = new FormData(usuarioForm);
    const dadosUsuario = {
        nome: formData.get('nome'),
        email: formData.get('email'),
        cargo: formData.get('cargo'),
        status: formData.get('status'),
        senha: formData.get('senha'),
        confirmarSenha: formData.get('confirmarSenha')
    };
    
    // Validações
    if (dadosUsuario.senha !== dadosUsuario.confirmarSenha) {
        alert('As senhas não coincidem!');
        return;
    }
    
    if (dadosUsuario.senha.length < 6) {
        alert('A senha deve ter pelo menos 6 caracteres!');
        return;
    }
    
    // Verificar email duplicado
    const emailExiste = usuarios.some(u => 
        u.email === dadosUsuario.email && 
        (!editandoUsuario || u.id !== editandoUsuario.id)
    );
    
    if (emailExiste) {
        alert('Este email já está sendo usado por outro usuário!');
        return;
    }
    
    if (editandoUsuario) {
        // Atualizar usuário existente
        const index = usuarios.findIndex(u => u.id === editandoUsuario.id);
        usuarios[index] = {
            ...editandoUsuario,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            cargo: dadosUsuario.cargo,
            status: dadosUsuario.status,
            senha: dadosUsuario.senha,
            permissoes: obterPermissoesPorCargo(dadosUsuario.cargo)
        };
        
        alert('Usuário atualizado com sucesso!');
    } else {
        // Criar novo usuário
        const novoUsuario = {
            id: Math.max(...usuarios.map(u => u.id)) + 1,
            nome: dadosUsuario.nome,
            email: dadosUsuario.email,
            cargo: dadosUsuario.cargo,
            status: dadosUsuario.status,
            senha: dadosUsuario.senha,
            ultimoAcesso: 'Nunca',
            permissoes: obterPermissoesPorCargo(dadosUsuario.cargo)
        };
        
        usuarios.push(novoUsuario);
        alert('Usuário criado com sucesso!');
    }
    
    fecharModal();
    filtrarUsuarios();
}

// Excluir usuário
function excluirUsuario(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    if (usuario.cargo === 'admin') {
        alert('Não é possível excluir o usuário administrador!');
        return;
    }
    
    if (confirm(`Tem certeza que deseja excluir o usuário "${usuario.nome}"?`)) {
        usuarios = usuarios.filter(u => u.id !== id);
        filtrarUsuarios();
        alert('Usuário excluído com sucesso!');
    }
}

// Gerenciar permissões
function gerenciarPermissoes(id) {
    const usuario = usuarios.find(u => u.id === id);
    if (!usuario) return;
    
    const permissoesTexto = usuario.permissoes.join(', ');
    alert(`Permissões de ${usuario.nome}:\n\n${permissoesTexto}\n\nEsta funcionalidade será implementada em uma versão futura.`);
}

// Fechar modal
function fecharModal() {
    usuarioModal.style.display = 'none';
    usuarioForm.reset();
    editandoUsuario = null;
}

// Funções utilitárias
function obterIniciais(nome) {
    return nome.split(' ')
        .map(palavra => palavra[0])
        .join('')
        .substring(0, 2)
        .toUpperCase();
}

function formatarCargo(cargo) {
    const cargos = {
        'admin': 'Administrador',
        'vendedor': 'Vendedor',
        'supervisor': 'Supervisor',
        'producao': 'Produção',
        'personalizacao': 'Personalização'
    };
    return cargos[cargo] || cargo;
}

function formatarStatus(status) {
    return status === 'ativo' ? 'Ativo' : 'Inativo';
}

function obterPermissoesPorCargo(cargo) {
    const permissoesPorCargo = {
        'admin': ['Acesso Total', 'Usuários', 'Configurações', 'Relatórios', 'Vendas', 'Clientes', 'Pedidos', 'Produção', 'Estoque', 'Financeiro'],
        'vendedor': ['Vendas', 'Clientes', 'Pedidos'],
        'supervisor': ['Supervisão', 'Vendas', 'Clientes', 'Relatórios', 'Equipe'],
        'producao': ['Produção', 'Estoque', 'Qualidade', 'Cronograma'],
        'personalizacao': ['Personalização', 'Design', 'Bordados']
    };
    
    return permissoesPorCargo[cargo] || [];
}

// Exportar funções para uso global
window.editarUsuario = editarUsuario;
window.excluirUsuario = excluirUsuario;
window.gerenciarPermissoes = gerenciarPermissoes;
