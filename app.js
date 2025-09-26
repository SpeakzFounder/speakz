// Variable pour stocker les mots d'argot (chargés depuis mots.json)
let dictionary = [];

// Base de données des questions (conservée)
const questions = {
    verlan: [
        { question: 'Que signifie "Reup" ?', answers: ['Animal', 'Père', 'Nourriture', 'Couleur'], correct: 1 },
        { question: 'Que signifie "Meuf" ?', answers: ['Maison', 'Argent', 'Voiture', 'Femme'], correct: 3 },
        { question: 'Que signifie "Keuf" ?', answers: ['Flic', 'Ami', 'Travail', 'École'], correct: 0 },
        { question: 'Que signifie "Chelou" ?', answers: ['Drôle', 'Louche', 'Rapide', 'Grand'], correct: 1 },
        { question: 'Que signifie "Relou" ?', answers: ['Petit', 'Rouge', 'Lourd', 'Froid'], correct: 2 }
    ],
    regional: [
        { question: 'Que veut dire "Cagole" à Marseille ?', answers: ['Maison', 'Voiture', 'Fille un peu vulgaire', 'Nourriture'], correct: 2 },
        { question: 'Au Québec, que signifie "Tabarnak" ?', answers: ['Juron très fort', 'Merci', 'Bonjour', 'Au revoir'], correct: 0 },
        { question: 'Que signifie "Fada" à Marseille ?', answers: ['Vieux', 'Jeune', 'Fou', 'Argent'], correct: 2 }
    ],
    expert: [
        { question: 'Que signifie "Bicrave" en argot des cités ?', answers: ['Dealer, vendre', 'Voler', 'Mentir', 'Partir'], correct: 0 },
        { question: 'Que veut dire "Seum" ?', answers: ['Joie', 'Frustration', 'Peur', 'Colère'], correct: 1 }
    ],
    mystery: [
        { word: 'Teuf', indices: ['On y va pour s\'amuser', 'Ça rime avec "meuf"', 'C\'est en verlan'], answers: ['Teuf', 'Keuf', 'Meuf', 'Reup'], correct: 0 },
        { word: 'Seum', indices: ['Tu le ressens quand tu es frustré', 'Vient de l\'arabe', 'Rime avec "heum"'], answers: ['Swag', 'Seum', 'Kiffer', 'Ouf'], correct: 1 }
    ],
    challenge: [
        { sentence: 'Il est complètement _____ !', answers: ['Ouf', 'Chelou', 'Relou', 'Stylé'], correct: 0 },
        { sentence: 'J\'ai le _____ de pas avoir réussi.', answers: ['Swag', 'Seum', 'Kiffer', 'Wesh'], correct: 1 }
    ],
    generations: [
        { question: 'Expression des années 90 vs 2020', old: 'C\'est chanmé !', new: 'C\'est trop bg !', options: ['Années 90', 'Années 2020'], answers: [0, 1] }
    ]
};

// Variables globales
let currentGame = '';
let currentQuestion = 0;
let score = 0;
let mysteryIndiceLevel = 0;
let userPoints = 245;
let streak = 7;
let totalAnswered = 100;
let totalCorrect = 73;
let currentCategory = 'tous';

// Variables pour le jeu du jour
let dailyGameActive = false;
let dailyTimer = 0;
let dailyTimerInterval = null;
let dailyScore = 0;
let dailyCurrentQuestion = 0;
let dailyStartTime = 0;
let dailyCorrectAnswers = 0;

// Questions du jeu du jour (conservées)
const dailyQuestions = [
    { question: 'Que signifie "Kiffer" ?', answers: ['Aimer', 'Détester', 'Courir', 'Voler'], correct: 0 },
    { question: 'Que veut dire "Seum" ?', answers: ['Joie', 'Faim', 'Frustration', 'Sommeil'], correct: 2 },
    { question: 'En verlan, "Meuf" signifie :', answers: ['Homme', 'Enfant', 'Animal', 'Femme'], correct: 3 },
    { question: 'À Marseille, "Cagole" désigne :', answers: ['Une voiture', 'Une fille vulgaire', 'Un plat', 'Un quartier'], correct: 1 },
    { question: 'Que signifie "Chelou" ?', answers: ['Beau', 'Rapide', 'Cher', 'Louche'], correct: 3 }
];

// Fonction pour charger les mots depuis mots.json
async function loadDictionary() {
    try {
        const response = await fetch('mots.json');
        const data = await response.json();
        
        // Convertir le format JSON vers le format utilisé dans l'app
        dictionary = data.map(item => ({
            word: item.term,
            category: item.categories && item.categories.length > 0 ? item.categories[0] : 'argot',
            definition: item.definition,
            example: item.examples && item.examples.length > 0 ? item.examples[0] : `Exemple avec "${item.term}"`
        }));
        
        console.log(`${dictionary.length} mots chargés depuis mots.json`);
        
        // Afficher les mots une fois chargés
        if (document.getElementById('dictionnaire').classList.contains('active')) {
            displayResults(dictionary);
        }
        
    } catch (error) {
        console.error('Erreur lors du chargement du dictionnaire:', error);
        
        // Fallback : quelques mots de base si le fichier ne charge pas
        dictionary = [
            { word: "Kiffer", category: "jeunes", definition: "Aimer, apprécier quelque chose", example: "Je kiffe grave cette musique!" },
            { word: "Seum", category: "cite", definition: "Dégoût, amertume, frustration", example: "J'ai le seum de pas avoir réussi" },
            { word: "Keuf", category: "verlan", definition: "Flic (verlan de flic)", example: "Attention aux keufs!" }
        ];
    }
}

// Navigation entre sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
}

// Démarrer un jeu
function startGame(gameType) {
    currentGame = gameType;
    currentQuestion = 0;
    score = 0;
    mysteryIndiceLevel = 0;
    
    const modal = document.getElementById('gameModal');
    modal.classList.add('active');
    
    updateModalTitle();
    showQuestion();
}

function updateModalTitle() {
    const titles = {
        verlan: 'Quiz Verlan',
        regional: 'Quiz Régional', 
        expert: 'Quiz Expert',
        mystery: 'Le Mot Mystère',
        challenge: 'Argot Challenge',
        generations: 'Ancien vs Nouveau'
    };
    document.getElementById('modalTitle').textContent = titles[currentGame];
}

function showQuestion() {
    const questionData = questions[currentGame][currentQuestion];
    document.getElementById('gameScore').textContent = 'Question ' + (currentQuestion + 1) + '/5';
    
    const answersContainer = document.getElementById('answers');
    
    if (currentGame === 'mystery') {
        const currentIndice = questionData.indices[mysteryIndiceLevel];
        document.getElementById('question').innerHTML = 
            '<div style="margin-bottom: 1rem;"><strong>Indice ' + (mysteryIndiceLevel + 1) + ' :</strong> "' + currentIndice + '"</div>';
        
        let buttonsHTML = '';
        if (mysteryIndiceLevel < 2) {
            buttonsHTML += '<button class="answer-btn" onclick="showNextIndice()">💡 Indice suivant</button>';
        }
        
        questionData.answers.forEach((answer, index) => {
            buttonsHTML += '<button class="answer-btn" onclick="checkMysteryAnswer(' + index + ')">' + answer + '</button>';
        });
        
        answersContainer.innerHTML = buttonsHTML;
        
    } else if (currentGame === 'challenge') {
        document.getElementById('question').innerHTML = 
            '<div>Complète la phrase :</div>' +
            '<div style="font-weight: bold;">"' + questionData.sentence + '"</div>';
        
        answersContainer.innerHTML = '';
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
        
    } else {
        document.getElementById('question').textContent = questionData.question;
        answersContainer.innerHTML = '';
        questionData.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.onclick = () => checkAnswer(index);
            answersContainer.appendChild(button);
        });
    }
}

function checkAnswer(selectedAnswer) {
    const questionData = questions[currentGame][currentQuestion];
    const isCorrect = selectedAnswer === questionData.correct;
    
    if (isCorrect) {
        score++;
        totalCorrect++;
        userPoints += 10;
    }
    
    totalAnswered++;
    
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
    
    setTimeout(() => {
        currentQuestion++;
        mysteryIndiceLevel = 0;
        if (currentQuestion < 5) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2500);
}

function showNextIndice() {
    if (mysteryIndiceLevel < 2) {
        mysteryIndiceLevel++;
        showQuestion();
    }
}

function checkMysteryAnswer(selectedAnswer) {
    const questionData = questions[currentGame][currentQuestion];
    const isCorrect = selectedAnswer === questionData.correct;
    
    let pointsEarned = 0;
    if (isCorrect) {
        if (mysteryIndiceLevel === 0) pointsEarned = 30;
        else if (mysteryIndiceLevel === 1) pointsEarned = 20;  
        else pointsEarned = 10;
        
        score++;
        totalCorrect++;
        userPoints += pointsEarned;
    }
    
    totalAnswered++;
    
    const buttons = document.querySelectorAll('.answer-btn');
    buttons.forEach((btn) => {
        btn.style.pointerEvents = 'none';
        if (btn.textContent.includes('Indice suivant')) return;
        
        let answerIndex = -1;
        questionData.answers.forEach((answer, i) => {
            if (btn.textContent.trim() === answer) answerIndex = i;
        });
        
        if (answerIndex === selectedAnswer) {
            btn.classList.add(isCorrect ? 'correct' : 'incorrect');
        }
        if (answerIndex === questionData.correct && !isCorrect) {
            btn.classList.add('correct');
        }
    });
    
    setTimeout(() => {
        currentQuestion++;
        mysteryIndiceLevel = 0;
        if (currentQuestion < 5) {
            showQuestion();
        } else {
            showResults();
        }
    }, 2500);
}

function showResults() {
    const percentage = Math.round((score / 5) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = 'Excellent ! Tu maîtrises l\'argot !';
        streak++;
    } else if (percentage >= 60) {
        message = 'Pas mal ! Continue comme ça !';
        streak++;
    } else {
        message = 'Il faut réviser !';
        streak = 0;
    }
    
    document.getElementById('question').innerHTML = 
        '<div style="text-align: center;">' +
            '<h3>' + message + '</h3>' +
            '<p style="font-size: 2rem; margin: 1rem 0;">' + score + '/5</p>' +
            '<p>+' + (score * 10) + ' points</p>' +
        '</div>';
    
    document.getElementById('answers').innerHTML = 
        '<button class="play-btn" onclick="closeModal()" style="width: 100%; margin-top: 1rem;">Continuer</button>';
    
    updateStats();
}

function closeModal() {
    document.getElementById('gameModal').classList.remove('active');
}

// Mise à jour des stats
function updateStats() {
    document.getElementById('userPoints').textContent = userPoints + ' points';
    document.getElementById('streak').textContent = streak + ' jours';
    document.getElementById('successRate').textContent = Math.round((totalCorrect / totalAnswered) * 100) + '%';
}

// Variables pour la recherche avec délai
let searchTimeout = null;

function filterHomeSearch() {
    if (searchTimeout) {
        clearTimeout(searchTimeout);
    }

    const homeSearch = document.getElementById('home-search');
    const searchTerm = homeSearch.value.trim();
    
    if (searchTerm === '' || searchTerm.length < 3) {
        document.getElementById('home-results-container').style.display = 'none';
        return;
    }

    searchTimeout = setTimeout(() => {
        performHomeSearch(searchTerm);
    }, 500);
}

function performHomeSearch(searchTerm) {
    const filteredWords = dictionary.filter(word => {
        return word.word.toLowerCase().includes(searchTerm.toLowerCase()) || 
               word.definition.toLowerCase().includes(searchTerm.toLowerCase());
    });

    displayHomeResults(filteredWords, searchTerm);
    document.getElementById('home-results-container').style.display = 'block';
    
    setTimeout(() => {
        document.getElementById('home-results-container').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 100);
}

function filterByCategory(category) {
    const mainSearch = document.getElementById('main-search');
    const homeSearch = document.getElementById('home-search');
    
    if (mainSearch) mainSearch.value = '';
    if (homeSearch) homeSearch.value = '';
    
    currentCategory = category;
    filterDictionary();
    
    if (document.getElementById('dictionnaire').classList.contains('active')) {
        setTimeout(() => {
            document.getElementById('dictionary-results').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 300);
    }
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
        if (searchTerm !== '' && searchTerm.length < 3) {
            const matchesCategory = currentCategory === 'tous' || word.category === currentCategory;
            return matchesCategory;
        }
        
        const matchesSearch = searchTerm === '' || word.word.toLowerCase().includes(searchTerm) || word.definition.toLowerCase().includes(searchTerm);
        
        if (searchTerm !== '' && searchTerm.length >= 3) {
            return matchesSearch;
        }
        
        const matchesCategory = currentCategory === 'tous' || word.category === currentCategory;
        return matchesSearch && matchesCategory;
    });

    if (document.getElementById('dictionnaire').classList.contains('active')) {
        displayResults(filteredWords);
        
        if (searchTerm !== '' && searchTerm.length >= 3 && filteredWords.length > 0) {
            setTimeout(() => {
                document.getElementById('dictionary-results').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }, 100);
        }
    } else if (document.getElementById('accueil').classList.contains('active')) {
        if (searchTerm.length >= 3) {
            displayHomeResults(filteredWords);
        }
    }
}

function displayHomeResults(words = null, searchTerm = '') {
    const container = document.getElementById('home-results');
    
    if (words === null) {
        words = dictionary.filter(word => {
            const matchesCategory = currentCategory === 'tous' || word.category === currentCategory;
            return matchesCategory;
        });
    }
    
    if (words.length === 0) {
        container.innerHTML = '<div class="no-results">Aucun mot trouvé pour "' + searchTerm + '"</div>';
        return;
    }

    const limitedWords = words.slice(0, 3);

    let resultsHTML = limitedWords.map(word => 
        '<div class="word-card">' +
            '<div class="word-title">' + word.word + '</div>' +
            '<div class="word-category">' + getCategoryName(word.category) + '</div>' +
            '<div class="word-definition">' + word.definition + '</div>' +
            '<div class="word-example">' + word.example + '</div>' +
        '</div>'
    ).join('');

    if (words.length > 3) {
        resultsHTML += '<div style="text-align: center; margin-top: 2rem;">' +
            '<button class="btn-base nav-btn btn-hover" onclick="goToDictionaryWithSearch(\'' + searchTerm + '\')" style="color: black !important;">VOIR TOUS LES RÉSULTATS (' + words.length + ' mots)</button>' +
        '</div>';
    }

    container.innerHTML = resultsHTML;
}

function goToDictionaryWithSearch(searchTerm) {
    showSection('dictionnaire');
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.nav-btn').forEach(btn => {
        if (btn.textContent.includes('DICTIONNAIRE')) {
            btn.classList.add('active');
        }
    });
    
    const mainSearch = document.getElementById('main-search');
    mainSearch.value = searchTerm;
    
    currentCategory = 'tous';
    filterDictionary();
    
    setTimeout(() => {
        document.getElementById('dictionary-results').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
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

function getCategoryName(category) {
    const names = {
        'jeunes': 'Jeunes', 'cite': 'Cité', 'verlan': 'Verlan', 
        'ancien': 'Argot Ancien', 'internet': 'Internet/SMS',
        'marseille': 'Marseille', 'quebec': 'Québec', 
        'belgique': 'Belgique', 'nord': 'Nord', 'suisse': 'Suisse',
        'senegal': 'Sénégal', 'cote-ivoire': 'Côte d\'Ivoire', 
        'cameroun': 'Cameroun', 'slang': 'Slang', 'argot': 'Argot',
        'sport': 'Sport', 'musique': 'Musique', 'beautÃ©': 'Beauté',
        'cuisine': 'Cuisine', 'mode': 'Mode', 'travail': 'Travail',
        'relationnel': 'Relationnel', 'scolaire': 'Scolaire',
        'transport': 'Transport', 'santÃ©': 'Santé', 'fÃªte': 'Fête',
        'animaux': 'Animaux', 'famille': 'Famille', 'argent': 'Argent',
        'mÃ©tÃ©o': 'Météo', 'relations': 'Relations', 'culture': 'Culture'
    };
    return names[category] || category;
}

// Jeu du jour (toutes les fonctions conservées)
function startDailyGame() {
    dailyGameActive = true;
    dailyCurrentQuestion = 0;
    dailyScore = 0;
    dailyCorrectAnswers = 0;
    dailyTimer = 120;
    dailyStartTime = Date.now();
    
    dailyQuestions.sort(() => Math.random() - 0.5);
    
    updateDailyGameDisplay();
    startDailyTimer();
    showDailyQuestion();
}

function startDailyTimer() {
    document.getElementById('daily-timer').style.display = 'block';
    dailyTimerInterval = setInterval(() => {
        dailyTimer--;
        updateTimerDisplay();
        
        if (dailyTimer <= 0) {
            endDailyGame();
        }
    }, 1000);
}

function updateTimerDisplay() {
    const minutes = Math.floor(dailyTimer / 60);
    const seconds = dailyTimer % 60;
    document.getElementById('timer-display').textContent = 
        minutes.toString().padStart(2, '0') + ':' + 
        seconds.toString().padStart(2, '0');
        
    const timerElement = document.getElementById('daily-timer');
    if (dailyTimer <= 30) {
        timerElement.style.color = '#ff4444';
    } else {
        timerElement.style.color = 'var(--primary-cyan)';
    }
}

function updateDailyGameDisplay() {
    document.getElementById('daily-progress').style.display = 'block';
    document.getElementById('daily-question-number').textContent = (dailyCurrentQuestion + 1);
    document.getElementById('daily-countdown-container').style.display = 'none';
}

function showDailyQuestion() {
    if (dailyCurrentQuestion >= dailyQuestions.length || dailyTimer <= 0) {
        endDailyGame();
        return;
    }

    const question = dailyQuestions[dailyCurrentQuestion];
    document.getElementById('daily-question-text').textContent = question.question;
    document.getElementById('daily-word').textContent = 'Question ' + (dailyCurrentQuestion + 1) + '/' + dailyQuestions.length;
    
    const optionsContainer = document.getElementById('daily-options');
    optionsContainer.innerHTML = '';
    
    question.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'btn-base nav-btn btn-hover';
        button.textContent = answer;
        button.style.width = '100%';
        button.style.margin = '0.25rem 0';
        button.style.color = 'black';
        button.onclick = () => answerDailyQuestion(index);
        optionsContainer.appendChild(button);
    });
}

function answerDailyQuestion(selectedAnswer) {
    const question = dailyQuestions[dailyCurrentQuestion];
    const isCorrect = selectedAnswer === question.correct;
    
    if (isCorrect) {
        dailyCorrectAnswers++;
        const timeBonus = Math.max(10, Math.floor((dailyTimer / 120) * 100));
        dailyScore += timeBonus;
    }
    
    const buttons = document.querySelectorAll('#daily-options button');
    buttons.forEach((btn, index) => {
        btn.style.pointerEvents = 'none';
        if (index === selectedAnswer) {
            btn.style.background = isCorrect ? 'var(--accent-green)' : '#ff4444';
            btn.style.borderColor = isCorrect ? 'var(--accent-green)' : '#ff4444';
        }
        if (index === question.correct && !isCorrect) {
            btn.style.background = 'var(--accent-green)';
            btn.style.borderColor = 'var(--accent-green)';
        }
    });
    
    setTimeout(() => {
        dailyCurrentQuestion++;
        showDailyQuestion();
    }, 2500);
}

function endDailyGame() {
    dailyGameActive = false;
    clearInterval(dailyTimerInterval);
    
    const totalTime = 120;
    const timeUsed = totalTime - Math.max(0, dailyTimer);
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    const timeDisplay = minutes > 0 ? 
        minutes + 'm ' + seconds.toString().padStart(2, '0') + 's' : 
        seconds + 's';
    
    const timeLeft = Math.max(0, dailyTimer);
    const finalScore = dailyScore + (timeLeft * 2);
    
    document.getElementById('daily-question-text').textContent = 'Jeu terminé !';
    document.getElementById('daily-word').innerHTML = 
        '<div>Score final : ' + finalScore + ' points</div>' +
        '<div>Questions correctes : ' + dailyCorrectAnswers + '/' + dailyQuestions.length + '</div>' +
        '<div>Temps pris : ' + timeDisplay + '</div>';
    
    document.getElementById('daily-options').innerHTML = 
        '<button class="play-btn" onclick="resetDailyGame()" style="width: 100%; color: black;">Terminer</button>';
    
    document.getElementById('daily-timer').style.display = 'none';
    document.getElementById('daily-progress').style.display = 'none';
    document.getElementById('daily-status').textContent = 'Jeu terminé ! Reviens demain.';
}

function resetDailyGame() {
    document.getElementById('daily-question-text').textContent = 'Défi quotidien de 10 questions !';
    document.getElementById('daily-word').textContent = 'Prêt pour le challenge ?';
    document.getElementById('daily-options').innerHTML = 
        '<button class="play-btn" onclick="startDailyGame()" style="width: 100%; color: black;">COMMENCER LE JEU DU JOUR</button>';
    document.getElementById('daily-timer').style.display = 'none';
    document.getElementById('daily-progress').style.display = 'none';
    document.getElementById('daily-status').textContent = '10 questions • Score basé sur vitesse et précision';
    document.getElementById('daily-countdown-container').style.display = 'block';
}

// Countdown timer
function updateCountdown() {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    const countdownElement = document.getElementById('countdown');
    if (countdownElement) {
        countdownElement.textContent = hours.toString().padStart(2, '0') + ':' + 
                                     minutes.toString().padStart(2, '0') + ':' + 
                                     seconds.toString().padStart(2, '0');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', async function() {
    // Charger le dictionnaire depuis mots.json
    await loadDictionary();
    
    const mainSearchInput = document.getElementById('main-search');
    const homeSearchInput = document.getElementById('home-search');
    
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterDictionary);
    }
    if (homeSearchInput) {
        homeSearchInput.addEventListener('input', filterHomeSearch);
    }
    
    currentCategory = 'tous';
    updateStats();
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Afficher tous les mots au début si on est sur la page dictionnaire
    if (document.getElementById('dictionnaire').classList.contains('active')) {
        displayResults(dictionary);
    }
});
