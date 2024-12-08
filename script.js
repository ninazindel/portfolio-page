
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const verticalMenu = document.querySelector('.vertical-menu');
    const menuOverlay = document.createElement('div'); // Create overlay element

    // Add class and append overlay to the body
    menuOverlay.className = 'menu-overlay';
    document.body.appendChild(menuOverlay);

    // Function to toggle the menu
    menuToggle.addEventListener('click', () => {
        verticalMenu.classList.toggle('show-menu');
        menuOverlay.classList.toggle('show-overlay'); // Toggle overlay visibility
    });

    // Function to hide the menu after clicking a link
    document.querySelectorAll('.vertical-menu a').forEach(link => {
        link.addEventListener('click', () => {
            verticalMenu.classList.remove('show-menu');
            menuOverlay.classList.remove('show-overlay'); // Hide overlay
        });
    });

    // Function to hide the menu when clicking outside (overlay)
    menuOverlay.addEventListener('click', () => {
        verticalMenu.classList.remove('show-menu');
        menuOverlay.classList.remove('show-overlay'); // Hide overlay
    });
});

// Function to fetch and display a random quote
const backupQuotes = [
    '"The best way to predict the future is to invent it." – Alan Kay',
    '"Life is what happens when you’re busy making other plans." – John Lennon',
    '"Do what you can with all you have, wherever you are." – Theodore Roosevelt',
    '"Strive not to be a success, but rather to be of value." – Albert Einstein',
    '"You miss 100% of the shots you don’t take." – Wayne Gretzky'
];

async function fetchRandomQuote() {
    const quoteContainer = document.getElementById('inspirational-quote');

    try {
        // Fetch a random quote from the Quotable API
        const response = await fetch('https://api.quotable.io/random');
        if (!response.ok) {
            throw new Error('Failed to fetch quote');
        }

        const data = await response.json();

        // Display the quote and author
        quoteContainer.textContent = `"${data.content}" – ${data.author}`;
    } catch (error) {
        console.error('Error fetching the quote:', error);
        // Display a fallback quote from the list
        const randomBackupQuote = backupQuotes[Math.floor(Math.random() * backupQuotes.length)];
        quoteContainer.textContent = randomBackupQuote;
    }
}

// Call the function by clicking on button
document.getElementById('new-quote-button').addEventListener('click', fetchRandomQuote);

document.addEventListener("DOMContentLoaded", () => {
    const jokeText = document.getElementById("joke-text");
    const newJokeBtn = document.getElementById("new-joke-btn");

    // Function to fetch a joke
    async function fetchJoke() {
        try {
            const response = await fetch("https://v2.jokeapi.dev/joke/Any?type=single");
            if (!response.ok) {
                throw new Error("Failed to fetch joke.");
            }

            const data = await response.json();
            jokeText.textContent = data.joke || "No joke found! Try again.";
        } catch (error) {
            console.error(error);
            jokeText.textContent = "Failed to fetch a joke. Please try again.";
        }
    }

    // Fetch a joke when the page loads
    fetchJoke();

    // Fetch a new joke when the button is clicked
    newJokeBtn.addEventListener("click", fetchJoke);
});

// Word Cloud Data and Categories
const wordLists = {
    all: [
        ['HTML', 13, 'blue'],
        ['CSS', 13, 'blue'],
        ['JavaScript', 11, 'blue'],
        ['Python', 14, 'blue'],
        ['Git', 14, 'blue'],
        ['React', 11, 'blue'],
        ['SQL', 15, 'blue'],
        ['Node.js', 11, 'blue'],
        ['Docker', 11, 'blue'],
        ['Angular', 12, 'blue'], 
        ['Communication', 16, 'green'],
        ['Teamwork', 15.5, 'green'],
        ['Problem Solving', 15, 'green'],
        ['Leadership', 14.5, 'green'],
        ['Empathy', 16, 'green'],
        ['Conflict Resolution', 12, 'green'],
        ['Time Management', 13, 'green'],
    ],
    technical: [
        ['HTML', 13, 'blue'],
        ['CSS', 13, 'blue'],
        ['JavaScript', 11, 'blue'],
        ['Python', 14, 'blue'],
        ['Git', 14, 'blue'],
        ['React', 11, 'blue'],
        ['SQL', 17, 'blue'],
        ['Node.js', 11, 'blue'],
        ['Docker', 11, 'blue'],
        ['Angular', 12], 'blue',
    ],
    interpersonal: [
        ['Communication', 14, 'green'],
        ['Teamwork', 15.5, 'green'],
        ['Problem Solving', 15, 'green'],
        ['Leadership', 14.5, 'green'],
        ['Empathy', 16, 'green'],
        ['Conflict Resolution', 12, 'green'],
        ['Time Management', 13, 'green'],
    ],
};

// Select Canvas Element
const canvas = document.getElementById('word-cloud');

if (!canvas) {
    console.error("Canvas element not found");
}

// Function to Resize the Canvas Responsively
function resizeCanvas() {
    const parentWidth = canvas.parentElement.offsetWidth;
    canvas.width = parentWidth * 0.95; // Set canvas width to 95% of parent
    canvas.height = canvas.width * 0.6; // Keep height proportional
}

// Generate Word Cloud Based on Selected Category
function generateWordCloud(category) {
    console.log('generateWordCloud called for category:', category); // Debug line
    console.log('Word list for category:', wordLists[category]); // Debug line

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

    console.log('WordCloud generated successfully'); // Debug line
}

// Event Listeners for Tabs
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        console.log('Tab clicked:', this.getAttribute('data-category')); // Debug line
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
        this.classList.add('tab--active');
        const category = this.getAttribute('data-category');
        console.log('Category:', category); // Debug line
        generateWordCloud(category);
    });
});

// Adjust Word Cloud on Window Resize
window.addEventListener('resize', () => {
    const activeCategory = document.querySelector('.tab--active').getAttribute('data-category');
    generateWordCloud(activeCategory);
});

// Initial Render of the Word Cloud (Default: All)
generateWordCloud('all');

// Fetch Education Data 
async function fetchEducationData() {
    const educationList = document.getElementById("education-list"); // Updated ID
    educationList.innerHTML = "<li>Loading...</li>";

    try {
        const response = await fetch("https://api.example.com/education"); // Example API
        if (!response.ok) {
            throw new Error("Failed to fetch education data");
        }
        const data = await response.json();
        educationList.innerHTML = "";

        data.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item; // Example: Add education items
            educationList.appendChild(listItem);
        });
    } catch (error) {
        educationList.innerHTML = "<li>Failed to load education data. Please try again later.</li>";
    }
}
document.addEventListener("DOMContentLoaded", fetchEducationData);

// Projects Section
<section id="projects" class="section">
    <h1>Projects</h1>
    <div class="project-grid">
        <!-- Project 1 -->
        <div class="project-card">
            <img src="images/project1-thumbnail.jpg" alt="Project 1 Thumbnail" class="project-thumbnail">
            <h2>Project 1 Title</h2>
            <p>A brief description of your project. Mention its purpose and technologies used.</p>
            <div class="project-links">
                <a href="https://github.com/your-repo/project1" target="_blank">GitHub</a>
                <a href="https://your-project-live-demo.com" target="_blank">Live Demo</a>
            </div>
        </div>
        <!-- Project 2 -->
        <div class="project-card">
            <img src="images/project2-thumbnail.jpg" alt="Project 2 Thumbnail" class="project-thumbnail">
            <h2>Project 2 Title</h2>
            <p>A brief description of your project. Mention its purpose and technologies used.</p>
            <div class="project-links">
                <a href="https://github.com/your-repo/project2" target="_blank">GitHub</a>
                <a href="https://your-project-live-demo.com" target="_blank">Live Demo</a>
            </div>
        </div>
        <!-- Project 3 -->
        <div class="project-card">
            <img src="images/project3-thumbnail.jpg" alt="Project 3 Thumbnail" class="project-thumbnail">
            <h2>Project 3 Title</h2>
            <p>A brief description of your project. Mention its purpose and technologies used.</p>
            <div class="project-links">
                <a href="https://github.com/your-repo/project3" target="_blank">GitHub</a>
                <a href="https://your-project-live-demo.com" target="_blank">Live Demo</a>
            </div>
        </div>
    </div>
</section>

