// MODAL LOGIC
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('hidden');
}

// NAVIGATION LOGIC (Page Transitions)
const pageSections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const prevPageButton = document.getElementById('prev-page-button');
const nextPageButton = document.getElementById('next-page-button');

let currentPageIndex = 0;

// Video background containers
const homeVideoContainer = document.getElementById('home-background-video');
const aboutVideoContainer = document.getElementById('about-background-video-container');
const attractionsVideoContainer = document.getElementById('attractions-background-video-container');

// Schedule Carousel elements
const scheduleCarousel = document.getElementById('schedule-carousel');
const b2bScheduleSection = document.getElementById('itinerary');
const b2cScheduleSection = document.getElementById('b2c-schedule-section');

let currentScheduleIndex = 0;
const schedules = [b2bScheduleSection, b2cScheduleSection];
let scheduleCarouselInterval;

function showSchedule(index) {
    schedules.forEach((schedule, i) => {
        schedule.classList.toggle('active', i === index);
    });
    currentScheduleIndex = index;
}

function startScheduleCarousel() {
    clearInterval(scheduleCarouselInterval);
    scheduleCarouselInterval = setInterval(() => {
        let nextIndex = (currentScheduleIndex + 1) % schedules.length;
        showSchedule(nextIndex);
    }, 180000);
}

function stopScheduleCarousel() {
    clearInterval(scheduleCarouselInterval);
}

function showPage(index) {
    if (index < 0 || index >= pageSections.length) return;

    const currentActivePage = document.querySelector('.page-section.active');
    if (currentActivePage) {
        currentActivePage.classList.remove('active');
        currentActivePage.style.opacity = 0;
        currentActivePage.style.visibility = 'hidden';
        currentActivePage.style.display = 'none';

        if (currentActivePage.id === 'schedule-carousel') stopScheduleCarousel();
    }

    currentPageIndex = index;
    const nextPage = pageSections[currentPageIndex];

    if (homeVideoContainer) homeVideoContainer.style.display = 'none';
    if (aboutVideoContainer) aboutVideoContainer.style.display = 'none';
    if (attractionsVideoContainer) attractionsVideoContainer.style.display = 'none';

    nextPage.style.display = 'block';
    nextPage.style.opacity = 0;
    nextPage.style.visibility = 'visible';

    requestAnimationFrame(() => {
        nextPage.classList.add('active');
        nextPage.style.opacity = 1;
        nextPage.scrollTop = 0;

        if (nextPage.id === 'home' && homeVideoContainer) homeVideoContainer.style.display = 'block';
        else if (nextPage.id === 'about' && aboutVideoContainer) aboutVideoContainer.style.display = 'block';
        else if (nextPage.id === 'attractions' && attractionsVideoContainer) attractionsVideoContainer.style.display = 'block';
        else if (nextPage.id === 'schedule-carousel') {
            showSchedule(0);
            startScheduleCarousel();
        }
    });

    updateNavButtons();
    updateActiveNavLink();
}

function updateNavButtons() {
    if (prevPageButton) prevPageButton.classList.toggle('hidden', currentPageIndex === 0);
    if (nextPageButton) nextPageButton.classList.toggle('hidden', currentPageIndex === pageSections.length - 1);
}

function updateActiveNavLink() {
    navLinks.forEach(link => {
        link.classList.remove('text-yellow-300');
        if (pageSections[currentPageIndex] && (link.dataset.target === pageSections[currentPageIndex].id || (pageSections[currentPageIndex].id === 'schedule-carousel' && link.dataset.target === 'schedule-carousel'))) {
            link.classList.add('text-yellow-300');
        }
    });
}

navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.dataset.target;
        const targetSectionElement = targetId === 'schedule-carousel' ? scheduleCarousel : document.getElementById(targetId);

        if (targetId === 'schedule-carousel') showSchedule(0);

        if (targetSectionElement) {
            const targetIndex = Array.from(pageSections).findIndex(section => section.id === targetSectionElement.id);
            if (targetIndex !== -1) {
                showPage(targetIndex);
                if (mobileMenu && mobileMenu.classList.contains('flex')) {
                    mobileMenu.classList.remove('flex');
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    });
});

if (prevPageButton) prevPageButton.addEventListener('click', () => showPage(currentPageIndex - 1));
if (nextPageButton) nextPageButton.addEventListener('click', () => showPage(currentPageIndex + 1));

if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });
}

let slideIndex = 0;
const slideImages = [
    "images/Venue Photos/19.jpeg",
    "images/Venue Photos/20.jpeg",
    "images/Venue Photos/21.jpeg",
    "images/Venue Photos/22.jpeg",
    "images/Venue Photos/23.jpeg"
];
const slideImageElement = document.getElementById('slideImage');
const dotNavContainer = document.getElementById('dot-nav');
let slideAutoplayInterval;

function changeSlide(n) {
    if (!slideImageElement) return;
    stopAutoplaySlider();
    slideIndex = (slideIndex + n + slideImages.length) % slideImages.length;
    slideImageElement.style.opacity = 0;
    setTimeout(() => {
        slideImageElement.src = slideImages[slideIndex];
        slideImageElement.loading = "lazy";
        slideImageElement.style.opacity = 1;
        updateDotNavigation();
    }, 300);
    startAutoplaySlider();
}

function startAutoplaySlider() {
    slideAutoplayInterval = setInterval(() => {
        changeSlide(1);
    }, 5000);
}

function stopAutoplaySlider() {
    clearInterval(slideAutoplayInterval);
}

function createDotNavigation() {
    if (!dotNavContainer) return;
    dotNavContainer.innerHTML = '';
    slideImages.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = `w-3 h-3 rounded-full ${i === slideIndex ? 'bg-yellow-300' : 'bg-gray-400'} focus:outline-none`;
        dot.addEventListener('click', () => {
            slideIndex = i - 1;
            changeSlide(1);
        });
        dotNavContainer.appendChild(dot);
    });
}

function updateDotNavigation() {
    if (!dotNavContainer) return;
    [...dotNavContainer.children].forEach((dot, i) => {
        dot.className = `w-3 h-3 rounded-full ${i === slideIndex ? 'bg-yellow-300' : 'bg-gray-400'} focus:outline-none`;
    });
}

function updateCountdown() {
    const targetDate = new Date('September 25, 2025 00:00:00').getTime();
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const countdownContainer = document.querySelector('.countdown-container');

    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours;
        if (minutesEl) minutesEl.innerText = minutes;
        if (secondsEl) secondsEl.innerText = seconds;
    } else {
        clearInterval(countdownInterval);
        if (daysEl) daysEl.innerText = '0';
        if (hoursEl) hoursEl.innerText = '0';
        if (minutesEl) minutesEl.innerText = '0';
        if (secondsEl) secondsEl.innerText = '0';

        if (countdownContainer) countdownContainer.innerHTML = "<div class='text-xl font-bold text-yellow-300'>EVENT IS LIVE!</div>";
    }
}

let countdownInterval;

document.addEventListener('DOMContentLoaded', () => {
    pageSections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = 0;
        section.style.visibility = 'hidden';
    });

    if (homeVideoContainer) homeVideoContainer.style.display = 'none';
    if (aboutVideoContainer) aboutVideoContainer.style.display = 'none';
    if (attractionsVideoContainer) attractionsVideoContainer.style.display = 'none';

    showPage(0);
    countdownInterval = setInterval(updateCountdown, 1000);

    if (scheduleCarousel) {
        showSchedule(0);
    }

    startAutoplaySlider();
    createDotNavigation();
});