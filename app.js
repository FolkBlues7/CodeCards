document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DA APLICAÇÃO ---
    let decks = JSON.parse(localStorage.getItem('decks')) || [];
    let currentDeckId = null;
    let editingCardId = null;

    // --- ESTADO DA SESSÃO DE REVISÃO ---
    let reviewSession = {
        isActive: false,
        dueQueue: [],
        learningQueue: [],
        currentCard: null,
        cardsReviewed: 0,
    };

    // --- CONSTANTES DO ALGORITMO SRS ---
    const SRS_DEFAULTS = {
        EASE_FACTOR: 2.5,
        INTERVAL_MODIFIERS: {
            AGAIN: 0,
            HARD: 0.8,
            GOOD: 1.0,
            EASY: 1.3
        },
        NEW_CARD_INTERVALS: {
            AGAIN: 1, // 1 minuto
            GOOD: 10, // 10 minutos
            EASY: 1 * 24 * 60, // 1 dia
        }
    };

    // --- FUNÇÕES DE PERSISTÊNCIA ---
    const saveDecks = () => localStorage.setItem('decks', JSON.stringify(decks));

    // --- FUNÇÕES DE NOTIFICAÇÃO (TOAST) ---
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
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
            const now = new Date();
            const dueCardsCount = deck.cards.filter(c => new Date(c.next_review) <= now).length;

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
    
    // ... (funções de update e delete de deck permanecem as mesmas)
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
        } else {
            emptyState.classList.add('hidden');
        }

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
            const card = deck.cards.find(c => c.id === editingCardId);
            card.front = front;
            card.back = back;
            showToast('Cartão atualizado com sucesso!', 'success');
        } else {
            deck.cards.push({
                id: crypto.randomUUID(), front, back,
                // SRS Defaults
                next_review: new Date().toISOString(),
                interval: 0,
                ease_factor: SRS_DEFAULTS.EASE_FACTOR,
                repetitions: 0,
                learning_step: 1, // Novo: controla o passo de aprendizado inicial
            });
            showToast('Cartão adicionado com sucesso!', 'success');
        }

        saveDecks();
        renderCards();
        resetCardForm();
    };
    
    // ... (funções de editar e deletar cartões permanecem as mesmas)
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


    // --- FUNÇÕES DE IMPORTAÇÃO/EXPORTAÇÃO ---
    // ... (essas funções permanecem as mesmas)
    const importFromTxt = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const deck = decks.find(d => d.id === currentDeckId);
            if (!deck) return;

            const cardStrings = content.split('#');
            let importedCount = 0;
            const newCards = [];

            cardStrings.forEach(str => {
                const trimmedStr = str.trim();
                if (!trimmedStr.startsWith('*')) return;

                const cardData = trimmedStr.substring(1);
                const separatorIndex = cardData.indexOf(':');

                if (separatorIndex === -1) return;

                const front = cardData.substring(0, separatorIndex).trim();
                const back = cardData.substring(separatorIndex + 1).trim();

                if (front && back) {
                     newCards.push({
                        id: crypto.randomUUID(), front, back,
                        next_review: new Date().toISOString(), interval: 0,
                        ease_factor: SRS_DEFAULTS.EASE_FACTOR, repetitions: 0, learning_step: 1,
                    });
                    importedCount++;
                }
            });

            if (importedCount > 0) {
                deck.cards.push(...newCards);
                saveDecks();
                renderCards();
                showToast(`${importedCount} cartão(ões) importado(s) com sucesso!`, 'success');
            } else {
                showToast('Nenhum cartão válido encontrado no arquivo.', 'error');
            }
        };
        reader.readAsText(file);
    };

    const exportToTxt = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        if (!deck || deck.cards.length === 0) {
            showToast('Não há cartões para exportar neste baralho.', 'error');
            return;
        }

        const formattedCards = deck.cards.map(card => `* ${card.front} : ${card.back} #`);
        const fileContent = formattedCards.join('\n');
        
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        
        const sanitizedDeckName = deck.name.replace(/\s+/g, '_');
        link.download = `${sanitizedDeckName}_flashcards.txt`;
        link.href = URL.createObjectURL(blob);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };


    // --- FUNÇÕES DE REVISÃO (REVIEW) ---
    const formatInterval = (minutes) => {
        if (minutes < 1) return "<1m";
        if (minutes < 60) return `~${Math.round(minutes)}m`;
        const hours = minutes / 60;
        if (hours < 24) return `~${Math.round(hours)}h`;
        const days = hours / 24;
        if (days < 30) return `~${Math.round(days)}d`;
        const months = days / 30;
        return `~${Math.round(months)}M`;
    };
    
    const calculateNextIntervals = (card) => {
        let intervals = {};
        const now = new Date();
        const minutesToMs = (m) => m * 60 * 1000;

        if (card.learning_step > 0) { // Cartão em fase de aprendizado
            intervals.again = SRS_DEFAULTS.NEW_CARD_INTERVALS.AGAIN;
            intervals.good = SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD;
            intervals.easy = SRS_DEFAULTS.NEW_CARD_INTERVALS.EASY;
            intervals.hard = Math.max(1, Math.round(SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD / 2));
        } else { // Cartão em fase de revisão
            intervals.again = 0; // Volta para o aprendizado
            intervals.hard = card.interval * 1.2 * SRS_DEFAULTS.INTERVAL_MODIFIERS.HARD;
            intervals.good = card.interval * card.ease_factor;
            intervals.easy = card.interval * card.ease_factor * SRS_DEFAULTS.INTERVAL_MODIFIERS.EASY;
        }
        return intervals;
    };

    const startReview = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        const now = new Date();
        const dueCards = deck.cards
            .filter(card => new Date(card.next_review) <= now)
            .sort(() => Math.random() - 0.5);

        if (dueCards.length === 0) {
            showToast('Nenhum cartão para revisar agora!', 'info');
            return;
        }

        reviewSession = {
            isActive: true,
            dueQueue: dueCards,
            learningQueue: [],
            currentCard: null,
            cardsReviewed: 0,
        };

        switchView('reviewSection');
        showNextCardToReview();
    };

    const showNextCardToReview = () => {
        // Prioriza cartões na fila de reaprendizado
        let nextCard = reviewSession.learningQueue.shift();
        if (!nextCard) {
            nextCard = reviewSession.dueQueue.shift();
        }

        if (nextCard) {
            reviewSession.currentCard = nextCard;
            showCardOnReviewScreen(nextCard);
        } else {
            endReviewSession();
        }
    };

    const showCardOnReviewScreen = (card) => {
        document.getElementById('cardFront').textContent = card.front;
        document.getElementById('cardBack').textContent = card.back;
        document.getElementById('cardBack').classList.add('hidden');
        document.getElementById('showAnswerBtn').classList.remove('hidden');
        document.getElementById('ratingButtons').classList.add('hidden');
        
        // Atualiza contadores
        document.getElementById('learningCount').textContent = reviewSession.learningQueue.length;
        document.getElementById('dueCount').textContent = reviewSession.dueQueue.length + (reviewSession.currentCard ? 1 : 0);
    };
    
    const showAnswer = () => {
        document.getElementById('cardBack').classList.remove('hidden');
        document.getElementById('showAnswerBtn').classList.add('hidden');
        document.getElementById('ratingButtons').classList.remove('hidden');

        const intervals = calculateNextIntervals(reviewSession.currentCard);
        document.querySelector('[data-interval="again"]').textContent = formatInterval(intervals.again);
        document.querySelector('[data-interval="hard"]').textContent = formatInterval(intervals.hard);
        document.querySelector('[data-interval="good"]').textContent = formatInterval(intervals.good);
        document.querySelector('[data-interval="easy"]').textContent = formatInterval(intervals.easy);
    };

    const updateReviewedCard = (rating) => {
        const card = reviewSession.currentCard;
        if (!card) return;

        const now = new Date();
        const intervals = calculateNextIntervals(card);

        switch (rating) {
            case 'again':
                card.repetitions = 0;
                card.learning_step = 1; // Reinicia o aprendizado
                reviewSession.learningQueue.push(card); // Adiciona no fim da fila de aprendizado
                break;
            case 'hard':
                card.ease_factor = Math.max(1.3, card.ease_factor - 0.2);
                card.interval = intervals.hard;
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                reviewSession.learningQueue.push(card); // Trata como um passo de aprendizado
                break;
            case 'good':
                if (card.learning_step > 0) {
                    card.learning_step = 0; // Graduado do aprendizado
                    card.interval = SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD;
                } else {
                    card.interval = intervals.good;
                    card.repetitions++;
                }
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                break;
            case 'easy':
                 if (card.learning_step > 0) {
                    card.learning_step = 0; // Graduado
                    card.interval = SRS_DEFAULTS.NEW_CARD_INTERVALS.EASY;
                } else {
                    card.interval = intervals.easy;
                    card.repetitions++;
                }
                card.ease_factor += 0.15;
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                break;
        }
        
        reviewSession.cardsReviewed++;
        saveDecks();
        showNextCardToReview();
    };

    const endReviewSession = (force = false) => {
        if (force) {
            reviewSession.isActive = false;
            switchView('cardSection');
            renderCards();
            renderDecks();
        } else {
            document.getElementById('reviewSummaryText').textContent = `Você revisou ${reviewSession.cardsReviewed} cartão(ões) nesta sessão. Ótimo trabalho!`;
            switchView('reviewSummarySection');
        }
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
        const action = e.target.closest('[data-action]')?.dataset.action;
        const id = e.target.closest('[data-id]')?.dataset.id;
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

    document.getElementById('importTxtBtn').addEventListener('click', () => document.getElementById('fileImporter').click());
    document.getElementById('exportTxtBtn').addEventListener('click', exportToTxt);
    
    document.getElementById('fileImporter').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) importFromTxt(file);
        event.target.value = '';
    });
    
    document.getElementById('startReviewBtn').addEventListener('click', startReview);
    document.getElementById('showAnswerBtn').addEventListener('click', showAnswer);
    document.getElementById('endReviewBtn').addEventListener('click', () => endReviewSession(true));

    document.getElementById('backToCardsBtn').addEventListener('click', () => {
        switchView('cardSection');
        renderCards();
        renderDecks();
    });
    
    document.getElementById('ratingButtons').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const ratingMap = {
            'rateAgainBtn': 'again',
            'rateHardBtn': 'hard',
            'rateGoodBtn': 'good',
            'rateEasyBtn': 'easy',
        };
        const rating = ratingMap[button.id];
        if (rating) {
            updateReviewedCard(rating);
        }
    });

    // --- INICIALIZAÇÃO ---
    renderDecks();
    switchView('deckSection');
});document.addEventListener('DOMContentLoaded', () => {
    // --- ESTADO DA APLICAÇÃO ---
    let decks = JSON.parse(localStorage.getItem('decks')) || [];
    let currentDeckId = null;
    let editingCardId = null;

    // --- ESTADO DA SESSÃO DE REVISÃO ---
    let reviewSession = {
        isActive: false,
        dueQueue: [],
        learningQueue: [],
        currentCard: null,
        cardsReviewed: 0,
    };

    // --- CONSTANTES DO ALGORITMO SRS ---
    const SRS_DEFAULTS = {
        EASE_FACTOR: 2.5,
        INTERVAL_MODIFIERS: {
            AGAIN: 0,
            HARD: 0.8,
            GOOD: 1.0,
            EASY: 1.3
        },
        NEW_CARD_INTERVALS: {
            AGAIN: 1, // 1 minuto
            GOOD: 10, // 10 minutos
            EASY: 1 * 24 * 60, // 1 dia
        }
    };

    // --- FUNÇÕES DE PERSISTÊNCIA ---
    const saveDecks = () => localStorage.setItem('decks', JSON.stringify(decks));

    // --- FUNÇÕES DE NOTIFICAÇÃO (TOAST) ---
    const showToast = (message, type = 'info') => {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        container.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
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
            const now = new Date();
            const dueCardsCount = deck.cards.filter(c => new Date(c.next_review) <= now).length;

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
    
    // ... (funções de update e delete de deck permanecem as mesmas)
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
        } else {
            emptyState.classList.add('hidden');
        }

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
            const card = deck.cards.find(c => c.id === editingCardId);
            card.front = front;
            card.back = back;
            showToast('Cartão atualizado com sucesso!', 'success');
        } else {
            deck.cards.push({
                id: crypto.randomUUID(), front, back,
                // SRS Defaults
                next_review: new Date().toISOString(),
                interval: 0,
                ease_factor: SRS_DEFAULTS.EASE_FACTOR,
                repetitions: 0,
                learning_step: 1, // Novo: controla o passo de aprendizado inicial
            });
            showToast('Cartão adicionado com sucesso!', 'success');
        }

        saveDecks();
        renderCards();
        resetCardForm();
    };
    
    // ... (funções de editar e deletar cartões permanecem as mesmas)
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


    // --- FUNÇÕES DE IMPORTAÇÃO/EXPORTAÇÃO ---
    // ... (essas funções permanecem as mesmas)
    const importFromTxt = (file) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            const content = event.target.result;
            const deck = decks.find(d => d.id === currentDeckId);
            if (!deck) return;

            const cardStrings = content.split('#');
            let importedCount = 0;
            const newCards = [];

            cardStrings.forEach(str => {
                const trimmedStr = str.trim();
                if (!trimmedStr.startsWith('*')) return;

                const cardData = trimmedStr.substring(1);
                const separatorIndex = cardData.indexOf(':');

                if (separatorIndex === -1) return;

                const front = cardData.substring(0, separatorIndex).trim();
                const back = cardData.substring(separatorIndex + 1).trim();

                if (front && back) {
                     newCards.push({
                        id: crypto.randomUUID(), front, back,
                        next_review: new Date().toISOString(), interval: 0,
                        ease_factor: SRS_DEFAULTS.EASE_FACTOR, repetitions: 0, learning_step: 1,
                    });
                    importedCount++;
                }
            });

            if (importedCount > 0) {
                deck.cards.push(...newCards);
                saveDecks();
                renderCards();
                showToast(`${importedCount} cartão(ões) importado(s) com sucesso!`, 'success');
            } else {
                showToast('Nenhum cartão válido encontrado no arquivo.', 'error');
            }
        };
        reader.readAsText(file);
    };

    const exportToTxt = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        if (!deck || deck.cards.length === 0) {
            showToast('Não há cartões para exportar neste baralho.', 'error');
            return;
        }

        const formattedCards = deck.cards.map(card => `* ${card.front} : ${card.back} #`);
        const fileContent = formattedCards.join('\n');
        
        const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        
        const sanitizedDeckName = deck.name.replace(/\s+/g, '_');
        link.download = `${sanitizedDeckName}_flashcards.txt`;
        link.href = URL.createObjectURL(blob);
        
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
    };


    // --- FUNÇÕES DE REVISÃO (REVIEW) ---
    const formatInterval = (minutes) => {
        if (minutes < 1) return "<1m";
        if (minutes < 60) return `~${Math.round(minutes)}m`;
        const hours = minutes / 60;
        if (hours < 24) return `~${Math.round(hours)}h`;
        const days = hours / 24;
        if (days < 30) return `~${Math.round(days)}d`;
        const months = days / 30;
        return `~${Math.round(months)}M`;
    };
    
    const calculateNextIntervals = (card) => {
        let intervals = {};
        const now = new Date();
        const minutesToMs = (m) => m * 60 * 1000;

        if (card.learning_step > 0) { // Cartão em fase de aprendizado
            intervals.again = SRS_DEFAULTS.NEW_CARD_INTERVALS.AGAIN;
            intervals.good = SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD;
            intervals.easy = SRS_DEFAULTS.NEW_CARD_INTERVALS.EASY;
            intervals.hard = Math.max(1, Math.round(SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD / 2));
        } else { // Cartão em fase de revisão
            intervals.again = 0; // Volta para o aprendizado
            intervals.hard = card.interval * 1.2 * SRS_DEFAULTS.INTERVAL_MODIFIERS.HARD;
            intervals.good = card.interval * card.ease_factor;
            intervals.easy = card.interval * card.ease_factor * SRS_DEFAULTS.INTERVAL_MODIFIERS.EASY;
        }
        return intervals;
    };

    const startReview = () => {
        const deck = decks.find(d => d.id === currentDeckId);
        const now = new Date();
        const dueCards = deck.cards
            .filter(card => new Date(card.next_review) <= now)
            .sort(() => Math.random() - 0.5);

        if (dueCards.length === 0) {
            showToast('Nenhum cartão para revisar agora!', 'info');
            return;
        }

        reviewSession = {
            isActive: true,
            dueQueue: dueCards,
            learningQueue: [],
            currentCard: null,
            cardsReviewed: 0,
        };

        switchView('reviewSection');
        showNextCardToReview();
    };

    const showNextCardToReview = () => {
        // Prioriza cartões na fila de reaprendizado
        let nextCard = reviewSession.learningQueue.shift();
        if (!nextCard) {
            nextCard = reviewSession.dueQueue.shift();
        }

        if (nextCard) {
            reviewSession.currentCard = nextCard;
            showCardOnReviewScreen(nextCard);
        } else {
            endReviewSession();
        }
    };

    const showCardOnReviewScreen = (card) => {
        document.getElementById('cardFront').textContent = card.front;
        document.getElementById('cardBack').textContent = card.back;
        document.getElementById('cardBack').classList.add('hidden');
        document.getElementById('showAnswerBtn').classList.remove('hidden');
        document.getElementById('ratingButtons').classList.add('hidden');
        
        // Atualiza contadores
        document.getElementById('learningCount').textContent = reviewSession.learningQueue.length;
        document.getElementById('dueCount').textContent = reviewSession.dueQueue.length + (reviewSession.currentCard ? 1 : 0);
    };
    
    const showAnswer = () => {
        document.getElementById('cardBack').classList.remove('hidden');
        document.getElementById('showAnswerBtn').classList.add('hidden');
        document.getElementById('ratingButtons').classList.remove('hidden');

        const intervals = calculateNextIntervals(reviewSession.currentCard);
        document.querySelector('[data-interval="again"]').textContent = formatInterval(intervals.again);
        document.querySelector('[data-interval="hard"]').textContent = formatInterval(intervals.hard);
        document.querySelector('[data-interval="good"]').textContent = formatInterval(intervals.good);
        document.querySelector('[data-interval="easy"]').textContent = formatInterval(intervals.easy);
    };

    const updateReviewedCard = (rating) => {
        const card = reviewSession.currentCard;
        if (!card) return;

        const now = new Date();
        const intervals = calculateNextIntervals(card);

        switch (rating) {
            case 'again':
                card.repetitions = 0;
                card.learning_step = 1; // Reinicia o aprendizado
                reviewSession.learningQueue.push(card); // Adiciona no fim da fila de aprendizado
                break;
            case 'hard':
                card.ease_factor = Math.max(1.3, card.ease_factor - 0.2);
                card.interval = intervals.hard;
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                reviewSession.learningQueue.push(card); // Trata como um passo de aprendizado
                break;
            case 'good':
                if (card.learning_step > 0) {
                    card.learning_step = 0; // Graduado do aprendizado
                    card.interval = SRS_DEFAULTS.NEW_CARD_INTERVALS.GOOD;
                } else {
                    card.interval = intervals.good;
                    card.repetitions++;
                }
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                break;
            case 'easy':
                 if (card.learning_step > 0) {
                    card.learning_step = 0; // Graduado
                    card.interval = SRS_DEFAULTS.NEW_CARD_INTERVALS.EASY;
                } else {
                    card.interval = intervals.easy;
                    card.repetitions++;
                }
                card.ease_factor += 0.15;
                card.next_review = new Date(now.getTime() + card.interval * 60 * 1000).toISOString();
                break;
        }
        
        reviewSession.cardsReviewed++;
        saveDecks();
        showNextCardToReview();
    };

    const endReviewSession = (force = false) => {
        if (force) {
            reviewSession.isActive = false;
            switchView('cardSection');
            renderCards();
            renderDecks();
        } else {
            document.getElementById('reviewSummaryText').textContent = `Você revisou ${reviewSession.cardsReviewed} cartão(ões) nesta sessão. Ótimo trabalho!`;
            switchView('reviewSummarySection');
        }
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
        const action = e.target.closest('[data-action]')?.dataset.action;
        const id = e.target.closest('[data-id]')?.dataset.id;
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

    document.getElementById('importTxtBtn').addEventListener('click', () => document.getElementById('fileImporter').click());
    document.getElementById('exportTxtBtn').addEventListener('click', exportToTxt);
    
    document.getElementById('fileImporter').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) importFromTxt(file);
        event.target.value = '';
    });
    
    document.getElementById('startReviewBtn').addEventListener('click', startReview);
    document.getElementById('showAnswerBtn').addEventListener('click', showAnswer);
    document.getElementById('endReviewBtn').addEventListener('click', () => endReviewSession(true));

    document.getElementById('backToCardsBtn').addEventListener('click', () => {
        switchView('cardSection');
        renderCards();
        renderDecks();
    });
    
    document.getElementById('ratingButtons').addEventListener('click', (e) => {
        const button = e.target.closest('button');
        if (!button) return;

        const ratingMap = {
            'rateAgainBtn': 'again',
            'rateHardBtn': 'hard',
            'rateGoodBtn': 'good',
            'rateEasyBtn': 'easy',
        };
        const rating = ratingMap[button.id];
        if (rating) {
            updateReviewedCard(rating);
        }
    });

    // --- INICIALIZAÇÃO ---
    renderDecks();
    switchView('deckSection');
});