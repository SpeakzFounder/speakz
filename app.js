// Variable pour stocker les mots
let dictionary = [];

// Fonction pour supprimer les accents
function removeAccents(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// Charger les mots depuis le fichier JSON
fetch('mots.json')
    .then(response => response.json())
    .then(data => {
        dictionary = data;
        displayWords(dictionary);
    })
    .catch(error => {
        console.log('Erreur:', error);
        document.getElementById('results').innerHTML = 
            '<p>Erreur de chargement. Vérifiez le fichier mots.json</p>';
    });

// Fonction pour afficher les mots
function displayWords(words) {
    const results = document.getElementById('results');
    
    if (words.length === 0) {
        results.innerHTML = '<p>Aucun mot trouvé</p>';
        return;
    }
    
    let html = '';
    words.slice(0, 50).forEach(word => {
        html += `
            <div class="word-card">
                <div class="word-title">${word.term}</div>
                <div class="word-definition">${word.definition}</div>
            </div>
        `;
    });
    
    results.innerHTML = html;
}

// Recherche en temps réel
document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = removeAccents(e.target.value.toLowerCase());
    
    if (searchTerm === '') {
        displayWords(dictionary);
        return;
    }
    
    const filtered = dictionary.filter(word => 
        removeAccents(word.term.toLowerCase()).includes(searchTerm) ||
        removeAccents(word.definition.toLowerCase()).includes(searchTerm)
    );
    
    displayWords(filtered);
});
