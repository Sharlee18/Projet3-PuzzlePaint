function initializeCarousel(carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(track.children);
    const prevButton = carousel.querySelector('.prev-btn');
    const nextButton = carousel.querySelector('.next-btn');

    const slideWidth = slides[0].getBoundingClientRect().width;

    // Positionner les slides côte à côte
    slides.forEach((slide, index) => {
        slide.style.left = `${slideWidth * index}px`;
    });

    const moveToSlide = (track, currentSlide, targetSlide) => {
        track.style.transform = `translateX(-${targetSlide.style.left})`;
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    // Écouteur pour le bouton "Suivant"
    nextButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;

        if (nextSlide) {
            moveToSlide(track, currentSlide, nextSlide);
        }
    });

    // Écouteur pour le bouton "Précédent"
    prevButton.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;

        if (prevSlide) {
            moveToSlide(track, currentSlide, prevSlide);
        }
    });
}

// Initialisation des carrousels
document.querySelectorAll('.carousel').forEach(carousel => {
    initializeCarousel(carousel);
});
