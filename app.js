// Base de données des mots d'argot (complète)
const dictionary = [
    // Jeunes
    { word: "Kiffer", category: "jeunes", definition: "Aimer, apprécier quelque chose", example: "Je kiffe grave cette musique!" },
    { word: "Stylé", category: "jeunes", definition: "Cool, bien habillé", example: "T'es stylé avec cette veste!" },
    { word: "Swag", category: "jeunes", definition: "Avoir du style, être cool", example: "Il a trop de swag ce mec" },
    { word: "Grave", category: "jeunes", definition: "Beaucoup, très", example: "C'est grave bien!" },
    { word: "Ouf", category: "jeunes", definition: "Fou, incroyable", example: "C'est ouf ce truc!" },
    { word: "Wesh", category: "jeunes", definition: "Salut, expression familière", example: "Wesh, ça va?" },
    { word: "Déter", category: "jeunes", definition: "Déterminé, motivé", example: "Je suis déter pour réussir" },
    { word: "Dar", category: "jeunes", definition: "Beaucoup, énormément", example: "Il y a dar de monde" },
    { word: "BG", category: "jeunes", definition: "Beau gosse", example: "Il est BG ce mec" },
    { word: "Bolos", category: "jeunes", definition: "Nul, pas cool", example: "C'est bolos cette soirée" },

    // Verlan
    { word: "Keuf", category: "verlan", definition: "Flic (verlan de flic)", example: "Attention aux keufs!" },
    { word: "Meuf", category: "verlan", definition: "Femme (verlan de femme)", example: "Cette meuf est sympa" },
    { word: "Chelou", category: "verlan", definition: "Louche (verlan de louche)", example: "Ce type est chelou" },
    { word: "Relou", category: "verlan", definition: "Lourd (verlan de lourd)", example: "Il est relou ce mec" },
    { word: "Teuf", category: "verlan", definition: "Fête (verlan de fête)", example: "On fait une teuf" },
    { word: "Reup", category: "verlan", definition: "Père (verlan de père)", example: "Mon reup arrive" },
    { word: "Reum", category: "verlan", definition: "Mère (verlan de mère)", example: "Ma reum cuisine" },
    { word: "Vénère", category: "verlan", definition: "Énervé (verlan d'énervé)", example: "Il est vénère" },
    { word: "Beur", category: "verlan", definition: "Arabe (verlan d'arabe)", example: "Il est beur" },
    { word: "Renoi", category: "verlan", definition: "Noir (verlan de noir)", example: "Il est renoi" },
    { word: "Cimer", category: "verlan", definition: "Merci (verlan)", example: "Cimer pour ton aide" },
    { word: "Chanmé", category: "verlan", definition: "Méchant (verlan)", example: "C'est chanmé !" },
    { word: "Céfran", category: "verlan", definition: "Français (verlan)", example: "Il est céfran" },
    { word: "Zarbi", category: "verlan", definition: "Bizarre (verlan)", example: "C'est zarbi cette histoire" },
    { word: "Cheum", category: "verlan", definition: "Moche (verlan)", example: "Son pull est cheum" },

    // Cité
    { word: "Seum", category: "cite", definition: "Dégoût, amertume, frustration", example: "J'ai le seum de pas avoir réussi" },
    { word: "Boloss", category: "cite", definition: "Personne naïve", example: "Ne fais pas le boloss" },
    { word: "Bicrave", category: "cite", definition: "Dealer, vendre de la drogue", example: "Il bicrave au coin de la rue" },
    { word: "Raclo", category: "cite", definition: "Personne peu recommandable", example: "C'est un sacré raclo" },
    { word: "Caillera", category: "cite", definition: "Racaille (verlan)", example: "Attention aux cailleras" },
    { word: "Téma", category: "cite", definition: "Regarde, mate", example: "Téma cette voiture!" },
    { word: "Bendo", category: "cite", definition: "Appartement, lieu de deal", example: "Il habite dans le bendo" },
    { word: "Igo", category: "cite", definition: "Mec, type", example: "C'est qui cet igo?" },
    { word: "Lovés", category: "cite", definition: "Argent", example: "Il a plein de lovés" },
    { word: "Wallah", category: "cite", definition: "Je jure (arabe)", example: "Wallah c'est vrai" },

    // Internet/SMS
    { word: "MDR", category: "internet", definition: "Mort de rire", example: "MDR ta blague!" },
    { word: "PTDR", category: "internet", definition: "Pété de rire", example: "PTDR j'y crois pas" },
    { word: "LOL", category: "internet", definition: "Laughing out loud", example: "LOL c'est drôle" },
    { word: "OKLM", category: "internet", definition: "Au calme", example: "Je suis OKLM ce soir" },
    { word: "JSP", category: "internet", definition: "Je sais pas", example: "JSP où il est" },
    { word: "YOLO", category: "internet", definition: "You Only Live Once", example: "YOLO on y va!" },
    { word: "TKT", category: "internet", definition: "T'inquiète", example: "TKT ça va aller" },
    { word: "BRB", category: "internet", definition: "Be Right Back", example: "BRB 5 min" },
    { word: "AFK", category: "internet", definition: "Away From Keyboard", example: "Je suis AFK" },
    { word: "GG", category: "internet", definition: "Good Game", example: "GG les gars!" },

    // Argot ancien
    { word: "Pognon", category: "ancien", definition: "Argent", example: "Il a du pognon" },
    { word: "Bouquin", category: "ancien", definition: "Livre", example: "Lis ce bouquin" },
    { word: "Causer", category: "ancien", definition: "Parler", example: "Viens causer avec moi" },
    { word: "Clebs", category: "ancien", definition: "Chien", example: "Ton clebs est mignon" },
    { word: "Gonzesse", category: "ancien", definition: "Femme, fille", example: "Cette gonzesse est belle" },
    { word: "Bagnole", category: "ancien", definition: "Voiture", example: "Sa bagnole est en panne" },
    { word: "Boulot", category: "ancien", definition: "Travail", example: "Je vais au boulot" },
    { word: "Fric", category: "ancien", definition: "Argent", example: "Il a plein de fric" },
    { word: "Piquer", category: "ancien", definition: "Voler", example: "On m'a piqué mon vélo" },
    { word: "Bosser", category: "ancien", definition: "Travailler", example: "Je dois bosser" },

    // Marseille
    { word: "Cagole", category: "marseille", definition: "Fille un peu vulgaire (Marseille)", example: "Cette cagole fait du bruit" },
    { word: "Pitchoune", category: "marseille", definition: "Petit enfant (Marseille)", example: "Viens ici pitchoune" },
    { word: "Fada", category: "marseille", definition: "Fou (Marseille)", example: "Il est complètement fada" },
    { word: "Pèuchère", category: "marseille", definition: "Pauvre de lui (Marseille)", example: "Pèuchère, il a pas de chance" },
    { word: "Dégun", category: "marseille", definition: "Personne (Marseille)", example: "Il y a dégun" },
    { word: "Minot", category: "marseille", definition: "Enfant (Marseille)", example: "Ce minot est mignon" },
    { word: "Tchouraver", category: "marseille", definition: "Voler (Marseille)", example: "Il s'est fait tchouraver" },
    { word: "Emboucaner", category: "marseille", definition: "Embêter (Marseille)", example: "Tu m'emboucanes" },

    // Nord
    { word: "Biloute", category: "nord", definition: "Mon petit (Nord)", example: "Salut biloute !" },
    { word: "Ducasse", category: "nord", definition: "Fête foraine (Nord)", example: "On va à la ducasse" },
    { word: "Wassingue", category: "nord", definition: "Serpillière (Nord)", example: "Passe la wassingue" },
    { word: "Baraki", category: "nord", definition: "Personne peu raffinée (Nord)", example: "Quel baraki" },
    { word: "Coron", category: "nord", definition: "Maison ouvrière (Nord)", example: "Il habite dans le coron" },

    // Belgique
    { word: "Dracher", category: "belgique", definition: "Pleuvoir fort (Belgique)", example: "Ça drache dehors" },
    { word: "Pistolet", category: "belgique", definition: "Petit pain (Belgique)", example: "Prends un pistolet" },
    { word: "Savoir", category: "belgique", definition: "Pouvoir (Belgique)", example: "Tu sais venir ?" },
    { word: "Une fois", category: "belgique", definition: "Expression belge", example: "Il pleut une fois" },

    // Québec
    { word: "Tabarnak", category: "quebec", definition: "Juron très fort (Québec)", example: "Tabarnak ! C'est cassé !" },
    { word: "Ostie", category: "quebec", definition: "Juron (Québec)", example: "Ostie de temps de chien !" },
    { word: "Câlisse", category: "quebec", definition: "Juron (Québec)", example: "Câlisse, j'ai oublié !" },
    { word: "Toune", category: "quebec", definition: "Chanson (Québec)", example: "Cette toune est bonne" },
    { word: "Blonde", category: "quebec", definition: "Petite amie (Québec)", example: "C'est ma blonde" },
    { word: "Chum", category: "quebec", definition: "Petit ami (Québec)", example: "C'est mon chum" },
    { word: "Moumoune", category: "quebec", definition: "Peureux (Québec)", example: "Ne fais pas la moumoune" },
    { word: "Pantoutte", category: "quebec", definition: "Pas du tout (Québec)", example: "J'aime ça pantoutte" },

    // Suisse
    { word: "Natel", category: "suisse", definition: "Téléphone portable (Suisse)", example: "J'ai oublié mon natel" },
    { word: "Panosse", category: "suisse", definition: "Serpillière (Suisse)", example: "Passe la panosse" },
    { word: "Cornet", category: "suisse", definition: "Sac en plastique (Suisse)", example: "Tu as un cornet ?" },
    { word: "Cheni", category: "suisse", definition: "Désordre (Suisse)", example: "Quel cheni dans ta chambre !" },
    { word: "Septante", category: "suisse", definition: "Soixante-dix (Suisse)", example: "Il a septante ans" },
    { word: "Nonante", category: "suisse", definition: "Quatre-vingt-dix (Suisse)", example: "Il y a nonante personnes" },

    // Sénégal
    { word: "Xale", category: "senegal", definition: "Jeune, gamin (Sénégal)", example: "Ce xale est intelligent" },
    { word: "Dieureudieuf", category: "senegal", definition: "Merci beaucoup (Sénégal)", example: "Dieureudieuf pour ton aide" },
    { word: "Ndax", category: "senegal", definition: "Est-ce que (Sénégal)", example: "Ndax tu viens ?" },
    { word: "Xamle", category: "senegal", definition: "Comprendre (Sénégal)", example: "Tu xamle ce qu'il dit ?" },
    { word: "Wax", category: "senegal", definition: "Parler (Sénégal)", example: "On peut wax ensemble" },

    // Côte d'Ivoire
    { word: "Gbagbo", category: "cote-ivoire", definition: "Mentir (Côte d'Ivoire)", example: "Tu gbagbo trop" },
    { word: "Drap", category: "cote-ivoire", definition: "Problème (Côte d'Ivoire)", example: "Il a un gros drap" },
    { word: "Gnama", category: "cote-ivoire", definition: "Nourriture (Côte d'Ivoire)", example: "Le gnama est prêt" },
    { word: "Môgô", category: "cote-ivoire", definition: "Personne (Côte d'Ivoire)", example: "Ce môgô est sympa" },

    // Cameroun
    { word: "Benskin", category: "cameroun", definition: "Ventre (Cameroun)", example: "Il a mal au benskin" },
    { word: "Nyama", category: "cameroun", definition: "Viande (Cameroun)", example: "On mange la nyama" },
    { word: "Mola", category: "cameroun", definition: "Monsieur, chef (Cameroun)", example: "Bonjour mola" },
    { word: "Tchouk", category: "cameroun", definition: "Dormir (Cameroun)", example: "Je vais tchouk" },

    // Slang anglais en français
    { word: "Cool", category: "slang", definition: "Tranquille, sympa", example: "Il est cool ce mec" },
    { word: "Fun", category: "slang", definition: "Amusant, marrant", example: "C'était fun cette soirée" },
    { word: "Chill", category: "slang", definition: "Se détendre", example: "On va juste chill" },
    { word: "Crush", category: "slang", definition: "Coup de cœur amoureux", example: "J'ai un crush sur elle" },
    { word: "Ghost", category: "slang", definition: "Ignorer quelqu'un soudainement", example: "Il m'a ghost" },
    { word: "Flex", category: "slang", definition: "Se vanter, frimer", example: "Il flex avec sa voiture" },
    { word: "Mood", category: "slang", definition: "Humeur, état d'esprit", example: "C'est mon mood du jour" },
    { word: "Squad", category: "slang", definition: "Groupe d'amis", example: "Mon squad arrive" },

    // Mots supplémentaires du dict3 et dict4
    { word: "Atomiser", category: "jeunes", definition: "Détruire, anéantir", example: "Il a atomisé le record" },
    { word: "Banger", category: "jeunes", definition: "Excellent morceau", example: "C'est un banger" },
    { word: "Beat", category: "jeunes", definition: "Rythme, instrumental", example: "Ce beat est malade" },
    { word: "Bomb", category: "jeunes", definition: "Magnifique, canon", example: "Tu es bomb !" },
    { word: "Clean", category: "jeunes", definition: "Propre, nickel", example: "Ta coupe est clean" },
    { word: "Drop", category: "jeunes", definition: "Sortie d'un morceau", example: "Il va drop son album" },
    { word: "Claqué", category: "jeunes", definition: "Excellent", example: "Ce plat est claqué !" },
    { word: "Cypher", category: "jeunes", definition: "Cercle de rappeurs", example: "On fait un cypher" },
    { word: "De la balle", category: "jeunes", definition: "Excellent", example: "Ce restau c'est de la balle" },
    { word: "Déchirer", category: "jeunes", definition: "Être excellent", example: "Ce groupe déchire" },
    { word: "Exploser", category: "jeunes", definition: "Battre largement", example: "On les a explosés" },
    { word: "Faire du bruit", category: "jeunes", definition: "Faire parler de soi", example: "Son livre fait du bruit" },
    { word: "Faire un carton", category: "jeunes", definition: "Avoir du succès", example: "Son album fait un carton" },
    
    // Verlan supplémentaire
    { word: "Babtou", category: "verlan", definition: "Blanc (verlan de toubab)", example: "Il est babtou" },
    { word: "Cainri", category: "verlan", definition: "Américain (verlan)", example: "Il est cainri" },
    { word: "Deuspi", category: "verlan", definition: "Vite, en speed (verlan)", example: "Fais ça deuspi" },
    { word: "Beubar", category: "verlan", definition: "Barbe (verlan)", example: "Il a du beubar" },
    { word: "Chépé", category: "verlan", definition: "Perché (verlan)", example: "Il est chépé" },
    
    // Vie quotidienne
    { word: "Amphi", category: "ancien", definition: "Amphithéâtre", example: "Cours en amphi ce matin" },
    { word: "Bahut", category: "ancien", definition: "École, lycée", example: "Je retourne au bahut lundi" },
    { word: "Bécane", category: "ancien", definition: "Moto, vélo", example: "Ma bécane roule bien" },
    { word: "Bifton", category: "ancien", definition: "Billet de banque", example: "Il a plein de biftons" },
    { word: "Bolide", category: "ancien", definition: "Voiture rapide", example: "Quel bolide !" },
    { word: "Business", category: "ancien", definition: "Affaires, commerce", example: "C'est du business" },
    { word: "Deal", category: "ancien", definition: "Marché, accord", example: "On fait un deal ?" },
    { word: "Job", category: "ancien", definition: "Travail, boulot", example: "J'ai trouvé un job" },
    { word: "Taf", category: "ancien", definition: "Travail, emploi", example: "Je vais au taf demain" },
    { word: "Taffer", category: "ancien", definition: "Travailler", example: "Je taffe jusqu'à 18h" }
];

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

// Questions du jeu du jour
const dailyQuestions = [
    { question: 'Que signifie "Kiffer" ?', answers: ['Aimer', 'Détester', 'Courir', 'Voler'], correct: 0 },
    { question: 'Que veut dire "Seum" ?', answers: ['Joie', 'Faim', 'Frustration', 'Sommeil'], correct: 2 },
    { question: 'En verlan, "Meuf" signifie :', answers: ['Homme', 'Enfant', 'Animal', 'Femme'], correct: 3 },
    { question: 'À Marseille, "Cagole" désigne :', answers: ['Une voiture', 'Une fille vulgaire', 'Un plat', 'Un quartier'], correct: 1 },
    { question: 'Que signifie "Chelou" ?', answers: ['Beau', 'Rapide', 'Cher', 'Louche'], correct: 3 }
];

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
        'cameroun': 'Cameroun', 'slang': 'Slang'
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
document.addEventListener('DOMContentLoaded', function() {
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
    
    // Afficher tous les mots au début
    displayResults(dictionary);
});
