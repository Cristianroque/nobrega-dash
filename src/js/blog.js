// Blog JS - Nóbrega Confecções

// Dados simulados dos posts do blog
let blogData = [
    {
        id: 1,
        titulo: 'Nova Coleção Primavera/Verão 2024',
        categoria: 'novidades',
        autor: 'Maria Silva',
        data: '2024-03-28',
        status: 'publicado',
        visualizacoes: 1250,
        comentarios: 23,
        excerpt: 'Descubra as últimas tendências da moda em nossa nova coleção. Peças exclusivas com design moderno e qualidade Nóbrega.',
        imagem: '👗'
    },
    {
        id: 2,
        titulo: 'Como Cuidar das Suas Roupas de Festa',
        categoria: 'dicas',
        autor: 'João Santos',
        data: '2024-03-25',
        status: 'publicado',
        visualizacoes: 890,
        comentarios: 15,
        excerpt: 'Dicas essenciais para manter suas roupas de festa sempre impecáveis. Aprenda técnicas de conservação e limpeza.',
        imagem: '✨'
    },
    {
        id: 3,
        titulo: 'Lançamento: Linha Executiva Masculina',
        categoria: 'produtos',
        autor: 'Carlos Oliveira',
        data: '2024-03-22',
        status: 'rascunho',
        visualizacoes: 0,
        comentarios: 0,
        excerpt: 'Nossa nova linha executiva masculina combina elegância e conforto para o homem moderno.',
        imagem: '👔'
    },
    {
        id: 4,
        titulo: 'Tendências de Cores para o Outono',
        categoria: 'novidades',
        autor: 'Ana Costa',
        data: '2024-04-01',
        status: 'agendado',
        visualizacoes: 0,
        comentarios: 0,
        excerpt: 'Conheça as cores que estarão em alta na próxima estação e como incorporá-las ao seu guarda-roupa.',
        imagem: '🎨'
    },
    {
        id: 5,
        titulo: 'Guia de Tamanhos Nóbrega',
        categoria: 'dicas',
        autor: 'Maria Silva',
        data: '2024-03-20',
        status: 'publicado',
        visualizacoes: 2100,
        comentarios: 45,
        excerpt: 'Encontre o tamanho perfeito com nosso guia completo de medidas. Dicas para acertar na escolha.',
        imagem: '📏'
    },
    {
        id: 6,
        titulo: 'Sustentabilidade na Moda',
        categoria: 'novidades',
        autor: 'João Santos',
        data: '2024-03-18',
        status: 'publicado',
        visualizacoes: 1560,
        comentarios: 32,
        excerpt: 'Como a Nóbrega Confecções está contribuindo para uma moda mais sustentável e consciente.',
        imagem: '🌱'
    }
];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    initializeBlog();
    setupEventListeners();
    updateStats();
});

function initializeBlog() {
    renderBlogGrid();
    updateStats();
}

function setupEventListeners() {
    // Busca
    const searchInput = document.getElementById('searchBlog');
    if (searchInput) {
        searchInput.addEventListener('input', filterBlog);
    }

    // Filtros
    const categoriaFilter = document.getElementById('filterCategoria');
    const statusFilter = document.getElementById('filterStatus');
    
    if (categoriaFilter) {
        categoriaFilter.addEventListener('change', filterBlog);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', filterBlog);
    }
}

function renderBlogGrid(data = blogData) {
    const blogGrid = document.getElementById('blogGrid');
    if (!blogGrid) return;

    blogGrid.innerHTML = '';

    data.forEach(post => {
        const card = document.createElement('div');
        card.className = 'blog-card';
        card.innerHTML = `
            <div class="blog-image">
                ${post.imagem}
            </div>
            <div class="blog-content">
                <div class="blog-meta">
                    <span class="categoria-badge cat-${post.categoria}">${getCategoriaText(post.categoria)}</span>
                    <span class="blog-date">${formatDate(post.data)}</span>
                </div>
                <h3 class="blog-title">${post.titulo}</h3>
                <p class="blog-excerpt">${post.excerpt}</p>
                <div class="blog-footer">
                    <div class="blog-author">
                        <div class="author-avatar">${getInitials(post.autor)}</div>
                        <span class="author-name">${post.autor}</span>
                    </div>
                    <div class="blog-stats">
                        <span>👁️ ${post.visualizacoes}</span>
                        <span>💬 ${post.comentarios}</span>
                    </div>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem;">
                    <span class="status-badge status-${post.status}">${getStatusText(post.status)}</span>
                    <div class="action-buttons">
                        <button class="btn-edit" title="Editar" onclick="editarPost(${post.id})">📝</button>
                        <button class="btn-view" title="Visualizar" onclick="visualizarPost(${post.id})">👁️</button>
                        <button class="btn-delete" title="Excluir" onclick="excluirPost(${post.id})">🗑️</button>
                    </div>
                </div>
            </div>
        `;
        blogGrid.appendChild(card);
    });
}

function filterBlog() {
    const searchTerm = document.getElementById('searchBlog')?.value.toLowerCase() || '';
    const categoriaFilter = document.getElementById('filterCategoria')?.value || '';
    const statusFilter = document.getElementById('filterStatus')?.value || '';

    const filteredData = blogData.filter(post => {
        const matchesSearch = post.titulo.toLowerCase().includes(searchTerm) ||
                            post.autor.toLowerCase().includes(searchTerm) ||
                            post.excerpt.toLowerCase().includes(searchTerm);
        
        const matchesCategoria = !categoriaFilter || post.categoria === categoriaFilter;
        const matchesStatus = !statusFilter || post.status === statusFilter;

        return matchesSearch && matchesCategoria && matchesStatus;
    });

    renderBlogGrid(filteredData);
}

function updateStats() {
    const stats = {
        total: blogData.length,
        visualizacoes: blogData.reduce((sum, post) => sum + post.visualizacoes, 0),
        comentarios: blogData.reduce((sum, post) => sum + post.comentarios, 0)
    };

    // Atualizar cards de estatísticas se existirem
    const totalElement = document.querySelector('.stat-card:nth-child(1) .stat-info h3');
    const visualizacoesElement = document.querySelector('.stat-card:nth-child(2) .stat-info h3');
    const comentariosElement = document.querySelector('.stat-card:nth-child(3) .stat-info h3');

    if (totalElement) totalElement.textContent = stats.total;
    if (visualizacoesElement) visualizacoesElement.textContent = stats.visualizacoes.toLocaleString();
    if (comentariosElement) comentariosElement.textContent = stats.comentarios;
}

function getInitials(name) {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
}

function getCategoriaText(categoria) {
    const categoriaMap = {
        'novidades': 'Novidades',
        'produtos': 'Produtos',
        'dicas': 'Dicas'
    };
    return categoriaMap[categoria] || categoria;
}

function getStatusText(status) {
    const statusMap = {
        'publicado': 'Publicado',
        'rascunho': 'Rascunho',
        'agendado': 'Agendado'
    };
    return statusMap[status] || status;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Funções de ação
function novoPost() {
    alert('Funcionalidade de novo post será implementada');
}

function editarPost(id) {
    const post = blogData.find(p => p.id === id);
    if (post) {
        alert(`Editando post: ${post.titulo}`);
    }
}

function visualizarPost(id) {
    const post = blogData.find(p => p.id === id);
    if (post) {
        alert(`Visualizando post: ${post.titulo}\nAutor: ${post.autor}\nStatus: ${getStatusText(post.status)}\nVisualizações: ${post.visualizacoes}`);
    }
}

function excluirPost(id) {
    const post = blogData.find(p => p.id === id);
    if (post && confirm(`Tem certeza que deseja excluir o post "${post.titulo}"?`)) {
        blogData = blogData.filter(p => p.id !== id);
        renderBlogGrid();
        updateStats();
        alert('Post excluído com sucesso!');
    }
}

// Função para alterar status do post
function alterarStatus(id, novoStatus) {
    const post = blogData.find(p => p.id === id);
    if (post) {
        post.status = novoStatus;
        renderBlogGrid();
        updateStats();
    }
}

// Função para publicar post
function publicarPost(id) {
    alterarStatus(id, 'publicado');
    alert('Post publicado com sucesso!');
}
