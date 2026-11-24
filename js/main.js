
// =========================
// PURCHASE MODAL
// =========================

const modal = document.querySelector('#purchase-modal');

const openModalButtons = [
    document.querySelector('#open-modal'),
    document.querySelector('#discover-buy'),
    document.querySelector('#footer-buy')
];

const closeModalButton = document.querySelector('#close-modal');

let previousFocus = null;


// Open modal
function openModal() {

    previousFocus = document.activeElement;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');

    document.body.classList.add('modal-open');

    closeModalButton.focus();

}


// Close modal
function closeModal() {

    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('modal-open');

    if (previousFocus) {
        previousFocus.focus();
    }

}


// Open buttons
openModalButtons.forEach(button => {

    if (button) {
        button.addEventListener('click', event => {

            event.preventDefault();
            openModal();

        });
    }

});


// Close button
closeModalButton.addEventListener('click', closeModal);


// Close clicking outside
modal.addEventListener('click', event => {

    if (event.target === modal) {
        closeModal();
    }

});


// Close with Escape
document.addEventListener('keydown', event => {

    if (
        event.key === 'Escape' &&
        modal.classList.contains('active')
    ) {
        closeModal();
    }

});


// =========================
// STORAGE SELECTOR
// =========================

const storageOptions = document.querySelectorAll('.storage-option');

const selectedStorage = document.querySelector('#selected-storage');

storageOptions.forEach(option => {

    option.addEventListener('click', () => {

        // Remove previous selection
        storageOptions.forEach(item => {
            item.classList.remove('active');
        });

        // Select current option
        option.classList.add('active');

        // Update summary
        selectedStorage.textContent = option.dataset.storage;

    });

});


// =========================
// PURCHASE CONFIRMATION
// =========================

const continuePurchase = document.querySelector('#continue-purchase');

continuePurchase.addEventListener('click', () => {

    const storage = selectedStorage.textContent;

    continuePurchase.textContent = '¡Selección guardada!';

    continuePurchase.disabled = true;

    console.log('Configuración conceptual:', {
        model: 'iPhone 18 Pro',
        color: 'Mint Green',
        storage: storage
    });

});


// =========================
// GALLERY CAROUSEL
// =========================

const galleryTrack = document.querySelector('#gallery-track');

const galleryItems = document.querySelectorAll('.gallery-item');

const previousButton = document.querySelector('#gallery-prev');

const nextButton = document.querySelector('#gallery-next');

const galleryDots = document.querySelector('#gallery-dots');

let currentGalleryIndex = 0;


// Create gallery indicators
galleryItems.forEach((item, index) => {

    const dot = document.createElement('button');

    dot.classList.add('gallery-dot');

    dot.setAttribute('aria-label', `Ir a la imagen ${index + 1}`);

    if (index === 0) {
        dot.classList.add('active');
    }

    dot.addEventListener('click', () => {
        goToGalleryItem(index);
    });

    galleryDots.appendChild(dot);

});


// Update active indicator
function updateGalleryDots() {

    const dots = document.querySelectorAll('.gallery-dot');

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            'active',
            index === currentGalleryIndex
        );

    });

}


// Move to selected image
function goToGalleryItem(index) {

    currentGalleryIndex = Math.max(
        0,
        Math.min(index, galleryItems.length - 1)
    );

    galleryTrack.scrollTo({

        left: galleryItems[currentGalleryIndex].offsetLeft
            - galleryTrack.offsetLeft,

        behavior: 'smooth'

    });

    updateGalleryDots();

}


// Previous image
previousButton.addEventListener('click', () => {

    goToGalleryItem(currentGalleryIndex - 1);

});


// Next image
nextButton.addEventListener('click', () => {

    goToGalleryItem(currentGalleryIndex + 1);

});


// Detect manual scrolling
let galleryScrollTimeout;

galleryTrack.addEventListener('scroll', () => {

    clearTimeout(galleryScrollTimeout);

    galleryScrollTimeout = setTimeout(() => {

        let closestIndex = 0;
        let smallestDistance = Infinity;

        galleryItems.forEach((item, index) => {

            const distance = Math.abs(
                item.offsetLeft - galleryTrack.scrollLeft
            );

            if (distance < smallestDistance) {

                smallestDistance = distance;
                closestIndex = index;

            }

        });

        currentGalleryIndex = closestIndex;

        updateGalleryDots();

    }, 100);

});


// =========================
// SCROLL ANIMATIONS
// =========================

const animatedElements = document.querySelectorAll(
    '.section-content, .camera-content, .performance-content, ' +
    '.gallery-header, .gallery-item, .discover-content'
);

const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
).matches;


if (!prefersReducedMotion && 'IntersectionObserver' in window) {

    const observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';

                entry.target.style.transform = 'translateY(0)';

                observer.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.15
    });


    animatedElements.forEach(element => {

        element.style.opacity = '0';

        element.style.transform = 'translateY(25px)';

        element.style.transition =
            'opacity 0.8s ease, transform 0.8s ease';

        observer.observe(element);

    });

}


// =========================
// FOOTER YEAR
// =========================

const footerCopy = document.querySelector('.footer-copy');

footerCopy.innerHTML = `
    © ${new Date().getFullYear()} iPhone 18 Pro Concept.
    Proyecto conceptual no oficial de Apple.
`;


// =========================
// CONSOLE MESSAGE
// =========================

console.log('iPhone 18 Pro Mint Edition - Website loaded successfully!');
