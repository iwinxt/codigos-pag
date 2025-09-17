document.addEventListener('DOMContentLoaded', () => {
    
    // --- LÓGICA DO MENU MOBILE ---
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('nav');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // --- VARIÁVEIS GLOBAIS ---
    let currentPage = 1;
    const itemsPerPage = 6;
    let allItems = [];
    let favoritos = JSON.parse(localStorage.getItem('favoritosTrocas')) || [];

    // --- DADOS DE EXEMPLO (substituir por API real) ---
    const mockData = [
        {
            id: 1,
            titulo: "Fantasia Reciclada",
            imagem: "https://coisasdamaria.com/wp-content/uploads/disfarce-carnaval-reciclado.jpg",
            descricao: "Feita de materiais 100% reciclados. Leve e confortável para longas horas de festa. Inclui acessórios.",
            usuario: "Ana Clara",
            localizacao: "Salvador, BA",
            trocaPor: "Fantasia de Carnaval",
            categoria: "carnaval",
            tamanho: "g",
            estado: "ba",
            condicao: "pouco-uso",
            rating: 4.5,
            status: "disponivel",
            destaque: true
        },
        {
            id: 2,
            titulo: "Fantasia Pet Sustentável",
            imagem: "https://www.petsupport.com.br/wp-content/uploads/2023/02/fantasias-para-pet-e-tutor-1024x683.jpg",
            descricao: "Fantasia de abelha para pet e tutor, feita com tecidos orgânicos. Nunca usada, em perfeito estado.",
            usuario: "João Pedro",
            localizacao: "Feira de Santana, BA",
            trocaPor: "Fantasia de Super-Herói",
            categoria: "animal",
            tamanho: "pp",
            estado: "ba",
            condicao: "nova",
            rating: 5,
            status: "disponivel",
            destaque: false
        },
        {
            id: 3,
            titulo: "Fantasia Tribal",
            imagem: "https://images.unsplash.com/photo-1544927233-a1288219662b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
            descricao: "Fantasia leve e artesanal, inspirada em tema tribal. Perfeita para eventos culturais e festas a fantasia.",
            usuario: "Camila S.",
            localizacao: "Rio de Janeiro, RJ",
            trocaPor: "Fantasia de Carnaval",
            categoria: "historico",
            tamanho: "m",
            estado: "rj",
            condicao: "usada",
            rating: 3.5,
            status: "disponivel",
            destaque: true
        },
        {
            id: 4,
            titulo: "Fantasia de Super-Herói Ecológica",
            imagem: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
            descricao: "Fantasia de super-herói feita com materiais reciclados. Capa incluída.",
            usuario: "Carlos M.",
            localizacao: "São Paulo, SP",
            trocaPor: "Fantasia de Animal",
            categoria: "super-heroi",
            tamanho: "g",
            estado: "sp",
            condicao: "pouco-uso",
            rating: 4,
            status: "pendente",
            destaque: false
        },
        {
            id: 5,
            titulo: "Fantasia de Fada Sustentável",
            imagem: "https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
            descricao: "Fantasia de fada com asas removíveis. Feita com tecidos orgânicos e materiais reciclados.",
            usuario: "Mariana L.",
            localizacao: "Porto Alegre, RS",
            trocaPor: "Fantasia de Princesa",
            categoria: "filmes",
            tamanho: "p",
            estado: "rs",
            condicao: "usada",
            rating: 4.7,
            status: "disponivel",
            destaque: true
        },
        {
            id: 6,
            titulo: "Fantasia de Pirata Reciclado",
            imagem: "https://images.unsplash.com/photo-1570215171328-49d885742ab4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80",
            descricao: "Fantasia completa de pirata com acessórios em material reciclado. Incluí chapéu e tapa-olho.",
            usuario: "Ricardo A.",
            localizacao: "Belo Horizonte, MG",
            trocaPor: "Fantasia de Viking",
            categoria: "historico",
            tamanho: "gg",
            estado: "mg",
            condicao: "pouco-uso",
            rating: 4.2,
            status: "disponivel",
            destaque: false
        }
    ];

    // --- INICIALIZAÇÃO ---
    allItems = mockData;
    renderItems();
    setupEventListeners();

    // --- CONFIGURAÇÃO DE EVENT LISTENERS ---
    function setupEventListeners() {
        // Validação de formulário
        const trocasForm = document.getElementById('formTroca');
        if (trocasForm) {
            trocasForm.addEventListener('submit', handleFormSubmit);
        }

        // Filtros avançados
        const filtrosToggle = document.getElementById('filtrosToggle');
        const filtrosContent = document.getElementById('filtrosContent');
        
        if (filtrosToggle && filtrosContent) {
            filtrosToggle.addEventListener('click', () => {
                filtrosContent.style.display = filtrosContent.style.display === 'none' ? 'grid' : 'none';
                document.querySelector('.filtros-toggle').classList.toggle('rotated');
            });
        }

        // Filtros em tempo real
        const filtros = document.querySelectorAll('#categoria, #tamanho, #estado, #condicao');
        filtros.forEach(filtro => {
            filtro.addEventListener('change', aplicarFiltros);
        });

        // Busca em tempo real
        const searchInput = document.querySelector('.search-input');
        if (searchInput) {
            searchInput.addEventListener('input', debounce(aplicarFiltros, 300));
        }

        const searchBtn = document.querySelector('.search-btn');
        if (searchBtn) {
            searchBtn.addEventListener('click', aplicarFiltros);
        }

        // Modal de solicitação
        const modal = document.getElementById('modalSolicitacao');
        const closeModal = document.querySelector('.close-modal');
        const cancelarBtn = document.getElementById('cancelarSolicitacao');
        const confirmarBtn = document.getElementById('confirmarSolicitacao');

        if (closeModal) {
            closeModal.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        if (cancelarBtn) {
            cancelarBtn.addEventListener('click', () => {
                modal.classList.remove('show');
            });
        }

        if (confirmarBtn) {
            confirmarBtn.addEventListener('click', handleSolicitacaoTroca);
        }

        // Fechar modal clicando fora
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // --- HANDLERS DE EVENTOS ---
    function handleFormSubmit(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        const fantasiaOferecida = formData.get('fantasia-oferecida');
        const fantasiaDesejada = formData.get('fantasia-desejada');
        const localizacao = formData.get('local');

        if (!fantasiaOferecida || !fantasiaDesejada || !localizacao) {
            alert('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Simular busca com os critérios fornecidos
        aplicarFiltros();
    }

    function handleSolicitacaoTroca() {
        const mensagem = document.getElementById('mensagemTroca').value;
        alert(`Solicitação de troca enviada com sucesso! Mensagem: ${mensagem || 'Nenhuma mensagem adicional'}`);
        
        // Fechar o modal
        document.getElementById('modalSolicitacao').classList.remove('show');
        
        // Limpar o campo de mensagem
        document.getElementById('mensagemTroca').value = '';
    }

    function toggleFavorito(itemId) {
        const index = favoritos.indexOf(itemId);
        
        if (index === -1) {
            // Adicionar aos favoritos
            favoritos.push(itemId);
        } else {
            // Remover dos favoritos
            favoritos.splice(index, 1);
        }
        
        // Salvar no localStorage
        localStorage.setItem('favoritosTrocas', JSON.stringify(favoritos));
        
        // Atualizar a exibição
        renderItems();
    }

    function solicitarTroca(itemId) {
        const item = allItems.find(i => i.id === itemId);
        if (!item) return;
        
        // Preencher modal com informações
        document.getElementById('modalFantasiaOferecida').textContent = 
            document.getElementById('fantasia-oferecida').value || 'sua fantasia';
        document.getElementById('modalFantasiaDesejada').textContent = item.titulo;
        
        // Mostrar modal
        document.getElementById('modalSolicitacao').classList.add('show');
    }

    // --- FUNÇÕES DE RENDERIZAÇÃO ---
    function renderItems() {
        const trocasLista = document.getElementById('trocasLista');
        const paginacao = document.getElementById('paginacao');
        
        if (!trocasLista) return;
        
        // Aplicar filtros e paginação
        const filteredItems = filtrarItems();
        const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const paginatedItems = filteredItems.slice(startIndex, startIndex + itemsPerPage);
        
        // Limpar lista
        trocasLista.innerHTML = '';
        
        // Verificar se há resultados
        if (paginatedItems.length === 0) {
            trocasLista.innerHTML = `
                <div class="nenhum-resultado">
                    <i class="fas fa-search"></i>
                    <h3>Nenhuma fantasia encontrada</h3>
                    <p>Tente ajustar os filtros ou buscar por termos diferentes.</p>
                </div>
            `;
            paginacao.innerHTML = '';
            return;
        }
        
        // Renderizar items
        paginatedItems.forEach(item => {
            const isFavorito = favoritos.includes(item.id);
            const ratingStars = renderRatingStars(item.rating);
            
            const statusClass = `status-${item.status}`;
            const statusText = {
                'disponivel': 'Disponível para troca',
                'pendente': 'Troca em andamento',
                'finalizada': 'Troca finalizada'
            }[item.status] || 'Disponível para troca';
            
            const card = document.createElement('div');
            card.className = 'fantasia-card';
            card.innerHTML = `
                <div class="fantasia-img">
                    <img src="${item.imagem}" alt="${item.titulo}">
                    <button class="favorito-btn ${isFavorito ? 'favoritado' : ''}" data-id="${item.id}">
                        <i class="fas fa-heart"></i>
                    </button>
                    ${item.destaque ? '<div class="card-badge destaque">Destaque</div>' : ''}
                    <div class="card-badge">${item.condicao === 'nova' ? 'Nova' : item.condicao === 'pouco-uso' ? 'Pouco uso' : 'Usada'}</div>
                </div>
                <div class="fantasia-info">
                    <div class="fantasia-header">
                        <h3>${item.titulo}</h3>
                        <div class="rating">${ratingStars}</div>
                    </div>
                    <p class="fantasia-desc">${item.descricao}</p>
                    <div class="fantasia-meta">
                        <span><i class="fas fa-user-circle"></i> ${item.usuario} (${item.localizacao})</span>
                        <span><i class="fas fa-arrows-alt-h"></i> Troca por: ${item.trocaPor}</span>
                        <span class="status-troca ${statusClass}">${statusText}</span>
                    </div>
                    <button class="btn small primary solicitar-troca" data-id="${item.id}">Solicitar Troca</button>
                </div>
            `;
            
            trocasLista.appendChild(card);
        });
        
        // Configurar eventos dos cards
        setTimeout(() => {
            document.querySelectorAll('.favorito-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const itemId = parseInt(btn.getAttribute('data-id'));
                    toggleFavorito(itemId);
                });
            });
            
            document.querySelectorAll('.solicitar-troca').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const itemId = parseInt(btn.getAttribute('data-id'));
                    solicitarTroca(itemId);
                });
            });
        }, 0);
        
        // Renderizar paginação
        renderPaginacao(totalPages);
        
        // Animar cards
        animateCards();
    }

    function renderRatingStars(rating) {
        let stars = '';
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        
        for (let i = 1; i <= 5; i++) {
            if (i <= fullStars) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === fullStars + 1 && hasHalfStar) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }
        
        return stars;
    }

    function renderPaginacao(totalPages) {
        const paginacao = document.getElementById('paginacao');
        if (!paginacao || totalPages <= 1) {
            paginacao.innerHTML = '';
            return;
        }
        
        let paginacaoHTML = '';
        
        // Botão anterior
        if (currentPage > 1) {
            paginacaoHTML += `<button class="pagina-btn" data-page="${currentPage - 1}"><i class="fas fa-chevron-left"></i></button>`;
        }
        
        // Páginas
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                paginacaoHTML += `<button class="pagina-btn ativa" data-page="${i}">${i}</button>`;
            } else {
                paginacaoHTML += `<button class="pagina-btn" data-page="${i}">${i}</button>`;
            }
        }
        
        // Botão próximo
        if (currentPage < totalPages) {
            paginacaoHTML += `<button class="pagina-btn" data-page="${currentPage + 1}"><i class="fas fa-chevron-right"></i></button>`;
        }
        
        paginacao.innerHTML = paginacaoHTML;
        
        // Adicionar event listeners
        document.querySelectorAll('.pagina-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.getAttribute('data-page'));
                if (page !== currentPage) {
                    currentPage = page;
                    renderItems();
                    window.scrollTo({ top: document.getElementById('trocasLista').offsetTop - 100, behavior: 'smooth' });
                }
            });
        });
    }

    // --- FUNÇÕES DE FILTRO E BUSCA ---
    function aplicarFiltros() {
        currentPage = 1;
        renderItems();
    }

    function filtrarItems() {
        const searchTerm = document.querySelector('.search-input').value.toLowerCase();
        const categoria = document.getElementById('categoria').value;
        const tamanho = document.getElementById('tamanho').value;
        const estado = document.getElementById('estado').value;
        const condicao = document.getElementById('condicao').value;
        
        // Obter valores do formulário de busca
        const fantasiaOferecida = document.getElementById('fantasia-oferecida').value.toLowerCase();
        const fantasiaDesejada = document.getElementById('fantasia-desejada').value.toLowerCase();
        const localizacao = document.getElementById('local').value.toLowerCase();
        
        return allItems.filter(item => {
            // Filtro de busca geral
            if (searchTerm && 
                !item.titulo.toLowerCase().includes(searchTerm) &&
                !item.descricao.toLowerCase().includes(searchTerm) &&
                !item.localizacao.toLowerCase().includes(searchTerm) &&
                !item.trocaPor.toLowerCase().includes(searchTerm)) {
                return false;
            }
            
            // Filtro de categoria
            if (categoria && item.categoria !== categoria) {
                return false;
            }
            
            // Filtro de tamanho
            if (tamanho && item.tamanho !== tamanho) {
                return false;
            }
            
            // Filtro de estado
            if (estado && item.estado !== estado) {
                return false;
            }
            
            // Filtro de condição
            if (condicao && item.condicao !== condicao) {
                return false;
            }
            
            // Filtro por fantasia desejada (do formulário)
            if (fantasiaDesejada && !item.titulo.toLowerCase().includes(fantasiaDesejada)) {
                return false;
            }
            
            // Filtro por localização (do formulário)
            if (localizacao && !item.localizacao.toLowerCase().includes(localizacao)) {
                return false;
            }
            
            return true;
        });
    }

    // --- ANIMAÇÕES E UTILITÁRIOS ---
    function animateCards() {
        const fantasiaCards = document.querySelectorAll('.fantasia-card');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        fantasiaCards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(card);
        });
    }

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
});