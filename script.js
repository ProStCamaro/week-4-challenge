const quizData = [
  {
    question: "What does JavaScript do?",
    choices: ["Adds interactivity to websites", "Provides styling for websites", "Creates and manipulates databases"],
    answer: "Adds interactivity to websites"
  },
  {
    question: "Which of the following is not a JavaScript data type?",
    choices: ["String", "Number", "Boolean", "List"],
    answer: "List"
  },
  {
    question: "What does the 'var' keyword do in JavaScript?",
    choices: ["Defines a variable", "Defines a function", "Defines a class"],
    answer: "Defines a variable"
  },
  {
    question: "Which of the following is a JavaScript framework?",
    choices: ["React", "Angular", "Vue", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "What does HTML stand for?",
    choices: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyper Text Makeup Language"],
    answer: "Hyper Text Markup Language"
  },
  {
    question: "Which language is used for web development?",
    choices: ["JavaScript", "Java", "Python", "C++"],
    answer: "JavaScript"
  },
];

const questionElement = document.getElementById("question");
const choicesList = document.getElementById("choices");
const submitButton = document.getElementById("submit-btn");
const timerElement = document.getElementById("timer");

let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // Total time in seconds

loadQuestion();
startTimer();

submitButton.addEventListener("click", () => {
  const selectedOption = document.querySelector('input[name="answer"]:checked');

  if (selectedOption) {
    const selectedAnswer = selectedOption.value;

    if (selectedAnswer === quizData[currentQuestion].answer) {
      score++;
    }

    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      stopTimer();
      showResults();
    }
  }
});

function loadQuestion() {
  const question = quizData[currentQuestion].question;
  const choices = quizData[currentQuestion].choices;

  questionElement.textContent = question;

  while (choicesList.firstChild) {
    choicesList.removeChild(choicesList.firstChild);
  }

  for (let i = 0; i < choices.length; i++) {
    const li = document.createElement("li");
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.name = "answer";
    radioInput.value = choices[i];
    li.appendChild(radioInput);
    li.appendChild(document.createTextNode(" " + choices[i]));
    choicesList.appendChild(li);
  }
}

function showResults() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = "<h2>Quiz Results</h2>";
  quizContainer.innerHTML += "<p>You scored " + score + " out of " + quizData.length + ".</p>";
}

function startTimer() {
  const timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = formatTime(timeLeft);

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      stopQuiz();
    }
  }, 1000);
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

function stopQuiz() {
  stopTimer();
  showResults();
  submitButton.disabled = true; // Disable the submit button after the timer ends
}

function stopTimer() {
  clearInterval(timerInterval);
}
