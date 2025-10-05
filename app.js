// ==================== VARIABLES GLOBALES ====================
let dictionary = [];
let currentCategory = 'tous';
let currentGameType = '';
let currentQuestionIndex = 0;
let gameScore = 0;
let dailyGameStarted = false;
let dailyGameQuestions = [];
let dailyTimer = null;
let dailyStartTime = null;
let usedQuestions = [];

// ==================== CHARGEMENT INITIAL ====================
// Charger le dictionnaire au démarrage
fetch('dictionary.json')
    .then(response => response.json())
    .then(data => {
        dictionary = data;
        console.log('Dictionnaire chargé:', dictionary.length, 'mots');
        displayResults(dictionary);
        updateStats();
        initializeDailyWord();
    })
    .catch(error => {
        console.error('Erreur chargement dictionnaire:', error);
        // Afficher un message d'erreur
        const container = document.getElementById('dictionary-results');
        if (container) {
            container.innerHTML = '<p style="color: red; text-align: center;">Erreur de chargement du dictionnaire</p>';
        }
    });

// ==================== NAVIGATION ====================
function showSection(sectionId) {
    // Masquer toutes les sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Afficher la section demandée
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Mettre à jour les boutons de navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Activer le bon bouton
    event.target.classList.add('active');
}

// ==================== RECHERCHE ====================
function filterDictionary() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase().trim();
    
    let filtered = dictionary.filter(item => {
        const matchesSearch = searchTerm === '' || 
            item.term.toLowerCase().includes(searchTerm) ||
            item.definition.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'tous' || 
            (item.categories && item.categories.includes(currentCategory));
        return matchesSearch && matchesCategory;
    });
    
    displayResults(filtered);
}

function filterHomeSearch() {
    const searchTerm = document.getElementById('home-search').value.toLowerCase().trim();
    const resultsContainer = document.getElementById('home-results-container');
    
    if (!resultsContainer) return;
    
    if (searchTerm === '') {
        resultsContainer.style.display = 'none';
        return;
    }
    
    let filtered = dictionary.filter(item => {
        return item.term.toLowerCase().includes(searchTerm) ||
               item.definition.toLowerCase().includes(searchTerm);
    });
    
    resultsContainer.style.display = 'block';
    displayHomeResults(filtered);
}

function displayHomeResults(results) {
    const container = document.getElementById('home-results');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Aucun mot trouvé</p>';
        return;
    }
    
    results.slice(0, 6).forEach(item => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.style.cssText = 'padding: 1rem; background: var(--bg-card); border-radius: 10px; margin-bottom: 1rem;';
        
        const categories = item.categories ? item.categories.map(cat => 
            `<span style="background: var(--gradient-primary); padding: 0.2rem 0.5rem; border-radius: 5px; font-size: 0.8rem; margin-right: 0.5rem;">${cat.toUpperCase()}</span>`
        ).join('') : '';
        
        card.innerHTML = `
            <h3 style="color: var(--accent-pink); margin-bottom: 0.5rem;">${item.term}</h3>
            <p style="color: var(--text-primary); margin-bottom: 0.5rem;">${item.definition}</p>
            ${item.examples && item.examples[0] ? `<em style="color: var(--text-secondary);">"${item.examples[0]}"</em>` : ''}
            <div style="margin-top: 0.5rem;">${categories}</div>
        `;
        container.appendChild(card);
    });
}

// ==================== AFFICHAGE DICTIONNAIRE ====================
function displayResults(results) {
    const container = document.getElementById('dictionary-results');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Aucun mot trouvé</p>';
        return;
    }
    
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'word-card';
        card.style.cssText = 'padding: 1.5rem; background: var(--bg-card); border-radius: 10px; margin-bottom: 1rem; border: 1px solid rgba(0,255,255,0.2); transition: all 0.3s;';
        
        card.onmouseover = () => {
            card.style.transform = 'translateY(-5px)';
            card.style.boxShadow = '0 10px 30px rgba(255, 0, 255, 0.3)';
        };
        card.onmouseout = () => {
            card.style.transform = 'translateY(0)';
            card.style.boxShadow = 'none';
        };
        
        const categories = item.categories ? item.categories.map(cat => 
            `<span style="background: linear-gradient(45deg, var(--primary-cyan), var(--accent-pink)); padding: 0.3rem 0.6rem; border-radius: 5px; font-size: 0.8rem; margin-right: 0.5rem; color: black;">${cat.toUpperCase()}</span>`
        ).join('') : '';
        
        const examples = item.examples && item.examples.length > 0 ? 
            `<p style="color: var(--text-secondary); font-style: italic; margin-top: 0.5rem; padding-left: 1rem; border-left: 3px solid var(--primary-cyan);">"${item.examples[0]}"</p>` : '';
        
        card.innerHTML = `
            <h3 style="color: var(--accent-pink); font-size: 1.4rem; margin-bottom: 0.5rem;">${item.term}</h3>
            <p style="color: var(--text-primary); margin-bottom: 0.5rem; font-size: 1.1rem;">${item.definition}</p>
            ${examples}
            <div style="margin-top: 0.5rem;">${categories}</div>
        `;
        
        container.appendChild(card);
    });
}

function updateStats() {
    const totalElement = document.getElementById('total-words');
    if (totalElement) {
        totalElement.textContent = dictionary.length;
    }
}

function filterByCategory(category) {
    currentCategory = category;
    
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
        searchInput.value = '';
    }
    
    let filtered = currentCategory === 'tous' ? 
        dictionary : 
        dictionary.filter(item => item.categories && item.categories.includes(currentCategory));
    
    displayResults(filtered);
    
    // Mettre à jour l'apparence des boutons
    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// ==================== MOT DU JOUR ====================
function initializeDailyWord() {
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyWordDate');
    
    if (savedDate !== today || !localStorage.getItem('dailyWord')) {
        const randomIndex = Math.floor(Math.random() * dictionary.length);
        const word = dictionary[randomIndex];
        localStorage.setItem('dailyWord', JSON.stringify(word));
        localStorage.setItem('dailyWordDate', today);
    }
    
    const dailyWord = JSON.parse(localStorage.getItem('dailyWord'));
    if (dailyWord) {
        updateDailyWordDisplay(dailyWord);
    }
}

function updateDailyWordDisplay(word) {
    const container = document.querySelector('#accueil .card-base:nth-child(2)');
    if (!container || !word) return;
    
    const category = word.categories && word.categories[0] ? word.categories[0].toUpperCase() : 'ARGOT';
    const example = word.examples && word.examples[0] ? word.examples[0] : `Utilise "${word.term}" dans une phrase`;
    
    const wordSection = container.querySelector('div[style*="background: linear-gradient"]');
    if (wordSection) {
        wordSection.innerHTML = `
            <div style="font-size: 2.5rem; font-weight: bold; color: var(--text-primary); margin: 1rem 0;">
                ${word.term}
            </div>
            <div style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; font-size: 1rem; font-weight: bold; margin: 0.5rem 0;">
                ${category}
            </div>
            <div style="color: white; font-size: 1.1rem; margin: 1rem 0; line-height: 1.4;">
                ${word.definition}
            </div>
            <div style="background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 10px; border-left: 3px solid var(--primary-cyan);">
                <em style="color: var(--text-secondary);">"${example}"</em>
            </div>
        `;
    }
}

// ==================== JEU QUOTIDIEN ====================
function startDailyGame() {
    if (!dictionary || dictionary.length === 0) {
        alert('Le dictionnaire n\'est pas encore chargé. Réessayez dans quelques secondes.');
        return;
    }
    
    dailyGameStarted = true;
    currentQuestionIndex = 0;
    gameScore = 0;
    
    // Générer 10 questions aléatoires
    dailyGameQuestions = [];
    const usedIndexes = new Set();
    
    for (let i = 0; i < 10; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * dictionary.length);
        } while (usedIndexes.has(randomIndex));
        
        usedIndexes.add(randomIndex);
        const word = dictionary[randomIndex];
        
        // Créer les options
        const options = [word.definition];
        const optionIndexes = new Set([randomIndex]);
        
        while (options.length < 4) {
            const optIndex = Math.floor(Math.random() * dictionary.length);
            if (!optionIndexes.has(optIndex)) {
                optionIndexes.add(optIndex);
                options.push(dictionary[optIndex].definition);
            }
        }
        
        const shuffled = options.sort(() => Math.random() - 0.5);
        const correctIndex = shuffled.indexOf(word.definition);
        
        dailyGameQuestions.push({
            word: word.term,
            question: `Que signifie "${word.term}" ?`,
            options: shuffled,
            correctIndex: correctIndex,
            correct: word.definition
        });
    }
    
    // Démarrer le timer
    dailyStartTime = Date.now();
    startDailyTimer();
    
    // Afficher la première question
    showDailyQuestion();
}

function startDailyTimer() {
    const timerDisplay = document.getElementById('timer-display');
    const timerContainer = document.getElementById('daily-timer');
    
    if (timerContainer) {
        timerContainer.style.display = 'block';
    }
    
    dailyTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - dailyStartTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function showDailyQuestion() {
    const container = document.getElementById('daily-game-container');
    const progressDiv = document.getElementById('daily-progress');
    const questionNumberSpan = document.getElementById('daily-question-number');
    
    if (!container || currentQuestionIndex >= dailyGameQuestions.length) {
        endDailyGame();
        return;
    }
    
    const question = dailyGameQuestions[currentQuestionIndex];
    
    if (progressDiv) progressDiv.style.display = 'block';
    if (questionNumberSpan) questionNumberSpan.textContent = currentQuestionIndex + 1;
    
    const questionText = document.getElementById('daily-question-text');
    const dailyWord = document.getElementById('daily-word');
    
    if (questionText) questionText.textContent = question.question;
    if (dailyWord) dailyWord.textContent = question.word;
    
    const optionsDiv = document.getElementById('daily-options');
    if (optionsDiv) {
        optionsDiv.innerHTML = '';
        
        question.options.forEach((option, index) => {
            const btn = document.createElement('button');
            btn.className = 'btn-base nav-btn btn-hover';
            btn.style.cssText = 'width: 100%; margin: 0.5rem 0; padding: 1rem; color: black !important; transition: all 0.3s;';
            btn.textContent = option;
            btn.onclick = () => checkDailyAnswer(index === question.correctIndex, btn);
            
            btn.onmouseover = () => {
                if (!btn.disabled) {
                    btn.style.transform = 'translateY(-2px)';
                    btn.style.boxShadow = '0 5px 15px rgba(255, 0, 255, 0.3)';
                }
            };
            btn.onmouseout = () => {
                if (!btn.disabled) {
                    btn.style.transform = 'translateY(0)';
                    btn.style.boxShadow = 'none';
                }
            };
            
            optionsDiv.appendChild(btn);
        });
    }
    
    const statusEl = document.getElementById('daily-status');
    if (statusEl) {
        statusEl.textContent = `Score: ${gameScore}/${currentQuestionIndex}`;
    }
}

function checkDailyAnswer(isCorrect, button) {
    const allButtons = document.querySelectorAll('#daily-options button');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        gameScore++;
        button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        button.style.transform = 'scale(1.05)';
        button.innerHTML = button.textContent + ' ✅';
    } else {
        button.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
        button.innerHTML = button.textContent + ' ❌';
        
        // Montrer la bonne réponse
        allButtons.forEach((btn, index) => {
            if (dailyGameQuestions[currentQuestionIndex].correctIndex === index) {
                btn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                btn.innerHTML = btn.textContent + ' ✅';
            }
        });
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < dailyGameQuestions.length) {
        setTimeout(() => showDailyQuestion(), 1500);
    } else {
        setTimeout(() => endDailyGame(), 1500);
    }
}

function endDailyGame() {
    clearInterval(dailyTimer);
    
    const elapsed = Math.floor((Date.now() - dailyStartTime) / 1000);
    const finalScore = Math.round((gameScore / 10) * 100);
    
    const container = document.getElementById('daily-game-container');
    if (container) {
        container.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <h3 style="color: var(--accent-pink); font-size: 2rem; margin-bottom: 1rem;">🎉 JEU TERMINÉ !</h3>
                <div style="font-size: 3rem; font-weight: bold; color: var(--primary-cyan); margin: 1rem 0;">
                    ${gameScore}/10
                </div>
                <div style="color: var(--text-secondary); margin: 1rem 0;">
                    Temps: ${Math.floor(elapsed / 60)}:${(elapsed % 60).toString().padStart(2, '0')}
                </div>
                <div style="font-size: 1.5rem; color: var(--accent-green); margin: 1rem 0;">
                    Score final: ${finalScore}%
                </div>
                <button class="play-btn" onclick="location.reload()" style="margin-top: 1rem; color: black !important;">
                    Rejouer
                </button>
            </div>
        `;
    }
    
    // Sauvegarder le score
    const today = new Date().toDateString();
    const scores = JSON.parse(localStorage.getItem('dailyScores') || '[]');
    scores.push({
        date: today,
        score: gameScore,
        time: elapsed
    });
    localStorage.setItem('dailyScores', JSON.stringify(scores));
}

// ==================== JEUX SECTION ====================
function startGame(gameType) {
    if (!dictionary || dictionary.length === 0) {
        alert('Le dictionnaire n\'est pas encore chargé. Réessayez dans quelques secondes.');
        return;
    }
    
    currentGameType = gameType;
    currentQuestionIndex = 0;
    gameScore = 0;
    usedQuestions = [];
    
    // Créer le modal s'il n'existe pas
    let modal = document.getElementById('gameModal');
    if (!modal) {
        createGameModal();
        modal = document.getElementById('gameModal');
    }
    
    modal.style.display = 'flex';
    
    const modalTitle = document.getElementById('modalTitle');
    const titles = {
        'verlan': 'Quiz Verlan 🔄',
        'regional': 'Quiz Régional 🌍',
        'expert': 'Quiz Expert 🏆',
        'mystery': 'Le Mot Mystère 🕵️',
        'challenge': 'Défis Argot 🎯',
        'generations': 'Ancien vs Nouveau ⏰'
    };
    
    if (modalTitle) {
        modalTitle.textContent = titles[gameType] || 'Quiz';
    }
    
    showNextQuestion();
}

function createGameModal() {
    const modal = document.createElement('div');
    modal.id = 'gameModal';
    modal.style.cssText = `
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 1000;
        align-items: center;
        justify-content: center;
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="background: var(--bg-card); border-radius: 20px; padding: 2rem; max-width: 600px; width: 90%; max-height: 80vh; overflow-y: auto;">
            <button onclick="closeModal()" style="float: right; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
            <div id="modalTitle" style="text-align: center; font-size: 2rem; color: var(--primary-cyan); margin-bottom: 1.5rem;">Quiz</div>
            <div id="question" style="text-align: center; font-size: 1.3rem; color: white; margin-bottom: 2rem;">Question</div>
            <div id="answers" style="display: flex; flex-direction: column; gap: 0.5rem;"></div>
            <div id="gameScore" style="text-align: center; color: var(--text-secondary); margin-top: 2rem;">Score: 0</div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fermer si on clique en dehors
    modal.onclick = function(e) {
        if (e.target === modal) {
            closeModal();
        }
    };
}

function showNextQuestion() {
    if (currentQuestionIndex >= 5) {
        endGame();
        return;
    }
    
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const scoreEl = document.getElementById('gameScore');
    
    if (!questionEl || !answersEl) return;
    
    scoreEl.textContent = `Question ${currentQuestionIndex + 1}/5 | Score: ${gameScore}`;
    answersEl.innerHTML = '';
    
    // Générer une question selon le type de jeu
    let questionData;
    
    switch(currentGameType) {
        case 'mystery':
            questionData = generateMysteryQuestion();
            break;
        case 'challenge':
            questionData = generateChallengeQuestion();
            break;
        case 'generations':
            questionData = generateGenerationsQuestion();
            break;
        case 'verlan':
            questionData = generateVerlanQuestion();
            break;
        case 'regional':
            questionData = generateRegionalQuestion();
            break;
        case 'expert':
            questionData = generateExpertQuestion();
            break;
        default:
            questionData = generateBasicQuestion();
    }
    
    questionEl.innerHTML = questionData.question;
    
    // Créer les boutons de réponse
    questionData.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.style.cssText = `
            width: 100%;
            padding: 1rem;
            margin: 0.5rem 0;
            background: var(--bg-card);
            color: white;
            border: 2px solid var(--primary-cyan);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s;
        `;
        btn.textContent = option;
        btn.dataset.correct = (index === questionData.correctIndex) ? 'true' : 'false';
        
        btn.onclick = () => checkAnswer(index === questionData.correctIndex, btn);
        
        btn.onmouseover = () => {
            if (!btn.disabled) {
                btn.style.background = 'var(--primary-cyan)';
                btn.style.color = 'black';
                btn.style.transform = 'scale(1.02)';
            }
        };
        btn.onmouseout = () => {
            if (!btn.disabled) {
                btn.style.background = 'var(--bg-card)';
                btn.style.color = 'white';
                btn.style.transform = 'scale(1)';
            }
        };
        
        answersEl.appendChild(btn);
    });
}

// ==================== GÉNÉRATEURS DE QUESTIONS PAR TYPE ====================

function generateMysteryQuestion() {
    // Le Mot Mystère : deviner avec des indices
    let word;
    do {
        word = dictionary[Math.floor(Math.random() * dictionary.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const question = `
        <div style="color: var(--accent-pink);">🕵️ TROUVE LE MOT MYSTÈRE</div>
        <div style="margin-top: 1rem; text-align: left; background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 10px;">
            <div>📝 Définition : "${word.definition}"</div>
            <div>🔤 ${word.term.length} lettres</div>
            <div>🔡 Commence par "${word.term[0].toUpperCase()}"</div>
        </div>
    `;
    
    const options = [word.term];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.term)) {
            options.push(other.term);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.term)
    };
}

function generateChallengeQuestion() {
    // Challenge : défi varié
    const challengeTypes = ['synonym', 'opposite', 'category'];
    const type = challengeTypes[Math.floor(Math.random() * challengeTypes.length)];
    
    let word;
    do {
        word = dictionary[Math.floor(Math.random() * dictionary.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    let question, correctAnswer;
    
    switch(type) {
        case 'synonym':
            question = `<div style="color: var(--primary-cyan);">🎯 TROUVE LE SYNONYME</div>
                       <div style="margin-top: 1rem;">Quel mot a un sens proche de <strong>"${word.term}"</strong> ?</div>
                       <div style="color: var(--text-secondary); font-size: 0.9rem;">(${word.definition})</div>`;
            correctAnswer = word.definition;
            break;
        case 'category':
            const category = word.categories && word.categories[0] ? word.categories[0] : 'argot';
            question = `<div style="color: var(--accent-green);">🎯 TROUVE LA CATÉGORIE</div>
                       <div style="margin-top: 1rem;">Dans quelle catégorie classe-t-on <strong>"${word.term}"</strong> ?</div>`;
            correctAnswer = category.toUpperCase();
            break;
        default:
            question = `<div style="color: var(--accent-pink);">🎯 DÉFI</div>
                       <div style="margin-top: 1rem;">Que signifie <strong>"${word.term}"</strong> ?</div>`;
            correctAnswer = word.definition;
    }
    
    const options = type === 'category' ? 
        ['VERLAN', 'JEUNES', 'ANCIEN', 'RÉGIONAL'] :
        [correctAnswer];
    
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        const opt = type === 'category' ? 
            (other.categories && other.categories[0] ? other.categories[0].toUpperCase() : 'ARGOT') :
            other.definition;
        if (!options.includes(opt)) {
            options.push(opt);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(correctAnswer)
    };
}

function generateGenerationsQuestion() {
    // Ancien vs Nouveau
    const oldWords = dictionary.filter(w => w.categories && w.categories.includes('ancien'));
    const newWords = dictionary.filter(w => w.categories && (w.categories.includes('jeunes') || w.categories.includes('internet')));
    
    const isOld = Math.random() < 0.5;
    const pool = isOld ? oldWords : newWords;
    
    if (pool.length === 0) {
        return generateBasicQuestion();
    }
    
    let word;
    do {
        word = pool[Math.floor(Math.random() * pool.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const badge = isOld ? 
        '<span style="background: #ffd700; color: black; padding: 0.5rem; border-radius: 10px;">👴 ANCIEN</span>' :
        '<span style="background: #00ffff; color: black; padding: 0.5rem; border-radius: 10px;">🆕 MODERNE</span>';
    
    const question = `
        <div>${badge}</div>
        <div style="margin-top: 1rem;">Que signifie <strong>"${word.term}"</strong> ?</div>
    `;
    
    const options = [word.definition];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.definition)) {
            options.push(other.definition);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.definition)
    };
}

function generateVerlanQuestion() {
    const verlanWords = dictionary.filter(w => w.categories && w.categories.includes('verlan'));
    
    if (verlanWords.length === 0) {
        return generateBasicQuestion();
    }
    
    let word;
    do {
        word = verlanWords[Math.floor(Math.random() * verlanWords.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const question = `
        <div style="background: linear-gradient(45deg, #ff0080, #00ffff); padding: 0.5rem; border-radius: 10px; color: black;">
            🔄 VERLAN
        </div>
        <div style="margin-top: 1rem; font-size: 2rem; color: var(--accent-pink);">"${word.term}"</div>
        <div style="color: var(--text-secondary);">C'est quoi en français ?</div>
    `;
    
    const options = [word.definition];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.definition)) {
            options.push(other.definition);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.definition)
    };
}

function generateRegionalQuestion() {
    const regions = ['marseille', 'quebec', 'belgique', 'suisse', 'senegal', 'nord'];
    const regionalWords = dictionary.filter(w => 
        w.categories && w.categories.some(cat => regions.includes(cat))
    );
    
    if (regionalWords.length === 0) {
        return generateBasicQuestion();
    }
    
    let word;
    do {
        word = regionalWords[Math.floor(Math.random() * regionalWords.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const region = word.categories.find(cat => regions.includes(cat));
    const regionEmoji = {
        'marseille': '🌊 MARSEILLE',
        'quebec': '🍁 QUÉBEC',
        'belgique': '🍟 BELGIQUE',
        'suisse': '🏔️ SUISSE',
        'senegal': '🦁 SÉNÉGAL',
        'nord': '⛏️ NORD'
    };
    
    const question = `
        <div style="background: var(--gradient-primary); color: black; padding: 0.5rem; border-radius: 10px;">
            ${regionEmoji[region] || '🌍 RÉGIONAL'}
        </div>
        <div style="margin-top: 1rem;">Que signifie <strong>"${word.term}"</strong> ?</div>
    `;
    
    const options = [word.definition];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.definition)) {
            options.push(other.definition);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.definition)
    };
}

function generateExpertQuestion() {
    // Questions difficiles avec des mots rares
    const difficultWords = dictionary.filter(w => 
        w.categories && (w.categories.includes('ancien') || w.categories.includes('cite'))
    );
    
    const pool = difficultWords.length > 0 ? difficultWords : dictionary;
    
    let word;
    do {
        word = pool[Math.floor(Math.random() * pool.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const question = `
        <div style="background: linear-gradient(45deg, #ffd700, #ff6b6b); color: black; padding: 0.5rem; border-radius: 10px;">
            🏆 NIVEAU EXPERT
        </div>
        <div style="margin-top: 1rem;">Que signifie <strong>"${word.term}"</strong> ?</div>
    `;
    
    const options = [word.definition];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.definition)) {
            options.push(other.definition);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.definition)
    };
}

function generateBasicQuestion() {
    // Question basique de secours
    let word;
    do {
        word = dictionary[Math.floor(Math.random() * dictionary.length)];
    } while (usedQuestions.includes(word.term));
    usedQuestions.push(word.term);
    
    const question = `<div>Que signifie <strong>"${word.term}"</strong> ?</div>`;
    
    const options = [word.definition];
    while (options.length < 4) {
        const other = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(other.definition)) {
            options.push(other.definition);
        }
    }
    
    const shuffled = options.sort(() => Math.random() - 0.5);
    
    return {
        question: question,
        options: shuffled,
        correctIndex: shuffled.indexOf(word.definition)
    };
}

function checkAnswer(isCorrect, button) {
    // Désactiver tous les boutons
    const allButtons = document.querySelectorAll('#answers button');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        gameScore++;
        button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        button.innerHTML = button.textContent + ' ✅';
    } else {
        button.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
        button.innerHTML = button.textContent + ' ❌';
        
        // Montrer la bonne réponse
        allButtons.forEach(btn => {
            if (btn.dataset.correct === 'true') {
                btn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                btn.innerHTML = btn.textContent.replace(' ❌', '') + ' ✅';
            }
        });
    }
    
    currentQuestionIndex++;
    
    setTimeout(() => {
        showNextQuestion();
    }, 1500);
}

function endGame() {
    const modal = document.getElementById('gameModal');
    const modalContent = modal.querySelector('.modal-content');
    
    const percentage = (gameScore / 5) * 100;
    let message = '';
    
    if (percentage === 100) message = '🏆 PARFAIT !';
    else if (percentage >= 80) message = '🎉 Excellent !';
    else if (percentage >= 60) message = '👍 Bien joué !';
    else if (percentage >= 40) message = '💪 Pas mal !';
    else message = '📚 Continue à t\'entraîner !';
    
    modalContent.innerHTML = `
        <button onclick="closeModal()" style="float: right; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
        <div style="text-align: center; padding: 2rem;">
            <h2 style="color: var(--primary-cyan); margin-bottom: 2rem;">Résultats</h2>
            <div style="font-size: 3rem; font-weight: bold; color: var(--accent-pink);">
                ${gameScore}/5
            </div>
            <div style="font-size: 1.5rem; color: var(--text-secondary); margin: 1rem 0;">
                ${percentage}%
            </div>
            <div style="color: white; font-size: 1.2rem; margin: 2rem 0;">
                ${message}
            </div>
            <button onclick="closeModal()" class="play-btn" style="color: black !important;">
                Fermer
            </button>
        </div>
    `;
    
    // Sauvegarder les points
    const points = parseInt(localStorage.getItem('userPoints') || '0') + (gameScore * 10);
    localStorage.setItem('userPoints', points.toString());
    
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.textContent = `${points} points`;
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// ==================== COUNTDOWN ====================
function startCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;
    
    setInterval(() => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const diff = tomorrow - now;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        countdownEl.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// ==================== INITIALISATION ====================
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM chargé - Initialisation...');
    
    // Recherche principale
    const mainSearchInput = document.getElementById('main-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterDictionary);
        console.log('Recherche dictionnaire activée');
    }
    
    // Recherche accueil
    const homeSearchInput = document.getElementById('home-search');
    if (homeSearchInput) {
        homeSearchInput.addEventListener('input', filterHomeSearch);
        console.log('Recherche accueil activée');
    }
    
    // Countdown
    startCountdown();
    
    // Points utilisateur
    const savedPoints = localStorage.getItem('userPoints') || '245';
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.textContent = `${savedPoints} points`;
    }
    
    console.log('Initialisation terminée');
});
