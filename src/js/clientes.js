const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

// Função para trocar de aba
function switchTab(targetTab) {
    // Remove active class from all buttons and contents
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to clicked button and corresponding content
    const activeButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const activeContent = document.getElementById(targetTab + '-tab');
    
    if (activeButton && activeContent) {
        activeButton.classList.add('active');
        activeContent.classList.add('active');
    }
}

// Event listeners para os botões das abas
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.getAttribute('data-tab');
        switchTab(targetTab);
    });
});

// Funcionalidade de busca para clientes
const searchInputs = document.querySelectorAll('input[type="text"]');
searchInputs.forEach(input => {
    input.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const table = this.closest('.tab-content').querySelector('table tbody');
        
        if (table) {
            const rows = table.querySelectorAll('tr');
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        }
    });
});

// Funcionalidade dos filtros
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all filter buttons in the same group
        const filterGroup = this.parentElement;
        filterGroup.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to clicked button
        this.classList.add('active');
        
        // Filter logic (can be expanded based on needs)
        const filterValue = this.textContent.toLowerCase();
        console.log('Filtro aplicado:', filterValue);
    });
});

// Funcionalidade dos dropdowns de filtro
const filterDropdowns = document.querySelectorAll('.filter-dropdown');
filterDropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', function() {
        console.log('Dropdown clicado:', this.textContent.trim());
        // Aqui pode ser implementada a lógica do dropdown
    });
});

// Máscara para telefone
function applyPhoneMask(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        
        if (value.length <= 11) {
            value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
            if (value.length < 14) {
                value = value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
            }
        }
        
        e.target.value = value;
    });
}

// Máscara para CPF
function applyCpfMask(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        e.target.value = value;
    });
}

// Máscara para CEP
function applyCepMask(input) {
    input.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{5})(\d{3})/, '$1-$2');
        e.target.value = value;
    });
}

// Aplicar máscaras aos campos
const telefoneInput = document.getElementById('telefone');
const whatsappInput = document.getElementById('whatsapp');
const cpfInput = document.getElementById('cpf');
const cepInput = document.getElementById('cep');

if (telefoneInput) applyPhoneMask(telefoneInput);
if (whatsappInput) applyPhoneMask(whatsappInput);
if (cpfInput) applyCpfMask(cpfInput);
if (cepInput) applyCepMask(cepInput);

// Busca CEP automaticamente
if (cepInput) {
    cepInput.addEventListener('blur', function() {
        const cep = this.value.replace(/\D/g, '');
        
        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then(response => response.json())
                .then(data => {
                    if (!data.erro) {
                        const cidadeInput = document.getElementById('cidade');
                        const estadoInput = document.getElementById('estado');
                        const enderecoInput = document.getElementById('endereco');
                        
                        if (cidadeInput) cidadeInput.value = data.localidade;
                        if (estadoInput) estadoInput.value = data.uf;
                        if (enderecoInput && data.logradouro) {
                            enderecoInput.value = `${data.logradouro}, ${data.bairro}`;
                        }
                    }
                })
                .catch(error => {
                    console.log('Erro ao buscar CEP:', error);
                });
        }
    });
}
