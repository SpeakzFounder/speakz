// Variable pour stocker les mots
let dictionary = [];

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
                <div class="word-title">${word.word}</div>
                <div class="word-definition">${word.definition}</div>
            </div>
        `;
    });
    
    results.innerHTML = html;
}

// Recherche en temps réel
document.getElementById('search').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        displayWords(dictionary);
        return;
    }
    
    const filtered = dictionary.filter(word => 
        word.word.toLowerCase().includes(searchTerm) ||
        word.definition.toLowerCase().includes(searchTerm)
    );
    
    displayWords(filtered);
});
