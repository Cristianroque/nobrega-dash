# Página de Clientes - Nóbrega Confecções

## Visão Geral
A página de clientes é uma interface moderna e responsiva para gerenciar todos os clientes da Nóbrega Confecções. Desenvolvida com HTML5, CSS3 e JavaScript puro, oferece uma experiência de usuário intuitiva e funcional.

## Funcionalidades Implementadas

### 🎯 Dashboard e Estatísticas
- **Total de Clientes**: Contador em tempo real
- **Clientes Ativos**: Quantidade de clientes com status ativo
- **Novos este Mês**: Clientes cadastrados no mês atual
- Cards visuais com ícones e animações hover

### 🔍 Sistema de Busca e Filtros
- **Busca Inteligente**: Pesquisa por nome, email ou telefone
- **Filtros por Status**: 
  - Todos os clientes
  - Clientes ativos
  - Clientes inativos
  - Clientes VIP
- **Filtros Combinados**: Busca + filtro de status funcionam em conjunto

### 📊 Tabela de Clientes
- **Informações Completas**: Nome, contato, endereço, status e última compra
- **Avatares Dinâmicos**: Iniciais do nome do cliente em círculos coloridos
- **Status Visual**: Badges coloridos para diferentes status
- **Ações por Cliente**: Botões de editar e excluir para cada registro

### ➕ Gestão de Clientes (CRUD)
- **Criar Cliente**: Modal com formulário completo
- **Editar Cliente**: Edição inline com dados pré-preenchidos
- **Excluir Cliente**: Modal de confirmação para exclusão segura
- **Validação**: Campos obrigatórios e validação de formato

### 📝 Formulário de Cliente
- **Campos Obrigatórios**: Nome, email e telefone
- **Campos Opcionais**: CPF, CEP, estado, endereço, cidade, observações
- **Máscaras Automáticas**: 
  - Telefone: (XX) XXXXX-XXXX
  - CPF: XXX.XXX.XXX-XX
  - CEP: XXXXX-XXX
- **Estados Brasileiros**: Lista completa de estados
- **Layout Responsivo**: Grid adaptável para diferentes tamanhos de tela

### 📄 Paginação
- **Navegação Inteligente**: Botões anterior/próxima
- **Números de Página**: Navegação direta para páginas específicas
- **Itens por Página**: Configurável (atualmente 10 itens)
- **Estado Ativo**: Indicação visual da página atual

### 🎨 Design e UX
- **Design Moderno**: Interface limpa e profissional
- **Cores Consistentes**: Paleta de cores harmoniosa
- **Animações Suaves**: Transições e hover effects
- **Ícones SVG**: Ícones vetoriais de alta qualidade
- **Responsividade**: Adaptação para mobile e desktop

### 🔔 Sistema de Notificações
- **Feedback Visual**: Notificações toast para ações do usuário
- **Tipos de Notificação**: Sucesso, erro, aviso e informação
- **Posicionamento**: Canto superior direito da tela
- **Auto-dismiss**: Desaparecem automaticamente após 3 segundos

## Estrutura de Arquivos

```
src/
├── subPages/
│   └── clientes.html      # Página principal de clientes
├── css/
│   └── clientes.css       # Estilos da página
└── js/
    └── clientes.js        # Funcionalidades JavaScript
```

## Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e acessível
- **CSS3**: Flexbox, Grid, animações e responsividade
- **JavaScript ES6+**: Funcionalidades modernas e modulares
- **Fontes**: Google Fonts (Poppins)
- **Ícones**: SVG inline para melhor performance

## Funcionalidades Técnicas

### Estado da Aplicação
- Gerenciamento de estado com variáveis globais
- Filtros e busca em tempo real
- Paginação dinâmica
- Cache de dados filtrados

### Event Handling
- Event listeners para todos os elementos interativos
- Delegation de eventos para elementos dinâmicos
- Prevenção de eventos padrão quando necessário

### Validação e Formatação
- Validação de campos obrigatórios
- Máscaras automáticas para campos específicos
- Formatação de datas para padrão brasileiro
- Sanitização de dados de entrada

### Performance
- Renderização eficiente da tabela
- Debounce na busca para melhor performance
- Lazy loading de elementos quando necessário
- Otimização de reflows e repaints

## Como Usar

### 1. Visualizar Clientes
- A página carrega automaticamente com todos os clientes
- Use a barra de busca para encontrar clientes específicos
- Aplique filtros por status para organizar a visualização

### 2. Adicionar Novo Cliente
- Clique no botão "Novo Cliente"
- Preencha os campos obrigatórios (nome, email, telefone)
- Adicione informações adicionais conforme necessário
- Clique em "Salvar Cliente"

### 3. Editar Cliente
- Clique no ícone de editar (lápis) na linha do cliente
- Modifique os campos desejados
- Clique em "Salvar Cliente"

### 4. Excluir Cliente
- Clique no ícone de excluir (lixeira) na linha do cliente
- Confirme a exclusão no modal de confirmação
- Clique em "Excluir"

### 5. Navegar entre Páginas
- Use os botões de paginação na parte inferior
- Clique nos números das páginas para navegação direta
- Use os botões "Anterior" e "Próxima"

## Dados de Exemplo

A aplicação inclui 5 clientes de exemplo com dados realistas:
- Maria Silva Santos (SP) - Cliente ativo
- João Oliveira Costa (RJ) - Cliente VIP
- Ana Paula Ferreira (MG) - Cliente ativo
- Carlos Eduardo Lima (PR) - Cliente inativo
- Fernanda Rodrigues (RS) - Cliente VIP

## Personalização

### Cores e Estilos
- As cores principais podem ser alteradas no arquivo CSS
- Variáveis CSS para fácil personalização
- Gradientes e sombras configuráveis

### Funcionalidades
- Número de itens por página configurável
- Adição de novos campos no formulário
- Implementação de novos filtros
- Integração com APIs externas

## Compatibilidade

- **Navegadores Modernos**: Chrome, Firefox, Safari, Edge
- **Versões Mínimas**: ES6+ support
- **Dispositivos**: Desktop, tablet e mobile
- **Resoluções**: Responsivo para todas as telas

## Próximas Melhorias

- [ ] Integração com backend real
- [ ] Sistema de autenticação e autorização
- [ ] Histórico de alterações
- [ ] Exportação para Excel/PDF
- [ ] Importação em lote
- [ ] Sistema de tags para clientes
- [ ] Relatórios e analytics
- [ ] Backup automático dos dados

## Suporte

Para dúvidas ou sugestões sobre a implementação, consulte a documentação do código ou entre em contato com a equipe de desenvolvimento.

