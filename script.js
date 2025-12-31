// Get elements
const revealBtn = document.getElementById('revealBtn');
const message = document.getElementById('message');
const startGalleryBtn = document.getElementById('startGalleryBtn');
const imageGallery = document.getElementById('imageGallery');
const nextPhotoBtn = document.getElementById('nextPhotoBtn');
const backgroundMusic = document.getElementById('backgroundMusic');
const content = document.querySelector('.content');

// Current photo index
let currentPhotoIndex = 0;
let slides = [];

// Reveal message on button click
revealBtn.addEventListener('click', function() {
    console.log('Reveal button clicked');
    
    // Hide button
    revealBtn.classList.add('hidden');
    
    // Show message with animation
    message.classList.remove('hidden');
    
    // Show gallery start button
    startGalleryBtn.classList.remove('hidden');
    
    // Play background music when message is revealed
    if (backgroundMusic) {
        backgroundMusic.volume = 0.5; // Set volume to 50%
        backgroundMusic.play().catch(error => {
            console.log('Audio play failed:', error);
        });
    }
    
    // Smooth scroll to message
    setTimeout(() => {
        message.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
});

// Start gallery on button click
startGalleryBtn.addEventListener('click', function() {
    console.log('Start gallery button clicked');
    
    // Hide the start button and content
    startGalleryBtn.classList.add('hidden');
    content.style.display = 'none';
    
    // Show the gallery (full screen overlay)
    imageGallery.classList.remove('hidden');
    console.log('Gallery should be visible now');
    
    // Get all slides
    slides = Array.from(document.querySelectorAll('.slide'));
    console.log('Total slides found:', slides.length);
    
    // Hide all slides first
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    
    // Show first slide
    if (slides.length > 0) {
        currentPhotoIndex = 0;
        slides[currentPhotoIndex].classList.add('active');
        console.log('Showing slide:', currentPhotoIndex);
    }
    
    // Update the next button text
    updateNextButtonText();
});

// Next photo button click
nextPhotoBtn.addEventListener('click', function() {
    console.log('Next button clicked, current index:', currentPhotoIndex);
    
    if (slides.length === 0) {
        console.log('No slides available');
        return;
    }
    
    // Hide current slide
    slides[currentPhotoIndex].classList.remove('active');
    
    // Move to next photo
    currentPhotoIndex++;
    
    // If we've reached the end, loop back to start
    if (currentPhotoIndex >= slides.length) {
        currentPhotoIndex = 0;
    }
    
    // Show next slide
    slides[currentPhotoIndex].classList.add('active');
    console.log('Now showing slide:', currentPhotoIndex);
    
    // Update the next button text
    updateNextButtonText();
});

// Update next button text to show photo count
function updateNextButtonText() {
    if (slides.length > 0) {
        nextPhotoBtn.textContent = `Next Photo (${currentPhotoIndex + 1}/${slides.length}) ➡️`;
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded, checking images...');
    
    // Check if images exist and hide broken ones
    document.querySelectorAll('.slide').forEach((slide, index) => {
        const img = slide.querySelector('img');
        if (img) {
            console.log(`Checking image ${index + 1}:`, img.src);
            
            // Check if image loads successfully
            img.onload = function() {
                console.log(`Image ${index + 1} loaded successfully`);
            };
            
            img.onerror = function() {
                console.log(`Image ${index + 1} failed to load:`, img.src);
                // Hide slide if image fails to load
                slide.style.display = 'none';
            };
        }
    });
});