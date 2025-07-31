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
    const addCardToDeckBtn = document.getElementById('add-card-to-deck-btn');
    
    // Elementos da tela de estudo
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcard = document.getElementById('flashcard');
    const flashcardFront = document.getElementById('flashcard-front');
    const flashcardBack = document.getElementById('flashcard-back');
    const cardCounter = document.getElementById('card-counter');
    const answerOptions = document.getElementById('answer-options');

    // Modais
    const newDeckModal = document.getElementById('new-deck-modal');
    const newCardModal = document.getElementById('new-card-modal');
    const newDeckNameInput = document.getElementById('new-deck-name');
    const confirmDeckCreationBtn = document.getElementById('confirm-deck-creation');
    const newCardQuestionInput = document.getElementById('new-card-question');
    const newCardAnswerInput = document.getElementById('new-card-answer');
    const confirmCardCreationBtn = document.getElementById('confirm-card-creation');
    
    // Gráficos
    const forecastChartCtx = document.getElementById('forecast-chart').getContext('2d');
    const cardDistributionChartCtx = document.getElementById('card-distribution-chart').getContext('2d');
    let forecastChart, cardDistributionChart;

    // =================================================================
    // ESTADO DA APLICAÇÃO
    // =================================================================
    let decks = [];
    let cards = [];
    let currentStudyDeck = null;
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
        if (quality < 3) { // Errou
            card.interval = 1;
            card.repetition = 0;
        } else {
            if (card.repetition === 0) {
                card.interval = 1;
            } else if (card.repetition === 1) {
                card.interval = 6;
            } else {
                card.interval = Math.round(card.interval * card.easeFactor);
            }
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

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewId);
        });

        if (viewId === 'stats-view') {
            renderStatistics();
        }
    }

    function renderDecks() {
        deckListContainer.innerHTML = '';
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        decks.forEach(deck => {
            const deckCards = cards.filter(c => c.deckId === deck.id);
            const newCount = deckCards.filter(c => !c.dueDate).length;
            const learningCount = deckCards.filter(c => c.dueDate && c.interval < 21).length; // Ex: < 21 dias = aprendendo
            const reviewCount = deckCards.filter(c => c.dueDate && c.dueDate <= todayTimestamp).length;

            const deckElement = document.createElement('div');
            deckElement.className = 'deck-item';
            deckElement.innerHTML = `
                <div class="deck-name-container"><i class="fa-solid fa-layer-group"></i><span>${deck.name}</span></div>
                <div class="deck-stats-container">
                    <div class="w-1/3 text-center text-blue-600">${newCount}</div>
                    <div class="w-1/3 text-center text-yellow-600">${learningCount}</div>
                    <div class="w-1/3 text-center text-red-error">${reviewCount}</div>
                </div>
            `;
            deckElement.addEventListener('click', () => startStudy(deck.id));
            deckListContainer.appendChild(deckElement);
        });
    }

    function startStudy(deckId) {
        currentStudyDeck = decks.find(d => d.id === deckId);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayTimestamp = today.getTime();

        const cardsForDeck = cards.filter(c => c.deckId === deckId);
        const dueCards = cardsForDeck.filter(c => c.dueDate && c.dueDate <= todayTimestamp);
        const newCards = cardsForDeck.filter(c => !c.dueDate).slice(0, 10); // Limita a 10 novas cartas por sessão

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

    // --- Funções de Estatísticas ---
    function renderStatistics() {
        // Previsão de Revisões
        const forecastData = { labels: [], data: [] };
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            const date = new Date(today.getTime() + i * ONE_DAY_IN_MS);
            const dateString = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
            forecastData.labels.push(dateString);
            const count = cards.filter(c => {
                if (!c.dueDate) return false;
                const dueDate = new Date(c.dueDate);
                dueDate.setHours(0,0,0,0);
                return dueDate.getTime() === date.getTime();
            }).length;
            forecastData.data.push(count);
        }

        if (forecastChart) forecastChart.destroy();
        forecastChart = new Chart(forecastChartCtx, {
            type: 'bar',
            data: {
                labels: forecastData.labels,
                datasets: [{
                    label: 'Cartões para Revisar',
                    data: forecastData.data,
                    backgroundColor: 'rgba(29, 78, 216, 0.7)',
                    borderColor: 'rgba(29, 78, 216, 1)',
                    borderWidth: 1
                }]
            },
            options: { scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
        });

        // Distribuição de Cartões
        const newCount = cards.filter(c => !c.dueDate).length;
        const learningCount = cards.filter(c => c.dueDate && c.interval < 21).length;
        const matureCount = cards.filter(c => c.dueDate && c.interval >= 21).length;
        
        if (cardDistributionChart) cardDistributionChart.destroy();
        cardDistributionChart = new Chart(cardDistributionChartCtx, {
            type: 'doughnut',
            data: {
                labels: ['Novos', 'Aprendendo', 'Maduros'],
                datasets: [{
                    data: [newCount, learningCount, matureCount],
                    backgroundColor: ['#3b82f6', '#f59e0b', '#16a34a']
                }]
            }
        });
    }

    // --- Funções de Modal ---
    function showModal(modal) {
        modal.classList.remove('hidden');
    }

    function hideModal(modal) {
        modal.classList.add('hidden');
    }

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

    function createNewCard() {
        const question = newCardQuestionInput.value.trim();
        const answer = newCardAnswerInput.value.trim();

        if (question && answer && currentStudyDeck) {
            cards.push({
                id: Date.now(),
                deckId: currentStudyDeck.id,
                question,
                answer,
                repetition: 0,
                interval: 0,
                easeFactor: EASE_FACTOR_INITIAL,
                dueDate: null
            });
            saveData();
            newCardQuestionInput.value = '';
            newCardAnswerInput.value = '';
            hideModal(newCardModal);
            
            // Atualiza a fila de estudo se a carta for adicionada durante uma sessão
            const newCard = cards[cards.length - 1];
            studyQueue.push(newCard);
            loadCard(currentCardIndexInQueue); // Recarrega para atualizar o contador
            renderDecks();
        }
    }

    // =================================================================
    // EVENT LISTENERS
    // =================================================================
    navButtons.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
    flashcardContainer.addEventListener('click', flipCard);
    exitStudyBtn.addEventListener('click', () => {
        switchView('dashboard-view');
        renderDecks(); // Atualiza a contagem ao sair
    });
    
    answerOptions.addEventListener('click', (e) => {
        const button = e.target.closest('.difficulty-btn');
        if (button) {
            handleDifficulty(parseInt(button.dataset.difficulty));
        }
    });

    // Modais
    newDeckBtn.addEventListener('click', () => showModal(newDeckModal));
    confirmDeckCreationBtn.addEventListener('click', createNewDeck);
    addCardToDeckBtn.addEventListener('click', () => showModal(newCardModal));
    confirmCardCreationBtn.addEventListener('click', createNewCard);
    
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
    renderDecks();
});
