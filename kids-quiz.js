// kids-quiz.js - UPDATED with modal popup for email

document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    const questionPool = [
        { question: "🐶 What is 'dog' in Twi?", options: ["kraman", "akokɔ", "agyinamoa", "odwan"], correct: 0, emoji: "🐶", category: "animals" },
        { question: "🐱 What is 'cat' in Twi?", options: ["agyinamoa", "kraman", "akokɔ", "nantwie"], correct: 0, emoji: "🐱", category: "animals" },
        { question: "🐔 What is 'chicken' in Twi?", options: ["akokɔ", "kraman", "odwan", "mpataa"], correct: 0, emoji: "🐔", category: "animals" },
        { question: "👋 How do you say 'good morning'?", options: ["Maakye", "Maaha", "Maadwo", "Akwaaba"], correct: 0, emoji: "🌅", category: "greetings" },
        { question: "🙏 How do you say 'thank you'?", options: ["Medaase", "Akwaaba", "Yoo", "Nante yie"], correct: 0, emoji: "🙏", category: "greetings" },
        { question: "👩 What is 'mother' in Twi?", options: ["Maame", "Agya", "Nana", "Ɔba"], correct: 0, emoji: "👩", category: "family" },
        { question: "👨 What is 'father' in Twi?", options: ["Agya", "Maame", "Nana", "Akonta"], correct: 0, emoji: "👨", category: "family" },
        { question: "💧 What is 'water' in Twi?", options: ["nsu", "fufu", "banku", "dɔkono"], correct: 0, emoji: "💧", category: "food" },
        { question: "🍲 What is 'fufu' in Twi?", options: ["fufu", "nsu", "banku", "kenkey"], correct: 0, emoji: "🍲", category: "food" },
        { question: "1️⃣ What is 'one' in Twi?", options: ["Baako", "Mmienu", "Mmiɛnsa", "Mnan"], correct: 0, emoji: "1️⃣", category: "numbers" }
    ];

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let gameStarted = false;
    let playerEmail = "";
    let playerName = "";
    let quizContentDiv = null;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    function shuffleOptions(question) {
        const options = [...question.options];
        const correctAnswer = question.options[question.correct];
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        const newCorrect = options.indexOf(correctAnswer);
        return { ...question, options: options, correct: newCorrect };
    }

    function startNewGame() {
        const shuffledPool = shuffleArray([...questionPool]);
        currentQuestions = shuffledPool.slice(0, 10).map(q => shuffleOptions(q));
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
    }

    // Create modal popup
    function showEmailModal(onSubmit) {
        const existingModal = document.getElementById('game-email-modal');
        if (existingModal) existingModal.remove();
        
        const modal = document.createElement('div');
        modal.id = 'game-email-modal';
        modal.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
        `;
        
        modal.innerHTML = `
            <div style="background: white; border-radius: 30px; padding: 2rem; max-width: 400px; width: 90%; text-align: center; position: relative;">
                <button id="close-modal" style="position: absolute; top: 15px; right: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--gray);">&times;</button>
                <span style="font-size: 3rem;">🧸</span>
                <h3 style="color: var(--green); margin: 0.5rem 0;">Free Quiz Access</h3>
                <p style="color: var(--gray); margin-bottom: 1rem;">Enter your email to start playing!</p>
                <form id="modal-email-form">
                    <input type="email" id="modal-player-email" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 0.8rem; font-size: 1rem;">
                    <input type="text" id="modal-player-name" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; margin-bottom: 1rem; font-size: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">Start Quiz →</button>
                </form>
                <p style="margin-top: 1rem; font-size: 0.8rem; color: var(--gray);">No spam. Unsubscribe anytime.</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        document.getElementById('close-modal').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
        
        document.getElementById('modal-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            playerEmail = document.getElementById('modal-player-email').value;
            playerName = document.getElementById('modal-player-name').value;
            modal.remove();
            onSubmit();
        });
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-quiz');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FFEAA7, #FFD6A5); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold); text-align: center;">
                <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🧸</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Twi Fun Quiz!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Every game is different!</p>
                    </div>
                </div>
                
                <button id="play-quiz-btn" class="btn btn-primary" style="padding: 1rem 3rem; font-size: 1.2rem;">🎮 Play Quiz</button>
                
                <div id="quiz-content" style="display: none;"></div>
                <div id="quiz-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('play-quiz-btn').addEventListener('click', () => {
            showEmailModal(() => {
                addToMailerLite(playerEmail, playerName);
                gtag('event', 'game_email_signup', {
                    'event_category': 'engagement',
                    'event_label': 'kids_twi_quiz'
                });
                document.getElementById('play-quiz-btn').style.display = 'none';
                startNewGame();
                startGame();
            });
        });
    }

    function startGame() {
        quizContentDiv = document.getElementById('quiz-content');
        quizContentDiv.style.display = 'block';
        
        gtag('event', 'game_start', {
            'event_category': 'engagement',
            'event_label': 'kids_twi_quiz'
        });
        
        gameStarted = true;
        showQuestion();
    }

    function showQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        
        let optionsHtml = '';
        q.options.forEach((option, index) => {
            optionsHtml += `
                <div style="margin: 0.5rem 0;">
                    <label style="display: flex; align-items: center; gap: 0.8rem; padding: 0.8rem 1.2rem; background: white; border-radius: 40px; cursor: pointer; border: 2px solid transparent; transition: all 0.2s; box-shadow: 0 2px 5px var(--shadow); font-size: 1rem;" 
                           onmouseover="this.style.borderColor='var(--gold)'" 
                           onmouseout="this.style.borderColor='transparent'">
                        <input type="radio" name="question" value="${index}" style="width: 18px; height: 18px; accent-color: var(--green);">
                        <span style="font-size: 1.1rem;">${option}</span>
                    </label>
                </div>
            `;
        });

        quizContentDiv.innerHTML = `
            <div>
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem;">
                    <div style="background: white; height: 8px; border-radius: 10px; flex-grow: 1; overflow: hidden; border: 1px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentQuestionIndex / currentQuestions.length) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="font-size: 0.9rem; background: white; padding: 0.2rem 0.8rem; border-radius: 20px; border: 1px solid var(--gold);">
                        ${currentQuestionIndex + 1}/${currentQuestions.length}
                    </span>
                </div>
                
                <div style="background: white; border-radius: 20px; padding: 1rem; margin-bottom: 1rem; text-align: center; position: sticky; top: 0; z-index: 10;">
                    <span style="font-size: 2.5rem; display: block; margin-bottom: 0.3rem;">${q.emoji}</span>
                    <h4 style="font-size: 1.3rem; color: var(--green); margin: 0;">${q.question}</h4>
                </div>
                
                <div style="max-height: 300px; overflow-y: auto; padding-right: 0.5rem;">
                    ${optionsHtml}
                </div>
                
                <div style="margin-top: 1rem; text-align: center;">
                    <button id="next-btn" class="btn btn-primary" style="font-size: 1.2rem; padding: 0.8rem 2rem; width: 100%;">
                        ${currentQuestionIndex === currentQuestions.length - 1 ? '🎉 Finish!' : 'Next →'}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('next-btn').addEventListener('click', nextQuestion);
        
        if (userAnswers[currentQuestionIndex] !== undefined) {
            const radios = document.querySelectorAll('input[name="question"]');
            radios[userAnswers[currentQuestionIndex]].checked = true;
        }
    }

    function nextQuestion() {
        const selected = document.querySelector('input[name="question"]:checked');
        if (!selected) {
            alert('Pick an answer! 🤗');
            return;
        }

        const answer = parseInt(selected.value);
        const currentQ = currentQuestions[currentQuestionIndex];
        
        if (answer === currentQ.correct) {
            score++;
            if (window.SoundEffects) SoundEffects.correct();
        } else {
            if (window.SoundEffects) SoundEffects.wrong();
        }

        userAnswers[currentQuestionIndex] = answer;

        if (currentQuestionIndex < currentQuestions.length - 1) {
            currentQuestionIndex++;
            showQuestion();
        } else {
            if (window.SoundEffects) SoundEffects.cheer();
            showResults();
        }
    }

    function addToMailerLite(email, childName) {
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                fields: { name: childName || 'Kids Quiz Parent', child_name: childName || '', game_type: 'Kids Twi Quiz' },
                groups: [KIDS_GROUP_ID],
                status: 'active'
            })
        }).catch(error => console.error('Error:', error));
    }

    function showResults() {
        quizContentDiv.style.display = 'none';
        const resultsDiv = document.getElementById('quiz-results');
        resultsDiv.style.display = 'block';
        
        const percentage = Math.round((score / currentQuestions.length) * 100);
        let funEmoji = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎉' : '🌱';

        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">${funEmoji}</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great job, ${playerName || 'champion'}!</h3>
                <p style="font-size: 2rem; font-weight: bold; color: var(--green);">${score}/${currentQuestions.length}</p>
                <p style="font-size: 0.9rem; color: var(--gray); margin-bottom: 1rem;">✓ Quiz results sent to: ${playerEmail}</p>
                <button id="play-again-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        gtag('event', 'game_complete', {
            'event_category': 'engagement',
            'event_label': 'kids_twi_quiz',
            'score': score,
            'total': currentQuestions.length
        });

        document.getElementById('play-again-btn').addEventListener('click', () => {
            resultsDiv.style.display = 'none';
            document.getElementById('play-quiz-btn').style.display = 'block';
            quizContentDiv.innerHTML = '';
            playerEmail = "";
            playerName = "";
        });
    }

    createGameContainer();
});
