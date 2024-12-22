// vertical menu functions
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const verticalMenu = document.querySelector('.vertical-menu');
    const menuOverlay = document.createElement('div'); 

    // add class and append overlay to the body
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // function to toggle the menu
    menuToggle.addEventListener('click', () => {
        verticalMenu.classList.toggle('show-menu');
        menuOverlay.classList.toggle('show-overlay'); 
    });

    // function to hide the menu after clicking a link
    document.querySelectorAll('.vertical-menu a').forEach(link => {
        link.addEventListener('click', () => {
            verticalMenu.classList.remove('show-menu');
            menuOverlay.classList.remove('show-overlay'); 
        });
    });

    // function to hide the menu when clicking outside 
    menuOverlay.addEventListener('click', () => {
        verticalMenu.classList.remove('show-menu');
        menuOverlay.classList.remove('show-overlay'); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const questionText = document.getElementById("question-text");

    
    const question = "Do you need some inspiration or some cheering up?";
    let index = 0;

    
    function typeText() {
        if (index < question.length) {
            questionText.textContent += question[index];
            index++;
            setTimeout(typeText, 50); // Adjust typing speed
        }
    }

    
    typeText();
});


document.addEventListener("DOMContentLoaded", () => {
    const inspirationButton = document.getElementById("inspiration-button");
    const cheeringUpButton = document.getElementById("cheering-up-button");
    const contentDisplay = document.getElementById("content-display");

    // backup quotes
    const backupQuotes = [
        '"The best way to predict the future is to invent it." – Alan Kay',
        '"Life is what happens when you’re busy making other plans." – John Lennon',
        '"Do what you can with all you have, wherever you are." – Theodore Roosevelt',
        '"Strive not to be a success, but rather to be of value." – Albert Einstein',
        '"You miss 100% of the shots you don’t take." – Wayne Gretzky'
    ];

    // function to fetch and display a random quote
    async function fetchRandomQuote() {
        try {
            const response = await fetch('https://api.quotable.io/random');
            if (!response.ok) throw new Error('Failed to fetch quote');
            const data = await response.json();
            contentDisplay.textContent = `"${data.content}" – ${data.author}`;
        } catch (error) {
            const randomBackupQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
            contentDisplay.textContent = randomBackupQuote;
        }
    }

    // function to fetch and display a random joke
    async function fetchJoke() {
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
            if (!response.ok) throw new Error("Failed to fetch joke.");
            const data = await response.json();
            contentDisplay.textContent = data.joke || "No joke found! Try again.";
        } catch (error) {
            contentDisplay.textContent = "Failed to fetch a joke. Please try again.";
        }
    }

    inspirationButton.addEventListener("click", fetchRandomQuote);
    cheeringUpButton.addEventListener("click", fetchJoke);
});


// word cloud data and categories

const wordLists = {
    all: [
        ['HTML', 13, 'blue'],
        ['CSS', 13, 'blue'],
        ['JavaScript', 15, 'blue'],
        ['Python', 24, 'blue'],
        ['Git', 24, 'blue'],
        ['React', 21, 'blue'],
        ['SQL', 35, 'blue'],
        ['Node.js', 21, 'blue'],
        ['Docker', 21, 'blue'],
        ['Angular', 22, 'blue'], 
        ['Communication', 36, 'green'],
        ['Teamwork', 25.5, 'green'],
        ['Problem Solving', 25, 'green'],
        ['Leadership', 14.5, 'green'],
        ['Empathy', 36, 'green'],
        ['Conflict Resolution', 12, 'green'],
        ['Time Management', 13, 'green'],
    ],
    technical: [
        ['HTML', 13, 'blue'],
        ['CSS', 13, 'blue'],
        ['JavaScript', 15, 'blue'],
        ['Python', 24, 'blue'],
        ['Git', 24, 'blue'],
        ['React', 21, 'blue'],
        ['SQL', 35, 'blue'],
        ['Node.js', 21, 'blue'],
        ['Docker', 21, 'blue'],
        ['Angular', 22, 'blue'],
    ],
    interpersonal: [
        ['Communication', 36, 'green'],
        ['Teamwork', 25.5, 'green'],
        ['Problem Solving', 25, 'green'],
        ['Leadership', 14.5, 'green'],
        ['Empathy', 35, 'green'],
        ['Conflict Resolution', 12, 'green'],
        ['Time Management', 13, 'green'],
    ],
};

// select canvas element
const canvas = document.getElementById('word-cloud');

if (!canvas) {
    console.error("Canvas element not found");
}

// function to responsiv resizing
function resizeCanvas() {
    const parentWidth = canvas.parentElement.offsetWidth;
    canvas.width = parentWidth * 0.95; 
    canvas.height = canvas.width * 0.6; 
}

// generate word cloud based on selected category
function generateWordCloud(category) {
    console.log('generateWordCloud called for category:', category); 
    console.log('Word list for category:', wordLists[category]); 

    resizeCanvas();

    WordCloud(canvas, {
        list: wordLists[category],
        gridSize: Math.round(canvas.width / 50),
        weightFactor: canvas.width / 500,
        fontFamily: 'Arial, sans-serif',
        color: function (word) {
            const wordData = wordLists[category].find(w => w[0] === word);
            return wordData ? wordData[2] : 'white';
        },
        rotateRatio: 0,
        backgroundColor: '#2e2e2e'
    });

    console.log('WordCloud generated successfully'); 
}

// event listeners for tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        console.log('Tab clicked:', this.getAttribute('data-category')); 
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
        this.classList.add('tab--active');
        const category = this.getAttribute('data-category');
        console.log('Category:', category); 
        generateWordCloud(category);
    });
});

// adjust word cloud on window resize
window.addEventListener('resize', () => {
    const activeCategory = document.querySelector('.tab--active').getAttribute('data-category');
    generateWordCloud(activeCategory);
});

generateWordCloud('all');
