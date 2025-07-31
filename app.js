document.addEventListener('DOMContentLoaded', () => {
    // =================================================================
    // CONFIGURAÇÕES
    // =================================================================
    const EASE_FACTOR_INITIAL = 2.5;
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    // =================================================================
    // ELEMENTOS DO DOM
    // =================================================================
    const views = document.querySelectorAll('.view-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const deckListContainer = document.getElementById('deck-list');
    const newDeckBtn = document.getElementById('new-deck-btn');
    const exitStudyBtn = document.getElementById('exit-study-btn');
    
    // Tela de Estudo
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcard = document.getElementById('flashcard');
    const flashcardFront = document.getElementById('flashcard-front');
    const flashcardBack = document.getElementById('flashcard-back');
    const cardCounter = document.getElementById('card-counter');
    const answerOptions = document.getElementById('answer-options');

    // Tela de Gerenciamento
    const managerDeckTitle = document.getElementById('manager-deck-title');
    const cardListContainer = document.getElementById('card-list');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
    const managerAddCardBtn = document.getElementById('manager-add-card-btn');

    // Modais
    const newDeckModal = document.getElementById('new-deck-modal');
    const editCardModal = document.getElementById('edit-card-modal');
    const newDeckNameInput = document.getElementById('new-deck-name');
    const confirmDeckCreationBtn = document.getElementById('confirm-deck-creation');
    const editCardQuestionInput = document.getElementById('edit-card-question');
    const editCardAnswerInput = document.getElementById('edit-card-answer');
    const confirmCardEditBtn = document.getElementById('confirm-card-edit');
    
    // Gráficos
    const forecastChartCtx = document.getElementById('forecast-chart').getContext('2d');
    const cardDistributionChartCtx = document.getElementById('card-distribution-chart').getContext('2d');
    let forecastChart, cardDistributionChart;

    // =================================================================
    // ESTADO DA APLICAÇÃO
    // =================================================================
    let decks = [];
    let cards = [];
    let currentDeckId = null; // Para estudo ou gerenciamento
    let currentCardId = null; // Para edição
    let studyQueue = [];
    let currentCardIndexInQueue = 0;
    let isFlipped = false;

    // =================================================================
    // FUNÇÕES DE DADOS (localStorage)
    // =================================================================
    function saveData() {
        localStorage.setItem('codecards_decks', JSON.stringify(decks));
        localStorage.setItem('codecards_cards', JSON.stringify(cards));
    }

    function loadData() {
        const storedDecks = localStorage.getItem('codecards_decks');
        const storedCards = localStorage.getItem('codecards_cards');
        decks = storedDecks ? JSON.parse(storedDecks) : [];
        cards = storedCards ? JSON.parse(storedCards) : [];
    }
    
    // =================================================================
    // LÓGICA DE REPETIÇÃO ESPAÇADA (SRS)
    // =================================================================
    function scheduleCard(card, quality) {
        if (quality < 3) {
            card.interval = 1;
            card.repetition = 0;
        } else {
            if (card.repetition === 0) card.interval = 1;
            else if (card.repetition === 1) card.interval = 6;
            else card.interval = Math.round(card.interval * card.easeFactor);
            card.repetition += 1;
        }

        card.easeFactor = card.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
        if (card.easeFactor < 1.3) card.easeFactor = 1.3;

        const now = new Date();
        now.setHours(0, 0, 0, 0);
        card.dueDate = now.getTime() + card.interval * ONE_DAY_IN_MS;
        saveData();
    }

    // =================================================================
    // FUNÇÕES DE RENDERIZAÇÃO E UI
    // =================================================================
    function switchView(viewId) {
        views.forEach(view => view.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
        document.getElementById(viewId).style.display = 'flex';

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewId);
        });

        if (viewId === 'stats-view') renderStatistics();
        if (viewId === 'dashboard-view') renderDecks();
    }

    function renderDecks() {
        deckListContainer.innerHTML = '';
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);

        decks.forEach(deck => {
            const deckCards = cards.filter(c => c.deckId === deck.id);
            const newCount = deckCards.filter(c => !c.dueDate).length;
            const learningCount = deckCards.filter(c => c.dueDate && c.interval < 21).length;
            const reviewCount = deckCards.filter(c => c.dueDate && c.dueDate <= todayTimestamp).length;

            const deckElement = document.createElement('div');
            deckElement.className = 'deck-item';
            deckElement.innerHTML = `
                <div class="deck-name-container" data-deck-id="${deck.id}">
                    <i class="fa-solid fa-layer-group"></i><span>${deck.name}</span>
                </div>
                <div class="deck-stats-container">
                    <div class="w-1/3 text-center text-blue-600">${newCount}</div>
                    <div class="w-1/3 text-center text-yellow-600">${learningCount}</div>
                    <div class="w-1/3 text-center text-red-error">${reviewCount}</div>
                </div>
                <div class="deck-options">
                    <button class="btn-icon manage-deck-btn" data-deck-id="${deck.id}"><i class="fa-solid fa-gear"></i></button>
                </div>
            `;
            deckListContainer.appendChild(deckElement);
        });
    }

    function renderCardManager(deckId) {
        const deck = decks.find(d => d.id === deckId);
        if (!deck) return;
        
        currentDeckId = deckId;
        managerDeckTitle.textContent = deck.name;
        cardListContainer.innerHTML = '';

        const deckCards = cards.filter(c => c.deckId === deckId);
        if(deckCards.length === 0) {
            cardListContainer.innerHTML = `<p class="text-center text-gray-500 p-4">Nenhuma carta neste baralho. Adicione uma!</p>`;
        } else {
            deckCards.forEach(card => {
                const cardEl = document.createElement('div');
                cardEl.className = 'card-item';
                cardEl.innerHTML = `
                    <div class="card-text">${card.question}</div>
                    <div class="card-text">${card.answer}</div>
                    <div class="card-actions">
                        <button class="btn-icon edit-card-btn" data-card-id="${card.id}"><i class="fa-solid fa-pencil"></i></button>
                        <button class="btn-icon delete-card-btn" data-card-id="${card.id}"><i class="fa-solid fa-trash"></i></button>
                    </div>
                `;
                cardListContainer.appendChild(cardEl);
            });
        }
        switchView('deck-manager-view');
    }

    function startStudy(deckId) {
        currentDeckId = deckId;
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);
        const cardsForDeck = cards.filter(c => c.deckId === deckId);
        const dueCards = cardsForDeck.filter(c => c.dueDate && c.dueDate <= todayTimestamp);
        const newCards = cardsForDeck.filter(c => !c.dueDate).slice(0, 10);

        studyQueue = [...dueCards, ...newCards];
        if (studyQueue.length === 0) {
            alert("Nenhum cartão para estudar neste baralho hoje!");
            return;
        }
        
        currentCardIndexInQueue = 0;
        switchView('study-view');
        loadCard(currentCardIndexInQueue);
    }

    function loadCard(index) {
        if (index >= studyQueue.length) {
            flashcardFront.textContent = 'Parabéns, você concluiu a sessão!';
            flashcardBack.textContent = 'Bom trabalho!';
            answerOptions.classList.add('hidden');
            cardCounter.textContent = `Concluído!`;
            if (isFlipped) flipCard();
            return;
        }
        
        const card = studyQueue[index];
        flashcardFront.textContent = card.question;
        flashcardBack.textContent = card.answer;
        cardCounter.textContent = `${index + 1}/${studyQueue.length} cartas`;
        
        if(isFlipped) flipCard();
        answerOptions.classList.add('hidden');
    }

    function flipCard() {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('is-flipped');
        if (isFlipped && currentCardIndexInQueue < studyQueue.length) {
            answerOptions.classList.remove('hidden');
        } else {
            answerOptions.classList.add('hidden');
        }
    }

    function handleDifficulty(quality) {
        const card = studyQueue[currentCardIndexInQueue];
        scheduleCard(card, quality);
        currentCardIndexInQueue++;
        setTimeout(() => loadCard(currentCardIndexInQueue), 300);
    }

    function renderStatistics() {
        const forecastData = { labels: [], data: [] };
        const today = new Date().setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            const date = new Date(today + i * ONE_DAY_IN_MS);
            forecastData.labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            const count = cards.filter(c => c.dueDate && new Date(c.dueDate).setHours(0,0,0,0) === date.getTime()).length;
            forecastData.data.push(count);
        }

        if (forecastChart) forecastChart.destroy();
        forecastChart = new Chart(forecastChartCtx, {
            type: 'bar',
            data: { labels: forecastData.labels, datasets: [{ label: 'Cartões para Revisar', data: forecastData.data, backgroundColor: 'rgba(29, 78, 216, 0.7)' }] },
            options: { scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
        });

        const newCount = cards.filter(c => !c.dueDate).length;
        const learningCount = cards.filter(c => c.dueDate && c.interval < 21).length;
        const matureCount = cards.filter(c => c.dueDate && c.interval >= 21).length;
        
        if (cardDistributionChart) cardDistributionChart.destroy();
        cardDistributionChart = new Chart(cardDistributionChartCtx, {
            type: 'doughnut',
            data: { labels: ['Novos', 'Aprendendo', 'Maduros'], datasets: [{ data: [newCount, learningCount, matureCount], backgroundColor: ['#3b82f6', '#f59e0b', '#16a34a'] }] }
        });
    }

    // --- Funções de Ações e Modais ---
    function showModal(modal) { modal.classList.remove('hidden'); }
    function hideModal(modal) { modal.classList.add('hidden'); }

    function createNewDeck() {
        const name = newDeckNameInput.value.trim();
        if (name) {
            decks.push({ id: Date.now(), name });
            saveData();
            newDeckNameInput.value = '';
            hideModal(newDeckModal);
            renderDecks();
        }
    }

    function openCardModalForCreation() {
        // Limpa o formulário de edição (que é o mesmo modal)
        editCardModal.querySelector('.modal-title').textContent = 'Adicionar Nova Carta';
        confirmCardEditBtn.textContent = 'Adicionar';
        currentCardId = null; 
        editCardQuestionInput.value = '';
        editCardAnswerInput.value = '';
        showModal(editCardModal);
    }

    function openCardModalForEdit(cardId) {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;
        
        editCardModal.querySelector('.modal-title').textContent = 'Editar Carta';
        confirmCardEditBtn.textContent = 'Salvar Alterações';
        currentCardId = cardId;
        editCardQuestionInput.value = card.question;
        editCardAnswerInput.value = card.answer;
        showModal(editCardModal);
    }
    
    function saveCard() {
        const question = editCardQuestionInput.value.trim();
        const answer = editCardAnswerInput.value.trim();
        if (!question || !answer) return alert('Preencha todos os campos!');

        if (currentCardId) { // Editando
            const card = cards.find(c => c.id === currentCardId);
            card.question = question;
            card.answer = answer;
        } else { // Criando
            cards.push({
                id: Date.now(), deckId: currentDeckId, question, answer,
                repetition: 0, interval: 0, easeFactor: EASE_FACTOR_INITIAL, dueDate: null
            });
        }
        saveData();
        hideModal(editCardModal);
        renderCardManager(currentDeckId);
    }

    function deleteCard(cardId) {
        if (confirm('Tem certeza que deseja excluir esta carta?')) {
            cards = cards.filter(c => c.id !== cardId);
            saveData();
            renderCardManager(currentDeckId);
        }
    }

    // =================================================================
    // EVENT LISTENERS
    // =================================================================
    navButtons.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
    flashcardContainer.addEventListener('click', flipCard);
    exitStudyBtn.addEventListener('click', () => switchView('dashboard-view'));
    backToDashboardBtn.addEventListener('click', () => switchView('dashboard-view'));
    
    deckListContainer.addEventListener('click', (e) => {
        const studyTarget = e.target.closest('.deck-name-container');
        const manageTarget = e.target.closest('.manage-deck-btn');
        if (studyTarget) startStudy(parseInt(studyTarget.dataset.deckId));
        if (manageTarget) renderCardManager(parseInt(manageTarget.dataset.deckId));
    });

    cardListContainer.addEventListener('click', (e) => {
        const editTarget = e.target.closest('.edit-card-btn');
        const deleteTarget = e.target.closest('.delete-card-btn');
        if(editTarget) openCardModalForEdit(parseInt(editTarget.dataset.cardId));
        if(deleteTarget) deleteCard(parseInt(deleteTarget.dataset.cardId));
    });

    answerOptions.addEventListener('click', (e) => {
        const button = e.target.closest('.difficulty-btn');
        if (button) handleDifficulty(parseInt(button.dataset.difficulty));
    });

    // Modais
    newDeckBtn.addEventListener('click', () => showModal(newDeckModal));
    confirmDeckCreationBtn.addEventListener('click', createNewDeck);
    managerAddCardBtn.addEventListener('click', openCardModalForCreation);
    confirmCardEditBtn.addEventListener('click', saveCard);

    document.body.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'close-modal') {
            hideModal(e.target.closest('.modal-overlay'));
        }
    });

    // =================================================================
    // INICIALIZAÇÃO
    // =================================================================
    loadData();
    switchView('dashboard-view');
});
