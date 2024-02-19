document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let slideIndex = 0;
    let clientAnimationPlayed = false; // Flag to track if client animation has been played
    let autoSlideInterval; // Variable to hold the interval for auto sliding

    nextBtn.addEventListener('click', function() {
        slideIndex = (slideIndex + 1) % slider.children.length;
        slide();
        restartAutoSlide();
    });

    prevBtn.addEventListener('click', function() {
        slideIndex = (slideIndex - 1 + slider.children.length) % slider.children.length;
        slide();
        restartAutoSlide();
    });

    function slide() {
        slider.style.transform = `translateX(-${slideIndex * 100}%)`;
    }

    // Function to automatically slide to next item every 3 seconds
    function autoSlide() {
        autoSlideInterval = setInterval(function() {
            slideIndex = (slideIndex + 1) % slider.children.length;
            slide();
        }, 3000);
    }

    // Function to restart auto sliding
    function restartAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlide();
    }

    autoSlide(); // Start auto sliding

    // Function to toggle button visibility
    function toggleButton() {
        var scrollToTopBtn = document.getElementById("scrollToTopBtn");
        if (window.scrollY > 20) {
            scrollToTopBtn.classList.add("show"); // Add the "show" class
        } else {
            scrollToTopBtn.classList.remove("show"); // Remove the "show" class
        }
    }

    // Show or hide the button based on the scroll position
    window.addEventListener("scroll", toggleButton);

    // Scroll to the top when the button is clicked
    document.getElementById("scrollToTopBtn").addEventListener("click", function() {
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Smooth scrolling behavior
        });
    });

    // Initial check for button visibility
    toggleButton();

    // Slide animations
    var elementsToShow = document.querySelectorAll('.slide-up, .slide-left, .slide-right, .scale-in');

    window.addEventListener('scroll', function() {
        Array.prototype.forEach.call(elementsToShow, function(element) {
            if (isElementInViewport(element)) {
                element.classList.add('show');
            }
        });

        // Add scale animation for the .Client div if not already played
        var clientDiv = document.querySelector('.Clients');
        if (!clientAnimationPlayed && isElementInViewport(clientDiv)) {
            clientDiv.classList.add('scale');
            clientAnimationPlayed = true; // Set flag to true once animation is played
        }
    });

    function isElementInViewport(el) {
        var rect = el.getBoundingClientRect();
        return (
            rect.top + rect.height >= 0 &&
            rect.bottom - rect.height <= (window.innerHeight || document.documentElement.clientHeight)
        );
    }
});
