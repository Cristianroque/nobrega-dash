// Chat JS - Nóbrega Confecções

// Dados simulados dos chats
let chatsData = [
    {
        id: 1,
        nome: 'João Silva',
        avatar: 'JS',
        ultimaMensagem: 'Obrigado pela ajuda com o pedido!',
        tempo: '10:30',
        online: true,
        mensagens: [
            { id: 1, autor: 'João Silva', conteudo: 'Olá! Preciso de ajuda com meu pedido.', tempo: '10:15', proprio: false },
            { id: 2, autor: 'Você', conteudo: 'Claro! Qual é o número do seu pedido?', tempo: '10:16', proprio: true },
            { id: 3, autor: 'João Silva', conteudo: 'É o pedido PED001', tempo: '10:17', proprio: false },
            { id: 4, autor: 'Você', conteudo: 'Encontrei seu pedido. Está em produção e deve ficar pronto em 3 dias.', tempo: '10:18', proprio: true },
            { id: 5, autor: 'João Silva', conteudo: 'Obrigado pela ajuda com o pedido!', tempo: '10:30', proprio: false }
        ]
    },
    {
        id: 2,
        nome: 'Maria Santos',
        avatar: 'MS',
        ultimaMensagem: 'Quando chegará minha encomenda?',
        tempo: '09:45',
        online: true,
        mensagens: [
            { id: 1, autor: 'Maria Santos', conteudo: 'Bom dia! Fiz um pedido ontem.', tempo: '09:30', proprio: false },
            { id: 2, autor: 'Você', conteudo: 'Bom dia, Maria! Vou verificar seu pedido.', tempo: '09:32', proprio: true },
            { id: 3, autor: 'Maria Santos', conteudo: 'Quando chegará minha encomenda?', tempo: '09:45', proprio: false }
        ]
    },
    {
        id: 3,
        nome: 'Carlos Oliveira',
        avatar: 'CO',
        ultimaMensagem: 'Perfeito, muito obrigado!',
        tempo: 'Ontem',
        online: false,
        mensagens: [
            { id: 1, autor: 'Carlos Oliveira', conteudo: 'Preciso alterar o tamanho do meu pedido', tempo: 'Ontem 16:20', proprio: false },
            { id: 2, autor: 'Você', conteudo: 'Sem problemas! Qual o novo tamanho?', tempo: 'Ontem 16:25', proprio: true },
            { id: 3, autor: 'Carlos Oliveira', conteudo: 'Gostaria de mudar para tamanho G', tempo: 'Ontem 16:30', proprio: false },
            { id: 4, autor: 'Você', conteudo: 'Alteração feita com sucesso!', tempo: 'Ontem 16:35', proprio: true },
            { id: 5, autor: 'Carlos Oliveira', conteudo: 'Perfeito, muito obrigado!', tempo: 'Ontem 16:40', proprio: false }
        ]
    },
    {
        id: 4,
        nome: 'Ana Costa',
        avatar: 'AC',
        ultimaMensagem: 'Vocês fazem entrega expressa?',
        tempo: 'Ontem',
        online: false,
        mensagens: [
            { id: 1, autor: 'Ana Costa', conteudo: 'Olá! Gostaria de saber sobre entregas.', tempo: 'Ontem 14:10', proprio: false },
            { id: 2, autor: 'Você', conteudo: 'Oi Ana! Claro, como posso ajudar?', tempo: 'Ontem 14:15', proprio: true },
            { id: 3, autor: 'Ana Costa', conteudo: 'Vocês fazem entrega expressa?', tempo: 'Ontem 14:20', proprio: false }
        ]
    }
];

let chatAtivo = null;

function initializeChat() {
    renderChatList();
    if (chatsData.length > 0) {
        selecionarChat(chatsData[0].id);
    }
}

function setupEventListeners() {
    // Busca de chats
    const searchInput = document.getElementById('chatSearch');
    if (searchInput) {
        searchInput.addEventListener('input', filtrarChats);
    }

    // Input de mensagem
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (messageInput) {
        messageInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                enviarMensagem();
            }
        });

        messageInput.addEventListener('input', function() {
            if (sendButton) {
                sendButton.disabled = this.value.trim() === '';
            }
        });
    }

    if (sendButton) {
        sendButton.addEventListener('click', enviarMensagem);
    }
}

function renderChatList(chats = chatsData) {
    const chatList = document.getElementById('chatList');
    if (!chatList) return;

    chatList.innerHTML = '';

    chats.forEach(chat => {
        const chatItem = document.createElement('div');
        chatItem.className = `chat-item ${chatAtivo === chat.id ? 'active' : ''}`;
        chatItem.onclick = () => selecionarChat(chat.id);
        
        chatItem.innerHTML = `
            <div class="chat-avatar">
                ${chat.avatar}
                ${chat.online ? '<div class="online-indicator"></div>' : ''}
            </div>
            <div class="chat-info">
                <div class="chat-name">${chat.nome}</div>
                <div class="chat-last-message">${chat.ultimaMensagem}</div>
            </div>
            <div class="chat-time">${chat.tempo}</div>
        `;
        
        chatList.appendChild(chatItem);
    });
}

function selecionarChat(chatId) {
    chatAtivo = chatId;
    const chat = chatsData.find(c => c.id === chatId);
    
    if (!chat) return;

    // Atualizar lista de chats para mostrar o ativo
    renderChatList();
    
    // Atualizar header do chat
    renderChatHeader(chat);
    
    // Renderizar mensagens
    renderMensagens(chat.mensagens);
    
    // Focar no input
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.focus();
    }
}

function renderChatHeader(chat) {
    const chatHeader = document.querySelector('.chat-header');
    if (!chatHeader) return;

    chatHeader.innerHTML = `
        <div class="chat-avatar">
            ${chat.avatar}
            ${chat.online ? '<div class="online-indicator"></div>' : ''}
        </div>
        <div class="chat-header-info">
            <h3>${chat.nome}</h3>
            <p>${chat.online ? 'Online' : 'Offline'}</p>
        </div>
    `;
}

function renderMensagens(mensagens) {
    const chatMessages = document.querySelector('.chat-messages');
    if (!chatMessages) return;

    chatMessages.innerHTML = '';

    mensagens.forEach(mensagem => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${mensagem.proprio ? 'own' : ''}`;
        
        messageDiv.innerHTML = `
            <div class="message-avatar">${getInitials(mensagem.autor)}</div>
            <div class="message-content">
                <div class="message-bubble">${mensagem.conteudo}</div>
                <div class="message-time">${mensagem.tempo}</div>
            </div>
        `;
        
        chatMessages.appendChild(messageDiv);
    });

    // Scroll para a última mensagem
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function filtrarChats() {
    const searchTerm = document.getElementById('chatSearch')?.value.toLowerCase() || '';
    
    const chatsFiltrados = chatsData.filter(chat => 
        chat.nome.toLowerCase().includes(searchTerm) ||
        chat.ultimaMensagem.toLowerCase().includes(searchTerm)
    );
    
    renderChatList(chatsFiltrados);
}

function enviarMensagem() {
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    
    if (!messageInput || !chatAtivo) return;
    
    const conteudo = messageInput.value.trim();
    if (!conteudo) return;

    const chat = chatsData.find(c => c.id === chatAtivo);
    if (!chat) return;

    // Criar nova mensagem
    const novaMensagem = {
        id: Date.now(),
        autor: 'Você',
        conteudo: conteudo,
        tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        proprio: true
    };

    // Adicionar mensagem ao chat
    chat.mensagens.push(novaMensagem);
    chat.ultimaMensagem = conteudo;
    chat.tempo = novaMensagem.tempo;

    // Limpar input
    messageInput.value = '';
    if (sendButton) {
        sendButton.disabled = true;
    }

    // Atualizar interface
    renderMensagens(chat.mensagens);
    renderChatList();

    // Simular resposta automática após 2 segundos
    setTimeout(() => {
        simularResposta(chat);
    }, 2000);
}

function simularResposta(chat) {
    const respostasAutomaticas = [
        'Obrigado pela mensagem!',
        'Vou verificar isso para você.',
        'Entendi, vou resolver.',
        'Pode deixar comigo!',
        'Perfeito, obrigado!'
    ];

    const resposta = respostasAutomaticas[Math.floor(Math.random() * respostasAutomaticas.length)];
    
    const mensagemResposta = {
        id: Date.now(),
        autor: chat.nome,
        conteudo: resposta,
        tempo: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        proprio: false
    };

    chat.mensagens.push(mensagemResposta);
    chat.ultimaMensagem = resposta;
    chat.tempo = mensagemResposta.tempo;

    // Atualizar interface se este chat ainda estiver ativo
    if (chatAtivo === chat.id) {
        renderMensagens(chat.mensagens);
    }
    renderChatList();
}

function getInitials(nome) {
    return nome.split(' ').map(n => n[0]).join('').toUpperCase();
}

// Função para adicionar novo chat
function novoChat() {
    alert('Funcionalidade de novo chat será implementada');
}

// Função para buscar mensagens
function buscarMensagens() {
    alert('Funcionalidade de busca será implementada');
}

// Função para arquivar chat
function arquivarChat(chatId) {
    const chat = chatsData.find(c => c.id === chatId);
    if (chat && confirm(`Arquivar conversa com ${chat.nome}?`)) {
        chatsData = chatsData.filter(c => c.id !== chatId);
        renderChatList();
        
        if (chatAtivo === chatId) {
            chatAtivo = null;
            document.querySelector('.chat-messages').innerHTML = '';
            document.querySelector('.chat-header').innerHTML = '<h3>Selecione um chat</h3>';
        }
    }
}

// Inicialização
initializeChat();
setupEventListeners();

