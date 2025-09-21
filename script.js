// Toggle Modal and Close Mobile Menu
function toggleModal() {
    const modal = document.getElementById('modal');
    modal.classList.toggle('hidden');

    // Hide mobile menu if it's open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu?.classList.contains('flex')) {
        mobileMenu.classList.remove('flex');
        mobileMenu.classList.add('hidden');
    }
}

// Elements
const pageSections = document.querySelectorAll('.page-section');
const navLinks = document.querySelectorAll('.nav-link');
const menuToggle = document.getElementById('menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const prevPageButton = document.getElementById('prev-page-button');
const nextPageButton = document.getElementById('next-page-button');

// Videos
const homeVideoContainer = document.getElementById('home-background-video');
const aboutVideoContainer = document.getElementById('about-background-video-container');
const attractionsVideoContainer = document.getElementById('attractions-background-video-container');

// Schedule Logic
const scheduleCarousel = document.getElementById('schedule-carousel');
const b2bScheduleSection = document.getElementById('itinerary');
const b2cScheduleSection = document.getElementById('b2c-schedule-section');

let currentPageIndex = 0;
let currentScheduleIndex = 0;
const schedules = [b2bScheduleSection, b2cScheduleSection].filter(Boolean);
let scheduleCarouselInterval;

function showSchedule(index) {
    schedules.forEach((el, i) => {
        if (el) el.classList.toggle('active', i === index);
    });
    currentScheduleIndex = index;
}

function startScheduleCarousel() {
    clearInterval(scheduleCarouselInterval);
    if (schedules.length > 1) {
        scheduleCarouselInterval = setInterval(() => {
            let nextIndex = (currentScheduleIndex + 1) % schedules.length;
            showSchedule(nextIndex);
        }, 180000);
    }
}

function stopScheduleCarousel() {
    clearInterval(scheduleCarouselInterval);
}

// Page Transition
function showPage(index) {
    if (index < 0 || index >= pageSections.length) return;

    const currentActive = document.querySelector('.page-section.active');
    if (currentActive) {
        currentActive.classList.remove('active');
        currentActive.style.opacity = 0;
        currentActive.style.visibility = 'hidden';
        currentActive.style.display = 'none';

        if (currentActive.id === 'schedule-carousel') stopScheduleCarousel();
    }

    currentPageIndex = index;
    const nextPage = pageSections[currentPageIndex];
    if (!nextPage) return;

    [homeVideoContainer, aboutVideoContainer, attractionsVideoContainer].forEach(el => {
        if (el) el.style.display = 'none';
    });

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
        const target = link.dataset.target;
        if (pageSections[currentPageIndex]?.id === target ||
            (target === 'schedule-carousel' && pageSections[currentPageIndex]?.id === 'schedule-carousel')) {
            link.classList.add('text-yellow-300');
        }
    });
}

// Nav Link Events
navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.dataset.target;
        const targetElement = (targetId === 'schedule-carousel') ? scheduleCarousel : document.getElementById(targetId);

        if (targetId === 'schedule-carousel') showSchedule(0);
        if (targetElement) {
            const index = Array.from(pageSections).findIndex(sec => sec.id === targetElement.id);
            if (index !== -1) {
                showPage(index);
                if (mobileMenu?.classList.contains('flex')) {
                    mobileMenu.classList.remove('flex');
                    mobileMenu.classList.add('hidden');
                }
            }
        }
    });
});

// Prev/Next Navigation
if (prevPageButton) prevPageButton.addEventListener('click', () => showPage(currentPageIndex - 1));
if (nextPageButton) nextPageButton.addEventListener('click', () => showPage(currentPageIndex + 1));

// Mobile Menu Toggle
if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('flex');
    });
}

// Slider Logic
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
}

function startAutoplaySlider() {
    stopAutoplaySlider();
    slideAutoplayInterval = setInterval(() => changeSlide(1), 5000);
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
            slideIndex = i;
            changeSlide(0);
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

// Countdown Logic
function updateCountdown() {
    const targetDate = new Date('Feb 22nd, 2026 00:00:00').getTime();
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

        daysEl && (daysEl.innerText = days);
        hoursEl && (hoursEl.innerText = hours);
        minutesEl && (minutesEl.innerText = minutes);
        secondsEl && (secondsEl.innerText = seconds);
    } else {
        clearInterval(countdownInterval);
        daysEl && (daysEl.innerText = '0');
        hoursEl && (hoursEl.innerText = '0');
        minutesEl && (minutesEl.innerText = '0');
        secondsEl && (secondsEl.innerText = '0');
        if (countdownContainer) countdownContainer.innerHTML = `<div class='text-xl font-bold text-yellow-300'>EVENT IS LIVE!</div>`;
    }
}

// On DOM Ready
let countdownInterval;
document.addEventListener('DOMContentLoaded', () => {
    pageSections.forEach(section => {
        section.style.display = 'none';
        section.style.opacity = 0;
        section.style.visibility = 'hidden';
    });

    [homeVideoContainer, aboutVideoContainer, attractionsVideoContainer].forEach(el => {
        if (el) el.style.display = 'none';
    });

    showPage(0);
    countdownInterval = setInterval(updateCountdown, 1000);
    if (scheduleCarousel) showSchedule(0);
    startAutoplaySlider();
    createDotNavigation();
});
