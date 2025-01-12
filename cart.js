// Sélection des éléments du DOM pour le panier
const cartCountElement = document.getElementById('cart-count');

// Fonction pour charger le panier depuis localStorage
function loadCartCount() {
    try {
        // Récupérer les données du panier depuis localStorage
        const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

        // Calculer le nombre total d'articles
        const totalItems = savedCart.reduce((sum, item) => sum + item.quantity, 0);

        // Afficher le nombre d'articles dans l'élément du panier
        if (cartCountElement) {
            cartCountElement.textContent = totalItems;
        }
    } catch (error) {
        console.error('Erreur lors du chargement du panier depuis localStorage:', error);
    }
}

// Charger le nombre d'articles au chargement de la page
document.addEventListener('DOMContentLoaded', loadCartCount);
