
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.prev-btn');
const nextButton = document.querySelector('.next-btn');
const indicatorContainer = document.querySelector('.carousel-indicators');

// GÃ©nÃ©rer des indicateurs automatiquement
slides.forEach((slide, index) => {
    const button = document.createElement('button');
    button.classList.add('indicator');
    if (index === 0) button.classList.add('current-indicator');
    indicatorContainer.appendChild(button);
});

// Mettre Ã  jour la liste des indicateurs
let indicators = Array.from(document.querySelectorAll('.indicator'));

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange slides side by side
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
};

const updateIndicators = (currentIndicator, targetIndicator) => {
    currentIndicator.classList.remove('current-indicator');
    targetIndicator.classList.add('current-indicator');
};

const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.style.visibility = 'hidden';
    } else {
        prevButton.style.visibility = 'visible';
    }

    if (targetIndex === slides.length - 1) {
        nextButton.style.visibility = 'hidden';
    } else {
        nextButton.style.visibility = 'visible';
    }
};

nextButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentIndicator = document.querySelector('.current-indicator');
    const nextIndicator = currentIndicator.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    if (nextSlide) {
        moveToSlide(track, currentSlide, nextSlide);
        updateIndicators(currentIndicator, nextIndicator);
        hideShowArrows(slides, prevButton, nextButton, nextIndex);
    }
});

prevButton.addEventListener('click', () => {
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentIndicator = document.querySelector('.current-indicator');
    const prevIndicator = currentIndicator.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    if (prevSlide) {
        moveToSlide(track, currentSlide, prevSlide);
        updateIndicators(currentIndicator, prevIndicator);
        hideShowArrows(slides, prevButton, nextButton, prevIndex);
    }
});

indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        const currentSlide = track.querySelector('.current-slide');
        const targetSlide = slides[index];
        const currentIndicator = document.querySelector('.current-indicator');

        moveToSlide(track, currentSlide, targetSlide);
        updateIndicators(currentIndicator, indicator);
        hideShowArrows(slides, prevButton, nextButton, index);
    });
});

// Initialiser le carrousel
hideShowArrows(slides, prevButton, nextButton, 0);
