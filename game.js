// project/
//  ├─ index.html
//  ├─ style.css
//  ├─ game.js
//  └─ images/
//      ├─ bank-email.jpg
//      ├─ prize-offer.jpg
//      ├─ it-email.jpg
//      ├─ receipt-scam.jpg
//      └─ account-verification.jpg



// image: "images/bank-email.jpg",







// Data structure for the quiz questions
const quizQuestions = [
    {
        question: "Is this a phishing attempt or a legitimate email from a bank?",
        image: "Images/Q1.png",
        answer: "Phishing",
        explanation: "Look closely at the sender's email address. It's not a real bank domain. Also, the email uses a sense of urgency to make you click a suspicious link."
    },
    {
        question: "Is this a real offer for a free vacation?",
        image: "Images/q2.png",
        answer: "Phishing",
        explanation: "If an offer seems too good to be true, it probably is. This email is trying to get you to give away personal information by promising a fake prize."
    },
    {
        question: "You received this email from your IT department about a password update. Is it legitimate?",
        image: "Images/Q3.png",
        answer: "Phishing",
        explanation: "The email has a generic greeting, not your name. The link might also look slightly different from your company's real URL. Always verify requests like this with a real IT contact."
    },
    {
        question: "A popular online store sent you a receipt for a purchase you didn't make. Is it a scam?",
        image: "images/receipt-scam.jpg",
        answer: "Phishing",
        explanation: "Scammers use fake receipts to trick you into clicking a link to 'cancel the order.' This gives them access to your account or downloads malware."
    },
    {
        question: "This email is from a social media site to verify your account. Is it legitimate?",
        image: "images/account-verification.jpg",
        answer: "Legitimate",
        explanation: "This email uses a formal tone, has a correct company email address, and asks you to verify without a sense of urgency. It's a real communication."
    }
];


// Get all the screen elements
const introScreen = document.getElementById("introScreen");
const infoScreen = document.getElementById("infoScreen");
const quizScreen = document.getElementById("quizScreen");
const feedbackScreen = document.getElementById("feedbackScreen");
const scoreScreen = document.getElementById("scoreScreen");
const allScreens = [introScreen, infoScreen, quizScreen, feedbackScreen, scoreScreen];

// Get all the buttons and elements for manipulation
const startButton = document.getElementById("startButton");
const submitInfoButton = document.getElementById("submitInfoButton");
const nextQuestionBtn = document.getElementById("nextQuestionBtn");

const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");

const questionNumberSpan = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const emailImage = document.getElementById("emailImage");
const phishingBtn = document.getElementById("phishingBtn");
const legitimateBtn = document.getElementById("legitimateBtn");

const feedbackResult = document.getElementById("feedbackResult");
const feedbackExplanation = document.getElementById("feedbackExplanation");

const scoreDisplay = document.getElementById("scoreDisplay");
const finalMessage = document.getElementById("finalMessage");

// Game state variables
let currentQuestionIndex = 0;
let score = 0;

// Function to switch screens
function showScreen(screenToShow) {
    allScreens.forEach(screen => {
        screen.style.display = 'none';
    });
    screenToShow.style.display = 'block';
}

// Function to start the quiz
function startQuiz() {
    showScreen(quizScreen);
    currentQuestionIndex = 0;
    score = 0;
    loadQuestion();
}

// Function to load a question
function loadQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showScoreScreen();
        return;
    }

    const currentQuestion = quizQuestions[currentQuestionIndex];
    questionNumberSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentQuestion.question;
    emailImage.src = currentQuestion.image;
    
    // Make sure quiz buttons are visible again
    phishingBtn.disabled = false;
    legitimateBtn.disabled = false;
}

// Function to check the answer
function checkAnswer(userChoice) {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    let isCorrect = userChoice === currentQuestion.answer;
    
    // Disable buttons to prevent double-clicking
    phishingBtn.disabled = true;
    legitimateBtn.disabled = true;

    // Show feedback screen
    showScreen(feedbackScreen);
    
    if (isCorrect) {
        score++;
        feedbackResult.textContent = "Correct! ✅";
        feedbackResult.className = "feedback-title feedback-success";
        feedbackExplanation.textContent = currentQuestion.explanation;
    } else {
        feedbackResult.textContent = "Incorrect. ❌";
        feedbackResult.className = "feedback-title feedback-fail";
        feedbackExplanation.textContent = currentQuestion.explanation;
    }
}

// Function to show the final score screen
function showScoreScreen() {
    showScreen(scoreScreen);
    scoreDisplay.textContent = score;
    if (score === quizQuestions.length) {
        finalMessage.textContent = "You're a Phishing Master! You aced the test. 🕵️‍♂️";
    } else if (score >= quizQuestions.length / 2) {
        finalMessage.textContent = "Great job! You can spot most of the fakes. 😉";
    } else {
        finalMessage.textContent = "You need a little more practice, keep learning! 📚";
    }
}

// --- Event Listeners ---

startButton.addEventListener("click", () => showScreen(infoScreen));

submitInfoButton.addEventListener("click", () => {
    if (usernameInput.value && emailInput.value) {
        startQuiz();
    } else {
        alert("Please fill in both fields to start.");
    }
});

phishingBtn.addEventListener("click", () => checkAnswer("Phishing"));
legitimateBtn.addEventListener("click", () => checkAnswer("Legitimate"));

nextQuestionBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    showScreen(quizScreen); // Go back to the quiz screen
    loadQuestion();
});

// Initialize the game by showing the first screen

showScreen(introScreen);


