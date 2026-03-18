// ===== TWI ALPHABETS QUIZ - ALL 3 SETS WITH EMAIL CAPTURE =====
// Filename: alphabets-quiz.js

const quizData = {
    set1: {
        title: "Set 1: Basics",
        questions: [
            {
                question: "How many letters are in the Twi alphabet?",
                options: ["A) 26", "B) 22", "C) 24", "D) 20"],
                correct: 1
            },
            {
                question: "Which letter is NOT in the Twi alphabet?",
                options: ["A) Ɛ", "B) Ɔ", "C) Q", "D) Y"],
                correct: 2
            },
            {
                question: "What sound does Ɛ make?",
                options: ["A) 'ay' as in 'say'", "B) 'eh' as in 'bed'", "C) 'ee' as in 'see'", "D) 'aw' as in 'law'"],
                correct: 1
            },
            {
                question: "What sound does Ɔ make?",
                options: ["A) 'oh' as in 'go'", "B) 'aw' as in 'law'", "C) 'oo' as in 'food'", "D) 'ah' as in 'father'"],
                correct: 1
            },
            {
                question: "The Twi word 'ɛyɛ' means:",
                options: ["A) Eye", "B) It is", "C) Love", "D) House"],
                correct: 1
            },
            {
                question: "Which vowels are special to Twi?",
                options: ["A) A and E", "B) Ɛ and Ɔ", "C) I and O", "D) U and Y"],
                correct: 1
            },
            {
                question: "How many vowels are written in Twi?",
                options: ["A) 5", "B) 7", "C) 10", "D) 12"],
                correct: 1
            },
            {
                question: "The word 'ɔdɔ' means:",
                options: ["A) Love", "B) Beloved", "C) Friend", "D) Family"],
                correct: 0
            },
            {
                question: "Which English letter is missing from Twi alphabet?",
                options: ["A) P", "B) R", "C) J", "D) M"],
                correct: 2
            },
            {
                question: "The letter 'K' in Twi sounds like:",
                options: ["A) 'ch' in 'chat'", "B) 'k' in 'key'", "C) 'g' in 'go'", "D) 'c' in 'city'"],
                correct: 1
            }
        ]
    },
    
    set2: {
        title: "Set 2: Word Pairs",
        questions: [
            {
                question: "What's the difference between 'eye' and 'ɛyɛ'?",
                options: ["A) Same meaning", "B) 'eye' = eye, 'ɛyɛ' = it is", "C) 'eye' = it is, 'ɛyɛ' = eye", "D) Both mean 'see'"],
                correct: 1
            },
            {
                question: "The word 'efie' means:",
                options: ["A) House/home", "B) Fire", "C) Father", "D) Eat"],
                correct: 0
            },
            {
                question: "How do you say 'love' in Twi?",
                options: ["A) ɔdɔ", "B) odo", "C) odɔ", "D) ɔdo"],
                correct: 0
            },
            {
                question: "The letter 'P' in 'papa' means:",
                options: ["A) Father", "B) Good", "C) Both A and B", "D) Paper"],
                correct: 2
            },
            {
                question: "Which word means 'someone'?",
                options: ["A) obi", "B) ɔbi", "C) obi?", "D) All of the above"],
                correct: 3
            },
            {
                question: "The sound of 'U' in Twi is like:",
                options: ["A) 'uh' in 'cup'", "B) 'oo' in 'food' (shorter)", "C) 'you' in 'you'", "D) 'u' in 'put'"],
                correct: 1
            },
            {
                question: "'Me' in Twi means:",
                options: ["A) Me/my", "B) You", "C) Eat", "D) Mother"],
                correct: 0
            },
            {
                question: "'Wo' in Twi means:",
                options: ["A) Me", "B) You/your", "C) Go", "D) Come"],
                correct: 1
            },
            {
                question: "The letter 'R' in Twi is pronounced:",
                options: ["A) Like English R", "B) Lightly rolled", "C) Silent", "D) Like L"],
                correct: 1
            },
            {
                question: "How many consonant sounds does Twi have?",
                options: ["A) 10", "B) 12", "C) 15", "D) 18"],
                correct: 2
            }
        ]
    },
    
    set3: {
        title: "Set 3: Applied Knowledge",
        questions: [
            {
                question: "Read this word: 'sukuu' – What does it mean?",
                options: ["A) Sugar", "B) School", "C) Sukoo (market)", "D) Sleep"],
                correct: 1
            },
            {
                question: "Which is the correct spelling for 'banku' (the food)?",
                options: ["A) banku", "B) baku", "C) baaŋku", "D) baanu"],
                correct: 0
            },
            {
                question: "'Kasa' means:",
                options: ["A) Speak/language", "B) Cassava", "C) House", "D) Food"],
                correct: 0
            },
            {
                question: "'Abɛ' means:",
                options: ["A) Palm-nut", "B) Pineapple", "C) Orange", "D) Banana"],
                correct: 0
            },
            {
                question: "Which word contains the Ɔ sound?",
                options: ["A) obi", "B) ɔdɔ", "C) odo", "D) oba"],
                correct: 1
            },
            {
                question: "'Nnwom' means:",
                options: ["A) Songs", "B) Dance", "C) Drum", "D) Celebration"],
                correct: 0
            },
            {
                question: "The letter 'G' in 'Ghana' is pronounced:",
                options: ["A) Silent", "B) Like 'g' in 'go'", "C) Like 'j' in 'jam'", "D) Like 'gh'"],
                correct: 1
            },
            {
                question: "'Te' can mean:",
                options: ["A) Hear", "B) Live", "C) Rent", "D) All of the above"],
                correct: 3
            },
            {
                question: "'Didi' means:",
                options: ["A) Sleep", "B) Eat", "C) Drink", "D) Dance"],
                correct: 1
            },
            {
                question: "Which letters are missing from the Twi alphabet?",
                options: ["A) C, J, Q, V, X, Z", "B) C, D, F, G, H", "C) P, Q, R, S, T", "D) B, D, F, G, H"],
                correct: 0
            }
        ]
    }
};

// Quiz state
let currentSet = 1;
let userAnswers = new Array(10).fill(null);
let quizSubmitted = false;
let currentScore = 0;
let emailSubmitted = false; // Track if email already given

// Load quiz set
function loadSet(setNumber) {
    currentSet = setNumber;
    userAnswers = new Array(10).fill(null);
    quizSubmitted = false;
    
    // Update navigation buttons
    const set1Btn = document.getElementById('set1-btn');
    const set2Btn = document.getElementById('set2-btn');
    const set3Btn = document.getElementById('set3-btn');
    
    if (set1Btn && set2Btn && set3Btn) {
        [set1Btn, set2Btn, set3Btn].forEach(btn => {
            btn.style.background = 'var(--cream)';
            btn.style.color = 'var(--black)';
        });
        
        document.getElementById(`set${setNumber}-btn`).style.background = 'var(--green)';
        document.getElementById(`set${setNumber}-btn`).style.color = 'white';
    }
    
    // Update quiz title
    const titleElement = document.getElementById('current-quiz-title');
    if (titleElement) {
        titleElement.textContent = quizData[`set${setNumber}`].title;
    }
    
    // Hide results and email form
    const resultsArea = document.getElementById('results-area');
    const emailForm = document.getElementById('email-form-container');
    
    if (resultsArea) resultsArea.style.display = 'none';
    if (emailForm) emailForm.style.display = 'none';
    
    // Render questions
    renderQuestions();
}

// Render questions for current set
function renderQuestions() {
    const container = document.getElementById('quiz-container');
    if (!container) return;
    
    const setData = quizData[`set${currentSet}`].questions;
    
    let html = '<div class="questions-list">';
    
    setData.forEach((q, index) => {
        const answered = userAnswers[index] !== null;
        const selectedOption = userAnswers[index];
        
        html += `
            <div class="question-item" style="background: white; border-radius: 15px; padding: 1.5rem; margin-bottom: 1.5rem; border-left: 4px solid ${answered ? 'var(--green)' : 'var(--gold)'};">
                <p style="font-weight: 600; margin-bottom: 1rem;">${index + 1}. ${q.question}</p>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem;">
        `;
        
        q.options.forEach((opt, optIndex) => {
            const isSelected = selectedOption === optIndex;
            html += `
                <div style="display: flex; align-items: center; gap: 0.5rem; 
                    padding: 0.5rem; border-radius: 10px; 
                    background: ${isSelected ? 'var(--green)' : 'var(--cream)'};
                    color: ${isSelected ? 'white' : 'var(--black)'};
                    cursor: pointer;"
                    onclick="selectAnswer(${index}, ${optIndex})">
                    <input type="radio" name="q${index}" ${isSelected ? 'checked' : ''} style="cursor: pointer;">
                    <label style="cursor: pointer; width: 100%;">${opt}</label>
                </div>
            `;
        });
        
        html += `</div>`;
        
        // Show feedback if quiz submitted
        if (quizSubmitted) {
            const isCorrect = selectedOption === q.correct;
            html += `
                <div style="margin-top: 1rem; padding: 0.8rem; border-radius: 10px; 
                    background: ${isCorrect ? 'var(--green)' : 'var(--red)'}; 
                    color: white;">
                    ${isCorrect ? '✅ Correct!' : '❌ Incorrect. The correct answer is: ' + q.options[q.correct]}
                </div>
            `;
        }
        
        html += `</div>`;
    });
    
    // Submit button
    if (!quizSubmitted) {
        html += `
            <div style="text-align: center; margin-top: 2rem;">
                <button onclick="submitQuiz()" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.2rem; background: linear-gradient(135deg, var(--green), #1f7a6e); color: white; border: none; border-radius: 50px; font-weight: 600; cursor: pointer;">
                    ✅ Submit Answers
                </button>
            </div>
        `;
    }
    
    html += `</div>`;
    
    container.innerHTML = html;
    updateProgress();
}

// Select answer
function selectAnswer(questionIndex, optionIndex) {
    if (!quizSubmitted) {
        userAnswers[questionIndex] = optionIndex;
        renderQuestions();
    }
}

// Submit quiz
function submitQuiz() {
    // Check if all questions answered
    const unanswered = userAnswers.indexOf(null);
    if (unanswered !== -1) {
        alert(`Please answer question ${unanswered + 1} first!`);
        return;
    }
    
    // Calculate score
    const setData = quizData[`set${currentSet}`].questions;
    let correctCount = 0;
    userAnswers.forEach((answer, index) => {
        if (answer === setData[index].correct) correctCount++;
    });
    
    currentScore = correctCount;
    
    // If email not submitted yet, show email form
    if (!emailSubmitted) {
        const emailForm = document.getElementById('email-form-container');
        const resultsArea = document.getElementById('results-area');
        
        if (emailForm) {
            emailForm.style.display = 'block';
            emailForm.scrollIntoView({ behavior: 'smooth' });
        }
        if (resultsArea) resultsArea.style.display = 'none';
    } else {
        // Email already given, show results immediately
        quizSubmitted = true;
        displayResults();
        renderQuestions();
    }
}

// Submit email and show results
function submitEmail() {
    const emailInput = document.getElementById('quiz-email');
    const consentCheck = document.getElementById('email-consent');
    
    if (!emailInput || !consentCheck) return;
    
    const email = emailInput.value;
    const consent = consentCheck.checked;
    
    if (!email) {
        alert('Please enter your email address');
        return;
    }
    
    if (!consent) {
        alert('Please agree to receive your results and free guides');
        return;
    }
    
    // Send email to Formspree
    fetch('https://formspree.io/f/mlgpodpb', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            quiz_score: currentScore,
            quiz_set: `Set ${currentSet} - ${quizData[`set${currentSet}`].title}`,
            form_type: 'quiz_results'
        })
    })
    .then(response => {
        if (response.ok) {
            // Mark email as submitted
            emailSubmitted = true;
            
            // Hide email form
            const emailForm = document.getElementById('email-form-container');
            if (emailForm) emailForm.style.display = 'none';
            
            // Show results
            quizSubmitted = true;
            displayResults();
            renderQuestions();
            
            // Track in Google Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'quiz_completion', {
                    'event_category': 'engagement',
                    'event_label': `set${currentSet}`,
                    'value': currentScore
                });
            }
        } else {
            alert('There was an error. Please try again.');
        }
    })
    .catch(error => {
        alert('There was an error. Please try again.');
    });
}

// Display results
function displayResults() {
    const scoreDisplay = document.getElementById('score-display');
    const scoreMessage = document.getElementById('score-message');
    const resultsArea = document.getElementById('results-area');
    
    if (!scoreDisplay || !scoreMessage || !resultsArea) return;
    
    scoreDisplay.textContent = `${currentScore}/10`;
    
    let message = '';
    if (currentScore === 10) message = '🎉 Perfect! You\'re a Twi expert!';
    else if (currentScore >= 8) message = '🌟 Great job! You\'re almost there!';
    else if (currentScore >= 6) message = '👍 Good effort! Keep practicing!';
    else message = '📚 Keep learning! Review the alphabet and try again!';
    
    scoreMessage.textContent = message;
    resultsArea.style.display = 'block';
}

// Retake quiz
function retakeQuiz() {
    userAnswers = new Array(10).fill(null);
    quizSubmitted = false;
    
    const resultsArea = document.getElementById('results-area');
    if (resultsArea) resultsArea.style.display = 'none';
    
    renderQuestions();
}

// Update progress bar
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    if (!progressBar || !progressText) return;
    
    const answered = userAnswers.filter(a => a !== null).length;
    const progress = (answered / 10) * 100;
    progressBar.style.width = progress + '%';
    progressText.textContent = `${answered}/10 answered`;
}

// Load set 1 by default when page loads
window.onload = function() {
    // Check if quiz elements exist before loading
    const container = document.getElementById('quiz-container');
    if (container) {
        loadSet(1);
    }
};
