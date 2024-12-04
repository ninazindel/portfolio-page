// Typing Effect JavaScript
const text = "Hello! I'm Nina, a part-time student of business information technology";
const typingText = document.getElementById("typing-text");

let index = 0;

function typeWriter() {
    if (index < text.length) {
        typingText.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 50); // Adjust speed (50ms per character)
    }
}

typeWriter();

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

const canvas = document.getElementById('word-map');

function resizeCanvas() {
    const parentWidth = canvas.parentElement.offsetWidth;
    canvas.width = parentWidth * 0.9;
    canvas.height = canvas.width;
}

function generateWordCloud(category) {
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
}

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

// Leaflet Map Setup
const map = L.map('map').setView([51.505, -0.09], 5);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const places = [
    { name: "Berlin, Germany", coords: [52.5200, 13.4050], description: "I lived in Berlin for 2 years." },
    { name: "Zurich, Switzerland", coords: [47.3769, 8.5417], description: "Zurich was home during an internship." },
    { name: "Vienna, Austria", coords: [48.2082, 16.3738], description: "3 years in Vienna working as a developer." }
];

places.forEach(place => {
    L.marker(place.coords).addTo(map).bindPopup(`<b>${place.name}</b><br>${place.description}`);
});

document.querySelector('a[href="#places"]').addEventListener('click', () => {
    setTimeout(() => {
        map.invalidateSize();
        map.setView([51.505, -0.09], 5);
    }, 300);
});

// Fetch Goals from API
async function fetchGoals() {
    const goalsList = document.getElementById("goals-list");
    goalsList.innerHTML = "<li>Loading...</li>";

    try {
        console.log("Fetching motivational quotes...");
        const response = await fetch("https://api.quotable.io/quotes?tags=motivation");
        console.log("Response status:", response.status);

        if (!response.ok) {
            throw new Error("Failed to fetch quotes");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        goalsList.innerHTML = "";

        data.results.slice(0, 5).forEach(quote => {
            const listItem = document.createElement("li");
            listItem.textContent = `"${quote.content}" - ${quote.author}`;
            goalsList.appendChild(listItem);
        });
    } catch (error) {
        goalsList.innerHTML = "<li>Failed to load goals. Please try again later.</li>";
        console.error("Error fetching goals:", error);
    }
}

document.addEventListener("DOMContentLoaded", fetchGoals);

