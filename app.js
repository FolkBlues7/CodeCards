// Gerenciamento de dados
let decks = JSON.parse(localStorage.getItem('decks')) || [];
let currentDeckId = null;

// Funções de persistência
function saveDecks() {
    localStorage.setItem('decks', JSON.stringify(decks));
}

// Funções de Baralhos
function addDeck(name) {
    const deck = {
        id: crypto.randomUUID(),
        name,
        cards: [],
        created_at: new Date().toISOString()
    };
    decks.push(deck);
    saveDecks();
    renderDecks();
}

function renderDecks() {
    const deckList = document.getElementById('deckList');
    deckList.innerHTML = '';
    decks.forEach(deck => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center bg-white p-2 rounded shadow';
        li.innerHTML = `
            <span>${deck.name}</span>
            <button onclick="openDeck('${deck.id}')" class="bg-blue-500 text-white px-2 py-1 rounded">Abrir</button>
        `;
        deckList.appendChild(li);
    });
}

// Funções de Cartões
function addCard(deckId, front, back) {
    const deck = decks.find(d => d.id === deckId);
    if (deck) {
        const card = {
            id: crypto.randomUUID(),
            front,
            back,
            created_at: new Date().toISOString(),
            next_review: new Date().toISOString(),
            interval: 1,
            ease_factor: 2.5,
            repetitions: 0
        };
        deck.cards.push(card);
        saveDecks();
        renderCards(deckId);
    }
}

function renderCards(deckId) {
    const deck = decks.find(d => d.id === deckId);
    const cardList = document.getElementById('cardList');
    cardList.innerHTML = '';
    deck.cards.forEach(card => {
        const li = document.createElement('li');
        li.className = 'bg-white p-2 rounded shadow';
        li.innerHTML = `
            <span>${card.front} - ${card.back}</span>
            <button onclick="deleteCard('${deckId}', '${card.id}')" class="bg-red-500 text-white px-2 py-1 rounded ml-2">Excluir</button>
        `;
        cardList.appendChild(li);
    });
    document.getElementById('currentDeckName').textContent = deck.name;
}

function deleteCard(deckId, cardId) {
    const deck = decks.find(d => d.id === deckId);
    deck.cards = deck.cards.filter(c => c.id !== cardId);
    saveDecks();
    renderCards(deckId);
}

// Funções de Revisão
function startReview(deckId) {
    currentDeckId = deckId;
    const deck = decks.find(d => d.id === deckId);
    const dueCards = deck.cards.filter(card => new Date(card.next_review) <= new Date());
    if (dueCards.length === 0) {
        document.getElementById('cardSection').classList.add('hidden');
        document.getElementById('reviewSection').classList.add('hidden');
        document.getElementById('deckSection').classList.remove('hidden');
        alert('Nenhum cartão para revisar agora!');
        return;
    }
    showCard(dueCards[0]);
    document.getElementById('cardSection').classList.add('hidden');
    document.getElementById('reviewSection').classList.remove('hidden');
}

function showCard(card) {
    document.getElementById('cardFront').textContent = card.front;
    document.getElementById('cardBack').textContent = card.back;
    document.getElementById('cardBack').classList.add('hidden');
    document.getElementById('showAnswerBtn').classList.remove('hidden');
    document.getElementById('ratingButtons').classList.add('hidden');
}

function updateCard(card, rating) {
    const now = new Date();
    card.repetitions++;
    if (rating === 'easy') {
        card.ease_factor = Math.min(card.ease_factor + 0.1, 2.5);
        card.interval *= card.ease_factor;
    } else if (rating === 'good') {
        card.interval *= card.ease_factor;
    } else if (rating === 'hard') {
        card.ease_factor = Math.max(card.ease_factor - 0.2, 1.3);
        card.interval = Math.max(1, card.interval * 0.5);
    }
    card.next_review = new Date(now.getTime() + card.interval * 24 * 60 * 60 * 1000).toISOString();
    saveDecks();
}

// Navegação
function openDeck(deckId) {
    currentDeckId = deckId;
    renderCards(deckId);
    document.getElementById('deckSection').classList.add('hidden');
    document.getElementById('cardSection').classList.remove('hidden');
}

// Event Listeners
document.getElementById('addDeckBtn').addEventListener('click', () => {
    const name = document.getElementById('deckNameInput').value.trim();
    if (name) {
        addDeck(name);
        document.getElementById('deckNameInput').value = '';
    }
});

document.getElementById('addCardBtn').addEventListener('click', () => {
    const front = document.getElementById('cardFrontInput').value.trim();
    const back = document.getElementById('cardBackInput').value.trim();
    if (front && back) {
        addCard(currentDeckId, front, back);
        document.getElementById('cardFrontInput').value = '';
        document.getElementById('cardBackInput').value = '';
    }
});

document.getElementById('startReviewBtn').addEventListener('click', () => startReview(currentDeckId));

document.getElementById('backToDecksBtn').addEventListener('click', () => {
    document.getElementById('cardSection').classList.add('hidden');
    document.getElementById('deckSection').classList.remove('hidden');
});

document.getElementById('showAnswerBtn').addEventListener('click', () => {
    document.getElementById('cardBack').classList.remove('hidden');
    document.getElementById('showAnswerBtn').classList.add('hidden');
    document.getElementById('ratingButtons').classList.remove('hidden');
});

document.getElementById('endReviewBtn').addEventListener('click', () => {
    document.getElementById('reviewSection').classList.add('hidden');
    document.getElementById('cardSection').classList.remove('hidden');
});

['easy', 'good', 'hard'].forEach(rating => {
    document.getElementById(`rate${rating.charAt(0).toUpperCase() + rating.slice(1)}Btn`).addEventListener('click', () => {
        const deck = decks.find(d => d.id === currentDeckId);
        const card = deck.cards.find(c => c.front === document.getElementById('cardFront').textContent);
        updateCard(card, rating);
        const dueCards = deck.cards.filter(c => new Date(c.next_review) <= new Date());
        if (dueCards.length > 0) {
            showCard(dueCards[0]);
        } else {
            document.getElementById('reviewSection').classList.add('hidden');
            document.getElementById('cardSection').classList.remove('hidden');
            alert('Revisão concluída!');
        }
    });
});

// Inicialização
renderDecks();