// Exemple d'ajout au panier
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', () => {
        alert('Produit ajouté au panier !');
    });
});

// Sélectionnez tous les carrousels sur la page
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const prevButton = carousel.querySelector('.prev');
    const nextButton = carousel.querySelector('.next');
    const slides = Array.from(track.children);

    let currentIndex = 0;

    // Fonction pour déplacer le carrousel
    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Configuration initiale
    slides.forEach((slide, index) => {
        slide.style.left = `${index * 100}%`;
    });

    // Écouteur pour le bouton "Suivant"
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling || slides[0];

        moveToSlide(track, currentSlide, nextSlide);
    });

    // Écouteur pour le bouton "Précédent"
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide =
            currentSlide.previousElementSibling || slides[slides.length - 1];

        moveToSlide(track, currentSlide, prevSlide);
    });

    // Marquer la première slide comme "current-slide"
    slides[0].classList.add('current-slide');
});
