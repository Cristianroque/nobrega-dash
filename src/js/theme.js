// Sistema de Tema Simples - Nóbrega Confecções
class ThemeManager {
    constructor() {
        this.currentTheme = this.getSavedTheme() || 'light';
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.createToggleButton();
    }

    getSavedTheme() {
        const saved = localStorage.getItem('nobrega-theme');
        // Se não há tema salvo, define light como padrão
        if (!saved) {
            return 'light';
        }
        return saved;
    }

    saveTheme(theme) {
        localStorage.setItem('nobrega-theme', theme);
    }

    applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.setAttribute('data-theme', theme);
        
        // Aplica também no container de conteúdo se existir (para subpages)
        const content = document.getElementById('content');
        if (content) {
            content.setAttribute('data-theme', theme);
        }
        
        this.currentTheme = theme;
        this.saveTheme(theme);
        
        // Atualizar gráficos se existirem
        if (typeof window.updateChartsTheme === 'function') {
            setTimeout(() => {
                window.updateChartsTheme();
            }, 100);
        }
    }

    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
    }

    createToggleButton() {
        // Remove botão existente se houver
        const existing = document.getElementById('theme-toggle');
        if (existing) existing.remove();

        const button = document.createElement('button');
        button.id = 'theme-toggle';
        button.setAttribute('aria-label', 'Alternar tema');
        
        button.innerHTML = `
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="5"/>
                <path d="M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        `;

        button.addEventListener('click', () => this.toggleTheme());
        document.body.appendChild(button);
    }

    // Método público para recriar o botão após navegação SPA
    refreshButton() {
        this.createToggleButton();
        this.applyTheme(this.currentTheme);
    }
}

// Inicializar quando o DOM estiver pronto
let themeManager;

function initTheme() {
    themeManager = new ThemeManager();
    
    // Para SPA: observar mudanças no conteúdo
    const content = document.getElementById('content');
    if (content) {
        const observer = new MutationObserver(() => {
            // Reaplicar tema após carregamento de subpage
            setTimeout(() => {
                themeManager.applyTheme(themeManager.currentTheme);
            }, 100);
        });
        
        observer.observe(content, { childList: true, subtree: true });
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Disponibilizar globalmente
window.themeManager = themeManager;
window.refreshTheme = () => themeManager?.refreshButton();
