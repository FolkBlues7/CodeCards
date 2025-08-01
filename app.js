document.addEventListener('DOMContentLoaded', () => {
    const ONE_MINUTE_IN_MS = 60 * 1000;
    const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

    const codeDecks = [
        {
            language: 'Java',
            category: 'Back-end',
            decks: [
                { id: 'jv_b_1', name: 'Fundamentos e Sintaxe', difficulty: 'Iniciante', cards: [
                    { id: 'jv_c_1', question: 'Qual a diferença entre JDK, JRE e JVM?', answer: 'JVM executa o bytecode. JRE contém a JVM e bibliotecas. JDK contém a JRE e ferramentas de desenvolvimento.' },
                    { id: 'jv_c_2', question: 'O que é o método `public static void main(String[] args)`?', answer: 'É o ponto de entrada de qualquer aplicação Java standalone.' },
                    { id: 'jv_c_3', question: 'Quais são os 8 tipos de dados primitivos em Java?', answer: 'byte, short, int, long, float, double, char, boolean.' },
                    { id: 'jv_c_4', question: 'Qual a diferença entre tipos primitivos e tipos de referência?', answer: 'Primitivos armazenam o valor diretamente. Tipos de referência (objetos) armazenam um endereço para o objeto.' },
                    { id: 'jv_c_5', question: 'Como se declara e instancia um objeto em Java?', answer: '`NomeDaClasse nomeDoObjeto = new NomeDaClasse();`' },
                    { id: 'jv_c_6', question: 'A classe `String` é um tipo primitivo?', answer: 'Não, `String` é uma classe (tipo de referência) imutável.' },
                    { id: 'jv_c_7', question: 'Para que serve a palavra-chave `final`?', answer: 'Para variáveis, impede a reatribuição. Para métodos, impede a sobrescrita. Para classes, impede a herança.' },
                    { id: 'jv_c_8', question: 'O que é um construtor?', answer: 'Um método especial para inicializar um objeto recém-criado.' },
                    { id: 'jv_c_9', question: 'Qual a diferença entre `==` e o método `.equals()` para objetos?', answer: '`==` compara referências de memória. `.equals()` compara o conteúdo dos objetos.' },
                    { id: 'jv_c_10', question: 'O que é "garbage collection"?', answer: 'O processo automático do Java de liberar memória de objetos que não são mais referenciados.' },
                ]},
                { id: 'jv_i_1', name: 'Orientação a Objetos', difficulty: 'Intermediário', cards: [
                    { id: 'jv_c_11', question: 'Quais são os 4 pilares da POO?', answer: 'Encapsulamento, Herança, Polimorfismo e Abstração.' },
                    { id: 'jv_c_12', question: 'O que é Herança?', answer: 'Um mecanismo onde uma subclasse herda atributos e métodos de uma superclasse.' },
                    { id: 'jv_c_13', question: 'O que é Polimorfismo?', answer: 'A capacidade de um objeto assumir muitas formas, tratando objetos de subclasses como se fossem da superclasse.' },
                    { id: 'jv_c_14', question: 'Diferença entre classe abstrata e interface?', answer: 'Uma classe herda de uma classe abstrata, mas implementa múltiplas interfaces. Classes abstratas podem ter métodos implementados.' },
                    { id: 'jv_c_15', question: 'O que é Encapsulamento?', answer: 'Agrupar dados e métodos em uma classe, restringindo o acesso direto aos dados.' },
                    { id: 'jv_c_16', question: 'Quais são os modificadores de acesso em Java?', answer: '`public`, `protected`, `default` (nível de pacote) e `private`.' },
                    { id: 'jv_c_17', question: 'O que é a palavra-chave `super`?', answer: 'É usada para se referir a membros da superclasse imediata.' },
                    { id: 'jv_c_18', question: 'O que é "method overriding" (sobrescrita)?', answer: 'Quando uma subclasse fornece uma implementação específica para um método da superclasse.' },
                    { id: 'jv_c_19', question: 'O que é "method overloading" (sobrecarga)?', answer: 'Quando duas ou mais funções na mesma classe têm o mesmo nome, mas parâmetros diferentes.' },
                    { id: 'jv_c_20', question: 'Para que serve o bloco `try-catch-finally`?', answer: '`try` contém código arriscado, `catch` trata exceções, e `finally` executa sempre, com ou sem exceção.' },
                ]},
                { id: 'jv_a_1', name: 'Tópicos Avançados e API', difficulty: 'Avançado', cards: [
                    { id: 'jv_c_21', question: 'O que é a "Collections Framework"?', answer: 'Uma arquitetura unificada para representar e manipular coleções (List, Set, Map).' },
                    { id: 'jv_c_22', question: 'Diferença entre `ArrayList` e `LinkedList`?', answer: '`ArrayList` usa um array dinâmico (acesso rápido por índice). `LinkedList` usa uma lista duplamente encadeada (inserções/remoções rápidas).' },
                    { id: 'jv_c_23', question: 'O que são "Generics"?', answer: 'Permitem que tipos sejam parâmetros, fornecendo segurança de tipo em tempo de compilação.' },
                    { id: 'jv_c_24', question: 'O que são "Lambda Expressions"?', answer: 'Uma forma curta de representar uma função anônima (instância de uma interface funcional).' },
                    { id: 'jv_c_25', question: 'O que é a "Stream API"?', answer: 'Uma API para processar sequências de elementos de forma funcional (`filter`, `map`, `reduce`).' },
                    { id: 'jv_c_26', question: 'O que é uma "interface funcional"?', answer: 'Uma interface que contém exatamente um método abstrato, anotada com `@FunctionalInterface`.' },
                    { id: 'jv_c_27', question: 'Como se cria e inicia uma thread em Java?', answer: 'Estendendo `Thread` ou implementando `Runnable`, e chamando o método `.start()`.' },
                    { id: 'jv_c_28', question: 'O que a palavra-chave `synchronized` faz?', answer: 'Garante que apenas um thread por vez possa executar um bloco de código, prevenindo condições de corrida.' },
                    { id: 'jv_c_29', question: 'O que é "Reflection API"?', answer: 'Permite que um programa examine ou modifique o comportamento de classes e métodos em tempo de execução.' },
                    { id: 'jv_c_30', question: 'Diferença entre `HashMap` e `Hashtable`?', answer: '`HashMap` não é thread-safe e permite chaves/valores nulos. `Hashtable` é thread-safe e não permite.' },
                ]}
            ],
            frameworks: [
                {
                    name: 'Spring',
                    decks: [
                        { id: 'sp_b_1', name: 'Core e Injeção de Dependência', difficulty: 'Iniciante', cards: [
                            { id: 'sp_c_1', question: 'O que é o Spring Framework?', answer: 'Um framework de aplicação para Java que fornece suporte de infraestrutura abrangente para o desenvolvimento de aplicações Java.' },
                            { id: 'sp_c_2', question: 'O que é Injeção de Dependência (DI)?', answer: 'Um padrão de projeto onde um objeto recebe suas dependências de uma fonte externa em vez de criá-las internamente.' },
                            { id: 'sp_c_3', question: 'O que é um "Bean" no Spring?', answer: 'Um objeto que é instanciado, montado e gerenciado por um contêiner Spring (IoC container).' },
                            { id: 'sp_c_4', question: 'Qual a anotação para marcar uma classe como um componente Spring?', answer: '`@Component`, ou especializações como `@Service`, `@Repository`, `@Controller`.' },
                            { id: 'sp_c_5', question: 'Para que serve a anotação `@Autowired`?', answer: 'Para injetar beans automaticamente. O Spring procura por um bean do tipo correspondente e o injeta.' },
                            { id: 'sp_c_6', question: 'O que é o "ApplicationContext"?', answer: 'A interface central do contêiner Spring, responsável por gerenciar o ciclo de vida dos beans.' },
                            { id: 'sp_c_7', question: 'Qual a diferença entre injeção por construtor e por setter?', answer: 'Injeção por construtor garante que as dependências obrigatórias sejam fornecidas na criação do objeto. Injeção por setter é para dependências opcionais.' },
                            { id: 'sp_c_8', question: 'O que é um "Qualifier"?', answer: 'A anotação `@Qualifier` é usada junto com `@Autowired` para evitar ambiguidade quando existem múltiplos beans do mesmo tipo.' },
                            { id: 'sp_c_9', question: 'O que significa "escopo de bean"?', answer: 'Define o ciclo de vida e a visibilidade de um bean. Padrões são `singleton` e `prototype`.' },
                            { id: 'sp_c_10', question: 'Qual o escopo padrão de um bean no Spring?', answer: '`singleton` (uma única instância do bean é criada por contêiner).' },
                        ]},
                        { id: 'sp_i_1', name: 'Spring Boot e Web', difficulty: 'Intermediário', cards: [
                            { id: 'sp_c_11', question: 'O que é o Spring Boot?', answer: 'Um projeto que facilita a criação de aplicações Spring autônomas e prontas para produção com configuração mínima.' },
                            { id: 'sp_c_12', question: 'Qual a principal anotação de uma aplicação Spring Boot?', answer: '`@SpringBootApplication`.' },
                            { id: 'sp_c_13', question: 'O que é um "starter" no Spring Boot?', answer: 'Um conjunto de descritores de dependência convenientes que você pode incluir em sua aplicação. Ex: `spring-boot-starter-web`.' },
                            { id: 'sp_c_14', question: 'Para que serve a anotação `@RestController`?', answer: 'Uma conveniência que combina `@Controller` e `@ResponseBody`, indicando que os métodos retornam dados que serão escritos diretamente no corpo da resposta.' },
                            { id: 'sp_c_15', question: 'Como se mapeia uma requisição HTTP GET para um método?', answer: 'Usando a anotação `@GetMapping("/caminho")`.' },
                            { id: 'sp_c_16', question: 'O que a anotação `@RequestParam` faz?', answer: 'Vincula um parâmetro de requisição da URL a um parâmetro do método no controller.' },
                            { id: 'sp_c_17', question: 'O que a anotação `@PathVariable` faz?', answer: 'Vincula uma variável de caminho da URL (ex: `/users/{id}`) a um parâmetro do método.' },
                            { id: 'sp_c_18', question: 'O que é o Spring MVC?', answer: 'Um framework web baseado no padrão Model-View-Controller que fornece uma arquitetura para construir aplicações web flexíveis.' },
                            { id: 'sp_c_19', question: 'Qual o propósito do arquivo `application.properties` (ou `.yml`)?', answer: 'Para configurar a aplicação Spring Boot, como porta do servidor, configurações de banco de dados, etc.' },
                            { id: 'sp_c_20', question: 'O que é o Thymeleaf?', answer: 'Um motor de templates Java moderno do lado do servidor para ambientes web e autônomos, que se integra bem com o Spring.' },
                        ]},
                        { id: 'sp_a_1', name: 'Data, Security e AOP', difficulty: 'Avançado', cards: [
                            { id: 'sp_c_21', question: 'O que é o Spring Data JPA?', answer: 'Um projeto que facilita a implementação de repositórios baseados em JPA, reduzindo significativamente o código boilerplate.' },
                            { id: 'sp_c_22', question: 'Qual a interface principal do Spring Data JPA?', answer: '`JpaRepository`, que fornece métodos CRUD e de paginação/ordenação.' },
                            { id: 'sp_c_23', question: 'O que é AOP (Aspect-Oriented Programming)?', answer: 'Programação Orientada a Aspectos. Permite modularizar preocupações transversais (cross-cutting concerns) como logging, segurança e transações.' },
                            { id: 'sp_c_24', question: 'O que é um "Aspect" no Spring AOP?', answer: 'Uma classe que implementa uma preocupação transversal. É anotada com `@Aspect`.' },
                            { id: 'sp_c_25', question: 'O que é um "Join Point"?', answer: 'Um ponto durante a execução de um programa, como a execução de um método. No Spring AOP, um join point é sempre a execução de um método.' },
                            { id: 'sp_c_26', question: 'O que é um "Advice"?', answer: 'A ação tomada por um aspecto em um determinado join point. Tipos incluem `@Before`, `@After`, `@Around`.' },
                            { id: 'sp_c_27', question: 'O que é o Spring Security?', answer: 'Um framework poderoso e altamente customizável que fornece autenticação e controle de acesso (autorização) para aplicações Java.' },
                            { id: 'sp_c_28', question: 'O que é a anotação `@Transactional`?', answer: 'Define o escopo de uma única transação de banco de dados. O Spring gerencia o início, commit e rollback da transação.' },
                            { id: 'sp_c_29', question: 'O que é o H2 Database?', answer: 'Um banco de dados em memória, escrito em Java, frequentemente usado para desenvolvimento e testes com Spring Boot.' },
                            { id: 'sp_c_30', question: 'O que são "profiles" no Spring?', answer: 'Uma forma de segregar partes da configuração da sua aplicação e torná-las disponíveis apenas em determinados ambientes (ex: `dev`, `test`, `prod`).' },
                        ]}
                    ]
                }
            ]
        },
        {
            language: 'Python',
            category: 'Back-end',
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
            ],
            frameworks: [
                {
                    name: 'Django',
                    decks: [
                        { id: 'dj_b_1', name: 'Projetos, Apps e Models', difficulty: 'Iniciante', cards: [
                            { id: 'dj_c_1', question: 'O que é Django?', answer: 'Um framework web Python de alto nível que incentiva o desenvolvimento rápido e o design limpo e pragmático.' },
                            { id: 'dj_c_2', question: 'Qual o comando para iniciar um novo projeto Django?', answer: '`django-admin startproject nome_do_projeto`' },
                            { id: 'dj_c_3', question: 'O que é um "app" em Django?', answer: 'Um módulo autocontido que lida com uma funcionalidade específica da aplicação (ex: um blog, uma enquete).' },
                            { id: 'dj_c_4', question: 'Qual o comando para criar um novo app?', answer: '`python manage.py startapp nome_do_app`' },
                            { id: 'dj_c_5', question: 'O que é um "Model"?', answer: 'A fonte única e definitiva de informação sobre seus dados. Contém os campos e comportamentos essenciais dos dados que você está armazenando.' },
                            { id: 'dj_c_6', question: 'O que é o ORM do Django?', answer: 'Object-Relational Mapper. Permite interagir com o banco de dados usando código Python em vez de SQL.' },
                            { id: 'dj_c_7', question: 'O que os comandos `makemigrations` e `migrate` fazem?', answer: '`makemigrations` cria arquivos de migração baseados nas mudanças dos models. `migrate` aplica essas migrações ao banco de dados.' },
                            { id: 'dj_c_8', question: 'O que é o Django Admin?', answer: 'Uma interface administrativa pronta para uso, gerada automaticamente a partir dos seus models.' },
                            { id: 'dj_c_9', question: 'Como se registra um model no Django Admin?', answer: 'Em `admin.py`, importe o model e use `admin.site.register(MeuModel)`.' },
                            { id: 'dj_c_10', question: 'O que é uma "View"?', answer: 'Uma função ou classe que recebe uma requisição web e retorna uma resposta web.' },
                        ]},
                        { id: 'dj_i_1', name: 'Views, Templates e Forms', difficulty: 'Intermediário', cards: [
                            { id: 'dj_c_11', question: 'Qual a diferença entre "Function-Based Views" e "Class-Based Views"?', answer: 'FBVs são simples funções Python. CBVs permitem estruturar as views e reutilizar código usando herança.' },
                            { id: 'dj_c_12', question: 'O que é o "Django Template Language" (DTL)?', answer: 'A linguagem de marcação usada para embutir lógica e variáveis nos templates HTML.' },
                            { id: 'dj_c_13', question: 'Como se passa dados (contexto) de uma view para um template?', answer: 'Retornando `render(request, "template.html", {"chave": valor})`.' },
                            { id: 'dj_c_14', question: 'O que são "template tags"?', answer: 'Tags que fornecem lógica na renderização de templates. Ex: `{% if %}`, `{% for %}`.' },
                            { id: 'dj_c_15', question: 'O que são "template filters"?', answer: 'Modificam a exibição de variáveis no template. Ex: `{{ variavel|upper }}`.' },
                            { id: 'dj_c_16', question: 'O que é o arquivo `urls.py`?', answer: 'Define o roteamento de URLs para as views correspondentes.' },
                            { id: 'dj_c_17', question: 'O que é um "Form" em Django?', answer: 'Uma classe que representa um formulário HTML, lida com a validação de dados e renderiza os campos.' },
                            { id: 'dj_c_18', question: 'O que é um `ModelForm`?', answer: 'Uma classe auxiliar que permite criar um Form a partir de uma classe Model do Django, sem precisar redefinir os campos.' },
                            { id: 'dj_c_19', question: 'O que é o CSRF (Cross-Site Request Forgery) e como o Django protege contra ele?', answer: 'Um tipo de ataque. Django protege usando um token secreto (`{% csrf_token %}`) em formulários POST.' },
                            { id: 'dj_c_20', question: 'O que é o QuerySet API?', answer: 'A API que permite criar, filtrar, ordenar e deletar objetos do banco de dados de forma encadeada. Ex: `Model.objects.filter(..).order_by(..)`.' },
                        ]},
                        { id: 'dj_a_1', name: 'Tópicos Avançados', difficulty: 'Avançado', cards: [
                            { id: 'dj_c_21', question: 'O que é o Django REST Framework (DRF)?', answer: 'Uma biblioteca poderosa e flexível para construir Web APIs em Django.' },
                            { id: 'dj_c_22', question: 'O que é um "Serializer" no DRF?', answer: 'Converte tipos de dados complexos, como querysets e instâncias de models, em tipos nativos do Python que podem ser facilmente renderizados em JSON, XML ou outros tipos de conteúdo.' },
                            { id: 'dj_c_23', question: 'O que são "Signals" em Django?', answer: 'Permitem que certas aplicações recebam notificações quando ações ocorrem em outras partes do framework (ex: antes ou depois de um model ser salvo).' },
                            { id: 'dj_c_24', question: 'O que é "Middleware"?', answer: 'Um framework de hooks no processamento de requisições/respostas do Django. É um sistema de baixo nível para alterar globalmente a entrada e saída do Django.' },
                            { id: 'dj_c_25', question: 'Para que serve o sistema de cache do Django?', answer: 'Para salvar o resultado de operações caras para que não precisem ser recalculadas a cada requisição, melhorando a performance.' },
                            { id: 'dj_c_26', question: 'O que são "managers" de models customizados?', answer: 'Permitem adicionar métodos extras a um `Model.objects` ou modificar o queryset inicial que ele retorna.' },
                            { id: 'dj_c_27', question: 'O que é "lazy evaluation" em QuerySets?', answer: 'A criação de um QuerySet não envolve nenhuma atividade de banco de dados. A consulta só é executada quando o QuerySet é avaliado (ex: iterando sobre ele).' },
                            { id: 'dj_c_28', question: 'Para que serve o método `.select_related()`?', answer: 'Para otimizar consultas, seguindo relacionamentos de chave estrangeira e selecionando dados de objetos relacionados em uma única consulta SQL, evitando múltiplas queries.' },
                            { id: 'dj_c_29', question: 'Para que serve o método `.prefetch_related()`?', answer: 'Similar ao `select_related`, mas funciona para relacionamentos muitos-para-muitos e muitos-para-um, fazendo uma consulta separada para cada relacionamento e juntando os dados em Python.' },
                            { id: 'dj_c_30', question: 'O que são "Generic Class-Based Views"?', answer: 'Classes de view pré-construídas que lidam com padrões comuns, como exibir uma lista de objetos ou uma página de detalhes, reduzindo o código boilerplate.' },
                        ]}
                    ]
                }
            ]
        },
        {
            language: 'C++',
            category: 'Back-end',
            decks: [
                { id: 'cpp_b_1', name: 'Fundamentos do C++', difficulty: 'Iniciante', cards: [
                    { id: 'cpp_c_1', question: 'Qual a principal diferença entre C e C++?', answer: 'C++ suporta programação orientada a objetos (classes, herança, etc.), enquanto C é puramente procedural.' },
                    { id: 'cpp_c_2', question: 'O que é a `iostream`?', answer: 'A biblioteca padrão de C++ para operações de entrada e saída (Input/Output Stream), como `cin` e `cout`.' },
                    { id: 'cpp_c_3', question: 'Qual a diferença entre `cout` e `printf`?', answer: '`cout` é um objeto de stream type-safe de C++. `printf` é uma função de C que usa strings de formatação e não é type-safe.' },
                    { id: 'cpp_c_4', question: 'O que é um "namespace"?', answer: 'Um escopo declarativo que fornece uma maneira de agrupar nomes relacionados e evitar colisões de nomes. Ex: `std`.' },
                    { id: 'cpp_c_5', question: 'Como se declara uma referência em C++?', answer: 'Usando o operador `&` na declaração. Ex: `int &ref = variavel;`. Uma referência é um alias para uma variável existente.' },
                    { id: 'cpp_c_6', question: 'O que é uma classe?', answer: 'Um modelo para criar objetos. Agrupa dados (atributos) e funções (métodos) em uma única unidade.' },
                    { id: 'cpp_c_7', question: 'Qual a diferença entre `struct` e `class` em C++?', answer: 'A única diferença é a visibilidade padrão: os membros de uma `struct` são `public` por padrão, enquanto os de uma `class` são `private`.' },
                    { id: 'cpp_c_8', question: 'O que a palavra-chave `new` faz?', answer: 'Aloca memória para um objeto no "heap" e retorna um ponteiro para essa memória.' },
                    { id: 'cpp_c_9', question: 'O que a palavra-chave `delete` faz?', answer: 'Libera a memória alocada com `new`, chamando o destrutor do objeto.' },
                    { id: 'cpp_c_10', question: 'O que é o `string` da STL?', answer: 'A classe `std::string` é a forma padrão de C++ para manipular sequências de caracteres, mais segura e flexível que os arrays de char de C.' },
                ]},
                { id: 'cpp_i_1', name: 'Orientação a Objetos e STL', difficulty: 'Intermediário', cards: [
                    { id: 'cpp_c_11', question: 'O que é um construtor de cópia (copy constructor)?', answer: 'Um construtor que cria um objeto inicializando-o com outro objeto do mesmo tipo, que foi passado como argumento.' },
                    { id: 'cpp_c_12', question: 'O que é um destrutor?', answer: 'Um método de classe especial que é chamado automaticamente quando um objeto sai do escopo ou é explicitamente deletado.' },
                    { id: 'cpp_c_13', question: 'O que é a "Regra dos Três" (Rule of Three)?', answer: 'Uma regra de ouro que diz que se uma classe precisa de um destrutor, um construtor de cópia ou um operador de atribuição de cópia, ela provavelmente precisa dos três.' },
                    { id: 'cpp_c_14', question: 'O que é herança múltipla?', answer: 'A capacidade de uma classe derivar de mais de uma classe base, herdando os membros de todas elas.' },
                    { id: 'cpp_c_15', question: 'O que é uma função virtual?', answer: 'Uma função membro que você espera que seja redefinida em classes derivadas. Permite o polimorfismo em tempo de execução.' },
                    { id: 'cpp_c_16', question: 'O que é uma classe abstrata em C++?', answer: 'Uma classe que tem pelo menos uma função virtual pura (declarada com `= 0;`). Não pode ser instanciada diretamente.' },
                    { id: 'cpp_c_17', question: 'O que é a STL (Standard Template Library)?', answer: 'Uma biblioteca de software que faz parte da Biblioteca Padrão do C++, fornecendo contêineres, algoritmos e iteradores.' },
                    { id: 'cpp_c_18', question: 'O que é um `std::vector`?', answer: 'Um contêiner da STL que implementa um array de tamanho dinâmico.' },
                    { id: 'cpp_c_19', question: 'O que é um `std::map`?', answer: 'Um contêiner associativo da STL que armazena elementos formados por uma combinação de uma chave e um valor mapeado, ordenados pela chave.' },
                    { id: 'cpp_c_20', question: 'O que são "templates" em C++?', answer: 'Um recurso que permite que funções e classes operem com tipos genéricos, permitindo escrever código que funciona para múltiplos tipos sem ser reescrito.' },
                ]},
                { id: 'cpp_a_1', name: 'Tópicos Avançados do C++ Moderno', difficulty: 'Avançado', cards: [
                    { id: 'cpp_c_21', question: 'O que são "smart pointers" (ponteiros inteligentes)?', answer: 'Objetos que agem como ponteiros, mas fornecem gerenciamento de memória automático. Ex: `std::unique_ptr`, `std::shared_ptr`.' },
                    { id: 'cpp_c_22', question: 'Qual a diferença entre `std::unique_ptr` e `std::shared_ptr`?', answer: '`unique_ptr` possui posse exclusiva do objeto. `shared_ptr` permite múltiplos ponteiros compartilharem a posse, usando contagem de referência.' },
                    { id: 'cpp_c_23', question: 'O que é "RAII" (Resource Acquisition Is Initialization)?', answer: 'Um princípio de design que vincula o ciclo de vida de um recurso (memória, arquivo, etc.) ao ciclo de vida de um objeto. O recurso é adquirido no construtor e liberado no destrutor.' },
                    { id: 'cpp_c_24', question: 'O que são "rvalue references" (`&&`)?', answer: 'Referências que podem se ligar a objetos temporários (rvalues). São a base para a semântica de movimento (move semantics).' },
                    { id: 'cpp_c_25', question: 'O que é "move semantics"?', answer: 'Permite que os recursos de um objeto sejam "movidos" para outro em vez de copiados, evitando alocações de memória caras. Usa construtores e operadores de atribuição de movimento.' },
                    { id: 'cpp_c_26', question: 'O que são expressões lambda em C++11?', answer: 'Uma forma concisa de criar funções anônimas (closures) diretamente no local onde são usadas.' },
                    { id: 'cpp_c_27', question: 'O que a palavra-chave `auto` faz?', answer: 'Deduz o tipo de uma variável a partir do seu inicializador, simplificando declarações.' },
                    { id: 'cpp_c_28', question: 'O que são "variadic templates"?', answer: 'Templates que podem receber um número variável de argumentos de template.' },
                    { id: 'cpp_c_29', question: 'O que é SFINAE (Substitution Failure Is Not An Error)?', answer: 'Um princípio que se aplica durante a sobrecarga de templates de função. Se a substituição de um tipo de template falhar, o compilador tenta outra sobrecarga em vez de gerar um erro.' },
                    { id: 'cpp_c_30', question: 'O que é a "Rule of Zero"?', answer: 'Uma regra de ouro que diz que uma classe que não gerencia recursos diretamente (usa smart pointers, contêineres da STL) não precisa declarar nenhum dos cinco membros especiais (destrutor, construtores/atribuições de cópia/movimento).' },
                ]}
            ],
            frameworks: [
                {
                    name: 'Qt',
                    decks: [
                        { id: 'qt_b_1', name: 'Fundamentos do Qt', difficulty: 'Iniciante', cards: [
                            { id: 'qt_c_1', question: 'O que é o Qt?', answer: 'Um framework de desenvolvimento de aplicações multiplataforma, amplamente usado para criar interfaces gráficas (GUI), mas também para aplicações de console.' },
                            { id: 'qt_c_2', question: 'O que é um "sinal" e um "slot"?', answer: 'O mecanismo principal de comunicação entre objetos no Qt. Um sinal é emitido quando um evento ocorre, e um slot é uma função que é chamada em resposta a um sinal.' },
                            { id: 'qt_c_3', question: 'Qual a classe base para a maioria dos objetos Qt?', answer: '`QObject`.' },
                            { id: 'qt_c_4', question: 'O que é um "widget"?', answer: 'Um elemento de interface do usuário, como um botão (`QPushButton`), uma caixa de texto (`QLineEdit`) ou uma janela (`QMainWindow`).' },
                            { id: 'qt_c_5', question: 'O que é um "layout manager"?', answer: 'Uma classe que gerencia o tamanho e a posição dos widgets dentro de uma janela, garantindo que eles se ajustem corretamente quando a janela é redimensionada. Ex: `QVBoxLayout`, `QHBoxLayout`.' },
                            { id: 'qt_c_6', question: 'Para que serve o `QApplication`?', answer: 'Gerencia o loop de eventos principal da aplicação e os recursos de toda a aplicação.' },
                            { id: 'qt_c_7', question: 'O que é o MOC (Meta-Object Compiler)?', answer: 'Uma ferramenta que pré-processa os arquivos de cabeçalho do Qt para implementar recursos como sinais e slots, que não são nativos do C++.' },
                            { id: 'qt_c_8', question: 'Como se conecta um sinal a um slot?', answer: 'Usando a função `QObject::connect(sender, &Sender::signal, receiver, &Receiver::slot);`.' },
                            { id: 'qt_c_9', question: 'Qual a classe para criar a janela principal de uma aplicação?', answer: '`QMainWindow`.' },
                            { id: 'qt_c_10', question: 'O que é um arquivo `.pro`?', answer: 'Um arquivo de projeto usado pelo `qmake`, a ferramenta de build do Qt, para definir os arquivos fonte, bibliotecas e outras configurações do projeto.' },
                        ]},
                        { id: 'qt_i_1', name: 'Widgets e Eventos', difficulty: 'Intermediário', cards: [
                            { id: 'qt_c_11', question: 'O que é o sistema de eventos do Qt?', answer: 'O mecanismo pelo qual os objetos são notificados de eventos, como cliques do mouse, pressionamentos de tecla e timers. Os eventos são representados por objetos da classe `QEvent`.' },
                            { id: 'qt_c_12', question: 'O que é um "event filter"?', answer: 'Um objeto que recebe todos os eventos enviados para outro objeto, permitindo interceptá-los e processá-los antes do objeto de destino.' },
                            { id: 'qt_c_13', question: 'Qual a diferença entre `QWidget` e `QDialog`?', answer: '`QWidget` é a classe base para todos os widgets. `QDialog` é uma janela especializada para diálogos, que pode ser modal ou não modal.' },
                            { id: 'qt_c_14', question: 'O que é o "Model/View Framework"?', answer: 'Uma arquitetura para separar os dados (Model) da sua apresentação ao usuário (View), com um delegado (Delegate) opcional para customizar a edição e renderização.' },
                            { id: 'qt_c_15', question: 'Para que serve a classe `QPainter`?', answer: 'Para realizar desenhos 2D de baixo nível em widgets e outros dispositivos de pintura, como imagens.' },
                            { id: 'qt_c_16', question: 'O que é o "Qt Resource System"?', answer: 'Um mecanismo para incorporar recursos como imagens e arquivos de tradução diretamente no executável da aplicação.' },
                            { id: 'qt_c_17', question: 'Como se estiliza um widget usando uma sintaxe similar ao CSS?', answer: 'Usando "Qt Style Sheets", através da propriedade `styleSheet` de um widget.' },
                            { id: 'qt_c_18', question: 'O que a classe `QTimer` faz?', answer: 'Fornece timers de disparo único ou repetitivos, emitindo um sinal `timeout()` em intervalos especificados.' },
                            { id: 'qt_c_19', question: 'O que é o `Qt Designer`?', answer: 'Uma ferramenta gráfica para projetar e construir interfaces de usuário com widgets Qt. O resultado é salvo em um arquivo `.ui`.' },
                            { id: 'qt_c_20', question: 'O que a classe `QSettings` permite fazer?', answer: 'Fornece uma maneira persistente de armazenar as configurações da aplicação, como o tamanho da janela ou opções do usuário, de forma multiplataforma.' },
                        ]},
                        { id: 'qt_a_1', name: 'Tópicos Avançados e QML', difficulty: 'Avançado', cards: [
                            { id: 'qt_c_21', question: 'O que é QML (Qt Modeling Language)?', answer: 'Uma linguagem declarativa, similar a JSON e CSS, para projetar interfaces de usuário. É parte do framework Qt Quick.' },
                            { id: 'qt_c_22', question: 'Qual a principal vantagem do QML sobre o sistema de Widgets?', answer: 'É ideal para criar UIs fluidas e animadas, especialmente para dispositivos móveis e embarcados, separando a lógica da UI (QML) da lógica de negócio (C++).' },
                            { id: 'qt_c_23', question: 'O que é o "Qt Concurrent"?', answer: 'Um módulo que fornece classes de alto nível para escrever aplicações multithreaded sem usar primitivas de baixo nível como mutexes. Ex: `QtConcurrent::run`.' },
                            { id: 'qt_c_24', question: 'Para que serve o módulo `Qt Network`?', answer: 'Fornece classes para programação de rede, como `QTcpSocket` para TCP e `QNetworkAccessManager` para requisições HTTP.' },
                            { id: 'qt_c_25', question: 'O que é o sistema de "plugins" do Qt?', answer: 'Permite estender a funcionalidade do Qt ou das aplicações Qt dinamicamente, carregando bibliotecas em tempo de execução.' },
                            { id: 'qt_c_26', question: 'Como o Qt lida com internacionalização (tradução)?', answer: 'Usando as funções `tr()` para marcar strings traduzíveis e as ferramentas `lupdate` e `linguist` para gerar e editar arquivos de tradução (`.ts`).' },
                            { id: 'qt_c_27', question: 'O que é "Qt Quick Controls"?', answer: 'Um conjunto de controles de UI reutilizáveis (botões, sliders, etc.) para criar interfaces com QML que podem ter um estilo nativo ou customizado.' },
                            { id: 'qt_c_28', question: 'O que é o "Graphics View Framework"?', answer: 'Uma API baseada em itens para gerenciar e interagir com um grande número de itens gráficos 2D customizados em uma cena (`QGraphicsScene`).' },
                            { id: 'qt_c_29', question: 'Como se expõe uma classe C++ para o QML?', answer: 'Registrando o tipo C++ com o motor QML usando `qmlRegisterType` e tornando suas propriedades e métodos acessíveis com o sistema de meta-objetos do Qt.' },
                            { id: 'qt_c_30', question: 'O que é o "Qt Creator"?', answer: 'O IDE (Ambiente de Desenvolvimento Integrado) oficial do Qt, que inclui um editor de código, o Qt Designer, ferramentas de depuração e integração com o sistema de build.' },
                        ]}
                    ]
                }
            ]
        },
        {
            language: 'HTML',
            category: 'Front-end',
            decks: [
                { id: 'html_b_1', name: 'Tags e Estrutura Básica', difficulty: 'Iniciante', cards: [
                    { id: 'html_c_1', question: 'O que significa HTML?', answer: 'HyperText Markup Language (Linguagem de Marcação de Hipertexto).' },
                    { id: 'html_c_2', question: 'Qual a estrutura básica de um documento HTML5?', answer: '`<!DOCTYPE html>`, `<html>`, `<head>` (com `<meta charset="UTF-8">` e `<title>`), e `<body>`.' },
                    { id: 'html_c_3', question: 'Para que serve a tag `<h1>`?', answer: 'Para definir o cabeçalho de nível mais importante. As tags vão de `<h1>` a `<h6>`.' },
                    { id: 'html_c_4', question: 'Qual tag é usada para criar um parágrafo?', answer: 'A tag `<p>`.' },
                    { id: 'html_c_5', question: 'Como se cria um link (âncora) para outra página?', answer: 'Usando a tag `<a>` com o atributo `href`. Ex: `<a href="https://google.com">Google</a>`.' },
                    { id: 'html_c_6', question: 'Qual tag é usada para inserir uma imagem?', answer: 'A tag `<img>`, com os atributos `src` (fonte) e `alt` (texto alternativo).' },
                    { id: 'html_c_7', question: 'Para que servem as tags `<ul>` e `<ol>`?', answer: '`<ul>` cria uma lista não ordenada (com marcadores). `<ol>` cria uma lista ordenada (com números).' },
                    { id: 'html_c_8', question: 'Qual tag é usada para os itens de uma lista (`<ul>` ou `<ol>`)?', answer: 'A tag `<li>` (list item).' },
                    { id: 'html_c_9', question: 'Qual a diferença entre as tags `<div>` e `<span>`?', answer: '`<div>` é um container de bloco (ocupa a largura inteira). `<span>` é um container em linha (ocupa apenas o espaço do seu conteúdo).' },
                    { id: 'html_c_10', question: 'Como se adiciona um comentário em HTML?', answer: '`<!-- Seu comentário aqui -->`' },
                ]},
                { id: 'html_i_1', name: 'Formulários e Multimídia', difficulty: 'Intermediário', cards: [
                    { id: 'html_c_11', question: 'Qual tag é usada para criar um formulário?', answer: 'A tag `<form>`.' },
                    { id: 'html_c_12', question: 'Qual o atributo da tag `<form>` que define para onde os dados serão enviados?', answer: 'O atributo `action`.' },
                    { id: 'html_c_13', question: 'Qual o atributo da tag `<form>` que define o método HTTP (ex: GET ou POST)?', answer: 'O atributo `method`.' },
                    { id: 'html_c_14', question: 'Qual tag cria um campo de entrada de dados em um formulário?', answer: 'A tag `<input>`.' },
                    { id: 'html_c_15', question: 'Qual o propósito do atributo `type` na tag `<input>`?', answer: 'Define o tipo de campo de entrada (ex: `text`, `password`, `checkbox`, `submit`).' },
                    { id: 'html_c_16', question: 'Para que serve a tag `<label>`?', answer: 'Para fornecer um rótulo para um elemento de formulário, melhorando a acessibilidade.' },
                    { id: 'html_c_17', question: 'Como se cria uma caixa de seleção (dropdown)?', answer: 'Usando a tag `<select>` com tags `<option>` aninhadas.' },
                    { id: 'html_c_18', question: 'Qual tag é usada para incorporar um vídeo?', answer: 'A tag `<video>`.' },
                    { id: 'html_c_19', question: 'Qual tag é usada para incorporar áudio?', answer: 'A tag `<audio>`.' },
                    { id: 'html_c_20', question: 'O que são tabelas em HTML e qual a tag principal?', answer: 'São usadas para exibir dados tabulares. A tag principal é `<table>`, com `<tr>` (linha), `<th>` (cabeçalho) e `<td>` (célula de dados).' },
                ]},
                { id: 'html_a_1', name: 'HTML5 Semântico e APIs', difficulty: 'Avançado', cards: [
                    { id: 'html_c_21', question: 'O que é HTML Semântico?', answer: 'O uso de tags HTML que transmitem significado sobre o conteúdo, tanto para o navegador quanto para o desenvolvedor (ex: `<header>`, `<article>`).' },
                    { id: 'html_c_22', question: 'Cite 3 exemplos de tags semânticas do HTML5.', answer: '`<article>`, `<section>`, `<nav>`, `<header>`, `<footer>`, `<aside>`.' },
                    { id: 'html_c_23', question: 'Para que serve a tag `<canvas>`?', answer: 'É usada para desenhar gráficos, em tempo real, via scripting (geralmente JavaScript).' },
                    { id: 'html_c_24', question: 'O que são os atributos `data-*`?', answer: 'Permitem armazenar informações extras e personalizadas em elementos HTML padrão, que podem ser acessadas via JavaScript.' },
                    { id: 'html_c_25', question: 'Para que serve o atributo `async` em uma tag `<script>`?', answer: 'Faz com que o script seja baixado em paralelo com a análise do HTML e executado assim que o download terminar, sem bloquear a renderização.' },
                    { id: 'html_c_26', question: 'Para que serve o atributo `defer` em uma tag `<script>`?', answer: 'Faz com que o script seja baixado em paralelo, mas só é executado depois que a análise do HTML estiver completa.' },
                    { id: 'html_c_27', question: 'O que é a API de Geolocalização?', answer: 'Uma API do HTML5 que permite obter a localização geográfica do usuário, com sua permissão.' },
                    { id: 'html_c_28', question: 'O que é a API de Web Storage?', answer: 'Uma API que fornece mecanismos para armazenar dados no navegador de forma mais segura e com maior capacidade que os cookies (`localStorage` e `sessionStorage`).' },
                    { id: 'html_c_29', question: 'Para que serve a tag `<figure>`?', answer: 'Para agrupar conteúdo de mídia (como uma imagem, diagrama ou código) com uma legenda (`<figcaption>`).' },
                    { id: 'html_c_30', question: 'O que são Microdados (Microdata)?', answer: 'Uma especificação do WHATWG para aninhar metadados dentro do conteúdo existente em páginas da web, ajudando os mecanismos de busca a entender melhor o conteúdo.' },
                ]}
            ],
            frameworks: []
        },
        {
            language: 'CSS',
            category: 'Front-end',
            decks: [
                { id: 'css_b_1', name: 'Seletores e Propriedades Básicas', difficulty: 'Iniciante', cards: [
                    { id: 'css_c_1', question: 'O que significa CSS?', answer: 'Cascading Style Sheets (Folhas de Estilo em Cascata).' },
                    { id: 'css_c_2', question: 'Qual a sintaxe de uma regra CSS?', answer: '`seletor { propriedade: valor; }`' },
                    { id: 'css_c_3', question: 'Como se seleciona um elemento por sua classe?', answer: 'Usando um ponto antes do nome da classe. Ex: `.minha-classe`' },
                    { id: 'css_c_4', question: 'Como se seleciona um elemento por seu ID?', answer: 'Usando o caractere `#` antes do nome do ID. Ex: `#meu-id`' },
                    { id: 'css_c_5', question: 'Qual a diferença entre `margin` e `padding`?', answer: '`margin` é o espaçamento fora da borda de um elemento. `padding` é o espaçamento interno, entre o conteúdo e a borda.' },
                    { id: 'css_c_6', question: 'Qual propriedade é usada para alterar a cor do texto?', answer: '`color`.' },
                    { id: 'css_c_7', question: 'Qual propriedade é usada para alterar a cor de fundo?', answer: '`background-color`.' },
                    { id: 'css_c_8', question: 'O que a propriedade `font-size` controla?', answer: 'O tamanho da fonte do texto.' },
                    { id: 'css_c_9', question: 'Como se comenta em um arquivo CSS?', answer: '`/* Seu comentário aqui */`' },
                    { id: 'css_c_10', question: 'Quais são as três maneiras de inserir CSS em uma página?', answer: 'Inline (atributo `style`), Interno (tag `<style>` no `<head>`) e Externo (link para um arquivo `.css`).' },
                ]},
                { id: 'css_i_1', name: 'Box Model e Layout', difficulty: 'Intermediário', cards: [
                    { id: 'css_c_11', question: 'O que é o "Box Model" em CSS?', answer: 'É um modelo que descreve como os elementos são renderizados como caixas retangulares, consistindo de conteúdo, padding, borda e margem.' },
                    { id: 'css_c_12', question: 'O que a propriedade `box-sizing: border-box;` faz?', answer: 'Faz com que a largura e a altura de um elemento incluam o padding e a borda, em vez de adicioná-los ao total.' },
                    { id: 'css_c_13', question: 'O que é "Flexbox"?', answer: 'Um modelo de layout unidimensional que oferece uma maneira mais eficiente de alinhar e distribuir espaço entre itens em um contêiner.' },
                    { id: 'css_c_14', question: 'Qual a diferença entre `justify-content` e `align-items` no Flexbox?', answer: '`justify-content` alinha os itens ao longo do eixo principal. `align-items` alinha os itens ao longo do eixo transversal.' },
                    { id: 'css_c_15', question: 'O que é "CSS Grid Layout"?', answer: 'Um sistema de layout bidimensional, permitindo organizar o conteúdo em linhas e colunas.' },
                    { id: 'css_c_16', question: 'Qual a diferença entre Flexbox e Grid?', answer: 'Flexbox é ideal para layout em uma dimensão (uma linha ou uma coluna). Grid é ideal para layout em duas dimensões (linhas e colunas).' },
                    { id: 'css_c_17', question: 'O que são "Media Queries"?', answer: 'Uma técnica usada para aplicar diferentes estilos com base nas características do dispositivo, como largura da tela, permitindo o design responsivo.' },
                    { id: 'css_c_18', question: 'O que a propriedade `position: relative;` faz?', answer: 'Posiciona o elemento em relação à sua posição normal. Permite o uso de `top`, `right`, `bottom`, `left` e serve como referência para elementos filhos com `position: absolute`.' },
                    { id: 'css_c_19', question: 'O que a propriedade `position: absolute;` faz?', answer: 'Posiciona o elemento em relação ao seu ancestral posicionado mais próximo (não `static`). Se não houver, usa o corpo do documento.' },
                    { id: 'css_c_20', question: 'O que são pseudo-classes?', answer: 'Uma palavra-chave adicionada a um seletor que especifica um estado especial do elemento selecionado. Ex: `:hover`, `:first-child`.' },
                ]},
                { id: 'css_a_1', name: 'Tópicos Avançados e Pré-processadores', difficulty: 'Avançado', cards: [
                    { id: 'css_c_21', question: 'O que são pseudo-elementos?', answer: 'Uma palavra-chave adicionada a um seletor que permite estilizar uma parte específica do elemento selecionado. Ex: `::before`, `::after`.' },
                    { id: 'css_c_22', question: 'O que são Variáveis CSS (Custom Properties)?', answer: 'Entidades definidas por autores de CSS que contêm valores específicos para serem reutilizados em um documento. Ex: `var(--minha-cor)`.' },
                    { id: 'css_c_23', question: 'O que a propriedade `transform` permite fazer?', answer: 'Modificar o espaço de coordenadas do modelo de formatação CSS, permitindo rotacionar, escalar, mover ou inclinar elementos.' },
                    { id: 'css_c_24', question: 'Para que serve a propriedade `transition`?', answer: 'Permite controlar a velocidade da animação ao alterar propriedades CSS, criando uma mudança suave entre estados.' },
                    { id: 'css_c_25', question: 'O que são "Keyframes" em CSS?', answer: 'Usados com a propriedade `animation`, permitem definir os estágios e estilos de uma sequência de animação CSS.' },
                    { id: 'css_c_26', question: 'O que é a especificidade do CSS?', answer: 'O algoritmo usado pelos navegadores para determinar qual declaração de propriedade CSS é a mais relevante e deve ser aplicada a um elemento. IDs têm maior especificidade que classes.' },
                    { id: 'css_c_27', question: 'O que é um pré-processador CSS, como Sass ou Less?', answer: 'Uma ferramenta que permite usar recursos que não existem no CSS, como variáveis, aninhamento, mixins e funções, e depois compila esse código para CSS normal.' },
                    { id: 'css_c_28', question: 'O que é um "mixin" em Sass?', answer: 'Um bloco de código que permite agrupar declarações CSS para serem reutilizadas em todo o site.' },
                    { id: 'css_c_29', question: 'O que é a metodologia BEM?', answer: 'Block, Element, Modifier. Uma convenção de nomenclatura para classes em HTML e CSS, projetada para ajudar a escrever componentes de UI reutilizáveis e compartilháveis.' },
                    { id: 'css_c_30', question: 'O que a regra `@supports` faz?', answer: 'Permite verificar se o navegador suporta um par específico de `propriedade: valor` CSS e aplicar estilos condicionalmente.' },
                ]}
            ],
            frameworks: [
                {
                    name: 'Bootstrap',
                    decks: [
                        { id: 'bs_b_1', name: 'Sistema de Grid e Utilitários', difficulty: 'Iniciante', cards: [
                            { id: 'bs_c_1', question: 'O que é Bootstrap?', answer: 'Um framework front-end de código aberto para desenvolver com HTML, CSS e JS, focado em design responsivo e mobile-first.' },
                            { id: 'bs_c_2', question: 'Qual é a base do sistema de layout do Bootstrap?', answer: 'Um sistema de grid de 12 colunas, flexível e responsivo.' },
                            { id: 'bs_c_3', question: 'Qual classe é usada para criar um contêiner de largura fixa?', answer: '`.container`' },
                            { id: 'bs_c_4', question: 'Qual classe é usada para criar um contêiner de largura total?', answer: '`.container-fluid`' },
                            { id: 'bs_c_5', question: 'Como se define uma linha no sistema de grid?', answer: 'Usando a classe `.row`.' },
                            { id: 'bs_c_6', question: 'Como se define uma coluna que ocupa 6 das 12 colunas em telas médias?', answer: 'Usando a classe `.col-md-6`.' },
                            { id: 'bs_c_7', question: 'O que os prefixos `sm`, `md`, `lg`, `xl` representam nas classes de coluna?', answer: 'Os breakpoints responsivos: small, medium, large, extra large.' },
                            { id: 'bs_c_8', question: 'Como se cria um botão azul primário?', answer: '`<button class="btn btn-primary">Botão</button>`' },
                            { id: 'bs_c_9', question: 'O que são as classes de utilitário de espaçamento (ex: `m-3`, `p-2`)?', answer: 'Classes para adicionar `margin` ou `padding` rapidamente a um elemento.' },
                            { id: 'bs_c_10', question: 'Como se centraliza um texto usando uma classe de utilitário?', answer: 'Usando a classe `.text-center`.' },
                        ]},
                        { id: 'bs_i_1', name: 'Componentes', difficulty: 'Intermediário', cards: [
                            { id: 'bs_c_11', question: 'O que é um "Card" no Bootstrap?', answer: 'Um contêiner de conteúdo flexível e extensível, que pode incluir cabeçalho, rodapé, imagens e texto.' },
                            { id: 'bs_c_12', question: 'Como se cria uma barra de navegação (Navbar)?', answer: 'Usando a tag `<nav>` com as classes `.navbar`, `.navbar-expand-lg`, etc.' },
                            { id: 'bs_c_13', question: 'O que é um "Modal"?', answer: 'Uma janela de diálogo pop-up que é exibida sobre o conteúdo da página.' },
                            { id: 'bs_c_14', question: 'Como se cria um "Carousel"?', answer: 'Usando uma estrutura de `div`s com as classes `.carousel`, `.carousel-inner` e `.carousel-item`.' },
                            { id: 'bs_c_15', question: 'O que é um "Accordion"?', answer: 'Um componente que permite exibir e ocultar seções de conteúdo de forma sanfonada.' },
                            { id: 'bs_c_16', question: 'Para que servem os "Alerts"?', answer: 'Para fornecer mensagens de feedback contextuais para ações típicas do usuário (ex: sucesso, erro, aviso).' },
                            { id: 'bs_c_17', question: 'O que são "Badges"?', answer: 'Pequenos componentes de contagem e rotulagem, úteis para destacar itens ou notificações.' },
                            { id: 'bs_c_18', question: 'Como se cria um grupo de botões?', answer: 'Envolvendo uma série de botões em um `div` com a classe `.btn-group`.' },
                            { id: 'bs_c_19', question: 'O que são "Breadcrumbs"?', answer: 'Um esquema de navegação secundário que indica a localização do usuário em um site ou aplicativo.' },
                            { id: 'bs_c_20', question: 'Como se cria um formulário com estilo Bootstrap?', answer: 'Usando as classes `.form-group`, `.form-control` e `.form-label` para estruturar e estilizar os elementos do formulário.' },
                        ]},
                        { id: 'bs_a_1', name: 'Customização e JavaScript', difficulty: 'Avançado', cards: [
                            { id: 'bs_c_21', question: 'Como se customiza as cores padrão do Bootstrap?', answer: 'Usando Sass para sobrescrever as variáveis de cor padrão (ex: `$primary`) e recompilando o CSS.' },
                            { id: 'bs_c_22', question: 'O que é o arquivo `_variables.scss`?', answer: 'É o arquivo Sass do Bootstrap que contém todas as variáveis padrão que podem ser sobrescritas para customização.' },
                            { id: 'bs_c_23', question: 'Quais são as dependências JavaScript do Bootstrap?', answer: 'Popper.js (para tooltips e popovers) e o próprio JavaScript do Bootstrap.' },
                            { id: 'bs_c_24', question: 'Como se inicializa um componente JavaScript do Bootstrap, como um tooltip?', answer: 'Selecionando o elemento e chamando o método correspondente. Ex: `new bootstrap.Tooltip(element)`.' },
                            { id: 'bs_c_25', question: 'O que são os "Data Attributes" do Bootstrap?', answer: 'Atributos HTML (como `data-bs-toggle`) que permitem usar a funcionalidade JavaScript do Bootstrap sem escrever uma linha de JavaScript.' },
                            { id: 'bs_c_26', question: 'Como se cria um tema escuro (dark mode) no Bootstrap 5?', answer: 'Adicionando o atributo `data-bs-theme="dark"` ao elemento `<html>` ou a um contêiner específico.' },
                            { id: 'bs_c_27', question: 'O que a classe `.d-flex` faz?', answer: 'Aplica `display: flex` a um elemento, transformando-o em um contêiner flexbox.' },
                            { id: 'bs_c_28', question: 'Como se oculta um elemento em telas pequenas (`sm`) e o exibe em telas médias (`md`) e maiores?', answer: 'Usando as classes `.d-none .d-md-block`.' },
                            { id: 'bs_c_29', question: 'O que é o utilitário "gutters" (classes `g-*`)?', answer: 'Controla o espaçamento entre as colunas no sistema de grid.' },
                            { id: 'bs_c_30', question: 'É possível usar os componentes JavaScript do Bootstrap sem jQuery?', answer: 'Sim, a partir do Bootstrap 5, o jQuery não é mais uma dependência.' },
                        ]}
                    ]
                }
            ]
        },
        {
            language: 'JavaScript',
            category: 'Front-end',
            decks: [
                { id: 'js_b_1_fe', name: 'DOM e Eventos', difficulty: 'Iniciante', cards: [
                    { id: 'fe_js_1', question: 'O que é o DOM?', answer: 'Document Object Model. É uma interface de programação para documentos HTML que representa a página para que os programas possam alterar a estrutura, estilo e conteúdo do documento.' },
                    { id: 'fe_js_2', question: 'Como se seleciona um elemento HTML pelo seu ID?', answer: '`document.getElementById("meuId");`' },
                    { id: 'fe_js_3', question: 'Como se adiciona um "event listener" a um botão?', answer: '`botao.addEventListener("click", minhaFuncao);`' },
                    { id: 'fe_js_4', question: 'O que o objeto `event` representa em um event listener?', answer: 'Contém informações sobre o evento que ocorreu, como o elemento alvo (`event.target`), as teclas pressionadas, etc.' },
                    { id: 'fe_js_5', question: 'Qual a diferença entre `innerHTML` e `textContent`?', answer: '`innerHTML` interpreta o conteúdo como HTML, podendo criar novos elementos. `textContent` trata todo o conteúdo como texto puro.' },
                    { id: 'fe_js_6', question: 'Como se altera o estilo CSS de um elemento com JavaScript?', answer: '`elemento.style.propriedade = "valor";` (ex: `elemento.style.color = "red";`)' },
                    { id: 'fe_js_7', question: 'O que `querySelector` faz?', answer: 'Retorna o primeiro elemento dentro do documento que corresponde ao seletor CSS especificado.' },
                    { id: 'fe_js_8', question: 'O que `querySelectorAll` faz?', answer: 'Retorna uma `NodeList` estática representando uma lista de elementos do documento que correspondem ao grupo de seletores especificado.' },
                    { id: 'fe_js_9', question: 'Como se cria um novo elemento HTML (ex: um `<div>`) com JavaScript?', answer: '`document.createElement("div");`' },
                    { id: 'fe_js_10', question: 'Como se adiciona um elemento criado a outro elemento na página?', answer: 'Usando `elementoPai.appendChild(elementoFilho);`.' },
                ]},
                { id: 'js_i_1_fe', name: 'Assincronismo e APIs Web', difficulty: 'Intermediário', cards: [
                    { id: 'fe_js_11', question: 'O que é AJAX?', answer: 'Asynchronous JavaScript and XML. É uma técnica para acessar servidores web a partir de uma página da web de forma assíncrona.' },
                    { id: 'fe_js_12', question: 'Para que serve a API `fetch`?', answer: 'Para fazer requisições de rede (como GET, POST) a um servidor. Ela é baseada em Promises.' },
                    { id: 'fe_js_13', question: 'O que é JSON?', answer: 'JavaScript Object Notation. Um formato leve de troca de dados, fácil para humanos lerem e para máquinas analisarem.' },
                    { id: 'fe_js_14', question: 'Como se converte um objeto JavaScript para uma string JSON?', answer: '`JSON.stringify(meuObjeto);`' },
                    { id: 'fe_js_15', question: 'Como se converte uma string JSON para um objeto JavaScript?', answer: '`JSON.parse(minhaStringJSON);`' },
                    { id: 'fe_js_16', question: 'O que é o `localStorage`?', answer: 'Uma API de armazenamento do navegador que permite salvar pares chave-valor de forma persistente, sem data de expiração.' },
                    { id: 'fe_js_17', question: 'Qual a diferença entre `localStorage` e `sessionStorage`?', answer: '`localStorage` persiste mesmo após o navegador ser fechado. `sessionStorage` é limpo quando a sessão da página termina (a aba é fechada).' },
                    { id: 'fe_js_18', question: 'O que é "event bubbling" (borbulhamento de eventos)?', answer: 'Quando um evento ocorre em um elemento, ele primeiro executa os manipuladores nesse elemento, depois nos seus pais, e assim por diante, subindo na árvore do DOM.' },
                    { id: 'fe_js_19', question: 'Como se previne o comportamento padrão de um evento (ex: enviar um formulário)?', answer: 'Chamando `event.preventDefault();` dentro do event listener.' },
                    { id: 'fe_js_20', question: 'O que é uma API RESTful?', answer: 'Um estilo de arquitetura para projetar aplicações em rede, baseado em um conjunto de princípios que usam os métodos HTTP (GET, POST, PUT, DELETE) para operações CRUD.' },
                ]},
                { id: 'js_a_1_fe', name: 'Tópicos Avançados de Front-end', difficulty: 'Avançado', cards: [
                    { id: 'fe_js_21', question: 'O que são Web Components?', answer: 'Um conjunto de tecnologias da web que permitem criar elementos HTML personalizados, reutilizáveis e encapsulados.' },
                    { id: 'fe_js_22', question: 'Quais são as três principais tecnologias dos Web Components?', answer: 'Custom Elements, Shadow DOM e HTML Templates.' },
                    { id: 'fe_js_23', question: 'O que é o Shadow DOM?', answer: 'Uma forma de encapsular o DOM e o CSS de um componente, mantendo-os separados do DOM principal do documento.' },
                    { id: 'fe_js_24', question: 'O que é um Service Worker?', answer: 'Um script que o navegador executa em segundo plano, separado de uma página da web, permitindo recursos como notificações push e funcionalidades offline.' },
                    { id: 'fe_js_25', question: 'Para que serve o "Intersection Observer API"?', answer: 'Fornece uma maneira de observar de forma assíncrona as mudanças na interseção de um elemento alvo com um elemento ancestral ou com o viewport.' },
                    { id: 'fe_js_26', question: 'O que é "Tree Shaking"?', answer: 'Um termo para a eliminação de código morto (dead-code elimination). É um passo comum em bundlers de módulos JavaScript como Webpack ou Rollup.' },
                    { id: 'fe_js_27', question: 'O que é o Virtual DOM?', answer: 'Uma representação do DOM em memória. Frameworks como React usam-no para reconciliar as mudanças de estado e atualizar o DOM real de forma eficiente.' },
                    { id: 'fe_js_28', question: 'O que é "lazy loading" de imagens?', answer: 'Uma técnica para adiar o carregamento de imagens que não estão na janela de visualização inicial até que o usuário role a página até elas.' },
                    { id: 'fe_js_29', question: 'O que é o "Critical Rendering Path"?', answer: 'A sequência de passos que o navegador executa para converter o HTML, CSS e JavaScript em pixels na tela. Otimizá-lo é crucial para a performance.' },
                    { id: 'fe_js_30', question: 'O que é o CORS (Cross-Origin Resource Sharing)?', answer: 'Um mecanismo que usa cabeçalhos HTTP adicionais para permitir que um agente de usuário obtenha permissão para acessar recursos selecionados de um servidor em uma origem diferente.' },
                ]}
            ],
            frameworks: [
                {
                    name: 'React',
                    decks: [
                        { id: 're_b_1', name: 'Fundamentos do React', difficulty: 'Iniciante', cards: [
                            { id: 're_c_1', question: 'O que é React?', answer: 'Uma biblioteca JavaScript para construir interfaces de usuário, focada em componentes.' },
                            { id: 're_c_2', question: 'O que é JSX?', answer: 'Uma extensão de sintaxe para JavaScript que se parece com HTML. É usada para descrever como a UI deve se parecer.' },
                            { id: 're_c_3', question: 'O que é um "componente" em React?', answer: 'Uma peça de UI independente e reutilizável. Pode ser uma função ou uma classe.' },
                            { id: 're_c_4', question: 'O que são "props"?', answer: 'Abreviação de propriedades. São entradas somente leitura para componentes, usadas para passar dados de um componente pai para um filho.' },
                            { id: 're_c_5', question: 'O que é "state" (estado)?', answer: 'Um objeto que representa as partes de um componente que podem mudar ao longo do tempo. É gerenciado dentro do componente.' },
                            { id: 're_c_6', question: 'Qual a diferença entre state e props?', answer: 'Props são passadas para o componente (como parâmetros de função), enquanto o state é gerenciado dentro do componente (como variáveis declaradas em uma função).' },
                            { id: 're_c_7', question: 'O que o método `render()` faz em um componente de classe?', answer: 'Retorna os elementos React (geralmente via JSX) que devem ser renderizados na tela.' },
                            { id: 're_c_8', question: 'Como se lida com eventos em React (ex: `onClick`)?', answer: 'De forma similar ao HTML, mas com nomes em camelCase (ex: `onClick`) e passando uma função como manipulador de evento.' },
                            { id: 're_c_9', question: 'O que é "renderização condicional"?', answer: 'A prática de renderizar diferentes elementos ou componentes com base em certas condições (ex: usando `if` ou o operador ternário).' },
                            { id: 're_c_10', question: 'Por que as "keys" são importantes ao renderizar listas?', answer: 'Ajudam o React a identificar quais itens foram alterados, adicionados ou removidos, otimizando a atualização da UI.' },
                        ]},
                        { id: 're_i_1', name: 'Hooks e Ciclo de Vida', difficulty: 'Intermediário', cards: [
                            { id: 're_c_11', question: 'O que são "Hooks"?', answer: 'Funções que permitem "enganchar" no estado e ciclo de vida do React a partir de componentes de função.' },
                            { id: 're_c_12', question: 'Qual a função do Hook `useState`?', answer: 'Adiciona estado a um componente de função. Retorna o valor do estado atual e uma função para atualizá-lo.' },
                            { id: 're_c_13', question: 'Para que serve o Hook `useEffect`?', answer: 'Permite executar efeitos colaterais (side effects) em componentes de função, como buscar dados, manipular o DOM ou definir subscriptions.' },
                            { id: 're_c_14', question: 'O que é o array de dependências no `useEffect`?', answer: 'Controla quando o efeito é executado. Se vazio `[]`, executa apenas uma vez. Se tiver variáveis, executa quando elas mudam.' },
                            { id: 're_c_15', question: 'O que é o "Context API"?', answer: 'Uma forma de passar dados através da árvore de componentes sem ter que passar props manualmente em todos os níveis.' },
                            { id: 're_c_16', question: 'Para que serve o Hook `useContext`?', answer: 'Para consumir um valor de um Contexto React, evitando o uso de um `Context.Consumer`.' },
                            { id: 're_c_17', question: 'O que é um "Hook customizado"?', answer: 'Uma função JavaScript cujo nome começa com "use" e que pode chamar outros Hooks. É uma forma de reutilizar lógica de estado.' },
                            { id: 're_c_18', question: 'Qual a diferença entre um componente controlado e não controlado?', answer: 'Em um componente controlado, os dados do formulário são tratados pelo estado do React. Em um não controlado, os dados são tratados pelo próprio DOM.' },
                            { id: 're_c_19', question: 'O que é "lifting state up" (elevar o estado)?', answer: 'A prática de mover o estado para o ancestral comum mais próximo quando múltiplos componentes precisam compartilhar e refletir os mesmos dados.' },
                            { id: 're_c_20', question: 'Para que servem `React.memo` e `PureComponent`?', answer: 'Para otimizar a performance, evitando que um componente seja re-renderizado se suas props não mudaram.' },
                        ]},
                        { id: 're_a_1', name: 'Gerenciamento de Estado e Tópicos Avançados', difficulty: 'Avançado', cards: [
                            { id: 're_c_21', question: 'O que é Redux?', answer: 'Uma biblioteca de gerenciamento de estado previsível para aplicações JavaScript. Ajuda a gerenciar o estado global da aplicação de forma consistente.' },
                            { id: 're_c_22', question: 'Quais são os três princípios do Redux?', answer: 'Única fonte de verdade (single source of truth), estado é somente leitura (state is read-only), e as mudanças são feitas com funções puras (reducers).' },
                            { id: 're_c_23', question: 'O que é um "reducer" no Redux?', answer: 'Uma função pura que recebe o estado anterior e uma ação, e retorna o próximo estado.' },
                            { id: 're_c_24', question: 'O que é uma "action" no Redux?', answer: 'Um objeto simples que representa uma intenção de mudar o estado. Deve ter uma propriedade `type`.' },
                            { id: 're_c_25', question: 'Para que serve o Hook `useReducer`?', answer: 'Uma alternativa ao `useState` para lógicas de estado mais complexas que envolvem múltiplos sub-valores ou dependem do estado anterior.' },
                            { id: 're_c_26', question: 'Para que serve o Hook `useCallback`?', answer: 'Retorna uma versão "memoizada" da função de callback que só muda se uma das dependências mudar. Útil para otimizar componentes filhos.' },
                            { id: 're_c_27', question: 'Para que serve o Hook `useMemo`?', answer: 'Retorna um valor "memoizado". Ele só recalcula o valor quando uma de suas dependências muda. Útil para otimizar cálculos caros.' },
                            { id: 're_c_28', question: 'O que são "Higher-Order Components" (HOC)?', answer: 'Uma técnica avançada em React para reutilizar a lógica de componentes. Um HOC é uma função que recebe um componente e retorna um novo componente.' },
                            { id: 're_c_29', question: 'O que são "Portals" em React?', answer: 'Fornecem uma maneira de renderizar filhos em um nó do DOM que existe fora da hierarquia do DOM do componente pai. Útil para modais e tooltips.' },
                            { id: 're_c_30', question: 'O que é "Code Splitting"?', answer: 'Uma técnica suportada por bundlers como o Webpack que permite criar múltiplos "bundles" que podem ser carregados dinamicamente em tempo de execução. Melhora o tempo de carregamento inicial.' },
                        ]}
                    ]
                }
            ]
        }
    ];
    codeDecks.forEach(lang => {
        lang.decks.forEach(deck => {
            deck.type = 'code';
            deck.cards.forEach(card => {
                card.deckId = deck.id;
                card.dueDate = null;
                card.interval = 0;
            });
        });
        lang.frameworks.forEach(fw => {
            fw.decks.forEach(deck => {
                deck.type = 'code';
                deck.cards.forEach(card => {
                    card.deckId = deck.id;
                    card.dueDate = null;
                    card.interval = 0;
                });
            });
        });
    });

    const views = document.querySelectorAll('.view-container');
    const navButtons = document.querySelectorAll('.nav-button');
    const deckListContainer = document.getElementById('deck-list');
    const searchInput = document.getElementById('deck-search-input');
    const newDeckBtn = document.getElementById('new-deck-btn');
    const importDeckBtn = document.getElementById('import-deck-btn');
    const importFileInput = document.getElementById('import-file-input');
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
    
    function scheduleCard(card, rating) {
        const now = Date.now();
        let nextDueDate;

        switch (rating) {
            case 1: nextDueDate = now + ONE_MINUTE_IN_MS; break;
            case 2: nextDueDate = now + 3 * ONE_MINUTE_IN_MS; break;
            case 3: nextDueDate = now + 30 * ONE_MINUTE_IN_MS; break;
            case 4: nextDueDate = now + ONE_DAY_IN_MS; break;
        }
        card.dueDate = nextDueDate;
        
        if (currentDeckType === 'custom') {
            const cardToUpdate = cards.find(c => c.id === card.id);
            if(cardToUpdate) Object.assign(cardToUpdate, { dueDate: card.dueDate });
        } else {
            const progress = codeCardsProgress.find(p => p.id === card.id);
            if (progress) {
                Object.assign(progress, { dueDate: card.dueDate });
            } else {
                codeCardsProgress.push({ id: card.id, dueDate: card.dueDate });
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
        if (viewId === 'code-decks-view') renderCodeDecks('Back-end');
    }

    function renderDecks(filter = '') {
        deckListContainer.innerHTML = '';
        const todayTimestamp = new Date().setHours(0, 0, 0, 0);
        const filteredDecks = decks.filter(deck => deck.name.toLowerCase().includes(filter.toLowerCase()));

        filteredDecks.forEach(deck => {
            const deckCards = cards.filter(c => c.deckId === deck.id);
            const newCount = deckCards.filter(c => !c.dueDate).length;
            const learningCount = deckCards.filter(c => c.dueDate && c.dueDate > Date.now() && c.dueDate < Date.now() + ONE_DAY_IN_MS).length;
            const reviewCount = deckCards.filter(c => c.dueDate && c.dueDate <= Date.now()).length;

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
                    <button class="btn-icon primary export-deck-btn" data-deck-id="${deck.id}" title="Exportar Baralho"><i class="fa-solid fa-download"></i></button>
                    <button class="btn-icon primary edit-deck-btn" data-deck-id="${deck.id}" title="Editar Nome"><i class="fa-solid fa-pencil"></i></button>
                    <button class="btn-icon primary delete-deck-btn" data-deck-id="${deck.id}" title="Excluir Baralho"><i class="fa-solid fa-trash"></i></button>
                    <button class="btn-icon primary manage-deck-btn" data-deck-id="${deck.id}" title="Gerenciar Cartas"><i class="fa-solid fa-gear"></i></button>
                </div>
            `;
            deckListContainer.appendChild(deckElement);
        });
    }

    function renderCodeDecks(category) {
        codeDecksContainer.innerHTML = '';
        const categoryTabs = document.querySelector('.code-category-tabs');
        categoryTabs.querySelectorAll('button').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });

        const filteredLanguages = codeDecks.filter(lang => lang.category === category);

        filteredLanguages.forEach(lang => {
            const langSection = document.createElement('div');
            langSection.className = 'language-section';
            
            let subTabsHTML = `<div class="sub-tabs" data-lang="${lang.language}"><button class="sub-tab-btn active" data-content-id="${lang.language}-base">${lang.language}</button>`;
            lang.frameworks.forEach(fw => {
                subTabsHTML += `<button class="sub-tab-btn" data-content-id="${lang.language}-${fw.name}">${fw.name}</button>`;
            });
            subTabsHTML += `</div>`;

            let contentHTML = `<div class="language-content">`;
            
            contentHTML += `<div class="sub-tab-content active" id="${lang.language}-base">`;
            const levels = { 'Iniciante': [], 'Intermediário': [], 'Avançado': [] };
            lang.decks.forEach(deck => levels[deck.difficulty].push(deck));
            Object.keys(levels).forEach(level => {
                if (levels[level].length > 0) {
                    contentHTML += `<h4 class="level-title">${level}</h4><div class="code-deck-grid">`;
                    levels[level].forEach(deck => {
                        contentHTML += `
                            <div class="code-deck-card" data-deck-id="${deck.id}" data-deck-type="code">
                                <div class="code-deck-name">${deck.name}</div>
                                <div class="code-deck-card-count">${deck.cards.length} cartas</div>
                            </div>`;
                    });
                    contentHTML += `</div>`;
                }
            });
            contentHTML += `</div>`;

            lang.frameworks.forEach(fw => {
                contentHTML += `<div class="sub-tab-content" id="${lang.language}-${fw.name}">`;
                const fwLevels = { 'Iniciante': [], 'Intermediário': [], 'Avançado': [] };
                fw.decks.forEach(deck => fwLevels[deck.difficulty].push(deck));
                Object.keys(fwLevels).forEach(level => {
                    if (fwLevels[level].length > 0) {
                        contentHTML += `<h4 class="level-title">${level}</h4><div class="code-deck-grid">`;
                        fwLevels[level].forEach(deck => {
                            contentHTML += `
                                <div class="code-deck-card" data-deck-id="${deck.id}" data-deck-type="code">
                                    <div class="code-deck-name">${deck.name}</div>
                                    <div class="code-deck-card-count">${deck.cards.length} cartas</div>
                                </div>`;
                        });
                        contentHTML += `</div>`;
                    }
                });
                contentHTML += `</div>`;
            });

            contentHTML += `</div>`;
            langSection.innerHTML = `<h3 class="language-title">${lang.language}</h3>${subTabsHTML}${contentHTML}`;
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
        const now = Date.now();

        let cardsForDeck;
        if (deckType === 'custom') {
            cardsForDeck = cards.filter(c => c.deckId === deckId);
        } else {
            let deck;
            for(const lang of codeDecks) {
                let foundDeck = lang.decks.find(d => d.id === deckId);
                if(foundDeck) {
                    deck = foundDeck;
                    break;
                }
                for(const fw of lang.frameworks) {
                    foundDeck = fw.decks.find(d => d.id === deckId);
                    if(foundDeck) {
                        deck = foundDeck;
                        break;
                    }
                }
                if(deck) break;
            }
            cardsForDeck = deck.cards.map(originalCard => {
                const progress = codeCardsProgress.find(p => p.id === originalCard.id);
                return progress ? {...originalCard, ...progress} : {...originalCard};
            });
        }

        const dueCards = cardsForDeck.filter(c => c.dueDate && c.dueDate <= now);
        const newCards = cardsForDeck.filter(c => !c.dueDate).slice(0, 10);

        studyQueue = [...dueCards, ...newCards].sort((a, b) => (a.dueDate || 0) - (b.dueDate || 0));
        
        if (studyQueue.length === 0) {
            alert("Nenhum cartão para estudar neste baralho hoje!");
            return;
        }
        
        switchView('study-view');
        loadCard();
    }

    function loadCard() {
        if (studyQueue.length === 0) {
            flashcardFront.textContent = 'Parabéns, você concluiu a sessão!';
            flashcardBack.textContent = 'Bom trabalho!';
            answerOptions.classList.add('hidden');
            cardCounter.textContent = `Concluído!`;
            if (isFlipped) flipCard();
            return;
        }
        
        const card = studyQueue[0];
        flashcardFront.textContent = card.question;
        flashcardBack.textContent = card.answer;
        cardCounter.textContent = `${studyQueue.length} cartas restantes`;
        
        if(isFlipped) flipCard();
        answerOptions.classList.add('hidden');
    }

    function flipCard() {
        isFlipped = !isFlipped;
        flashcard.classList.toggle('is-flipped');
        if (isFlipped && studyQueue.length > 0) {
            answerOptions.classList.remove('hidden');
        } else {
            answerOptions.classList.add('hidden');
        }
    }

    function handleDifficulty(rating) {
        const card = studyQueue.shift();
        scheduleCard(card, rating);
        
        if (card.dueDate <= Date.now() + 30 * ONE_MINUTE_IN_MS) {
            studyQueue.push(card);
            studyQueue.sort((a, b) => (a.dueDate || 0) - (b.dueDate || 0));
        }
        
        setTimeout(() => loadCard(), 300);
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
        const learningCount = sourceCards.filter(c => c.dueDate && c.dueDate < Date.now() + ONE_DAY_IN_MS).length;
        const matureCount = sourceCards.filter(c => c.dueDate && c.dueDate >= Date.now() + ONE_DAY_IN_MS).length;
        
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

    function exportDeck(deckId) {
        const deck = decks.find(d => d.id === deckId);
        if(!deck) return;

        const deckCards = cards.filter(c => c.deckId === deckId).map(({ question, answer }) => ({ question, answer }));
        
        const exportData = {
            format: "CodeCards-Deck-v1",
            deck: { name: deck.name },
            cards: deckCards
        };

        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", `${deck.name}.ccdeck`);
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
        alert(`Baralho "${deck.name}" exportado com sucesso!`);
    }

    function handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (data.format !== "CodeCards-Deck-v1" || !data.deck || !Array.isArray(data.cards)) {
                    throw new Error("Formato de arquivo inválido ou corrompido.");
                }

                const newDeckName = data.deck.name || "Baralho Importado";
                const existingNames = decks.map(d => d.name);
                let finalName = newDeckName;
                let counter = 1;
                while(existingNames.includes(finalName)) {
                    finalName = `${newDeckName} (${counter++})`;
                }

                const newDeck = { id: Date.now(), name: finalName };
                decks.push(newDeck);

                data.cards.forEach(cardData => {
                    if (cardData.question && cardData.answer) {
                        cards.push({
                            id: Date.now() + Math.random(),
                            deckId: newDeck.id,
                            question: String(cardData.question),
                            answer: String(cardData.answer),
                            dueDate: null,
                            interval: 0
                        });
                    }
                });
                saveData();
                renderDecks();
                alert(`Baralho "${finalName}" importado com sucesso!`);
            } catch (error) {
                alert(`Falha ao importar o arquivo: ${error.message}`);
            } finally {
                importFileInput.value = '';
            }
        };
        reader.readAsText(file);
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
                dueDate: null, interval: 0
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
        const exportTarget = e.target.closest('.export-deck-btn');

        if (studyTarget) startStudy(parseInt(studyTarget.dataset.deckId), studyTarget.dataset.deckType);
        if (manageTarget) renderCardManager(parseInt(manageTarget.dataset.deckId));
        if (editTarget) openEditDeckModal(parseInt(editTarget.dataset.deckId));
        if (deleteTarget) deleteDeck(parseInt(deleteTarget.dataset.deckId));
        if (exportTarget) exportDeck(parseInt(exportTarget.dataset.deckId));
    });

    searchInput.addEventListener('input', (e) => {
        renderDecks(e.target.value);
    });

    codeDecksContainer.addEventListener('click', (e) => {
        const studyTarget = e.target.closest('.code-deck-card');
        if (studyTarget) {
            startStudy(studyTarget.dataset.deckId, studyTarget.dataset.deckType);
            return;
        }

        const subTabTarget = e.target.closest('.sub-tab-btn');
        if (subTabTarget) {
            const parent = subTabTarget.parentElement;
            parent.querySelectorAll('.sub-tab-btn').forEach(btn => btn.classList.remove('active'));
            subTabTarget.classList.add('active');

            const contentId = subTabTarget.dataset.contentId;
            const contentParent = parent.nextElementSibling;
            contentParent.querySelectorAll('.sub-tab-content').forEach(content => {
                content.classList.toggle('active', content.id === contentId);
            });
        }
    });

    document.getElementById('code-decks-view').addEventListener('click', (e) => {
        const categoryTarget = e.target.closest('.code-category-btn');
        if (categoryTarget) {
            renderCodeDecks(categoryTarget.dataset.category);
        }
    });

    cardListContainer.addEventListener('click', (e) => {
        const editTarget = e.target.closest('.edit-card-btn');
        const deleteTarget = e.target.closest('.delete-card-btn');
        if(editTarget) openCardModalForEdit(parseInt(editTarget.dataset.cardId));
        if(deleteTarget) deleteCard(parseInt(deleteTarget.dataset.cardId));
    });

    answerOptions.addEventListener('click', (e) => {
        const button = e.target.closest('.difficulty-btn');
        if (button) handleDifficulty(parseInt(button.dataset.rating));
    });

    statsTypeButtons.forEach(btn => btn.addEventListener('click', () => renderStatistics(btn.dataset.type)));

    newDeckBtn.addEventListener('click', () => showModal(newDeckModal));
    importDeckBtn.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleFileImport);
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
