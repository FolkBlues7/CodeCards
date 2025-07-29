document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DA APLICAÇÃO ---
    let decks = JSON.parse(localStorage.getItem('decks')) || [];
    let currentDeckId = null;
    let editingCardId = null;
    let currentReviewCard = null;
    let reviewedCardsCount = 0;

    // --- FUNÇÕES DE PERSISTÊNCIA ---
    const saveDecks = () => {
        localStorage.setItem('decks', JSON.stringify(decks));
    };

    // --- FUNÇÕES DE NOTIFICAÇÃO (TOAST) ---
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        // Força o reflow para a animação funcionar na entrada
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        setTimeout(() => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        }, 3000);
    };

    // --- FUNÇÕES DE BARALHOS (DECKS) ---
    const renderDecks = () => {
        const deckList = document.getElementById('deckList');
        const emptyState = document.getElementById('deckEmptyState');
        deckList.innerHTML = '';
        deckList.appendChild(emptyState);

        if (decks.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');

        const template = document.getElementById('deckItemTemplate');
        decks.forEach(deck => {
            const clone = template.content.cloneNode(true);
            const dueCardsCount = deck.cards.filter(c => new Date(c.next_review) <= new Date()).length;

            clone.querySelector('[data-deck-name]').textContent = deck.name;
            clone.querySelector('[data-deck-stats]').textContent = `(${dueCardsCount}/${deck.cards.length} para revisar)`;
            clone.querySelector('[data-action="open"]').dataset.id = deck.id;
            clone.querySelector('[data-action="edit"]').dataset.id = deck.id;
            clone.querySelector('[data-action="delete"]').dataset.id = deck.id;
            
            deckList.appendChild(clone);
        });
    };

    const addDeck = () => {
        const deckNameInput = document.getElementById('deckNameInput');
        const name = deckNameInput.value.trim();
        if (name) {
            decks.push({
                id: crypto.randomUUID(),
                name,
                cards: [],
                created_at: new Date().toISOString()
            });
            saveDecks();
            renderDecks();
            deckNameInput.value = '';
            showToast('Baralho adicionado com sucesso!', 'success');
        } else {
            showToast('O nome do baralho não pode estar vazio.', 'error');
        }
    };

    const updateDeckName = (deckId) => {
        const deck = decks.find(d => d.id === deckId);
        const newName = prompt('Digite o novo nome para o baralho:', deck.name);
        if (newName && newName.trim() !== '') {
            deck.name = newName.trim();
            saveDecks();
            renderDecks();
            showToast('Nome do baralho atualizado.', 'success');
        }
    };

    const deleteDeck = (deckId) => {
        if (confirm('Tem certeza que deseja excluir este baralho e todos os seus cartões?')) {
            decks = decks.filter(d => d.id !== deckId);
            saveDecks();
            renderDecks();
            showToast('Baralho excluído.', 'info');
        }
    };

    // --- FUNÇÕES DE CARTÕES (CARDS) ---
    const renderCards = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        if (!deck) return;

        const cardList = document.getElementById('cardList');
        const emptyState = document.getElementById('cardEmptyState');
        cardList.innerHTML = '';
        cardList.appendChild(emptyState);
        
        document.getElementById('currentDeckName').textContent = deck.name;
        
        if (deck.cards.length === 0) {
            emptyState.classList.remove('hidden');
            return;
        }
        emptyState.classList.add('hidden');

        const template = document.getElementById('cardItemTemplate');
        deck.cards.forEach(card => {
            const clone = template.content.cloneNode(true);
            clone.querySelector('[data-card-front]').textContent = card.front;
            clone.querySelector('[data-card-back]').textContent = card.back;
            clone.querySelector('li').dataset.id = card.id;
            clone.querySelector('[data-action="edit"]').dataset.id = card.id;
            clone.querySelector('[data-action="delete"]').dataset.id = card.id;
            cardList.appendChild(clone);
        });
    };
    
    const addOrUpdateCard = () => {
        const frontInput = document.getElementById('cardFrontInput');
        const backInput = document.getElementById('cardBackInput');
        const front = frontInput.value.trim();
        const back = backInput.value.trim();

        if (!front || !back) {
            showToast('A frente e o verso do cartão não podem estar vazios.', 'error');
            return;
        }

        const deck = decks.find(d => d.id === currentDeckId);
        if (!deck) return;

        if (editingCardId) {
            // Atualizando um cartão existente
            const card = deck.cards.find(c => c.id === editingCardId);
            card.front = front;
            card.back = back;
            showToast('Cartão atualizado com sucesso!', 'success');
        } else {
            // Adicionando um novo cartão
            deck.cards.push({
                id: crypto.randomUUID(),
                front,
                back,
                created_at: new Date().toISOString(),
                next_review: new Date().toISOString(),
                interval: 1,
                ease_factor: 2.5,
                repetitions: 0
            });
            showToast('Cartão adicionado com sucesso!', 'success');
        }
        
        saveDecks();
        renderCards();
        resetCardForm();
    };

    const startEditCard = (cardId) => {
        const deck = decks.find(d => d.id === currentDeckId);
        const card = deck.cards.find(c => c.id === cardId);
        if (!card) return;

        editingCardId = cardId;
        document.getElementById('cardFormTitle').textContent = 'Editar Cartão';
        document.getElementById('cardFrontInput').value = card.front;
        document.getElementById('cardBackInput').value = card.back;
        document.getElementById('addOrUpdateCardBtn').textContent = 'Salvar Alterações';
        document.getElementById('cancelEditBtn').classList.remove('hidden');
    };

    const resetCardForm = () => {
        editingCardId = null;
        document.getElementById('cardFormTitle').textContent = 'Adicionar Novo Cartão';
        document.getElementById('cardFrontInput').value = '';
        document.getElementById('cardBackInput').value = '';
        document.getElementById('addOrUpdateCardBtn').textContent = 'Adicionar Cartão';
        document.getElementById('cancelEditBtn').classList.add('hidden');
    };

    const deleteCard = (cardId) => {
        if (confirm('Tem certeza que deseja excluir este cartão?')) {
            const deck = decks.find(d => d.id === currentDeckId);
            deck.cards = deck.cards.filter(c => c.id !== cardId);
            saveDecks();
            renderCards();
            showToast('Cartão excluído.', 'info');
        }
    };
    
    // --- FUNÇÕES DE REVISÃO (REVIEW) ---
    const startReview = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        let dueCards = deck.cards.filter(card => new Date(card.next_review) <= new Date());
        
        if (dueCards.length === 0) {
            showToast('Nenhum cartão para revisar agora!', 'info');
            return;
        }
        
        // Aleatoriza a ordem dos cartões
        dueCards = dueCards.sort(() => Math.random() - 0.5);
        reviewedCardsCount = 0;
        
        showNextCardToReview();
        switchView('reviewSection');
    };

    const showNextCardToReview = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        const dueCards = deck.cards.filter(card => new Date(card.next_review) <= new Date())
                                   .sort(() => Math.random() - 0.5);

        if (dueCards.length > 0) {
            showCardOnReviewScreen(dueCards[0]);
        } else {
            endReviewSession();
        }
    };

    const endReviewSession = () => {
        document.getElementById('reviewSummaryText').textContent = `Você revisou ${reviewedCardsCount} cartão(ões) nesta sessão.`;
        switchView('reviewSummarySection');
    }

    const showCardOnReviewScreen = (card) => {
        currentReviewCard = card;
        document.getElementById('cardFront').textContent = card.front;
        document.getElementById('cardBack').textContent = card.back;
        document.getElementById('cardBack').classList.add('hidden');
        document.getElementById('showAnswerBtn').classList.remove('hidden');
        document.getElementById('ratingButtons').classList.add('hidden');
    };
    
    const updateReviewedCard = (rating) => {
        if (!currentReviewCard) return;

        let card = currentReviewCard;
        const now = new Date();

        if (rating === 'again') {
            card.repetitions = 0;
            card.interval = 1 / (24 * 60); // 1 minuto
        } else {
            if (card.repetitions === 0) {
                card.interval = 1; // 1 dia
            } else if (card.repetitions === 1) {
                card.interval = 6; // 6 dias
            } else {
                card.interval *= card.ease_factor;
            }

            if (rating === 'easy') {
                card.ease_factor += 0.15;
            } else if (rating === 'hard') {
                card.ease_factor = Math.max(1.3, card.ease_factor - 0.2);
                card.interval = Math.max(1, card.interval * 0.8); // Penalidade para 'difícil'
            }
            card.repetitions++;
        }
        
        // Intervalo em milissegundos
        card.next_review = new Date(now.getTime() + card.interval * 24 * 60 * 60 * 1000).toISOString();
        
        saveDecks();
        reviewedCardsCount++;
        showNextCardToReview();
    };

    // --- NAVEGAÇÃO E VISUALIZAÇÃO ---
    const switchView = (viewId) => {
        ['deckSection', 'cardSection', 'reviewSection', 'reviewSummarySection'].forEach(id => {
            document.getElementById(id).classList.add('hidden');
        });
        if (viewId) {
            document.getElementById(viewId).classList.remove('hidden');
        }
    };

    const openDeck = (deckId) => {
        currentDeckId = deckId;
        renderCards();
        switchView('cardSection');
    };

    // --- EVENT LISTENERS ---
    document.getElementById('addDeckBtn').addEventListener('click', addDeck);
    
    document.getElementById('deckList').addEventListener('click', (e) => {
        const action = e.target.dataset.action;
        const id = e.target.dataset.id;
        if (!action || !id) return;
        
        if (action === 'open') openDeck(id);
        if (action === 'edit') updateDeckName(id);
        if (action === 'delete') deleteDeck(id);
    });

    document.getElementById('addOrUpdateCardBtn').addEventListener('click', addOrUpdateCard);
    document.getElementById('cancelEditBtn').addEventListener('click', resetCardForm);

    document.getElementById('cardList').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const action = button.dataset.action;
        const id = button.dataset.id;
        if (!action || !id) return;
        
        if (action === 'edit') startEditCard(id);
        if (action === 'delete') deleteCard(id);
    });
    
    document.getElementById('startReviewBtn').addEventListener('click', startReview);
    
    document.getElementById('backToDecksBtn').addEventListener('click', () => {
        currentDeckId = null;
        switchView('deckSection');
        renderDecks(); // Atualiza as estatísticas
    });
    
    document.getElementById('showAnswerBtn').addEventListener('click', () => {
        document.getElementById('cardBack').classList.remove('hidden');
        document.getElementById('showAnswerBtn').classList.add('hidden');
        document.getElementById('ratingButtons').classList.remove('hidden');
    });

    document.getElementById('endReviewBtn').addEventListener('click', () => {
        switchView('cardSection');
        renderCards();
    });

    document.getElementById('backToCardsBtn').addEventListener('click', () => {
        switchView('cardSection');
        renderCards();
    });
    
    ['Again', 'Hard', 'Good', 'Easy'].forEach(rating => {
        document.getElementById(`rate${rating}Btn`).addEventListener('click', () => {
            updateReviewedCard(rating.toLowerCase());
        });
    });

    // --- INICIALIZAÇÃO ---
    renderDecks();
    switchView('deckSection');
});