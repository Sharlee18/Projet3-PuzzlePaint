// Fonction pour ajouter un produit au panier
function addToCart(product) {
    // Charger le panier depuis localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1; // Augmente la quantité
    } else {
        cart.push({ ...product, quantity: 1 }); // Ajoute un nouveau produit
    }

    // Sauvegarder le panier dans localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Mettre à jour le compteur via cart.js
    if (typeof updateCartCount === 'function') {
        updateCartCount();
    }

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
