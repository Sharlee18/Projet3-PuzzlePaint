// Sélection des éléments du DOM pour le panier
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');

// Charger le panier depuis localStorage ou initialiser un panier vide
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonction pour mettre à jour le compteur du panier
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
}

// Fonction pour afficher le résumé du panier (dans un pop-up)
function displayCartSummary() {
    const cartSummary = document.createElement('div');
    cartSummary.id = 'cart-summary';
    cartSummary.innerHTML = `
        <div class="cart-overlay">
            <div class="cart-content">
                <h2>Votre Panier</h2>
                <ul>
                    ${cart.map(item => `
                        <li>${item.name} - ${item.price.toFixed(2)}€ (Quantité: ${item.quantity})</li>
                    `).join('')}
                </ul>
                <p>Total : ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}€</p>
                <div class="popup-buttons">
                    <button id="close-cart">Continuer mon achat</button>
                    <button id="validate-cart">Valider mon panier</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(cartSummary);

    // Écouteur pour "Continuer mon achat" (fermer le pop-up)
    document.getElementById('close-cart').addEventListener('click', () => {
        cartSummary.remove();
    });

    // Écouteur pour "Valider mon panier" (rediriger vers la page checkout.html)
    document.getElementById('validate-cart').addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Fonction pour ajouter un produit au panier
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Augmente la quantité
    } else {
        cart.push({ ...product, quantity: 1 }); // Ajoute un nouveau produit
    }

    // Sauvegarder le panier dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour l'affichage
    updateCartCount();

    // Message de confirmation
    alert(`Produit "${product.name}" ajouté au panier.`);
}

// Ajout des événements sur les boutons "Ajouter au panier"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseFloat(productElement.getAttribute('data-price'))
        };

        addToCart(product);
    });
});

// Ouvrir le pop-up du panier
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        if (cart.length > 0) {
            displayCartSummary();
        } else {
            alert('Votre panier est vide.');
        }
    });
}

// Charger le compteur du panier au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    try {
        cart = JSON.parse(localStorage.getItem('cart')) || [];
        updateCartCount();
    } catch (error) {
        console.error('Erreur lors du chargement du panier depuis localStorage:', error);
    }
});
