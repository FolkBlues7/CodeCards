document.addEventListener('DOMContentLoaded', () => {
    const EASE_FACTOR_INITIAL = 2.5;
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const codeDecks = [
        {
            language: 'JavaScript',
            decks: [
                { id: 'js_b_1', name: 'Variáveis e Tipos de Dados', difficulty: 'Iniciante', cards: [
                    { id: 'js_c_1', question: 'Qual a palavra-chave para declarar uma variável que não pode ser reatribuída?', answer: 'const' },
                    { id: 'js_c_2', question: 'Qual a diferença entre `==` e `===`?', answer: '`==` compara por valor (com coerção de tipo), `===` compara por valor e tipo (sem coerção).' },
                    { id: 'js_c_5', question: 'O que é `undefined` em JavaScript?', answer: 'Uma variável que foi declarada, mas ainda não teve um valor atribuído.' },
                    { id: 'js_c_6', question: 'Qual a diferença entre `null` e `undefined`?', answer: '`undefined` significa que uma variável não teve valor atribuído. `null` é um valor de atribuição que representa a ausência intencional de qualquer valor de objeto.' },
                    { id: 'js_c_7', question: 'Como se declara uma variável que pode ser reatribuída?', answer: 'Usando a palavra-chave `let`.' },
                    { id: 'js_c_8', question: 'Qual dos 7 tipos primitivos do JavaScript representa um valor lógico?', answer: 'Boolean (pode ser `true` ou `false`).' },
                    { id: 'js_c_9', question: 'Como você verifica o tipo de uma variável em JavaScript?', answer: 'Usando o operador `typeof`.' },
                    { id: 'js_c_10', question: 'Qual o resultado de `"5" + 3`?', answer: '`"53"` (String). O JavaScript converte o número 3 para string e concatena.' },
                    { id: 'js_c_11', question: 'Qual o resultado de `"5" - 3`?', answer: '`2` (Number). O JavaScript converte a string "5" para número e subtrai.' },
                    { id: 'js_c_12', question: 'O que a expressão `!true` retorna?', answer: '`false`. O operador `!` é o operador de negação lógica (NOT).' },
                ]},
                { id: 'js_i_1', name: 'Funções e Escopo', difficulty: 'Intermediário', cards: [
                    { id: 'js_c_3', question: 'O que é uma closure (fechamento) em JavaScript?', answer: 'É a combinação de uma função com as referências ao seu estado circundante (seu escopo léxico).' },
                    { id: 'js_c_13', question: 'O que são "Arrow Functions"?', answer: 'Uma sintaxe mais curta para escrever expressões de função. Elas não têm seu próprio `this`, `arguments`, `super`, ou `new.target`.' },
                    { id: 'js_c_14', question: 'Qual a diferença entre escopo de função e escopo de bloco?', answer: 'Variáveis declaradas com `var` têm escopo de função. Variáveis com `let` e `const` têm escopo de bloco (limitadas ao bloco `{}` onde foram declaradas).' },
                    { id: 'js_c_15', question: 'O que é "Hoisting" em JavaScript?', answer: 'É o comportamento padrão do JavaScript de mover as declarações para o topo do escopo atual antes da execução do código.' },
                    { id: 'js_c_16', question: 'O que o método `map()` faz em um array?', answer: 'Cria um novo array populado com os resultados da chamada de uma função para cada elemento do array.' },
                    { id: 'js_c_17', question: 'Qual a diferença entre `map()` e `forEach()`?', answer: '`map()` retorna um novo array com os elementos transformados. `forEach()` executa uma função para cada elemento, mas não retorna um novo array.' },
                    { id: 'js_c_18', question: 'Para que serve o método `filter()`?', answer: 'Cria um novo array com todos os elementos que passam no teste implementado pela função fornecida.' },
                    { id: 'js_c_19', question: 'O que o método `reduce()` faz?', answer: 'Executa uma função "redutora" para cada elemento do array, resultando num único valor de retorno.' },
                    { id: 'js_c_20', question: 'O que é o `this` em JavaScript?', answer: 'É uma palavra-chave que se refere ao objeto ao qual a função pertence. Seu valor é determinado por como a função é chamada.' },
                    { id: 'js_c_21', question: 'O que é uma função de "callback"?', answer: 'É uma função passada como argumento para outra função, para ser "chamada de volta" (executada) mais tarde.' },
                ]},
                { id: 'js_a_1', name: 'Promises e Assincronismo', difficulty: 'Avançado', cards: [
                    { id: 'js_c_4', question: 'O que `async/await` faz?', answer: 'É uma sintaxe para trabalhar com Promises de forma mais síncrona, tornando o código assíncrono mais fácil de ler.' },
                    { id: 'js_c_22', question: 'O que é uma "Promise" em JavaScript?', answer: 'Um objeto que representa a eventual conclusão (ou falha) de uma operação assíncrona e seu valor resultante.' },
                    { id: 'js_c_23', question: 'Quais são os três estados de uma Promise?', answer: '`pending` (pendente), `fulfilled` (realizada com sucesso), e `rejected` (rejeitada).' },
                    { id: 'js_c_24', question: 'Para que serve o `Promise.all()`?', answer: 'Recebe um array de Promises e retorna uma única Promise que é resolvida quando todas as Promises no array são resolvidas.' },
                    { id: 'js_c_25', question: 'O que é o "Event Loop"?', answer: 'É um processo que permite ao Node.js (e ao JavaScript no navegador) realizar operações não-bloqueantes de I/O, apesar do fato de que o JavaScript é single-threaded.' },
                    { id: 'js_c_26', question: 'O que é "prototype" em JavaScript?', answer: 'É um mecanismo pelo qual objetos JavaScript herdam recursos uns dos outros. Cada objeto tem uma propriedade privada que mantém um link para outro objeto chamado seu protótipo.' },
                    { id: 'js_c_27', question: 'Qual a diferença entre `Object.create()` e o construtor `new`?', answer: '`Object.create()` cria um novo objeto com o objeto protótipo especificado. `new` cria um novo objeto e invoca a função construtora.' },
                    { id: 'js_c_28', question: 'O que são "Web Workers"?', answer: 'Permitem a execução de scripts em um thread de segundo plano, liberando o thread principal para a interface do usuário e evitando que a página congele.' },
                    { id: 'js_c_29', question: 'Para que serve o `bind()`?', answer: 'Cria uma nova função que, quando chamada, tem sua palavra-chave `this` definida com o valor fornecido, com uma sequência de argumentos.' },
                    { id: 'js_c_30', question: 'O que são Módulos em JavaScript (ES6)?', answer: 'São arquivos que permitem dividir o código em componentes reutilizáveis e organizados, usando `import` e `export`.' },
                ]}
            ]
        },
        {
            language: 'Python',
            decks: [
                { id: 'py_b_1', name: 'Sintaxe e Tipos de Dados', difficulty: 'Iniciante', cards: [
                    { id: 'py_c_1', question: 'Qual a principal diferença entre uma Lista e uma Tupla em Python?', answer: 'Listas são mutáveis (podem ser alteradas), enquanto Tuplas são imutáveis.' },
                    { id: 'py_c_2', question: 'Como se imprime algo no console em Python?', answer: 'Usando a função `print()`.' },
                    { id: 'py_c_3', question: 'O que é um dicionário em Python?', answer: 'Uma coleção não ordenada de pares chave-valor.' },
                    { id: 'py_c_4', question: 'Como você obtém o comprimento de uma lista ou string?', answer: 'Usando a função `len()`.' },
                    { id: 'py_c_5', question: 'O que o operador `%` (módulo) faz?', answer: 'Retorna o resto de uma divisão.' },
                    { id: 'py_c_6', question: 'Para que serve a indentação em Python?', answer: 'É usada para definir blocos de código, como loops, funções e classes. É obrigatória e parte da sintaxe.' },
                    { id: 'py_c_7', question: 'Como se define uma função em Python?', answer: 'Usando a palavra-chave `def`, seguida pelo nome da função e parênteses.' },
                    { id: 'py_c_8', question: 'O que é o tipo de dado `bool`?', answer: 'Representa valores de verdade, que podem ser `True` ou `False`.' },
                    { id: 'py_c_9', question: 'Como se converte uma string para um número inteiro?', answer: 'Usando a função `int()`.' },
                    { id: 'py_c_10', question: 'Qual a função para receber entrada do usuário no console?', answer: 'A função `input()`.' },
                ]},
                { id: 'py_i_1', name: 'Estruturas de Controle e Funções', difficulty: 'Intermediário', cards: [
                    { id: 'py_c_11', question: 'O que é uma "List Comprehension"?', answer: 'Uma forma concisa de criar listas. Ex: `[x*x for x in range(10)]`.' },
                    { id: 'py_c_12', question: 'Para que servem `*args` e `**kwargs` em uma definição de função?', answer: '`*args` permite passar um número variável de argumentos posicionais. `**kwargs` permite passar um número variável de argumentos nomeados.' },
                    { id: 'py_c_13', question: 'O que é uma função lambda?', answer: 'Uma pequena função anônima, definida com a palavra-chave `lambda`. Pode ter vários argumentos, mas apenas uma expressão.' },
                    { id: 'py_c_14', question: 'Como funciona o tratamento de exceções em Python?', answer: 'Usando os blocos `try`, `except`, `else` e `finally`.' },
                    { id: 'py_c_15', question: 'O que o `if __name__ == "__main__":` faz?', answer: 'Garante que o código dentro do bloco só seja executado quando o arquivo é o script principal, e não quando é importado como um módulo.' },
                    { id: 'py_c_16', question: 'Qual a diferença entre um "shallow copy" e um "deep copy"?', answer: 'Shallow copy cria um novo objeto, mas insere referências aos itens do objeto original. Deep copy cria um novo objeto e recursivamente copia os itens.' },
                    { id: 'py_c_17', question: 'O que é um "Set" (conjunto) em Python?', answer: 'Uma coleção não ordenada de itens únicos.' },
                    { id: 'py_c_18', question: 'Como se abre um arquivo para leitura em Python?', answer: 'Usando `with open("arquivo.txt", "r") as f:`.' },
                    { id: 'py_c_19', question: 'O que a palavra-chave `pass` faz?', answer: 'É uma operação nula. Nada acontece quando é executada. É usada como um placeholder.' },
                    { id: 'py_c_20', question: 'O que são f-strings?', answer: 'Uma forma de formatar strings introduzida no Python 3.6. Permitem embutir expressões dentro de literais de string. Ex: `f"Olá, {nome}"`.' },
                ]},
                { id: 'py_a_1', name: 'Tópicos Avançados e Paradigmas', difficulty: 'Avançado', cards: [
                    { id: 'py_c_21', question: 'O que são "Decorators" em Python?', answer: 'Uma função que recebe outra função como argumento, adiciona alguma funcionalidade e retorna outra função, sem alterar o código da função original.' },
                    { id: 'py_c_22', question: 'O que são "Generators"?', answer: 'Uma forma simples de criar iteradores. São funções que usam a palavra-chave `yield` para retornar dados, pausando a execução e mantendo o estado.' },
                    { id: 'py_c_23', question: 'O que é o GIL (Global Interpreter Lock) em Python?', answer: 'Um mutex que protege o acesso a objetos Python, impedindo que múltiplos threads executem bytecode Python ao mesmo tempo em um único processo.' },
                    { id: 'py_c_24', question: 'O que são "Magic Methods" (ou dunder methods)?', answer: 'Métodos especiais com nomes que começam e terminam com duplo underscore (ex: `__init__`, `__str__`). Permitem emular comportamentos nativos.' },
                    { id: 'py_c_25', question: 'Para que serve um "Context Manager" (usado com `with`)?', answer: 'Gerencia recursos, garantindo que sejam adquiridos antes e liberados depois de um bloco de código, mesmo que ocorram erros.' },
                    { id: 'py_c_26', question: 'O que é Metaprogramação?', answer: 'É a capacidade de um programa tratar outros programas (ou a si mesmo) como seus dados. Em Python, isso é feito com metaclasses.' },
                    { id: 'py_c_27', question: 'Qual a diferença entre `__str__` e `__repr__`?', answer: '`__str__` é para criar uma saída legível para o usuário final. `__repr__` é para criar uma representação inequívoca do objeto, útil para desenvolvedores.' },
                    { id: 'py_c_28', question: 'O que é o `asyncio`?', answer: 'Uma biblioteca para escrever código concorrente usando a sintaxe `async/await`.' },
                    { id: 'py_c_29', question: 'O que o `collections.deque` oferece?', answer: 'Uma lista generalizada de dupla extremidade que suporta adições e remoções rápidas de ambos os lados (append e pop).' },
                    { id: 'py_c_30', question: 'O que é "duck typing"?', answer: '"Se anda como um pato e grasna como um pato, então deve ser um pato." O tipo de um objeto não importa, apenas se ele possui os métodos e propriedades necessários.' },
                ]}
            ]
        },
        {
            language: 'Java',
            decks: [
                { id: 'jv_b_1', name: 'Fundamentos e Sintaxe', difficulty: 'Iniciante', cards: [
                    { id: 'jv_c_1', question: 'Qual a diferença entre JDK, JRE e JVM?', answer: 'JVM (Java Virtual Machine) executa o bytecode. JRE (Java Runtime Environment) contém a JVM e bibliotecas. JDK (Java Development Kit) contém a JRE e ferramentas de desenvolvimento.' },
                    { id: 'jv_c_2', question: 'O que é o método `public static void main(String[] args)`?', answer: 'É o ponto de entrada de qualquer aplicação Java standalone.' },
                    { id: 'jv_c_3', question: 'Quais são os 8 tipos de dados primitivos em Java?', answer: 'byte, short, int, long, float, double, char, boolean.' },
                    { id: 'jv_c_4', question: 'Qual a diferença entre tipos primitivos e tipos de referência?', answer: 'Primitivos armazenam o valor diretamente. Tipos de referência (objetos) armazenam um endereço para a localização do objeto na memória.' },
                    { id: 'jv_c_5', question: 'Como se declara e instancia um objeto em Java?', answer: '`NomeDaClasse nomeDoObjeto = new NomeDaClasse();`' },
                    { id: 'jv_c_6', question: 'A classe `String` é um tipo primitivo?', answer: 'Não, `String` é uma classe (tipo de referência), mas possui tratamento especial, como a imutabilidade.' },
                    { id: 'jv_c_7', question: 'Para que serve a palavra-chave `final`?', answer: 'Para variáveis, impede a reatribuição. Para métodos, impede a sobrescrita. Para classes, impede a herança.' },
                    { id: 'jv_c_8', question: 'O que é um construtor?', answer: 'Um método especial para inicializar um objeto recém-criado. Ele é chamado no momento da instanciação do objeto.' },
                    { id: 'jv_c_9', question: 'Qual a diferença entre `==` e o método `.equals()` para objetos?', answer: '`==` compara se as referências apontam para o mesmo objeto na memória. `.equals()` compara o conteúdo ou estado dos objetos (se sobrescrito).' },
                    { id: 'jv_c_10', question: 'O que é "garbage collection" (coleta de lixo)?', answer: 'É o processo automático do Java de encontrar e liberar a memória usada por objetos que não estão mais sendo referenciados.' },
                ]},
                { id: 'jv_i_1', name: 'Orientação a Objetos', difficulty: 'Intermediário', cards: [
                    { id: 'jv_c_11', question: 'Quais são os 4 pilares da Programação Orientada a Objetos (POO)?', answer: 'Encapsulamento, Herança, Polimorfismo e Abstração.' },
                    { id: 'jv_c_12', question: 'O que é Herança?', answer: 'Um mecanismo onde uma nova classe (subclasse) deriva de uma classe existente (superclasse), herdando seus atributos e métodos.' },
                    { id: 'jv_c_13', question: 'O que é Polimorfismo?', answer: 'A capacidade de um objeto assumir muitas formas. Permite que um objeto de uma subclasse seja tratado como um objeto de sua superclasse.' },
                    { id: 'jv_c_14', question: 'Qual a diferença entre uma classe abstrata e uma interface?', answer: 'Uma classe pode herdar de apenas uma classe abstrata, mas pode implementar múltiplas interfaces. Classes abstratas podem ter métodos com implementação, interfaces (antes do Java 8) só tinham assinaturas.' },
                    { id: 'jv_c_15', question: 'O que é Encapsulamento?', answer: 'O conceito de agrupar dados (atributos) e os métodos que operam nesses dados em uma única unidade (classe), e restringir o acesso direto aos dados usando modificadores de acesso.' },
                    { id: 'jv_c_16', question: 'Quais são os modificadores de acesso em Java?', answer: '`public`, `protected`, `default` (nível de pacote) e `private`.' },
                    { id: 'jv_c_17', question: 'O que é a palavra-chave `super`?', answer: 'É usada para se referir a membros (métodos, construtores, atributos) da superclasse imediata.' },
                    { id: 'jv_c_18', question: 'O que é "method overriding" (sobrescrita)?', answer: 'Quando uma subclasse fornece uma implementação específica para um método que já é fornecido por sua superclasse.' },
                    { id: 'jv_c_19', question: 'O que é "method overloading" (sobrecarga)?', answer: 'Quando duas ou mais funções na mesma classe têm o mesmo nome, mas parâmetros diferentes (número ou tipo).' },
                    { id: 'jv_c_20', question: 'Para que serve o bloco `try-catch-finally`?', answer: '`try` contém o código que pode lançar uma exceção. `catch` captura e trata a exceção. `finally` contém código que é sempre executado, ocorrendo exceção ou não.' },
                ]},
                { id: 'jv_a_1', name: 'Tópicos Avançados e API', difficulty: 'Avançado', cards: [
                    { id: 'jv_c_21', question: 'O que é a "Collections Framework" em Java?', answer: 'Uma arquitetura unificada para representar e manipular coleções, como List, Set e Map.' },
                    { id: 'jv_c_22', question: 'Qual a diferença entre `ArrayList` e `LinkedList`?', answer: '`ArrayList` usa um array dinâmico, oferecendo acesso rápido por índice. `LinkedList` usa uma lista duplamente encadeada, oferecendo inserções e remoções rápidas.' },
                    { id: 'jv_c_23', question: 'O que são "Generics" em Java?', answer: 'Permitem que tipos (classes e interfaces) sejam parâmetros ao definir classes, interfaces e métodos. Fornecem segurança de tipo em tempo de compilação.' },
                    { id: 'jv_c_24', question: 'O que são "Lambda Expressions" (a partir do Java 8)?', answer: 'Uma forma curta de representar uma função anônima (uma instância de uma interface funcional).' },
                    { id: 'jv_c_25', question: 'O que é a "Stream API"?', answer: 'Uma API para processar sequências de elementos de forma funcional. Permite operações como `filter`, `map`, `reduce` em coleções.' },
                    { id: 'jv_c_26', question: 'O que é uma "interface funcional"?', answer: 'Uma interface que contém exatamente um método abstrato. É anotada com `@FunctionalInterface`.' },
                    { id: 'jv_c_27', question: 'Como se cria e inicia uma thread em Java?', answer: 'Estendendo a classe `Thread` ou implementando a interface `Runnable` e passando a instância para um construtor de `Thread`. A thread é iniciada com o método `.start()`.' },
                    { id: 'jv_c_28', question: 'O que a palavra-chave `synchronized` faz?', answer: 'Garante que apenas um thread por vez possa executar um bloco de código ou método, prevenindo condições de corrida.' },
                    { id: 'jv_c_29', question: 'O que é "Reflection API"?', answer: 'Permite que um programa Java examine ou modifique o comportamento de classes, métodos e interfaces em tempo de execução.' },
                    { id: 'jv_c_30', question: 'Qual a diferença entre `HashMap` e `Hashtable`?', answer: '`HashMap` não é sincronizada (não é thread-safe) e permite uma chave nula e múltiplos valores nulos. `Hashtable` é sincronizada e não permite chaves ou valores nulos.' },
                ]}
            ]
        }
    ];
    codeDecks.forEach(lang => lang.decks.forEach(deck => {
        deck.type = 'code';
        deck.cards.forEach(card => {
            card.deckId = deck.id;
            card.repetition = 0;
            card.interval = 0;
            card.easeFactor = EASE_FACTOR_INITIAL;
            card.dueDate = null;
        });
    }));

    const views = document.querySelectorAll('.view-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const deckListContainer = document.getElementById('deck-list');
    const newDeckBtn = document.getElementById('new-deck-btn');
    const exitStudyBtn = document.getElementById('exit-study-btn');
    
    const flashcardContainer = document.getElementById('flashcard-container');
    const flashcard = document.getElementById('flashcard');
    const flashcardFront = document.getElementById('flashcard-front');
    const flashcardBack = document.getElementById('flashcard-back');
    const cardCounter = document.getElementById('card-counter');
    const answerOptions = document.getElementById('answer-options');

    const managerDeckTitle = document.getElementById('manager-deck-title');
    const cardListContainer = document.getElementById('card-list');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
    const managerAddCardBtn = document.getElementById('manager-add-card-btn');

    const codeDecksContainer = document.getElementById('code-decks-list');

    const statsTypeButtons = document.querySelectorAll('.stats-type-btn');

    const newDeckModal = document.getElementById('new-deck-modal');
    const editDeckModal = document.getElementById('edit-deck-modal');
    const editCardModal = document.getElementById('edit-card-modal');
    const newDeckNameInput = document.getElementById('new-deck-name');
    const confirmDeckCreationBtn = document.getElementById('confirm-deck-creation');
    const editDeckNameInput = document.getElementById('edit-deck-name-input');
    const confirmDeckEditBtn = document.getElementById('confirm-deck-edit');
    const editCardQuestionInput = document.getElementById('edit-card-question');
    const editCardAnswerInput = document.getElementById('edit-card-answer');
    const confirmCardEditBtn = document.getElementById('confirm-card-edit');
    
    const forecastChartCtx = document.getElementById('forecast-chart').getContext('2d');
    const cardDistributionChartCtx = document.getElementById('card-distribution-chart').getContext('2d');
    let forecastChart, cardDistributionChart;

    let decks = [];
    let cards = [];
    let codeCardsProgress = [];
    let currentDeckId = null;
    let currentDeckType = 'custom';
    let currentCardId = null; 
    let studyQueue = [];
    let currentCardIndexInQueue = 0;
    let isFlipped = false;

    function saveData() {
        localStorage.setItem('codecards_decks', JSON.stringify(decks));
        localStorage.setItem('codecards_cards', JSON.stringify(cards));
        localStorage.setItem('codecards_code_progress', JSON.stringify(codeCardsProgress));
    }

    function loadData() {
        decks = JSON.parse(localStorage.getItem('codecards_decks') || '[]');
        cards = JSON.parse(localStorage.getItem('codecards_cards') || '[]');
        codeCardsProgress = JSON.parse(localStorage.getItem('codecards_code_progress') || '[]');
    }
    
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
        
        if (currentDeckType === 'custom') {
            const cardToUpdate = cards.find(c => c.id === card.id);
            Object.assign(cardToUpdate, card);
        } else {
            const progress = codeCardsProgress.find(p => p.id === card.id);
            if (progress) {
                Object.assign(progress, card);
            } else {
                codeCardsProgress.push(card);
            }
        }
        saveData();
    }

    function switchView(viewId) {
        views.forEach(view => view.classList.add('hidden'));
        const activeView = document.getElementById(viewId);
        activeView.classList.remove('hidden');
        activeView.style.display = 'flex';

        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewId);
        });

        if (viewId === 'stats-view') renderStatistics('custom');
        if (viewId === 'dashboard-view') renderDecks();
        if (viewId === 'code-decks-view') renderCodeDecks();
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
                <div class="deck-name-container" data-deck-id="${deck.id}" data-deck-type="custom">
                    <i class="fa-solid fa-layer-group"></i><span>${deck.name}</span>
                </div>
                <div class="deck-stats-container">
                    <div class="text-blue-600">${newCount}</div>
                    <div class="text-yellow-600">${learningCount}</div>
                    <div class="text-red-error">${reviewCount}</div>
                </div>
                <div class="deck-options">
                    <button class="btn-icon primary edit-deck-btn" data-deck-id="${deck.id}"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-icon primary delete-deck-btn" data-deck-id="${deck.id}"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn-icon primary manage-deck-btn" data-deck-id="${deck.id}"><i class="fa-solid fa-gear"></i></button>
                </div>
            `;
            deckListContainer.appendChild(deckElement);
        });
    }

    function renderCodeDecks() {
        codeDecksContainer.innerHTML = '';
        codeDecks.forEach(lang => {
            const langSection = document.createElement('div');
            langSection.className = 'language-section';
            langSection.innerHTML = `<h3 class="language-title">${lang.language}</h3>`;
            
            const levels = { 'Iniciante': [], 'Intermediário': [], 'Avançado': [] };
            lang.decks.forEach(deck => levels[deck.difficulty].push(deck));

            Object.keys(levels).forEach(level => {
                if (levels[level].length > 0) {
                    const levelSection = document.createElement('div');
                    levelSection.className = 'level-section';
                    levelSection.innerHTML = `<h4 class="level-title">${level}</h4>`;
                    
                    const deckGrid = document.createElement('div');
                    deckGrid.className = 'code-deck-grid';

                    levels[level].forEach(deck => {
                        const deckCard = document.createElement('div');
                        deckCard.className = 'code-deck-card';
                        deckCard.dataset.deckId = deck.id;
                        deckCard.dataset.deckType = 'code';
                        deckCard.innerHTML = `
                            <div class="code-deck-name">${deck.name}</div>
                            <div class="code-deck-card-count">${deck.cards.length} cartas</div>
                        `;
                        deckGrid.appendChild(deckCard);
                    });
                    levelSection.appendChild(deckGrid);
                    langSection.appendChild(levelSection);
                }
            });
            codeDecksContainer.appendChild(langSection);
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

    function startStudy(deckId, deckType) {
        currentDeckId = deckId;
        currentDeckType = deckType;
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);

        let cardsForDeck;
        if (deckType === 'custom') {
            cardsForDeck = cards.filter(c => c.deckId === deckId);
        } else {
            const lang = codeDecks.find(l => l.decks.some(d => d.id === deckId));
            const deck = lang.decks.find(d => d.id === deckId);
            cardsForDeck = deck.cards.map(originalCard => {
                const progress = codeCardsProgress.find(p => p.id === originalCard.id);
                return progress ? {...progress} : {...originalCard};
            });
        }

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
        if (quality === 3) {
            currentCardIndexInQueue++;
            setTimeout(() => loadCard(currentCardIndexInQueue), 300);
            return;
        }
        const card = studyQueue[currentCardIndexInQueue];
        scheduleCard(card, quality);
        currentCardIndexInQueue++;
        setTimeout(() => loadCard(currentCardIndexInQueue), 300);
    }

    function renderStatistics(type) {
        statsTypeButtons.forEach(b => b.classList.toggle('active', b.dataset.type === type));
        
        const sourceCards = type === 'custom' ? cards : codeCardsProgress;

        const forecastData = { labels: [], data: [] };
        const today = new Date().setHours(0, 0, 0, 0);
        for (let i = 0; i < 7; i++) {
            const date = new Date(today + i * ONE_DAY_IN_MS);
            forecastData.labels.push(date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }));
            const count = sourceCards.filter(c => c.dueDate && new Date(c.dueDate).setHours(0,0,0,0) === date.getTime()).length;
            forecastData.data.push(count);
        }

        if (forecastChart) forecastChart.destroy();
        forecastChart = new Chart(forecastChartCtx, {
            type: 'bar',
            data: { labels: forecastData.labels, datasets: [{ label: 'Cartões para Revisar', data: forecastData.data, backgroundColor: 'rgba(29, 78, 216, 0.7)' }] },
            options: { scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } }
        });

        const newCount = sourceCards.filter(c => !c.dueDate).length;
        const learningCount = sourceCards.filter(c => c.dueDate && c.interval < 21).length;
        const matureCount = sourceCards.filter(c => c.dueDate && c.interval >= 21).length;
        
        if (cardDistributionChart) cardDistributionChart.destroy();
        cardDistributionChart = new Chart(cardDistributionChartCtx, {
            type: 'doughnut',
            data: { labels: ['Novos', 'Aprendendo', 'Maduros'], datasets: [{ data: [newCount, learningCount, matureCount], backgroundColor: ['#3b82f6', '#f59e0b', '#16a34a'] }] }
        });
    }

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

    function openEditDeckModal(deckId) {
        const deck = decks.find(d => d.id === deckId);
        if (!deck) return;
        currentDeckId = deckId;
        editDeckNameInput.value = deck.name;
        showModal(editDeckModal);
    }

    function saveDeckName() {
        const newName = editDeckNameInput.value.trim();
        if (!newName) return alert("O nome não pode ficar em branco.");

        const deck = decks.find(d => d.id === currentDeckId);
        if (deck) {
            deck.name = newName;
            saveData();
            hideModal(editDeckModal);
            renderDecks();
        }
    }

    function deleteDeck(deckId) {
        if (confirm('Tem certeza que deseja excluir este baralho? Todas as suas cartas serão perdidas permanentemente.')) {
            decks = decks.filter(d => d.id !== deckId);
            cards = cards.filter(c => c.deckId !== deckId);
            saveData();
            renderDecks();
        }
    }

    function openCardModalForCreation() {
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

        if (currentCardId) {
            const card = cards.find(c => c.id === currentCardId);
            card.question = question;
            card.answer = answer;
        } else {
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

    navButtons.forEach(btn => btn.addEventListener('click', () => switchView(btn.dataset.view)));
    flashcardContainer.addEventListener('click', flipCard);
    exitStudyBtn.addEventListener('click', () => switchView('dashboard-view'));
    backToDashboardBtn.addEventListener('click', () => switchView('dashboard-view'));
    
    deckListContainer.addEventListener('click', (e) => {
        const studyTarget = e.target.closest('.deck-name-container');
        const manageTarget = e.target.closest('.manage-deck-btn');
        const editTarget = e.target.closest('.edit-deck-btn');
        const deleteTarget = e.target.closest('.delete-deck-btn');

        if (studyTarget) startStudy(parseInt(studyTarget.dataset.deckId), studyTarget.dataset.deckType);
        if (manageTarget) renderCardManager(parseInt(manageTarget.dataset.deckId));
        if (editTarget) openEditDeckModal(parseInt(editTarget.dataset.deckId));
        if (deleteTarget) deleteDeck(parseInt(deleteTarget.dataset.deckId));
    });

    codeDecksContainer.addEventListener('click', (e) => {
        const studyTarget = e.target.closest('.code-deck-card');
        if (studyTarget) startStudy(studyTarget.dataset.deckId, studyTarget.dataset.deckType);
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

    statsTypeButtons.forEach(btn => btn.addEventListener('click', () => renderStatistics(btn.dataset.type)));

    newDeckBtn.addEventListener('click', () => showModal(newDeckModal));
    confirmDeckCreationBtn.addEventListener('click', createNewDeck);
    confirmDeckEditBtn.addEventListener('click', saveDeckName);
    managerAddCardBtn.addEventListener('click', openCardModalForCreation);
    confirmCardEditBtn.addEventListener('click', saveCard);

    document.body.addEventListener('click', (e) => {
        if (e.target.dataset.action === 'close-modal') {
            hideModal(e.target.closest('.modal-overlay'));
        }
    });

    loadData();
    switchView('dashboard-view');
});
