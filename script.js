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

// Word lists for each category
const wordLists = {
    all: [
        ['HTML', 30, 'blue'],
        ['CSS', 30, 'blue'],
        ['JavaScript', 10, 'blue'],
        ['Python', 40, 'blue'],
        ['Git', 40, 'blue'],
        ['React', 10, 'blue'],
        ['SQL', 50, 'blue'],
        ['Node.js', 10, 'blue'],
        ['Docker', 10, 'blue'],
        ['Angular', 20, 'blue'],
        ['Communication', 60, 'green'],
        ['Teamwork', 55, 'green'],
        ['Problem Solving', 50, 'green'],
        ['Leadership', 45, 'green'],
        ['Empathy', 60, 'green'],
        ['Conflict Resolution', 20, 'green'],
        ['Time Management', 30, 'green']
    ],
    technical: [
        ['HTML', 30, 'blue'],
        ['CSS', 30, 'blue'],
        ['JavaScript', 10, 'blue'],
        ['Python', 40, 'blue'],
        ['Git', 40, 'blue'],
        ['React', 10, 'blue'],
        ['SQL', 70, 'blue'],
        ['Node.js', 10, 'blue'],
        ['Docker', 10, 'blue'],
        ['Angular', 20, 'blue']
    ],
    interpersonal: [
        ['Communication', 40, 'green'],
        ['Teamwork', 55, 'green'],
        ['Problem Solving', 50, 'green'],
        ['Leadership', 45, 'green'],
        ['Empathy', 60, 'green'],
        ['Conflict Resolution', 20, 'green'],
        ['Time Management', 30, 'green']
    ]
};

// Reference the canvas element
const canvas = document.getElementById('word-map');

// Function to update the word cloud based on the selected category
function showWordCloud(category) {
    // Clear the canvas
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate the word cloud for the selected category
    WordCloud(canvas, {
        list: wordLists[category], // Use the word list directly
        gridSize: 8,
        weightFactor: 3,
        fontFamily: 'Arial, sans-serif',
        color: function (word) {
            // Get the color of the current word from the wordLists
            const wordData = wordLists[category].find(w => w[0] === word);
            return wordData ? wordData[2] : 'black'; // Default to black if no color is found
        },
        backgroundColor: '#2e2e2e',
        rotateRatio: 0, // Words appear horizontally
        minSize: 12
    });
}

// Initialize the word cloud with the "all" category by default
showWordCloud('all');
