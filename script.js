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


// Word Cloud Data and Functions
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
        ['Time Management', 13, 'green']
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
        ['Angular', 12, 'blue']
    ],
    interpersonal: [
        ['Communication', 14, 'green'],
        ['Teamwork', 15.5, 'green'],
        ['Problem Solving', 15, 'green'],
        ['Leadership', 14.5, 'green'],
        ['Empathy', 16, 'green'],
        ['Conflict Resolution', 12, 'green'],
        ['Time Management', 13, 'green']
    ]
};

const canvas = document.getElementById('word-cloud');

function resizeCanvas() {
    const parentWidth = canvas.parentElement.offsetWidth;
    console.log("Parent Width:", parentWidth); // Debugging
    canvas.width = parentWidth * 0.95; // Wider canvas
    canvas.height = canvas.width;
    console.log("Canvas dimensions set to:", canvas.width, canvas.height); // Debugging
}

function generateWordCloud(category) {
    resizeCanvas();
    console.log("Generating word cloud for category:", category); // Debugging
    console.log("Word Cloud Data:", wordLists[category]); // Debugging

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

    console.log("Word cloud generated successfully.");
}

WordCloud(canvas, {
    list: [['Test', 10], ['Example', 20], ['Demo', 15]],
    gridSize: 8,
    weightFactor: 15,
    backgroundColor: '#2e2e2e'
});

document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('tab--active'));
        this.classList.add('tab--active');
        const category = this.getAttribute('data-category');
        generateWordCloud(category);
    });
});

generateWordCloud('all');

window.addEventListener('resize', () => {
    const activeCategory = document.querySelector('.tab--active').getAttribute('data-category');
    generateWordCloud(activeCategory);
});

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
const projects = [
    { name: "Portfolio Website", description: "My personal portfolio site built with HTML, CSS, and JavaScript." },
    { name: "Weather App", description: "A weather forecasting app using OpenWeatherMap API." },
    { name: "Task Manager", description: "A simple task management app with React and Node.js." }
];

const projectsContainer = document.getElementById("projects-container"); // Updated ID
projects.forEach(project => {
    const projectElement = document.createElement("div");
    projectElement.innerHTML = `<h3>${project.name}</h3><p>${project.description}</p>`;
    projectsContainer.appendChild(projectElement);
});

document.getElementById('contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent page reload

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    console.log('Contact Form Submitted:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    alert('Thank you for your message! I will get back to you soon.');

    // Clear the form
    e.target.reset();
});
