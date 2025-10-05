// ==================== DICTIONNAIRE INTÉGRÉ ====================
const dictionary = [
  // JEUNES
  { term: "Askip", definition: "À ce qu'il paraît", categories: ["jeunes"], examples: ["Askip il a quitté la soirée tôt"] },
  { term: "Bail", definition: "Plan, truc", categories: ["jeunes"], examples: ["C'est quoi le bail ce soir ?"] },
  { term: "BG", definition: "Beau gosse", categories: ["jeunes"], examples: ["Il est BG ce mec"] },
  { term: "Boloss", definition: "Victime, nul", categories: ["jeunes"], examples: ["T'es un boloss"] },
  { term: "Charo", definition: "Dragueur", categories: ["jeunes"], examples: ["Arrête de faire le charo"] },
  { term: "Daron", definition: "Père", categories: ["jeunes"], examples: ["Mon daron est cool"] },
  { term: "Daronne", definition: "Mère", categories: ["jeunes"], examples: ["Ma daronne fait bien à manger"] },
  { term: "Frérot", definition: "Frère, ami proche", categories: ["jeunes"], examples: ["Salut frérot !"] },
  { term: "Go", definition: "Fille", categories: ["jeunes"], examples: ["Cette go est stylée"] },
  { term: "Iench", definition: "Chien", categories: ["jeunes"], examples: ["Ton iench est mignon"] },
  { term: "Ken", definition: "Faire l'amour", categories: ["jeunes"], examples: ["Ils ont ken"] },
  { term: "Miff", definition: "Dégoût", categories: ["jeunes"], examples: ["Ça me miff"] },
  { term: "Poucave", definition: "Balance, dénonciatrice", categories: ["jeunes"], examples: ["C'est une poucave"] },
  { term: "Sah", definition: "Sérieusement", categories: ["jeunes"], examples: ["Sah tu dis vrai ?"] },
  { term: "Stylé", definition: "Cool, bien", categories: ["jeunes"], examples: ["C'est stylé !"] },
  { term: "Thug", definition: "Voyou, gangster", categories: ["jeunes"], examples: ["Il fait le thug"] },
  { term: "Wesh", definition: "Salut (de l'arabe)", categories: ["jeunes"], examples: ["Wesh bien ou bien ?"] },
  { term: "Yep", definition: "Ouais", categories: ["jeunes"], examples: ["Yep, je viens"] },
  { term: "Zouz", definition: "Fille", categories: ["jeunes"], examples: ["Cette zouz est belle"] },
  
  // VERLAN
  { term: "Cainri", definition: "Africain", categories: ["verlan"], examples: ["Il est cainri"] },
  { term: "Céfran", definition: "Français", categories: ["verlan"], examples: ["Les céfrans"] },
  { term: "Chanmé", definition: "Méchant (bien)", categories: ["verlan"], examples: ["C'est chanmé !"] },
  { term: "Chelou", definition: "Louche", categories: ["verlan"], examples: ["C'est chelou cette histoire"] },
  { term: "Cheum", definition: "Moche", categories: ["verlan"], examples: ["Il est cheum"] },
  { term: "Meuf", definition: "Femme", categories: ["verlan"], examples: ["Cette meuf est cool"] },
  { term: "Ouf", definition: "Fou", categories: ["verlan"], examples: ["C'est ouf !"] },
  { term: "Pécho", definition: "Choper, attraper", categories: ["verlan"], examples: ["J'ai pécho son num"] },
  { term: "Relou", definition: "Lourd, pénible", categories: ["verlan"], examples: ["T'es relou"] },
  { term: "Reuf", definition: "Frère", categories: ["verlan"], examples: ["Mon reuf"] },
  { term: "Reum", definition: "Mère", categories: ["verlan"], examples: ["Ma reum"] },
  { term: "Reup", definition: "Père", categories: ["verlan"], examples: ["Mon reup"] },
  { term: "Teubé", definition: "Bête", categories: ["verlan"], examples: ["T'es teubé ou quoi ?"] },
  { term: "Teuf", definition: "Fête", categories: ["verlan"], examples: ["On va en teuf"] },
  { term: "Tise", definition: "Sortie", categories: ["verlan"], examples: ["On fait une tise"] },
  { term: "Vénère", definition: "Énervé", categories: ["verlan"], examples: ["Je suis vénère"] },
  { term: "Zarbi", definition: "Bizarre", categories: ["verlan"], examples: ["C'est zarbi"] },
  { term: "Zbeul", definition: "Bordel, bagarre", categories: ["verlan"], examples: ["C'est le zbeul"] },
  
  // CITÉ
  { term: "Bader", definition: "Déprimer", categories: ["cite"], examples: ["Je bade grave"] },
  { term: "Bicrave", definition: "Vendre", categories: ["cite"], examples: ["Il bicrave des trucs"] },
  { term: "Biff", definition: "Argent", categories: ["cite"], examples: ["J'ai plus de biff"] },
  { term: "Blase", definition: "Nom", categories: ["cite"], examples: ["C'est quoi ton blase ?"] },
  { term: "Bled", definition: "Pays d'origine", categories: ["cite"], examples: ["Je pars au bled"] },
  { term: "Bolosse", definition: "Victime", categories: ["cite"], examples: ["Quel bolosse"] },
  { term: "Caillera", definition: "Racaille", categories: ["cite"], examples: ["C'est une caillera"] },
  { term: "Charbonner", definition: "Travailler dur", categories: ["cite"], examples: ["Je charbonne toute la journée"] },
  { term: "Condé", definition: "Policier", categories: ["cite"], examples: ["Les condés arrivent"] },
  { term: "Crari", definition: "Craindre", categories: ["cite"], examples: ["Ça crari"] },
  { term: "Daron", definition: "Père, patron", categories: ["cite"], examples: ["Le daron du quartier"] },
  { term: "Déter", definition: "Déterminé", categories: ["cite"], examples: ["Il est déter"] },
  { term: "Gadji", definition: "Fille (du romani)", categories: ["cite"], examples: ["Cette gadji est belle"] },
  { term: "Gamos", definition: "Voiture", categories: ["cite"], examples: ["Belle gamos"] },
  { term: "Hass", definition: "Misère", categories: ["cite"], examples: ["C'est la hass"] },
  { term: "Hlel", definition: "Licite, halal", categories: ["cite"], examples: ["C'est hlel"] },
  { term: "Kiffer", definition: "Aimer", categories: ["cite"], examples: ["Je kiffe cette musique"] },
  { term: "Miskine", definition: "Pauvre (de l'arabe)", categories: ["cite"], examples: ["Le miskine"] },
  { term: "Pecho", definition: "Attraper", categories: ["cite"], examples: ["Je vais le pécho"] },
  { term: "Schlag", definition: "Fatigué", categories: ["cite"], examples: ["Je suis schlag"] },
  { term: "Tess", definition: "Cité", categories: ["cite"], examples: ["Dans ma tess"] },
  { term: "Tieks", definition: "Quartier", categories: ["cite"], examples: ["Mon tieks"] },
  { term: "Wesh", definition: "Salut", categories: ["cite"], examples: ["Wesh alors !"] },
  { term: "Zoulou", definition: "Individu", categories: ["cite"], examples: ["Ce zoulou"] },
  
  // ANCIEN
  { term: "Bagnole", definition: "Voiture", categories: ["ancien"], examples: ["Ma vieille bagnole"] },
  { term: "Bahut", definition: "Lycée", categories: ["ancien"], examples: ["Je vais au bahut"] },
  { term: "Baraque", definition: "Maison", categories: ["ancien"], examples: ["Belle baraque"] },
  { term: "Boulot", definition: "Travail", categories: ["ancien"], examples: ["J'ai du boulot"] },
  { term: "Clope", definition: "Cigarette", categories: ["ancien"], examples: ["Une clope ?"] },
  { term: "Clebs", definition: "Chien", categories: ["ancien"], examples: ["Sale clebs"] },
  { term: "Dingue", definition: "Fou", categories: ["ancien"], examples: ["T'es dingue"] },
  { term: "Fric", definition: "Argent", categories: ["ancien"], examples: ["J'ai pas de fric"] },
  { term: "Gamin", definition: "Enfant", categories: ["ancien"], examples: ["Ce gamin"] },
  { term: "Godasse", definition: "Chaussure", categories: ["ancien"], examples: ["Mes godasses"] },
  { term: "Gonzesse", definition: "Fille", categories: ["ancien"], examples: ["Cette gonzesse"] },
  { term: "Mec", definition: "Homme", categories: ["ancien"], examples: ["Ce mec"] },
  { term: "Nana", definition: "Fille", categories: ["ancien"], examples: ["Cette nana"] },
  { term: "Piaule", definition: "Chambre", categories: ["ancien"], examples: ["Dans ma piaule"] },
  { term: "Pognon", definition: "Argent", categories: ["ancien"], examples: ["Plein de pognon"] },
  { term: "Pot", definition: "Chance", categories: ["ancien"], examples: ["Coup de pot"] },
  { term: "Taffe", definition: "Travail", categories: ["ancien"], examples: ["J'ai un taffe"] },
  { term: "Taulard", definition: "Prisonnier", categories: ["ancien"], examples: ["Un ancien taulard"] },
  { term: "Thune", definition: "Argent", categories: ["ancien"], examples: ["Pas de thune"] },
  { term: "Toubib", definition: "Médecin", categories: ["ancien"], examples: ["Voir le toubib"] },
  { term: "Zinc", definition: "Comptoir", categories: ["ancien"], examples: ["Au zinc du bar"] },
  
  // MARSEILLE
  { term: "Dégun", definition: "Personne", categories: ["marseille"], examples: ["Y'a dégun"] },
  { term: "Emboucaner", definition: "Embrouiller", categories: ["marseille"], examples: ["Tu m'emboucanes"] },
  { term: "Engatser", definition: "Insulter", categories: ["marseille"], examples: ["Je vais t'engatser"] },
  { term: "Fada", definition: "Fou", categories: ["marseille"], examples: ["T'es fada"] },
  { term: "Minot", definition: "Enfant", categories: ["marseille"], examples: ["Le minot"] },
  { term: "Peuchère", definition: "Le pauvre", categories: ["marseille"], examples: ["Peuchère !"] },
  { term: "Tarpin", definition: "Beaucoup", categories: ["marseille"], examples: ["Tarpin bien"] },
  
  // QUÉBEC
  { term: "Blonde", definition: "Petite amie", categories: ["quebec"], examples: ["Ma blonde"] },
  { term: "Char", definition: "Voiture", categories: ["quebec"], examples: ["Mon char"] },
  { term: "Chum", definition: "Ami, copain", categories: ["quebec"], examples: ["Mon chum"] },
  { term: "Magasiner", definition: "Faire du shopping", categories: ["quebec"], examples: ["Aller magasiner"] },
  { term: "Pantoute", definition: "Pas du tout", categories: ["quebec"], examples: ["Pantoute !"] },
  { term: "Pogner", definition: "Attraper", categories: ["quebec"], examples: ["Pogner quelqu'un"] },
  { term: "Tabarnak", definition: "Juron", categories: ["quebec"], examples: ["Tabarnak !"] },
  
  // BELGIQUE
  { term: "Brol", definition: "Désordre", categories: ["belgique"], examples: ["C'est du brol"] },
  { term: "Drache", definition: "Pluie forte", categories: ["belgique"], examples: ["Il drache"] },
  { term: "Kot", definition: "Chambre d'étudiant", categories: ["belgique"], examples: ["Mon kot"] },
  { term: "Nonante", definition: "Quatre-vingt-dix", categories: ["belgique"], examples: ["Nonante euros"] },
  
  // SUISSE
  { term: "Natel", definition: "Téléphone portable", categories: ["suisse"], examples: ["Mon natel"] },
  { term: "Panosse", definition: "Serpillière", categories: ["suisse"], examples: ["Passer la panosse"] },
  { term: "Septante", definition: "Soixante-dix", categories: ["suisse"], examples: ["Septante francs"] },
  
  // INTERNET & GAMING
  { term: "AFK", definition: "Absent du clavier", categories: ["internet"], examples: ["Je suis AFK"] },
  { term: "BRB", definition: "Je reviens", categories: ["internet"], examples: ["BRB 5 min"] },
  { term: "GG", definition: "Bien joué", categories: ["gaming"], examples: ["GG mec !"] },
  { term: "LOL", definition: "Mort de rire", categories: ["internet"], examples: ["LOL c'est drôle"] },
  { term: "MDR", definition: "Mort de rire", categories: ["internet"], examples: ["MDR !"] },
  { term: "Noob", definition: "Débutant", categories: ["gaming"], examples: ["T'es un noob"] },
  { term: "OMG", definition: "Oh mon dieu", categories: ["internet"], examples: ["OMG !"] },
  { term: "PTDR", definition: "Pété de rire", categories: ["internet"], examples: ["PTDR !"] },
  { term: "WTF", definition: "C'est quoi ce bordel", categories: ["internet"], examples: ["WTF ?!"] },
  
  // MOTS SUPPLÉMENTAIRES
  { term: "Avoir le seum", definition: "Être dégoûté", categories: ["jeunes"], examples: ["J'ai le seum"] },
  { term: "Bader", definition: "Déprimer", categories: ["jeunes"], examples: ["Je bade"] },
  { term: "Belek", definition: "Fais attention", categories: ["cite"], examples: ["Belek !"] },
  { term: "Ça passe crème", definition: "C'est facile", categories: ["jeunes"], examples: ["Ça passe crème"] },
  { term: "Chiller", definition: "Se détendre", categories: ["jeunes"], examples: ["On chill"] },
  { term: "Claqué", definition: "Fatigué", categories: ["jeunes"], examples: ["Je suis claqué"] },
  { term: "Dalleux", definition: "Affamé", categories: ["jeunes"], examples: ["J'ai trop les dalleux"] },
  { term: "Frais", definition: "Cool, stylé", categories: ["jeunes"], examples: ["T'es frais"] },
  { term: "Ghoster", definition: "Disparaître", categories: ["internet"], examples: ["Il m'a ghosté"] },
  { term: "Hype", definition: "Excitation", categories: ["internet"], examples: ["Trop hype !"] },
  { term: "Khey", definition: "Frère (de l'arabe)", categories: ["cite"], examples: ["Salut khey"] },
  { term: "La base", definition: "Normal, évident", categories: ["jeunes"], examples: ["C'est la base"] },
  { term: "Miskine", definition: "Pauvre", categories: ["cite"], examples: ["Le pauvre miskine"] },
  { term: "Nawak", definition: "N'importe quoi", categories: ["jeunes"], examples: ["C'est nawak"] },
  { term: "Oklm", definition: "Au calme", categories: ["jeunes"], examples: ["Je suis oklm"] },
  { term: "Prank", definition: "Blague, canular", categories: ["internet"], examples: ["C'est un prank"] },
  { term: "Seum", definition: "Rage, dégoût", categories: ["jeunes"], examples: ["Le seum !"] },
  { term: "Swag", definition: "Style", categories: ["jeunes"], examples: ["Il a du swag"] },
  { term: "Tcheck", definition: "Salut (check)", categories: ["jeunes"], examples: ["Tcheck !"] },
  { term: "Validé", definition: "Approuvé", categories: ["jeunes"], examples: ["C'est validé"] },
  { term: "Y'a R", definition: "Il n'y a rien", categories: ["jeunes"], examples: ["Y'a R à faire"] },
  { term: "Zapper", definition: "Oublier", categories: ["jeunes"], examples: ["J'ai zappé"] }
];

// ==================== VARIABLES GLOBALES ====================
let currentCategory = 'tous';
let currentGameType = '';
let currentQuestionIndex = 0;
let gameScore = 0;
let dailyGameStarted = false;
let dailyGameQuestions = [];
let dailyTimer = null;
let dailyStartTime = null;
let usedQuestions = [];

// ==================== NAVIGATION ====================
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
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
    
    document.querySelectorAll('.category-button').forEach(btn => {
        btn.classList.remove('active');
    });
    if (event && event.target) {
        event.target.classList.add('active');
    }
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
    
    // Générer 10 questions
    dailyGameQuestions = [];
    const usedIndexes = new Set();
    
    for (let i = 0; i < 10; i++) {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * dictionary.length);
        } while (usedIndexes.has(randomIndex));
        
        usedIndexes.add(randomIndex);
        const word = dictionary[randomIndex];
        
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
    
    dailyStartTime = Date.now();
    startDailyTimer();
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
            btn.style.cssText = 'width: 100%; margin: 0.5rem 0; padding: 1rem; color: black !important;';
            btn.textContent = option;
            btn.onclick = () => checkDailyAnswer(index === question.correctIndex, btn);
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
        button.innerHTML = button.textContent + ' ✅';
    } else {
        button.style.background = 'linear-gradient(45deg, #ff0000, #cc0000)';
        button.innerHTML = button.textContent + ' ❌';
        
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
    
    const today = new Date().toDateString();
    const scores = JSON.parse(localStorage.getItem('dailyScores') || '[]');
    scores.push({
        date: today,
        score: gameScore,
        time: elapsed
    });
    localStorage.setItem('dailyScores', JSON.stringify(scores));
}

// ==================== JEUX ====================
function startGame(gameType) {
    if (!dictionary || dictionary.length === 0) {
        alert('Erreur : le dictionnaire n\'est pas chargé');
        return;
    }
    
    currentGameType = gameType;
    currentQuestionIndex = 0;
    gameScore = 0;
    usedQuestions = [];
    
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
    
    let questionData = generateBasicQuestion();
    
    questionEl.innerHTML = questionData.question;
    
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
            }
        };
        btn.onmouseout = () => {
            if (!btn.disabled) {
                btn.style.background = 'var(--bg-card)';
                btn.style.color = 'white';
            }
        };
        
        answersEl.appendChild(btn);
    });
}

function generateBasicQuestion() {
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
    console.log('Initialisation Speakz...');
    console.log('Dictionnaire chargé:', dictionary.length, 'mots');
    
    // Afficher tous les mots au démarrage
    displayResults(dictionary);
    updateStats();
    initializeDailyWord();
    
    // Recherche principale
    const mainSearchInput = document.getElementById('main-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterDictionary);
    }
    
    // Recherche accueil
    const homeSearchInput = document.getElementById('home-search');
    if (homeSearchInput) {
        homeSearchInput.addEventListener('input', filterHomeSearch);
    }
    
    // Countdown
    startCountdown();
    
    // Points utilisateur
    const savedPoints = localStorage.getItem('userPoints') || '245';
    const pointsEl = document.getElementById('userPoints');
    if (pointsEl) {
        pointsEl.textContent = `${savedPoints} points`;
    }
    
    console.log('Initialisation terminée - Tout fonctionne !');
});
