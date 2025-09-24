// Base de données des mots d'argot
const dictionary = [
    // Jeunes
    { word: "Kiffer", category: "jeunes", definition: "Aimer, apprécier quelque chose", example: "Je kiffe grave cette musique!" },
    { word: "Stylé", category: "jeunes", definition: "Cool, bien habillé", example: "T'es stylé avec cette veste!" },
    { word: "Swag", category: "jeunes", definition: "Avoir du style, être cool", example: "Il a trop de swag ce mec" },
    { word: "Grave", category: "jeunes", definition: "Beaucoup, très", example: "C'est grave bien!" },
    { word: "Ouf", category: "jeunes", definition: "Fou, incroyable", example: "C'est ouf ce truc!" },
    { word: "Wesh", category: "jeunes", definition: "Salut, expression familière", example: "Wesh, ça va?" },
    { word: "Déter", category: "jeunes", definition: "Déterminé, motivé", example: "Je suis déter pour réussir" },
    { word: "BG", category: "jeunes", definition: "Beau gosse", example: "Il est BG ce mec" },
    { word: "Bolos", category: "jeunes", definition: "Nul, pas cool", example: "C'est bolos cette soirée" },
    { word: "Pécho", category: "jeunes", definition: "Séduire, attraper", example: "J'ai pécho son numéro" },
    { word: "Mytho", category: "jeunes", definition: "Menteur", example: "Il est mytho ce mec" },
    { word: "Chiller", category: "jeunes", definition: "Se détendre, se reposer", example: "On va juste chiller" },
    { word: "Poto", category: "jeunes", definition: "Ami, copain", example: "C'est mon poto" },

    // Verlan
    { word: "Keuf", category: "verlan", definition: "Flic (verlan de flic)", example: "Attention aux keufs!" },
    { word: "Meuf", category: "verlan", definition: "Femme (verlan de femme)", example: "Cette meuf est sympa" },
    { word: "Chelou", category: "verlan", definition: "Louche (verlan de louche)", example: "Ce type est chelou" },
    { word: "Relou", category: "verlan", definition: "Lourd (verlan de lourd)", example: "Il est relou ce mec" },
    { word: "Teuf", category: "verlan", definition: "Fête (verlan de fête)", example: "On fait une teuf" },
    { word: "Reup", category: "verlan", definition: "Père (verlan de père)", example: "Mon reup arrive" },
    { word: "Reum", category: "verlan", definition: "Mère (verlan de mère)", example: "Ma reum cuisine" },
    { word: "Vénère", category: "verlan", definition: "Énervé (verlan d'énervé)", example: "Il est vénère" },
    { word: "Cimer", category: "verlan", definition: "Merci (verlan)", example: "Cimer pour ton aide" },
    { word: "Zarbi", category: "verlan", definition: "Bizarre (verlan)", example: "C'est zarbi cette histoire" },

    // Cité
    { word: "Seum", category: "cite", definition: "Dégoût, amertume, frustration", example: "J'ai le seum de pas avoir réussi" },
    { word: "Boloss", category: "cite", definition: "Personne naïve", example: "Ne fais pas le boloss" },
    { word: "Bicrave", category: "cite", definition: "Dealer, vendre de la drogue", example: "Il bicrave au coin de la rue" },
    { word: "Caillera", category: "cite", definition: "Racaille (verlan)", example: "Attention aux cailleras" },
    { word: "Téma", category: "cite", definition: "Regarde, mate", example: "Téma cette voiture!" },
    { word: "Igo", category: "cite", definition: "Mec, type", example: "C'est qui cet igo?" },
    { word: "Lovés", category: "cite", definition: "Argent", example: "Il a plein de lovés" },
    { word: "Wallah", category: "cite", definition: "Je jure (arabe)", example: "Wallah c'est vrai" },
    { word: "Hagra", category: "cite", definition: "Mépris, humiliation", example: "Il lui a fait la hagra" },

    // Marseille
    { word: "Cagole", category: "marseille", definition: "Fille un peu vulgaire", example: "Cette cagole fait du bruit" },
    { word: "Pitchoune", category: "marseille", definition: "Petit enfant", example: "Viens ici pitchoune" },
    { word: "Fada", category: "marseille", definition: "Fou", example: "Il est complètement fada" },
    { word: "Dégun", category: "marseille", definition: "Personne", example: "Il y a dégun" },
    { word: "Minot", category: "marseille", definition: "Enfant", example: "Ce minot est mignon" }
];

// Questions pour les jeux
const questions = {
    verlan: [
        { question: 'Que signifie "Reup" ?', answers: ['Animal', 'Père', 'Nourriture', 'Couleur'], correct: 1 },
        { question: 'Que signifie "Meuf" ?', answers: ['Maison', 'Argent', 'Voiture', 'Femme'], correct: 3 },
        { question: 'Que signifie "Keuf" ?', answers: ['Flic', 'Ami', 'Travail', 'École'], correct: 0 },
        { question: 'Que signifie "Chelou" ?', answers: ['Drôle', 'Louche', 'Rapide', 'Grand'], correct: 1 },
        { question: 'Que signifie "Relou" ?', answers: ['Petit', 'Rouge', 'Lourd', 'Froid'], correct: 2 }
    ],
    regional: [
        { question: 'Que veut dire "Cagole" à Marseille ?', answers: ['Maison', 'Voiture', 'Fille vulgaire', 'Nourriture'], correct: 2 },
        { question: 'Que signifie "Fada" à Marseille ?', answers: ['Intelligent', 'Fou', 'Rapide', 'Grand'], correct: 1 },
        { question: 'Que veut dire "Dégun" ?', answers: ['Personne', 'Beaucoup', 'Vite', 'Lentement'], correct: 0 },
        { question: 'Que signifie "Pitchoune" ?', answers: ['Vieux', 'Petit enfant', 'Maison', 'Voiture'], correct: 1 },
        { question: 'Que veut dire "Minot" ?', answers: ['Enfant', 'Adulte', 'Animal', 'Objet'], correct: 0 }
    ],
    expert: [
        { question: 'En argot des cités, que signifie "Bicrave" ?', answers: ['Dealer', 'Voler', 'Mentir', 'Partir'], correct: 0 },
        { question: 'Que veut dire "Hagra" ?', answers: ['Amour', 'Humiliation', 'Joie', 'Peur'], correct: 1 },
        { question: 'Que signifie "Lovés" ?', answers: ['Amour', 'Argent', 'Voiture', 'Maison'], correct: 1 },
        { question: 'Que veut dire "Téma" ?', answers: ['Partir', 'Regarde', 'Viens', 'Stop'], correct: 1 },
        { question: 'Que signifie "Caillera" ?', answers: ['Pierre', 'Racaille', 'Police', 'Ami'], correct: 1 }
    ]
};

// Variables globales
let currentGame = '';
let currentQuestion = 0;
let score = 0;
let currentCategory = 'tous';

// Navigation entre sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    
    // Marquer le bouton actif
    event.target.classList.add('active');
}

// Démarrer un jeu
function startGame(gameType) {
    currentGame = gameType;
    currentQuestion = 0;
    score = 0;
    
    const modal = document.getElementById('gameModal');
    modal.classList.add('active');
    
    updateModalTitle();
    showQuestion();
}

function updateModalTitle() {
    const titles = {
        verlan: 'Quiz Verlan',
        regional: 'Quiz Régional', 
        expert: 'Quiz Expert'
    };
    document.getElementById('modalTitle').textContent = titles[currentGame] || 'Quiz';
}

function showQuestion() {
    const questionData = questions[currentGame][currentQuestion];
    document.getElementById('gameScore').textContent = 'Question ' + (currentQuestion + 1) + '/5';
    
    document.getElementById('question').textContent = questionData.question;
    
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = '';
    
    questionData.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'answer-btn';
        button.textContent = answer;
        button.onclick = () => checkAnswer(index);
        answersContainer.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const questionData = questions[currentGame][currentQuestion];
    const isCorrect = selectedAnswer === questionData.correct;
    
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn, index) => {
        btn.style.pointerEvents = 'none';
        if (index === selectedAnswer) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (index === questionData.correct && !isCorrect) {
            btn.classList.add('correct');
        }
    });
    
    if (isCorrect) {
        score++;
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < 5) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showResults() {
    const percentage = (score / 5) * 100;
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent ! Tu maîtrises l\'argot !';
    } else if (percentage >= 60) {
        message = 'Pas mal ! Continue comme ça !';
    } else {
        message = 'Il faut réviser !';
    }
    
    document.getElementById('question').innerHTML = 
        '<div style="text-align: center;">' +
            '<h3>' + message + '</h3>' +
            '<p style="font-size: 2rem; margin: 1rem 0;">' + score + '/5</p>' +
        '</div>';
    
    document.getElementById('answers').innerHTML = 
        '<button class="play-btn" onclick="closeModal()" style="width: 100%; margin-top: 1rem;">Continuer</button>';
}

function closeModal() {
    document.getElementById('gameModal').classList.remove('active');
}

// Filtrage du dictionnaire
function filterByCategory(category) {
    currentCategory = category;
    filterDictionary();
}

function filterDictionary() {
    const mainSearch = document.getElementById('main-search');
    const homeSearch = document.getElementById('home-search');
    
    let searchTerm = '';
    if (mainSearch && document.getElementById('dictionnaire').classList.contains('active')) {
        searchTerm = mainSearch.value.toLowerCase().trim();
    } else if (homeSearch && document.getElementById('accueil').classList.contains('active')) {
        searchTerm = homeSearch.value.toLowerCase().trim();
    }

    let filteredWords = dictionary.filter(word => {
        const matchesSearch = searchTerm === '' || 
                             word.word.toLowerCase().includes(searchTerm) || 
                             word.definition.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'tous' || word.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    // Afficher dans la page appropriée
    if (document.getElementById('dictionnaire').classList.contains('active')) {
        displayResults(filteredWords);
    } else if (document.getElementById('accueil').classList.contains('active') && searchTerm.length >= 3) {
        displayHomeResults(filteredWords);
        document.getElementById('home-results-container').style.display = 'block';
    } else if (searchTerm.length < 3) {
        document.getElementById('home-results-container').style.display = 'none';
    }
}

function displayResults(words) {
    const container = document.getElementById('dictionary-results');
    
    if (words.length === 0) {
        container.innerHTML = '<div class="no-results">Aucun mot trouvé</div>';
        return;
    }

    container.innerHTML = words.map(word => 
        '<div class="word-card">' +
            '<div class="word-title">' + word.word + '</div>' +
            '<div class="word-category">' + getCategoryName(word.category) + '</div>' +
            '<div class="word-definition">' + word.definition + '</div>' +
            '<div class="word-example">' + word.example + '</div>' +
        '</div>'
    ).join('');
}

function displayHomeResults(words) {
    const container = document.getElementById('home-results');
    
    if (words.length === 0) {
        container.innerHTML = '<div class="no-results">Aucun mot trouvé</div>';
        return;
    }

    // Limiter à 3 résultats sur l'accueil
    const limitedWords = words.slice(0, 3);
    
    container.innerHTML = limitedWords.map(word => 
        '<div class="word-card">' +
            '<div class="word-title">' + word.word + '</div>' +
            '<div class="word-category">' + getCategoryName(word.category) + '</div>' +
            '<div class="word-definition">' + word.definition + '</div>' +
            '<div class="word-example">' + word.example + '</div>' +
        '</div>'
    ).join('');
}

function getCategoryName(category) {
    const names = {
        'jeunes': 'Jeunes',
        'cite': 'Cité',
        'verlan': 'Verlan',
        'marseille': 'Marseille'
    };
    return names[category] || category;
}

// Mise à jour des compteurs de catégories
function updateCategoryCounts() {
    const categories = ['jeunes', 'verlan', 'cite', 'marseille'];
    
    categories.forEach(cat => {
        const count = dictionary.filter(word => word.category === cat).length;
        const element = document.getElementById('count-' + cat);
        if (element) {
            element.textContent = '(' + count + ')';
        }
    });
    
    const totalElement = document.getElementById('count-tous');
    if (totalElement) {
        totalElement.textContent = '(' + dictionary.length + ')';
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', function() {
    const mainSearchInput = document.getElementById('main-search');
    const homeSearchInput = document.getElementById('home-search');
    
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterDictionary);
    }
    if (homeSearchInput) {
        homeSearchInput.addEventListener('input', filterDictionary);
    }
    
    // Mettre à jour les compteurs
    updateCategoryCounts();
    
    // Charger tous les mots au début sur la page dictionnaire
    currentCategory = 'tous';
    displayResults(dictionary);
});
