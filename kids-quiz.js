// Kids Twi Quiz - RANDOM VERSION with Sound Effects
document.addEventListener('DOMContentLoaded', function() {
    
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';
    const KIDS_GROUP_ID = '182277545531541431';

    // Question pool - 20 questions total for randomness
    const questionPool = [
        // Animals
        { question: "🐶 What is 'dog' in Twi?", options: ["kraman", "akokɔ", "agyinamoa", "odwan"], correct: 0, emoji: "🐶", category: "animals" },
        { question: "🐱 What is 'cat' in Twi?", options: ["agyinamoa", "kraman", "akokɔ", "nantwie"], correct: 0, emoji: "🐱", category: "animals" },
        { question: "🐔 What is 'chicken' in Twi?", options: ["akokɔ", "kraman", "odwan", "mpataa"], correct: 0, emoji: "🐔", category: "animals" },
        { question: "🐮 What is 'cow' in Twi?", options: ["nantwie", "odwan", "sonon", "akokɔ"], correct: 0, emoji: "🐮", category: "animals" },
        { question: "🐑 What is 'sheep' in Twi?", options: ["odwan", "kraman", "agyinamoa", "nantwie"], correct: 0, emoji: "🐑", category: "animals" },
        { question: "🐘 What is 'elephant' in Twi?", options: ["sonon", "nantwie", "odwan", "kraman"], correct: 0, emoji: "🐘", category: "animals" },
        
        // Greetings
        { question: "👋 How do you say 'good morning'?", options: ["Maakye", "Maaha", "Maadwo", "Akwaaba"], correct: 0, emoji: "🌅", category: "greetings" },
        { question: "👋 What does 'Akwaaba' mean?", options: ["Goodbye", "Welcome", "Thank you", "Hello"], correct: 1, emoji: "🤗", category: "greetings" },
        { question: "🙏 How do you say 'thank you'?", options: ["Medaase", "Akwaaba", "Yoo", "Nante yie"], correct: 0, emoji: "🙏", category: "greetings" },
        { question: "👋 How do you say 'good evening'?", options: ["Maadwo", "Maakye", "Maaha", "Akwaaba"], correct: 0, emoji: "🌆", category: "greetings" },
        
        // Family
        { question: "👩 What is 'mother' in Twi?", options: ["Maame", "Agya", "Nana", "Ɔba"], correct: 0, emoji: "👩", category: "family" },
        { question: "👨 What is 'father' in Twi?", options: ["Agya", "Maame", "Nana", "Akonta"], correct: 0, emoji: "👨", category: "family" },
        { question: "👵 What does 'Nana' mean?", options: ["Grandparent", "Child", "Friend", "Teacher"], correct: 0, emoji: "👵", category: "family" },
        { question: "👶 What is 'child' in Twi?", options: ["Ɔba", "Nana", "Agya", "Maame"], correct: 0, emoji: "👶", category: "family" },
        
        // Food
        { question: "💧 What is 'water' in Twi?", options: ["nsu", "fufu", "banku", "dɔkono"], correct: 0, emoji: "💧", category: "food" },
        { question: "🍲 What is 'fufu' in Twi?", options: ["fufu", "nsu", "banku", "kenkey"], correct: 0, emoji: "🍲", category: "food" },
        { question: "🍚 What is 'rice' in Twi?", options: ["ɛmo", "fufu", "banku", "dɔkono"], correct: 0, emoji: "🍚", category: "food" },
        
        // Numbers
        { question: "1️⃣ What is 'one' in Twi?", options: ["Baako", "Mmienu", "Mmiɛnsa", "Mnan"], correct: 0, emoji: "1️⃣", category: "numbers" },
        { question: "2️⃣ What is 'two' in Twi?", options: ["Mmienu", "Baako", "Mmiɛnsa", "Enum"], correct: 0, emoji: "2️⃣", category: "numbers" },
        { question: "3️⃣ What is 'three' in Twi?", options: ["Mmiɛnsa", "Mnan", "Enum", "Baako"], correct: 0, emoji: "3️⃣", category: "numbers" }
    ];

    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];

    // Shuffle array function
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Shuffle options within a question
    function shuffleOptions(question) {
        const options = [...question.options];
        const correctAnswer = question.options[question.correct];
        
        // Shuffle the options
        for (let i = options.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [options[i], options[j]] = [options[j], options[i]];
        }
        
        // Find new correct index
        const newCorrect = options.indexOf(correctAnswer);
        
        return {
            ...question,
            options: options,
            correct: newCorrect
        };
    }

    function createGameContainer() {
        const gameSection = document.getElementById('kids-quiz');
        if (!gameSection) return;

        gameSection.innerHTML = `
            <div class="game-container" style="background: linear-gradient(135deg, #FFEAA7, #FFD6A5); border-radius: 30px; padding: 1.5rem; margin: 2rem 0; border: 4px solid var(--gold);">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
                    <span style="font-size: 3rem;">🧸</span>
                    <div>
                        <h3 style="color: var(--green); font-size: 1.8rem; margin: 0;">Twi Fun Quiz!</h3>
                        <p style="color: var(--gray); font-size: 1rem;">Every game is different!</p>
                    </div>
                </div>
                
                <div id="quiz-start" style="text-align: center;">
                    <button id="start-quiz-btn" class="btn btn-primary" style="padding: 0.8rem 2rem;">Start Quiz →</button>
                </div>
                
                <div id="quiz-content" style="display: none;"></div>
                <div id="quiz-email" style="display: none;"></div>
                <div id="quiz-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-quiz-btn').addEventListener('click', startGame);
    }

    function startGame() {
        // Pick 10 random questions from the pool
        const shuffledPool = shuffleArray([...questionPool]);
        currentQuestions = shuffledPool.slice(0, 10).map(q => shuffleOptions(q));
        
        currentQuestionIndex = 0;
        score = 0;
        userAnswers = [];
        
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        
        showQuestion();
    }

    function showQuestion() {
        const q = currentQuestions[currentQuestionIndex];
        const quizContent = document.getElementById('quiz-content');
        
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

        quizContent.innerHTML = `
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
            showEmailForm();
        }
    }

    function showEmailForm() {
        document.getElementById('quiz-content').style.display = 'none';
        const emailDiv = document.getElementById('quiz-email');
        emailDiv.style.display = 'block';

        emailDiv.innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 3rem;">🎈</span>
                <h3 style="color: var(--green); font-size: 1.8rem; margin: 0.5rem 0;">Great job!</h3>
                <p style="color: var(--gray); margin-bottom: 1rem;">You got ${score}/${currentQuestions.length} correct!</p>
                
                <form id="quiz-email-form">
                    <input type="email" id="quiz-email-input" placeholder="parent@email.com" required 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; font-size: 1rem; margin-bottom: 0.8rem;">
                    <input type="text" id="quiz-name-input" placeholder="Child's name (optional)" 
                           style="width: 100%; padding: 0.8rem; border: 2px solid var(--cream); border-radius: 30px; font-size: 1rem; margin-bottom: 1rem;">
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.8rem;">See Results →</button>
                </form>
            </div>
        `;

        document.getElementById('quiz-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('quiz-email-input').value;
            const childName = document.getElementById('quiz-name-input').value;
            
            gtag('event', 'kids_quiz_completed', { 'event_category': 'kids', 'value': score });
            showResults(email, childName);
            addToMailerLite(email, childName, score);
        });
    }

    function addToMailerLite(email, childName, score) {
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify({
                email: email,
                fields: { name: childName || 'Kids Quiz Parent', child_name: childName || '', game_type: 'Kids Twi Quiz', game_score: score.toString() },
                groups: [KIDS_GROUP_ID],
                status: 'active'
            })
        }).catch(error => console.error('Error:', error));
    }

    function showResults(email, childName) {
        document.getElementById('quiz-email').style.display = 'none';
        document.getElementById('quiz-results').style.display = 'block';
        
        const percentage = Math.round((score / currentQuestions.length) * 100);
        let funEmoji = percentage >= 80 ? '🏆' : percentage >= 50 ? '🎉' : '🌱';

        document.getElementById('quiz-results').innerHTML = `
            <div style="text-align: center; padding: 1.5rem; background: white; border-radius: 30px;">
                <span style="font-size: 4rem;">${funEmoji}</span>
                <h3 style="color: var(--green); font-size: 2.5rem; margin: 0.5rem 0;">${score}/${currentQuestions.length}</h3>
                <div style="background: var(--cream); border-radius: 20px; padding: 1rem; margin: 1rem 0;">
                    <p style="font-size: 1rem;">✓ Results sent to ${email}</p>
                </div>
                <button id="quiz-play-again" class="btn btn-primary" style="padding: 0.8rem 2rem;">Play Again! 🔄</button>
            </div>
        `;

        document.getElementById('quiz-play-again').addEventListener('click', () => {
            document.getElementById('quiz-results').style.display = 'none';
            document.getElementById('quiz-start').style.display = 'block';
        });
    }

    createGameContainer();
});
