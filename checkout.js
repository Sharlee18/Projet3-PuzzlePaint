document.addEventListener('DOMContentLoaded', () => {
    const cartItemsElement = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Récupérer les données du panier depuis localStorage
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Vérifier si le panier est vide
    if (savedCart.length === 0) {
        cartItemsElement.innerHTML = '<p>Votre panier est vide.</p>';
        totalPriceElement.textContent = 'Total : 0 €';
        return;
    }

    // Afficher les articles dans la section "Résumé de votre panier"
    let total = 0;
    savedCart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} - ${item.price.toFixed(2).replace('.', ',')}€ (Quantité: ${item.quantity})`;
        cartItemsElement.appendChild(listItem);
        total += item.price * item.quantity;
    });

    // Afficher le total
    totalPriceElement.textContent = `Total : ${total.toFixed(2).replace('.', ',')}€`;
});
