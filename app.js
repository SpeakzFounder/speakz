// Charger le dictionnaire depuis dictionary.json
let dictionary = [];
let currentCategory = 'tous';
let currentGameType = '';
let currentQuestionIndex = 0;
let gameScore = 0;
let dailyGameStarted = false;
let dailyGameQuestions = [];
let dailyTimer = null;
let dailyStartTime = null;

// Empêcher le FOUC (Flash of Unstyled Content)
if (document.readyState === 'loading') {
    document.documentElement.style.visibility = 'hidden';
    document.addEventListener('DOMContentLoaded', () => {
        document.documentElement.style.visibility = 'visible';
    });
}

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
    const activeBtn = document.querySelector(`[onclick="showSection('${sectionId}')"]`);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }
}

// ==================== RECHERCHE ====================
function filterDictionary() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase();
    
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

// Fonction de recherche accueil
function filterHomeSearch() {
    const searchTerm = document.getElementById('home-search').value.toLowerCase();
    const resultsContainer = document.getElementById('home-results-container');
    
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

// Affichage résultats accueil
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
        
        const categories = item.categories ? item.categories.map(cat => 
            `<span class="category-badge">${cat.toUpperCase()}</span>`
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

// Fonction d'affichage des résultats du dictionnaire
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
        
        const categories = item.categories ? item.categories.map(cat => 
            `<span class="category-badge">${cat.toUpperCase()}</span>`
        ).join('') : '';
        
        const examples = item.examples && item.examples.length > 0 ? 
            `<p class="word-example" style="color: var(--text-secondary); font-style: italic; margin-top: 0.5rem;">"${item.examples[0]}"</p>` : '';
        
        card.innerHTML = `
            <h3 class="word-term" style="color: var(--accent-pink); font-size: 1.4rem; margin-bottom: 0.5rem;">${item.term}</h3>
            <p class="word-definition" style="color: var(--text-primary); margin-bottom: 0.5rem;">${item.definition}</p>
            ${examples}
            <div class="word-categories" style="margin-top: 0.5rem;">${categories}</div>
        `;
        
        container.appendChild(card);
    });
}

// Mise à jour des statistiques
function updateStats() {
    const totalElement = document.getElementById('total-words');
    if (totalElement) {
        totalElement.textContent = dictionary.length;
    }
}

// Filtrer par catégorie
function filterByCategory(category) {
    currentCategory = category;
    
    // Réinitialiser la recherche
    const searchInput = document.getElementById('main-search');
    if (searchInput) {
        searchInput.value = '';
    }
    
    // Filtrer les résultats
    let filtered = currentCategory === 'tous' ? 
        dictionary : 
        dictionary.filter(item => item.categories && item.categories.includes(currentCategory));
    
    displayResults(filtered);
    
    // Mettre à jour l'apparence des boutons
    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.closest('.category-button').classList.add('active');
    }
}

// ==================== MOT DU JOUR ====================
function initializeDailyWord() {
    // Sélectionner un mot aléatoire pour aujourd'hui
    const today = new Date().toDateString();
    const savedDate = localStorage.getItem('dailyWordDate');
    
    if (savedDate !== today) {
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
    if (!container) return;
    
    const category = word.categories && word.categories[0] ? word.categories[0].toUpperCase() : 'ARGOT';
    const example = word.examples && word.examples[0] ? word.examples[0] : `Utilise "${word.term}" dans une phrase`;
    
    container.innerHTML = `
        <h3 style="color: var(--accent-pink); font-size: 1.5rem; margin-bottom: 1rem; font-family: 'Orbitron', monospace;">
            📚 MOT DU JOUR
        </h3>
        <div style="background: linear-gradient(45deg, rgba(255, 20, 147, 0.2), rgba(255, 0, 255, 0.2)); padding: 1.5rem; border-radius: 15px; margin: 1rem 0;">
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
        </div>
        <button class="btn-base nav-btn btn-hover" onclick="showSection('dictionnaire')" style="color: black !important; margin-top: 1rem;">
            Découvrir plus de mots
        </button>
    `;
}

// ==================== JEU QUOTIDIEN ====================
function startDailyGame() {
    dailyGameStarted = true;
    currentQuestionIndex = 0;
    gameScore = 0;
    
    // Générer 10 questions aléatoires
    dailyGameQuestions = generateQuizQuestions(10);
    
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
    
    // Animation de transition entre questions
    container.style.animation = 'questionSlideIn 0.5s ease-out';
    
    const questionText = document.getElementById('daily-question-text');
    const dailyWord = document.getElementById('daily-word');
    
    if (questionText) {
        questionText.style.animation = 'fadeInScale 0.4s ease-out';
        questionText.textContent = question.question;
    }
    
    if (dailyWord) {
        dailyWord.style.animation = 'wordBounce 0.6s ease-out';
        dailyWord.innerHTML = `
            <span style="display: inline-block; animation: letterWave 0.5s ease-out;">
                ${question.word.split('').map((letter, i) => 
                    `<span style="animation-delay: ${i * 0.05}s; display: inline-block;">${letter}</span>`
                ).join('')}
            </span>
        `;
    }
    
    const optionsDiv = document.getElementById('daily-options');
    optionsDiv.innerHTML = '';
    optionsDiv.style.opacity = '0';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'btn-base nav-btn btn-hover daily-option-btn';
        btn.style.cssText = `
            width: 100%; 
            margin: 0.5rem 0; 
            padding: 1rem; 
            color: black !important;
            position: relative;
            overflow: hidden;
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateY(20px) scale(0.9);
            animation: optionSlideUp ${0.4 + index * 0.1}s ease-out forwards;
            animation-delay: ${index * 0.1}s;
            background: linear-gradient(135deg, var(--primary-cyan, #00ffff), var(--accent-pink, #ff0080));
            background-size: 200% 200%;
            background-position: 0% 50%;
        `;
        
        // Créer un effet de vague au survol
        btn.innerHTML = `
            <span style="position: relative; z-index: 2;">${option}</span>
            <span class="wave-effect" style="
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: translate(-50%, -50%);
                transition: width 0.6s, height 0.6s;
            "></span>
        `;
        
        btn.onclick = () => {
            // Effet d'onde au clic
            const wave = btn.querySelector('.wave-effect');
            wave.style.width = '300px';
            wave.style.height = '300px';
            wave.style.opacity = '0';
            
            setTimeout(() => {
                checkDailyAnswer(index === question.correctIndex, btn);
            }, 300);
        };
        
        // Effet hover amélioré avec animation du gradient
        btn.onmouseover = () => {
            if (!btn.disabled) {
                btn.style.transform = 'translateY(-3px) scale(1.05)';
                btn.style.boxShadow = '0 10px 25px rgba(255, 0, 255, 0.4)';
                btn.style.backgroundPosition = '100% 50%';
            }
        };
        btn.onmouseout = () => {
            if (!btn.disabled) {
                btn.style.transform = 'translateY(0) scale(1)';
                btn.style.boxShadow = 'none';
                btn.style.backgroundPosition = '0% 50%';
                const wave = btn.querySelector('.wave-effect');
                wave.style.width = '0';
                wave.style.height = '0';
                wave.style.opacity = '1';
            }
        };
        
        optionsDiv.appendChild(btn);
    });
    
    // Animation d'apparition des options
    setTimeout(() => {
        optionsDiv.style.opacity = '1';
    }, 200);
    
    document.getElementById('daily-status').innerHTML = `
        <div style="display: flex; justify-content: center; gap: 0.5rem; margin-top: 1rem;">
            ${Array.from({length: 10}, (_, i) => `
                <div style="
                    width: 30px;
                    height: 4px;
                    background: ${i < currentQuestionIndex ? 
                        (dailyGameQuestions[i] && gameScore > i ? '#00ff00' : '#ff0000') : 
                        'rgba(255,255,255,0.2)'};
                    border-radius: 2px;
                    transition: all 0.3s ease;
                    animation: ${i === currentQuestionIndex ? 'pulse 1s infinite' : 'none'};
                "></div>
            `).join('')}
        </div>
        <div style="margin-top: 0.5rem; color: var(--text-secondary);">
            Score: ${gameScore}/${currentQuestionIndex}
        </div>
    `;
}

function checkDailyAnswer(isCorrect, button) {
    const allButtons = document.querySelectorAll('#daily-options button');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        gameScore++;
        
        // Animation de succès spectaculaire
        button.style.animation = 'successPulse 0.6s ease-out';
        button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        button.style.transform = 'scale(1.1)';
        button.innerHTML = `
            <span style="display: inline-block; animation: checkmarkDraw 0.5s ease-out;">
                ${button.textContent} ✅
            </span>
        `;
        
        // Créer plusieurs couches de particules
        for (let i = 0; i < 3; i++) {
            setTimeout(() => createBurstParticles(button, 'success'), i * 100);
        }
        
        // Effet de pulsation sur le conteneur
        const container = document.getElementById('daily-game-container');
        container.style.animation = 'successGlow 0.5s ease-out';
        
    } else {
        // Animation d'erreur avec effet de secousse
        button.style.animation = 'errorShake 0.6s ease-out';
        button.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
        button.innerHTML = `
            <span style="display: inline-block; animation: crossFade 0.5s ease-out;">
                ${button.textContent} ❌
            </span>
        `;
        
        // Créer des particules d'erreur qui tombent
        createFallingParticles(button, 'error');
        
        // Montrer la bonne réponse avec animation
        allButtons.forEach((btn, index) => {
            if (dailyGameQuestions[currentQuestionIndex].correctIndex === index) {
                setTimeout(() => {
                    btn.style.animation = 'correctReveal 0.8s ease-out';
                    btn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                    btn.innerHTML = `
                        <span style="display: inline-block; animation: bounceIn 0.5s ease-out;">
                            ${btn.textContent} ✅
                        </span>
                    `;
                }, 300);
            }
        });
    }
    
    // Feedback visuel amélioré
    showEnhancedFeedback(isCorrect ? '🎉 Excellent !' : '😅 Raté !', isCorrect ? 'success' : 'error');
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < dailyGameQuestions.length) {
        setTimeout(() => {
            // Transition fluide avec effet de fondu et glissement
            const container = document.getElementById('daily-game-container');
            container.style.animation = 'slideOutLeft 0.4s ease-in';
            
            setTimeout(() => {
                showDailyQuestion();
                container.style.animation = 'slideInRight 0.4s ease-out';
            }, 400);
        }, 1800);
    } else {
        setTimeout(() => endDailyGame(), 2000);
    }
}

// Créer des particules en explosion
function createBurstParticles(element, type) {
    const rect = element.getBoundingClientRect();
    const particles = 20;
    const colors = type === 'success' 
        ? ['#00ff00', '#00cc00', '#00ffff', '#ffff00'] 
        : ['#ff0000', '#cc0000', '#ff00ff', '#ff6600'];
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const angle = (360 / particles) * i;
        const velocity = 50 + Math.random() * 100;
        
        particle.style.cssText = `
            position: fixed;
            width: ${6 + Math.random() * 8}px;
            height: ${6 + Math.random() * 8}px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 10000;
            box-shadow: 0 0 ${10 + Math.random() * 10}px ${colors[0]};
        `;
        
        document.body.appendChild(particle);
        
        // Animation de l'explosion
        particle.animate([
            { 
                transform: 'translate(-50%, -50%) scale(0)',
                opacity: 1
            },
            { 
                transform: `translate(calc(-50% + ${Math.cos(angle * Math.PI / 180) * velocity}px), 
                           calc(-50% + ${Math.sin(angle * Math.PI / 180) * velocity}px)) scale(1.5)`,
                opacity: 0.8
            },
            { 
                transform: `translate(calc(-50% + ${Math.cos(angle * Math.PI / 180) * velocity * 2}px), 
                           calc(-50% + ${Math.sin(angle * Math.PI / 180) * velocity * 2}px)) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Créer des particules qui tombent
function createFallingParticles(element, type) {
    const rect = element.getBoundingClientRect();
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        const startX = rect.left + Math.random() * rect.width;
        
        particle.style.cssText = `
            position: fixed;
            width: ${4 + Math.random() * 6}px;
            height: ${4 + Math.random() * 6}px;
            background: linear-gradient(45deg, #ff0000, #ff6600);
            border-radius: 50%;
            left: ${startX}px;
            top: ${rect.top}px;
            pointer-events: none;
            z-index: 10000;
        `;
        
        document.body.appendChild(particle);
        
        particle.animate([
            { 
                transform: 'translateY(0) rotate(0deg)',
                opacity: 1
            },
            { 
                transform: `translateY(${100 + Math.random() * 100}px) rotate(${Math.random() * 360}deg)`,
                opacity: 0
            }
        ], {
            duration: 1000 + Math.random() * 500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            delay: i * 50
        });
        
        setTimeout(() => particle.remove(), 1500);
    }
}

// Feedback visuel amélioré
function showEnhancedFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(0) rotate(-10deg);
        padding: 1.5rem 3rem;
        background: ${type === 'success' 
            ? 'linear-gradient(135deg, rgba(0, 255, 0, 0.9), rgba(0, 204, 0, 0.9))' 
            : 'linear-gradient(135deg, rgba(255, 0, 0, 0.9), rgba(204, 0, 0, 0.9))'};
        border: 3px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        border-radius: 20px;
        color: white;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10001;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 
                    0 0 60px ${type === 'success' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(255, 0, 0, 0.5)'};
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        animation: feedbackBounce 0.6s ease-out forwards;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.style.animation = 'feedbackFadeOut 0.4s ease-in forwards';
        setTimeout(() => feedback.remove(), 400);
    }, 1200);
}

function endDailyGame() {
    clearInterval(dailyTimer);
    
    const elapsed = Math.floor((Date.now() - dailyStartTime) / 1000);
    const finalScore = Math.round((gameScore / 10) * 100);
    
    const container = document.getElementById('daily-game-container');
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
            <button class="play-btn" onclick="resetDailyGame()" style="margin-top: 1rem; color: black !important;">
                Rejouer demain
            </button>
        </div>
    `;
    
    // Sauvegarder le score
    saveDailyScore(gameScore, elapsed);
}

function resetDailyGame() {
    location.reload();
}

function saveDailyScore(score, time) {
    const today = new Date().toDateString();
    const scores = JSON.parse(localStorage.getItem('dailyScores') || '[]');
    scores.push({
        date: today,
        score: score,
        time: time
    });
    localStorage.setItem('dailyScores', JSON.stringify(scores));
}

// ==================== JEUX ====================
let usedQuestions = []; // Pour éviter les répétitions

function startGame(gameType) {
    currentGameType = gameType;
    currentQuestionIndex = 0;
    gameScore = 0;
    usedQuestions = []; // Réinitialiser les questions utilisées
    
    // Toujours recréer le modal pour éviter les problèmes
    createOrUpdateGameModal();
    
    const modal = document.getElementById('gameModal');
    
    // Définir le titre selon le type de jeu
    const titles = {
        'verlan': 'Quiz Verlan 🔄',
        'regional': 'Quiz Régional 🌍',
        'expert': 'Quiz Expert 🏆',
        'mystery': 'Le Mot Mystère 🕵️',
        'challenge': 'Argot Challenge 🎯',
        'generations': 'Ancien vs Nouveau ⏰'
    };
    
    const modalTitle = document.getElementById('modalTitle');
    if (modalTitle) {
        modalTitle.textContent = titles[gameType] || 'Quiz';
    }
    
    if (modal) {
        modal.style.display = 'flex';
    }
    
    // Petite pause pour s'assurer que le DOM est prêt
    setTimeout(() => {
        showGameQuestion(gameType);
    }, 100);
}

function showGameQuestion(gameType) {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const scoreEl = document.getElementById('gameScore');
    
    if (!questionEl || !answersEl || !scoreEl) {
        setTimeout(() => showGameQuestion(gameType), 100);
        return;
    }
    
    if (currentQuestionIndex >= 5) {
        endGame();
        return;
    }
    
    scoreEl.textContent = `Question ${currentQuestionIndex + 1}/5 | Score: ${gameScore}`;
    answersEl.innerHTML = '';
    answersEl.style.opacity = '0';
    
    // Générer une question selon le type de jeu
    switch(gameType) {
        case 'mystery':
            showMysteryGame();
            break;
        case 'challenge':
            showChallengeGame();
            break;
        case 'generations':
            showGenerationsGame();
            break;
        case 'verlan':
            showVerlanGame();
            break;
        case 'regional':
            showRegionalGame();
            break;
        default:
            showClassicQuiz(gameType);
    }
    
    setTimeout(() => {
        answersEl.style.opacity = '1';
    }, 100);
}

// JEU MYSTÈRE : Deviner le mot avec 3 indices
function showMysteryGame() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    
    // Sélectionner un mot non utilisé
    let randomWord;
    do {
        randomWord = dictionary[Math.floor(Math.random() * dictionary.length)];
    } while (usedQuestions.includes(randomWord.term));
    usedQuestions.push(randomWord.term);
    
    // Créer 3 indices
    const indices = [
        `📝 Définition : "${randomWord.definition}"`,
        `📚 Catégorie : ${randomWord.categories ? randomWord.categories[0].toUpperCase() : 'ARGOT'}`,
        `🔤 ${randomWord.term.length} lettres, commence par "${randomWord.term[0].toUpperCase()}"`
    ];
    
    questionEl.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--accent-pink); margin-bottom: 1rem;">🕵️ Trouve le mot mystère !</h3>
            <div style="text-align: left; background: rgba(0,255,255,0.1); padding: 1rem; border-radius: 10px; margin-bottom: 1rem;">
                ${indices.map((indice, i) => `
                    <div style="margin: 0.5rem 0; animation: slideIn ${0.3 + i * 0.2}s ease-out;">
                        ${indice}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    // Créer les options
    const options = [randomWord.term];
    while (options.length < 4) {
        const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.term) && 
            randomOption.term.length === randomWord.term.length) {
            options.push(randomOption.term);
        } else if (options.length < 4 && !options.includes(randomOption.term)) {
            options.push(randomOption.term);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    createAnswerButtons(options, randomWord.term);
}

// JEU CHALLENGE : Compléter la phrase
function showChallengeGame() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    
    // Sélectionner un mot avec exemple
    let randomWord;
    do {
        const wordsWithExamples = dictionary.filter(w => w.examples && w.examples.length > 0);
        if (wordsWithExamples.length === 0) {
            showClassicQuiz('challenge');
            return;
        }
        randomWord = wordsWithExamples[Math.floor(Math.random() * wordsWithExamples.length)];
    } while (usedQuestions.includes(randomWord.term));
    usedQuestions.push(randomWord.term);
    
    // Remplacer le mot dans l'exemple par des blancs
    const example = randomWord.examples[0];
    const blankedExample = example.replace(new RegExp(randomWord.term, 'gi'), '_____');
    
    questionEl.innerHTML = `
        <div style="text-align: center;">
            <h3 style="color: var(--primary-cyan); margin-bottom: 1rem;">🎯 Complète la phrase !</h3>
            <div style="background: linear-gradient(45deg, rgba(255,0,255,0.1), rgba(0,255,255,0.1)); 
                        padding: 1.5rem; border-radius: 15px; font-size: 1.2rem; color: white;">
                "${blankedExample}"
            </div>
            <div style="margin-top: 1rem; color: var(--text-secondary); font-size: 0.9rem;">
                Quel mot manque ?
            </div>
        </div>
    `;
    
    // Options
    const options = [randomWord.term];
    while (options.length < 4) {
        const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.term)) {
            options.push(randomOption.term);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    createAnswerButtons(options, randomWord.term);
}

// JEU GÉNÉRATIONS : Ancien vs Nouveau
function showGenerationsGame() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    
    // Sélectionner un mot ancien ou jeune
    const categories = ['ancien', 'jeunes', 'internet', 'slang'];
    const filteredWords = dictionary.filter(w => 
        w.categories && w.categories.some(cat => categories.includes(cat))
    );
    
    if (filteredWords.length === 0) {
        showClassicQuiz('generations');
        return;
    }
    
    let randomWord;
    do {
        randomWord = filteredWords[Math.floor(Math.random() * filteredWords.length)];
    } while (usedQuestions.includes(randomWord.term));
    usedQuestions.push(randomWord.term);
    
    const isOld = randomWord.categories.includes('ancien');
    const era = isOld ? '👴 ANCIEN ARGOT' : '🆕 NOUVEL ARGOT';
    const eraColor = isOld ? '#ffd700' : '#00ffff';
    
    questionEl.innerHTML = `
        <div style="text-align: center;">
            <div style="background: ${eraColor}; color: black; padding: 0.5rem 1rem; 
                        border-radius: 20px; display: inline-block; margin-bottom: 1rem; 
                        font-weight: bold;">
                ${era}
            </div>
            <h3 style="color: white; margin-bottom: 1rem;">
                Que signifie "${randomWord.term}" ?
            </h3>
        </div>
    `;
    
    // Options basées sur la même époque
    const options = [randomWord.definition];
    const sameEraWords = filteredWords.filter(w => 
        w.categories.includes(isOld ? 'ancien' : 'jeunes') || 
        w.categories.includes(isOld ? 'ancien' : 'internet')
    );
    
    while (options.length < 4) {
        const randomOption = sameEraWords.length > 3 ? 
            sameEraWords[Math.floor(Math.random() * sameEraWords.length)] :
            dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.definition)) {
            options.push(randomOption.definition);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    createAnswerButtons(options, randomWord.definition);
}

// JEU VERLAN : Spécial verlan
function showVerlanGame() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    
    const verlanWords = dictionary.filter(w => w.categories && w.categories.includes('verlan'));
    if (verlanWords.length === 0) {
        showClassicQuiz('verlan');
        return;
    }
    
    let randomWord;
    do {
        randomWord = verlanWords[Math.floor(Math.random() * verlanWords.length)];
    } while (usedQuestions.includes(randomWord.term));
    usedQuestions.push(randomWord.term);
    
    questionEl.innerHTML = `
        <div style="text-align: center;">
            <div style="background: linear-gradient(45deg, #ff0080, #00ffff); 
                        padding: 0.5rem 1rem; border-radius: 20px; 
                        display: inline-block; margin-bottom: 1rem;">
                <span style="font-size: 1.5rem;">🔄</span> VERLAN
            </div>
            <h3 style="color: var(--accent-pink); font-size: 2rem; margin: 1rem 0;">
                "${randomWord.term}"
            </h3>
            <p style="color: var(--text-secondary);">C'est quoi en français ?</p>
        </div>
    `;
    
    const options = [randomWord.definition];
    while (options.length < 4) {
        const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.definition)) {
            options.push(randomOption.definition);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    createAnswerButtons(options, randomWord.definition);
}

// JEU RÉGIONAL : Argot régional
function showRegionalGame() {
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    
    const regions = ['marseille', 'quebec', 'belgique', 'suisse', 'senegal', 'nord'];
    const regionalWords = dictionary.filter(w => 
        w.categories && w.categories.some(cat => regions.includes(cat))
    );
    
    if (regionalWords.length === 0) {
        showClassicQuiz('regional');
        return;
    }
    
    let randomWord;
    do {
        randomWord = regionalWords[Math.floor(Math.random() * regionalWords.length)];
    } while (usedQuestions.includes(randomWord.term));
    usedQuestions.push(randomWord.term);
    
    const region = randomWord.categories.find(cat => regions.includes(cat));
    const regionEmoji = {
        'marseille': '🌊 MARSEILLE',
        'quebec': '🍁 QUÉBEC',
        'belgique': '🍟 BELGIQUE',
        'suisse': '🏔️ SUISSE',
        'senegal': '🦁 SÉNÉGAL',
        'nord': '⛏️ NORD'
    };
    
    questionEl.innerHTML = `
        <div style="text-align: center;">
            <div style="background: var(--gradient-primary); color: black; 
                        padding: 0.5rem 1rem; border-radius: 20px; 
                        display: inline-block; margin-bottom: 1rem; font-weight: bold;">
                ${regionEmoji[region] || '🌍 RÉGIONAL'}
            </div>
            <h3 style="color: white; margin-bottom: 1rem;">
                "${randomWord.term}"
            </h3>
            <p style="color: var(--text-secondary);">Qu'est-ce que ça veut dire ?</p>
        </div>
    `;
    
    const options = [randomWord.definition];
    while (options.length < 4) {
        const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.definition)) {
            options.push(randomOption.definition);
        }
    }
    
    options.sort(() => Math.random() - 0.5);
    createAnswerButtons(options, randomWord.definition);
}

// Quiz classique (fallback)
function showClassicQuiz(gameType) {
    showNextQuestion();
}

// Créer les boutons de réponse
function createAnswerButtons(options, correctAnswer) {
    const answersEl = document.getElementById('answers');
    
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.dataset.correct = option === correctAnswer ? 'true' : 'false';
        btn.onclick = () => checkAnswer(option === correctAnswer, btn);
        btn.style.cssText = `
            width: 100%; 
            padding: 1rem; 
            margin: 0.5rem 0; 
            background: linear-gradient(135deg, #2a2a3e, #1a1a2e); 
            color: white; 
            border: 2px solid #00ffff; 
            border-radius: 10px; 
            cursor: pointer; 
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateX(-30px);
            font-size: 1rem;
            font-weight: 500;
            animation: slideInAnswer ${0.3 + index * 0.1}s ease-out forwards;
        `;
        
        btn.onmouseover = () => {
            if (!btn.disabled) {
                btn.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
                btn.style.transform = 'scale(1.02) translateX(0)';
                btn.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
                btn.style.color = 'black';
            }
        };
        
        btn.onmouseout = () => {
            if (!btn.disabled && btn.dataset.correct !== 'shown') {
                btn.style.background = 'linear-gradient(135deg, #2a2a3e, #1a1a2e)';
                btn.style.transform = 'scale(1) translateX(0)';
                btn.style.boxShadow = 'none';
                btn.style.color = 'white';
            }
        };
        
        answersEl.appendChild(btn);
        
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, 100 * (index + 1));
    });
}

// Créer ou mettre à jour le modal
function createOrUpdateGameModal() {
    // Supprimer l'ancien modal s'il existe
    const existingModal = document.getElementById('gameModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Créer le nouveau modal
    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal';
    modalDiv.id = 'gameModal';
    modalDiv.style.cssText = `
        display: none; 
        position: fixed; 
        top: 0; 
        left: 0; 
        width: 100%; 
        height: 100%; 
        background: rgba(0,0,0,0.8); 
        z-index: 1000; 
        align-items: center; 
        justify-content: center;
    `;
    
    modalDiv.innerHTML = `
        <div class="modal-content" style="
            background: linear-gradient(135deg, #1a1a2e, #2a2a3e);
            border-radius: 20px; 
            padding: 2rem; 
            max-width: 600px; 
            width: 90%; 
            max-height: 80vh; 
            overflow-y: auto;
            box-shadow: 0 20px 60px rgba(0, 255, 255, 0.3);
            border: 2px solid var(--primary-cyan, #00ffff);
        ">
            <div class="modal-inner">
                <button class="close-btn" onclick="closeModal()" style="
                    position: absolute; 
                    top: 10px; 
                    right: 20px; 
                    background: none; 
                    border: none; 
                    color: white; 
                    font-size: 2rem; 
                    cursor: pointer;
                    transition: transform 0.3s;
                " onmouseover="this.style.transform='rotate(90deg)'" onmouseout="this.style.transform='rotate(0)'">&times;</button>
                
                <div class="modal-title" id="modalTitle" style="
                    text-align: center; 
                    font-size: 2rem; 
                    color: var(--primary-cyan, #00ffff); 
                    margin-bottom: 1.5rem; 
                    font-weight: bold;
                    text-shadow: 0 0 20px rgba(0, 255, 255, 0.5);
                ">Quiz</div>
                
                <div class="question" id="question" style="
                    text-align: center; 
                    font-size: 1.3rem; 
                    color: white; 
                    margin-bottom: 2rem;
                    min-height: 50px;
                ">Chargement...</div>
                
                <div class="answers" id="answers" style="
                    display: flex; 
                    flex-direction: column; 
                    gap: 0.5rem;
                    min-height: 200px;
                "></div>
                
                <div class="score" id="gameScore" style="
                    text-align: center; 
                    color: var(--text-secondary, #888); 
                    margin-top: 2rem;
                    font-size: 1.1rem;
                ">Score: 0</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modalDiv);
}

function generateGameQuestions(gameType) {
    // Filtrer les mots selon le type de jeu
    let filteredWords = [];
    
    switch(gameType) {
        case 'verlan':
            filteredWords = dictionary.filter(w => w.categories && w.categories.includes('verlan'));
            break;
        case 'regional':
            filteredWords = dictionary.filter(w => w.categories && 
                (w.categories.includes('quebec') || w.categories.includes('belgique') || 
                 w.categories.includes('suisse') || w.categories.includes('marseille')));
            break;
        case 'expert':
            filteredWords = dictionary.filter(w => w.categories && 
                (w.categories.includes('cite') || w.categories.includes('ancien')));
            break;
        default:
            filteredWords = dictionary;
    }
    
    // S'assurer qu'on a assez de mots
    if (filteredWords.length < 5) {
        filteredWords = dictionary;
    }
    
    return filteredWords;
}

function generateQuizQuestions(count) {
    const questions = [];
    const usedIndexes = new Set();
    
    for (let i = 0; i < count; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * dictionary.length);
        } while (usedIndexes.has(randomIndex));
        
        usedIndexes.add(randomIndex);
        const word = dictionary[randomIndex];
        
        // Créer les options de réponse
        const options = [word.definition];
        const optionIndexes = new Set([randomIndex]);
        
        while (options.length < 4) {
            const optIndex = Math.floor(Math.random() * dictionary.length);
            if (!optionIndexes.has(optIndex)) {
                optionIndexes.add(optIndex);
                options.push(dictionary[optIndex].definition);
            }
        }
        
        // Mélanger les options
        const shuffled = options.sort(() => Math.random() - 0.5);
        const correctIndex = shuffled.indexOf(word.definition);
        
        questions.push({
            word: word.term,
            question: `Que signifie "${word.term}" ?`,
            options: shuffled,
            correctIndex: correctIndex,
            correct: word.definition
        });
    }
    
    return questions;
}

function showNextQuestion() {
    // Attendre que le modal soit prêt
    const questionEl = document.getElementById('question');
    const answersEl = document.getElementById('answers');
    const scoreEl = document.getElementById('gameScore');
    
    // Si les éléments n'existent pas encore, attendre un peu et réessayer
    if (!questionEl || !answersEl || !scoreEl) {
        setTimeout(() => showNextQuestion(), 100);
        return;
    }
    
    const words = generateGameQuestions(currentGameType);
    
    if (currentQuestionIndex >= 5 || words.length === 0) {
        endGame();
        return;
    }
    
    // Sélectionner un mot aléatoire
    const randomWord = words[Math.floor(Math.random() * words.length)];
    
    questionEl.textContent = `Que signifie "${randomWord.term}" ?`;
    scoreEl.textContent = `Question ${currentQuestionIndex + 1}/5 | Score: ${gameScore}`;
    
    // Créer les options de réponse
    const options = [randomWord.definition];
    while (options.length < 4 && dictionary.length >= 4) {
        const randomOption = dictionary[Math.floor(Math.random() * dictionary.length)];
        if (!options.includes(randomOption.definition)) {
            options.push(randomOption.definition);
        }
    }
    
    // Mélanger les options
    options.sort(() => Math.random() - 0.5);
    
    answersEl.innerHTML = '';
    answersEl.style.opacity = '0';
    
    options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'answer-btn';
        btn.textContent = option;
        btn.dataset.correct = option === randomWord.definition ? 'true' : 'false';
        btn.onclick = () => checkAnswer(option === randomWord.definition, btn);
        btn.style.cssText = `
            width: 100%; 
            padding: 1rem; 
            margin: 0.5rem 0; 
            background: linear-gradient(135deg, #2a2a3e, #1a1a2e); 
            color: white; 
            border: 2px solid #00ffff; 
            border-radius: 10px; 
            cursor: pointer; 
            transition: all 0.3s ease;
            opacity: 0;
            transform: translateX(-30px);
            font-size: 1rem;
            font-weight: 500;
        `;
        
        btn.onmouseover = () => {
            if (!btn.disabled) {
                btn.style.background = 'linear-gradient(45deg, #00ffff, #ff0080)';
                btn.style.transform = 'scale(1.02)';
                btn.style.boxShadow = '0 5px 15px rgba(0, 255, 255, 0.3)';
                btn.style.color = 'black';
            }
        };
        
        btn.onmouseout = () => {
            if (!btn.disabled && btn.dataset.correct !== 'shown') {
                btn.style.background = 'linear-gradient(135deg, #2a2a3e, #1a1a2e)';
                btn.style.transform = 'scale(1)';
                btn.style.boxShadow = 'none';
                btn.style.color = 'white';
            }
        };
        
        answersEl.appendChild(btn);
        
        // Animation d'apparition
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateX(0)';
        }, 100 * (index + 1));
    });
    
    setTimeout(() => {
        answersEl.style.opacity = '1';
    }, 100);
}

function checkAnswer(isCorrect, button) {
    // Vérifier que le bouton existe
    if (!button) return;
    
    // Désactiver tous les boutons
    const allButtons = document.querySelectorAll('.answer-btn');
    allButtons.forEach(btn => {
        btn.disabled = true;
        btn.style.pointerEvents = 'none';
    });
    
    if (isCorrect) {
        gameScore++;
        // Animation de bonne réponse
        button.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
        button.style.transform = 'scale(1.05)';
        button.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
        button.style.color = 'white';
        
        // Effet de particules
        createParticles(button, 'success');
        
        // Son de succès (visuel)
        showFeedback('✅ Correct !', 'success');
    } else {
        // Animation de mauvaise réponse
        button.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
        button.style.color = 'white';
        button.classList.add('shake');
        
        // Montrer la bonne réponse
        allButtons.forEach(btn => {
            if (btn.dataset.correct === 'true') {
                btn.style.background = 'linear-gradient(45deg, #00ff00, #00cc00)';
                btn.style.transform = 'scale(1.02)';
                btn.style.color = 'white';
                btn.dataset.correct = 'shown';
            }
        });
        
        showFeedback('❌ Raté !', 'error');
    }
    
    currentQuestionIndex++;
    
    if (currentQuestionIndex < 5) {
        setTimeout(() => {
            // Animation de transition
            const container = document.getElementById('answers');
            if (container) {
                container.style.opacity = '0';
                container.style.transform = 'translateX(50px)';
                
                setTimeout(() => {
                    showGameQuestion(currentGameType);
                    if (container) {
                        container.style.opacity = '1';
                        container.style.transform = 'translateX(0)';
                    }
                }, 300);
            }
        }, 1500);
    } else {
        setTimeout(() => endGame(), 1500);
    }
}

// Créer des particules pour les effets visuels
function createParticles(element, type) {
    const rect = element.getBoundingClientRect();
    const particles = 15;
    
    for (let i = 0; i < particles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: ${type === 'success' ? '#00ff00' : '#ff0000'};
            border-radius: 50%;
            left: ${rect.left + rect.width / 2}px;
            top: ${rect.top + rect.height / 2}px;
            pointer-events: none;
            z-index: 10000;
            animation: particle-${type} 1s ease-out forwards;
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    }
}

// Afficher un feedback visuel
function showFeedback(message, type) {
    const feedback = document.createElement('div');
    feedback.className = 'feedback-message';
    feedback.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        padding: 1rem 2rem;
        background: ${type === 'success' ? 'rgba(0, 255, 0, 0.2)' : 'rgba(255, 0, 0, 0.2)'};
        border: 2px solid ${type === 'success' ? '#00ff00' : '#ff0000'};
        border-radius: 15px;
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        z-index: 10001;
        animation: feedback-pop 0.5s ease-out;
    `;
    feedback.textContent = message;
    document.body.appendChild(feedback);
    
    setTimeout(() => feedback.remove(), 1000);
}

function endGame() {
    const modal = document.getElementById('gameModal');
    
    if (!modal) {
        console.error('Modal non trouvé');
        return;
    }
    
    let modalContent = modal.querySelector('.modal-inner');
    
    // Si modal-inner n'existe pas, le créer
    if (!modalContent) {
        modalContent = modal.querySelector('.modal-content');
        if (!modalContent) {
            modalContent = document.createElement('div');
            modalContent.className = 'modal-content';
            modal.appendChild(modalContent);
        }
    }
    
    const percentage = (gameScore / 5) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = '🏆 PARFAIT ! Tu maîtrises l\'argot !';
        // Lancer les confettis pour un score parfait
        launchConfetti();
    }
    else if (percentage >= 80) message = '🎉 Excellent ! Tu connais bien l\'argot !';
    else if (percentage >= 60) message = '👍 Bien joué ! Continue comme ça !';
    else if (percentage >= 40) message = '💪 Pas mal ! Tu progresses !';
    else message = '📚 Il faut réviser un peu plus !';
    
    modalContent.innerHTML = `
        <button class="close-btn" onclick="closeModal()" style="position: absolute; top: 10px; right: 20px; background: none; border: none; color: white; font-size: 2rem; cursor: pointer;">&times;</button>
        <div class="modal-title" style="text-align: center; font-size: 2rem; color: var(--primary-cyan, #00ffff); margin-bottom: 1rem;">Résultats</div>
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 3rem; font-weight: bold; color: var(--primary-cyan, #00ffff); animation: scoreZoom 0.5s ease-out;">
                ${gameScore}/5
            </div>
            <div style="font-size: 1.5rem; color: var(--accent-pink, #ff0080); margin: 1rem 0; animation: slideIn 0.6s ease-out;">
                ${percentage}%
            </div>
            <div style="color: var(--text-primary, white); margin: 1rem 0; animation: slideIn 0.7s ease-out;">
                ${message}
            </div>
            <div class="progress-bar" style="width: 100%; height: 20px; background: var(--bg-card, #2a2a3e); border-radius: 10px; overflow: hidden; margin: 1rem 0;">
                <div style="width: 0%; height: 100%; background: linear-gradient(90deg, var(--primary-cyan, #00ffff), var(--accent-pink, #ff0080)); transition: width 1s ease-out;"></div>
            </div>
            <button class="play-btn" onclick="closeModal()" style="margin-top: 1rem; padding: 1rem 2rem; background: linear-gradient(45deg, var(--primary-cyan, #00ffff), var(--accent-pink, #ff0080)); color: black !important; border: none; border-radius: 10px; cursor: pointer; font-weight: bold; animation: slideIn 0.8s ease-out;">
                Fermer
            </button>
        </div>
    `;
    
    // Animer la barre de progression
    setTimeout(() => {
        const progressBar = modalContent.querySelector('.progress-bar > div');
        if (progressBar) {
            progressBar.style.width = `${percentage}%`;
        }
    }, 100);
    
    // Mettre à jour les points avec animation
    updateUserPoints(gameScore * 10);
}

// Lancer des confettis pour célébrer
function launchConfetti() {
    const colors = ['#ff0080', '#00ffff', '#ffff00', '#00ff00', '#ff00ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Math.random() * 10 + 5}px;
                height: ${Math.random() * 10 + 5}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${Math.random() * 100}%;
                top: -20px;
                opacity: ${Math.random() * 0.5 + 0.5};
                transform: rotate(${Math.random() * 360}deg);
                animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
                z-index: 10000;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 5000);
        }, i * 30);
    }
}

function closeModal() {
    const modal = document.getElementById('gameModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function updateUserPoints(points) {
    const currentPoints = parseInt(localStorage.getItem('userPoints') || '0');
    const newPoints = currentPoints + points;
    localStorage.setItem('userPoints', newPoints.toString());
    
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.textContent = `${newPoints} points`;
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
    // Attendre que tout soit chargé avant d'initialiser
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeApp);
    } else {
        initializeApp();
    }
});

// Fonction d'initialisation principale
function initializeApp() {
    // Injecter les styles d'animation en premier
    injectAnimationStyles();
    
    // Attendre un peu pour que les styles soient appliqués
    requestAnimationFrame(() => {
        // Charger le dictionnaire
        loadDictionary();
        
        // Initialiser les écouteurs de recherche
        const mainSearchInput = document.getElementById('main-search');
        const homeSearchInput = document.getElementById('home-search');
        
        if (mainSearchInput) {
            mainSearchInput.addEventListener('input', filterDictionary);
        }
        if (homeSearchInput) {
            homeSearchInput.addEventListener('input', filterHomeSearch);
        }
        
        // Démarrer le countdown
        startCountdown();
        
        // Charger les points de l'utilisateur
        const savedPoints = localStorage.getItem('userPoints') || '245';
        const pointsEl = document.getElementById('userPoints');
        if (pointsEl) {
            pointsEl.textContent = `${savedPoints} points`;
        }
        
        // Fermer le modal si on clique en dehors
        window.onclick = function(event) {
            const modal = document.getElementById('gameModal');
            if (event.target === modal) {
                closeModal();
            }
        }
    });
}

// Charger le dictionnaire de manière asynchrone
function loadDictionary() {
    // Afficher un loader pendant le chargement
    const containers = document.querySelectorAll('#dictionary-results, #home-results');
    containers.forEach(container => {
        if (container) {
            container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Chargement du dictionnaire...</p>';
        }
    });
    
    fetch('dictionary.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur de chargement du dictionnaire');
            }
            return response.json();
        })
        .then(data => {
            dictionary = data;
            // Attendre que le DOM soit prêt
            requestAnimationFrame(() => {
                displayResults(dictionary);
                updateStats();
                initializeDailyWord();
            });
        })
        .catch(error => {
            console.error('Erreur chargement:', error);
            containers.forEach(container => {
                if (container) {
                    container.innerHTML = '<p style="text-align: center; color: red;">Erreur de chargement du dictionnaire</p>';
                }
            });
        });
}

// Injecter les styles CSS pour les animations
function injectAnimationStyles() {
    // Vérifier si les styles ont déjà été injectés
    if (document.getElementById('speakz-animation-styles')) {
        return;
    }
    
    const style = document.createElement('style');
    style.id = 'speakz-animation-styles';
    style.textContent = `
        /* Prévenir le FOUC */
        body {
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        /* Animations pour le jeu quotidien */
        @keyframes questionSlideIn {
            from {
                opacity: 0;
                transform: translateX(30px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes fadeInScale {
            from {
                opacity: 0;
                transform: scale(0.8);
            }
            to {
                opacity: 1;
                transform: scale(1);
            }
        }
        
        @keyframes wordBounce {
            0% {
                opacity: 0;
                transform: scale(0) rotate(-180deg);
            }
            50% {
                transform: scale(1.2) rotate(10deg);
            }
            100% {
                opacity: 1;
                transform: scale(1) rotate(0);
            }
        }
        
        @keyframes letterWave {
            0% {
                transform: translateY(0);
            }
            50% {
                transform: translateY(-10px);
            }
            100% {
                transform: translateY(0);
            }
        }
        
        @keyframes optionSlideUp {
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes successPulse {
            0% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
            }
            50% {
                transform: scale(1.05);
                box-shadow: 0 0 30px 10px rgba(0, 255, 0, 0.3);
            }
            100% {
                transform: scale(1);
                box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
            }
        }
        
        @keyframes errorShake {
            0%, 100% { transform: translateX(0) rotate(0); }
            10% { transform: translateX(-10px) rotate(-2deg); }
            20% { transform: translateX(10px) rotate(2deg); }
            30% { transform: translateX(-10px) rotate(-2deg); }
            40% { transform: translateX(10px) rotate(2deg); }
            50% { transform: translateX(-5px) rotate(-1deg); }
            60% { transform: translateX(5px) rotate(1deg); }
            70% { transform: translateX(-2px) rotate(0); }
            80% { transform: translateX(2px) rotate(0); }
        }
        
        @keyframes successGlow {
            0% {
                box-shadow: 0 0 0 rgba(0, 255, 0, 0);
            }
            50% {
                box-shadow: 0 0 30px rgba(0, 255, 0, 0.5);
            }
            100% {
                box-shadow: 0 0 0 rgba(0, 255, 0, 0);
            }
        }
        
        @keyframes checkmarkDraw {
            0% {
                transform: scale(0) rotate(-45deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.2) rotate(15deg);
            }
            100% {
                transform: scale(1) rotate(0);
                opacity: 1;
            }
        }
        
        @keyframes crossFade {
            0% {
                transform: scale(0) rotate(180deg);
                opacity: 0;
            }
            100% {
                transform: scale(1) rotate(0);
                opacity: 1;
            }
        }
        
        @keyframes correctReveal {
            0% {
                transform: scale(0.8);
                opacity: 0;
            }
            50% {
                transform: scale(1.1);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes bounceIn {
            0% {
                transform: scale(0);
                opacity: 0;
            }
            60% {
                transform: scale(1.2);
            }
            100% {
                transform: scale(1);
                opacity: 1;
            }
        }
        
        @keyframes slideOutLeft {
            to {
                transform: translateX(-100%);
                opacity: 0;
            }
        }
        
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes feedbackBounce {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(-10deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.1) rotate(5deg);
            }
            70% {
                transform: translate(-50%, -50%) scale(0.95) rotate(-2deg);
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0);
                opacity: 1;
            }
        }
        
        @keyframes feedbackFadeOut {
            to {
                transform: translate(-50%, -50%) scale(0.8) rotate(10deg);
                opacity: 0;
            }
        }
        
        /* Animations existantes améliorées */
        @keyframes slideInAnswer {
            from {
                opacity: 0;
                transform: translateX(-50px) rotate(-5deg);
            }
            to {
                opacity: 1;
                transform: translateX(0) rotate(0);
            }
        }
        
        @keyframes slideIn {
            from {
                opacity: 0;
                transform: translateY(30px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        @keyframes feedback-pop {
            0% {
                transform: translate(-50%, -50%) scale(0) rotate(180deg);
                opacity: 0;
            }
            50% {
                transform: translate(-50%, -50%) scale(1.2) rotate(-10deg);
            }
            100% {
                transform: translate(-50%, -50%) scale(1) rotate(0);
                opacity: 1;
            }
        }
        
        @keyframes particle-success {
            to {
                transform: translateY(-150px) translateX(${Math.random() * 100 - 50}px) rotate(720deg);
                opacity: 0;
            }
        }
        
        @keyframes particle-error {
            to {
                transform: translateY(150px) translateX(${Math.random() * 100 - 50}px) rotate(-720deg);
                opacity: 0;
            }
        }
        
        .shake {
            animation: shake 0.8s ease-in-out;
        }
        
        @keyframes shake {
            0%, 100% { transform: translateX(0) rotate(0); }
            10% { transform: translateX(-15px) rotate(-5deg); }
            20% { transform: translateX(15px) rotate(5deg); }
            30% { transform: translateX(-15px) rotate(-5deg); }
            40% { transform: translateX(15px) rotate(5deg); }
            50% { transform: translateX(-10px) rotate(-2deg); }
            60% { transform: translateX(10px) rotate(2deg); }
            70% { transform: translateX(-5px) rotate(-1deg); }
            80% { transform: translateX(5px) rotate(1deg); }
        }
        
        .answer-btn:disabled {
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .modal {
            animation: modalFadeIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        @keyframes modalFadeIn {
            from {
                opacity: 0;
                transform: scale(0.7) rotate(10deg);
            }
            to {
                opacity: 1;
                transform: scale(1) rotate(0);
            }
        }
        
        @keyframes scoreZoom {
            0% {
                transform: scale(0) rotate(-360deg);
                opacity: 0;
            }
            50% {
                transform: scale(1.3) rotate(10deg);
            }
            100% {
                transform: scale(1) rotate(0);
                opacity: 1;
            }
        }
        
        .game-card {
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .game-card:hover {
            animation: pulse 1s infinite;
            transform: translateY(-5px) rotate(1deg);
        }
        
        @keyframes pulse {
            0% {
                transform: scale(1) translateY(-5px);
                box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
            }
            50% {
                transform: scale(1.05) translateY(-8px);
                box-shadow: 0 10px 30px rgba(0, 255, 255, 0.6);
            }
            100% {
                transform: scale(1) translateY(-5px);
                box-shadow: 0 5px 15px rgba(255, 0, 255, 0.4);
            }
        }
        
        /* Effet de brillance sur les boutons */
        .btn-base {
            position: relative;
            overflow: hidden;
        }
        
        .btn-base::before {
            content: '';
            position: absolute;
            top: 0;
            left: -150%;
            width: 150%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.3), 
                rgba(255, 255, 255, 0.5), 
                rgba(255, 255, 255, 0.3), 
                transparent);
            transition: left 0.6s ease;
            pointer-events: none;
        }
        
        .btn-base:hover::before {
            left: 150%;
        }
        
        /* Animation pour les cartes de mots */
        .word-card {
            animation: fadeInUp 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .word-card:hover {
            transform: translateY(-10px) rotate(1deg) scale(1.02);
            box-shadow: 0 20px 40px rgba(255, 0, 255, 0.4);
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(40px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Animation du timer plus dynamique */
        #timer-display {
            animation: timerPulse 1s infinite;
            text-shadow: 0 0 20px currentColor;
        }
        
        @keyframes timerPulse {
            0%, 100% {
                color: var(--primary-cyan);
                transform: scale(1);
            }
            25% {
                color: var(--accent-pink);
                transform: scale(1.05);
            }
            50% {
                color: var(--accent-green);
                transform: scale(1.1);
            }
            75% {
                color: var(--primary-pink);
                transform: scale(1.05);
            }
        }
        
        /* Confettis améliorés */
        @keyframes confetti-fall {
            0% {
                transform: translateY(-100vh) rotate(0) scale(0);
                opacity: 1;
            }
            10% {
                transform: translateY(-80vh) rotate(120deg) scale(0.5);
            }
            100% {
                transform: translateY(100vh) rotate(720deg) scale(1);
                opacity: 0;
            }
        }
        
        .confetti {
            position: fixed;
            width: 10px;
            height: 10px;
            background: linear-gradient(45deg, #ff0080, #00ffff);
            animation: confetti-fall 3s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        }
    `;
    
    // Injecter dans le head en priorité
    if (document.head) {
        document.head.insertBefore(style, document.head.firstChild);
    } else {
        // Fallback si head n'est pas prêt
        document.addEventListener('DOMContentLoaded', () => {
            document.head.insertBefore(style, document.head.firstChild);
        });
    }
    
    // Marquer le body comme chargé après un court délai
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
}
