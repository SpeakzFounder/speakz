// Charger le dictionnaire depuis mots.json
let dictionary = [];

// Charger les mots depuis le fichier JSON
fetch('mots.json')
  .then(response => response.json())
  .then(data => {
    dictionary = data;
    displayResults(dictionary);
    updateStats();
  })
  .catch(error => console.error('Erreur chargement:', error));

// Variables globales
let currentCategory = 'tous';

// Fonction de recherche
function filterDictionary() {
    const searchTerm = document.getElementById('main-search').value.toLowerCase();
    
    let filtered = dictionary.filter(item => {
        const matchesSearch = item.term.toLowerCase().includes(searchTerm) ||
                            item.definition.toLowerCase().includes(searchTerm);
        const matchesCategory = currentCategory === 'tous' || 
                               (item.categories && item.categories.includes(currentCategory));
        return matchesSearch && matchesCategory;
    });
    
    displayResults(filtered);
}

// Fonction d'affichage des résultats
function displayResults(results) {
    const container = document.getElementById('dictionary-results');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">Aucun mot trouvé</p>';
        return;
    }
    
    results.forEach(item => {
        const card = document.createElement('div');
        card.className = 'word-card';
        
        const categories = item.categories ? item.categories.map(cat => 
            `<span class="category-badge">${cat}</span>`
        ).join('') : '';
        
        const examples = item.examples && item.examples.length > 0 ? 
            `<p class="word-example">"${item.examples[0]}"</p>` : '';
        
        card.innerHTML = `
            <h3 class="word-term">${item.term}</h3>
            <p class="word-definition">${item.definition}</p>
            ${examples}
            <div class="word-categories">${categories}</div>
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
    filterDictionary();
    
    // Mettre à jour les boutons actifs
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Navigation entre sections
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Initialisation au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const mainSearchInput = document.getElementById('main-search');
    if (mainSearchInput) {
        mainSearchInput.addEventListener('input', filterDictionary);
    }
});
