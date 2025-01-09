// Variables globales
const cartItemsContainer = document.getElementById('cart-items');
const totalPriceElement = document.getElementById('total-price');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
let cart = []; // Tableau global pour stocker les produits ajoutés

// Fonction pour mettre à jour le compteur de produits dans le panier
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Fonction pour mettre à jour l'affichage du panier
function updateCartDisplay() {
    if (!cartItemsContainer || !totalPriceElement) return; // Vérifie si les éléments HTML existent
    cartItemsContainer.innerHTML = ''; // Effacer le contenu précédent
    let total = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price.toFixed(2).replace('.', ',')}€ (Quantité: ${item.quantity})`;
        cartItemsContainer.appendChild(li);
        total += item.price * item.quantity;
    });

    totalPriceElement.textContent = `Total : ${total.toFixed(2).replace('.', ',')}€`;
}

// Fonction pour afficher un pop-up personnalisé
function showPopup(message) {
    const popup = document.createElement('div');
    popup.className = 'popup';
    popup.textContent = message;

    // Styles inline pour le pop-up
    popup.style.position = 'fixed';
    popup.style.top = '20px';
    popup.style.right = '20px';
    popup.style.backgroundColor = '#4caf50';
    popup.style.color = '#fff';
    popup.style.padding = '10px 20px';
    popup.style.borderRadius = '5px';
    popup.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    popup.style.zIndex = '1000';

    // Ajoutez le pop-up au body
    document.body.appendChild(popup);

    // Supprimez le pop-up après 3 secondes
    setTimeout(() => {
        popup.remove();
    }, 3000);
}

// Fonction pour ajouter un produit au panier
function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Augmente la quantité
    } else {
        cart.push({ ...product, quantity: 1 }); // Ajoute un nouveau produit
    }
    updateCartCount(); // Met à jour le compteur
    updateCartDisplay(); // Met à jour l'affichage

    // Afficher un pop-up personnalisé
    showPopup(`Produit "${product.name}" ajouté au panier !`);
}

// Ajouter un écouteur aux boutons "Ajouter au panier"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', () => {
        const productElement = button.parentElement;
        const product = {
            id: productElement.getAttribute('data-id'),
            name: productElement.getAttribute('data-name'),
            price: parseFloat(productElement.getAttribute('data-price'))
        };

        addToCart(product); // Ajoute le produit au panier
    });
});

// Ajouter un écouteur pour afficher la synthèse des achats dans une modale
cartIcon.addEventListener('click', () => {
    if (cart.length > 0) {
        displayCartSummary();
    } else {
        alert('Votre panier est vide.');
    }
});

// Fonction pour afficher la synthèse des achats dans une modale
function displayCartSummary() {
    const cartSummary = document.createElement('div');
    cartSummary.id = 'cart-summary';
    cartSummary.innerHTML = `
        <div class="cart-overlay">
            <div class="cart-content">
                <h2>Votre Panier</h2>
                <ul>
                    ${cart.map(item => `
                        <li>${item.name} - ${item.price.toFixed(2).replace('.', ',')}€ (Quantité: ${item.quantity})</li>
                    `).join('')}
                </ul>
                <p>Total : ${cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2).replace('.', ',')}€</p>
                <button id="close-cart">Fermer</button>
            </div>
        </div>
    `;

    document.body.appendChild(cartSummary);

    // Ajouter un écouteur pour fermer la modale
    document.getElementById('close-cart').addEventListener('click', () => {
        cartSummary.remove();
    });
}
