'use strict';

// Interactive UI 1: pop-up message
function showPopup(event) {
    event.preventDefault();

    var popup = document.getElementById("popup");
    popup.classList.add("show");
}

function hidePopup() {
    var popup = document.getElementById("popup");
    popup.classList.remove("show");
}

// Interactive UI 2: accordion
const accordionHeaders = document.querySelectorAll('.accordion-header');
accordionHeaders.forEach(header => {
    header.addEventListener('click', toggleAccordion);
});

function toggleAccordion(e) {
    const currentHeader = e.currentTarget;
    const content = currentHeader.nextElementSibling;

    // Toggle 'active' class on the clicked header and 'maxHeight' on the content
    currentHeader.classList.toggle('active');

    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
    }
    
    // Close other open accordion items
    accordionHeaders.forEach(otherHeader => {
        if (otherHeader !== currentHeader && otherHeader.classList.contains('active')) {
            otherHeader.classList.remove('active');
            const otherContent = otherHeader.nextElementSibling;
            otherContent.style.maxHeight = null;
        }
    });
}

// Interactive UI 3: carousel for testimonials
const leftBtn = document.querySelector('.left');
const rightBtn = document.querySelector('.right');

const carouselItems = Array.from(document.querySelectorAll('.carousel-item'));
const navItems = Array.from(document.querySelectorAll('.nav-item'));
const CAROUSEL_SIZE = carouselItems.length;

if (leftBtn && rightBtn) {
    leftBtn.addEventListener('click', swipe);
    rightBtn.addEventListener('click', swipe);
}

function swipe(e) {
    const currentCarouselItem = document.querySelector('.carousel-item.active');
    const currentIndex = carouselItems.indexOf(currentCarouselItem);

    let nextIndex;

    if(e.currentTarget.classList.contains('left')) {
        if(currentIndex === 0) {
            nextIndex = CAROUSEL_SIZE - 1;
        } else {
            nextIndex = currentIndex - 1;
        }
    } else {
        if(currentIndex === CAROUSEL_SIZE - 1) {
            nextIndex = 0;
        } else {
            nextIndex = currentIndex + 1;
        }
    }

    carouselItems[nextIndex].classList.add('active');
    navItems[nextIndex].classList.add('active');
    currentCarouselItem.classList.remove('active');
    navItems[currentIndex].classList.remove('active');
} 

const carouselNav = document.querySelector('.carousel-nav');
if (carouselNav) {
    carouselNav.addEventListener('click', navClick);
}

function navClick(e) {
    if (e.target.classList.contains('nav-item')) {
        const targetIndex = navItems.indexOf(e.target);
        const currentCarouselItem = document.querySelector('.carousel-item.active');
        const currentNavItem = document.querySelector('.nav-item.active');

        if (targetIndex === navItems.indexOf(currentNavItem)) {
            return;
        }

        carouselItems[targetIndex].classList.add('active');
        navItems[targetIndex].classList.add('active');
        currentCarouselItem.classList.remove('active');
        currentNavItem.classList.remove('active');
    }
}

// Inspirational/Aspirations quotes
document.addEventListener('DOMContentLoaded', () => {
    const quoteContainer = document.getElementById('quote-container');
    const changeQuoteBtn = document.getElementById('change-quote-btn');
    
    if (quoteContainer && changeQuoteBtn) {
        // Function to fetch a random quote
        const getRandomQuote = async () => {
            const url = new URL('https://api.quotable.io/search/quotes');
            url.searchParams.append('query', 'beauty confidence');
            url.searchParams.append('limit', 100);
        
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
        
                // Select a random quote from the response
                const randomIndex = Math.floor(Math.random() * data.results.length);
                const randomQuote = data.results[randomIndex];
        
                return randomQuote;
            } catch (error) {
                console.error('Error:', error);
                quoteContainer.textContent = 'Failed to fetch a quote. Please try again later.';
                return null;
            }
        };
        
        // function to display a quote
        const displayQuote = async () => {
            const quote = await getRandomQuote();
            if (quote) {
                const quoteElement = document.createElement('blockquote');
                quoteElement.textContent = `"${quote.content}" - ${quote.author}`;
                
                // Clear previous quote before adding a new one
                quoteContainer.innerHTML = '';
                quoteContainer.appendChild(quoteElement);
            } else {
                quoteContainer.textContent = 'Failed to fetch a quote. Please try again later.';
            }
        };
        
        displayQuote();

        changeQuoteBtn.addEventListener('click', displayQuote);
    }
});
