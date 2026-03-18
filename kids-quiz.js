// Kids Twi Quiz - 10 Fun Questions for Ages 5-10
// Add this to your kids-teens.html page

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== CONFIGURATION - YOUR MAILERLITE API KEY =====
    // Using the same API key from your adult quiz
    const MAILERLITE_API_KEY = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiI0IiwianRpIjoiZjcwN2UyMWMxNmYyMjYyZGZjYTQ4ZWYzNWU0NDY5OGNhNzVkOWQxYTZmNWQ0YjlkNTIwM2JlY2M2NzQ0NWFkMTUyMWRmZjY1ODY3NDU1ZWIiLCJpYXQiOjE3NzM4MzA2ODUuNjQ0NjE3LCJuYmYiOjE3NzM4MzA2ODUuNjQ0NjE5LCJleHAiOjQ5Mjk1MDQyODUuNjM3OTc5LCJzdWIiOiIyMjE3MjQ2Iiwic2NvcGVzIjpbXX0.NukFhsIIW5aLhITNpa08eSMIAi7em6HnFp9Z7xf_9OIbuLaSX9mIxl8MDwgzYMfgh_McPwrChF5qTLsqmB_umHxbSe7H9_e8lkFU9h6wu56X94dFIB8mMm6e7YDqfM_COgyFD8iyp9SufBg9zAsEU84t8sLmXbhU9LkS8Xn8GIu69SOQcyeWyOxfuKTWHDpjSDbJ1aspmieDeOt6fk5ZrFGv7O2JxAe__IKkEdgzbxOMF3THiCy9owYSUGVxpoTXjGs1ULmvhNDDi5izxKkGHU-XYbr8HSGFlye4PY9zs7xX5vhMbS5NOgsFVHRdCf9WRCCGvqSPSl_G_-4_waAua3z8QuiIDEgugyqudefRdM6QyvWp5uRzh7WGH8TmR8VmWG8Vle2yYPpMC-BpWoDDPDEKKgUYCZJG1edHpbA-ECsTF9HvdS4OFS04Igq0BCSOhcW9STA8JZdm4bplPNacLsh7ZQOK7bde-bDSoI2xfU8eb1mntPNgRJadlxCvBYaNOV0q477iJG3kR8nY4Rpq5_vG6JtCsHNFfqR520JrhJW4rvV8Cr2iMN7qMzGheqm2ouqOfvRGV0FDkCsWq_uM3B6BmBCBpF7q_n9YY0c_uQy2JCu6M-gXh4z2XsOiMomCHzZPzpzpO78GGRZ5Te-OFTpXvEFVCjf9Q93BrvD-hVs';

    // ===== MAILERLITE GROUP ID FOR KIDS =====
    // You'll need to create a "Twi Kids" group in MailerLite and add the ID here
    const KIDS_GROUP_ID = 'YOUR_KIDS_GROUP_ID'; // Replace with actual group ID after creating it
    
    // =========================================

    // Quiz questions - 10 fun questions for kids
    const questions = [
        {
            question: "🐶 What is 'dog' in Twi?",
            options: ["kraman", "akokɔ", "agyinamoa", "odwan"],
            correct: 0,
            emoji: "🐶"
        },
        {
            question: "🐱 What is 'cat' in Twi?",
            options: ["agyinamoa", "kraman", "akokɔ", "nantwie"],
            correct: 0,
            emoji: "🐱"
        },
        {
            question: "🐔 What is 'chicken' in Twi?",
            options: ["akokɔ", "kraman", "odwan", "mpataa"],
            correct: 0,
            emoji: "🐔"
        },
        {
            question: "💧 What is 'water' in Twi?",
            options: ["nsu", "fufu", "banku", "dɔkono"],
            correct: 0,
            emoji: "💧"
        },
        {
            question: "👋 How do you say 'good morning'?",
            options: ["Maakye", "Maaha", "Maadwo", "Akwaaba"],
            correct: 0,
            emoji: "🌅"
        },
        {
            question: "👋 What does 'Akwaaba' mean?",
            options: ["Goodbye", "Welcome", "Thank you", "Hello"],
            correct: 1,
            emoji: "🤗"
        },
        {
            question: "👩 What is 'mother' in Twi?",
            options: ["Maame", "Agya", "Nana", "Ɔba"],
            correct: 0,
            emoji: "👩"
        },
        {
            question: "👨 What is 'father' in Twi?",
            options: ["Agya", "Maame", "Nana", "Akonta"],
            correct: 0,
            emoji: "👨"
        },
        {
            question: "🙏 How do you say 'thank you'?",
            options: ["Medaase", "Akwaaba", "Yoo", "Nante yie"],
            correct: 0,
            emoji: "🙏"
        },
        {
            question: "👵 What does 'Nana' mean?",
            options: ["Grandparent", "Child", "Friend", "Teacher"],
            correct: 0,
            emoji: "👵"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    // Create quiz container
    function createQuizContainer() {
        const quizSection = document.getElementById('kids-quiz');
        if (!quizSection) return;

        quizSection.innerHTML = `
            <div class="quiz-container" style="background: linear-gradient(135deg, #FFEAA7, #FFD6A5); border-radius: 40px; padding: 2.5rem; margin: 3rem 0; border: 4px solid var(--gold); box-shadow: 0 20px 40px var(--shadow);">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 5rem;">🧸</span>
                    <h3 style="color: var(--green); font-size: 2.5rem; margin: 1rem 0;">Twi Fun Quiz for Kids!</h3>
                    <p style="color: var(--gray); font-size: 1.3rem;">Answer 10 questions and learn Twi words! 🎉</p>
                </div>
                
                <div id="quiz-start" style="text-align: center;">
                    <button id="start-quiz-btn" class="btn btn-primary" style="font-size: 1.5rem; padding: 1.2rem 4rem; background: var(--green);">Start Quiz →</button>
                </div>
                
                <div id="quiz-content" style="display: none;"></div>
                <div id="quiz-email" style="display: none;"></div>
                <div id="quiz-results" style="display: none;"></div>
            </div>
        `;

        document.getElementById('start-quiz-btn').addEventListener('click', startQuiz);
    }

    // Start the quiz
    function startQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        
        showQuestion();
    }

    // Show current question with fun emojis
    function showQuestion() {
        const q = questions[currentQuestion];
        const quizContent = document.getElementById('quiz-content');
        
        let optionsHtml = '';
        q.options.forEach((option, index) => {
            optionsHtml += `
                <div style="margin: 1rem 0;">
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1.2rem 2rem; background: white; border-radius: 60px; cursor: pointer; border: 3px solid transparent; transition: all 0.3s; box-shadow: 0 5px 15px var(--shadow); font-size: 1.2rem;" 
                           onmouseover="this.style.borderColor='var(--green)'; this.style.transform='scale(1.02)';" 
                           onmouseout="this.style.borderColor='transparent'; this.style.transform='scale(1)';">
                        <input type="radio" name="question" value="${index}" style="width: 25px; height: 25px; accent-color: var(--green);">
                        <span style="font-size: 1.3rem;">${option}</span>
                    </label>
                </div>
            `;
        });

        quizContent.innerHTML = `
            <div>
                <!-- Cute progress bar -->
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 2rem;">
                    <div style="background: white; height: 20px; border-radius: 30px; flex-grow: 1; overflow: hidden; border: 2px solid var(--gold);">
                        <div style="background: var(--green); width: ${(currentQuestion / questions.length) * 100}%; height: 100%;"></div>
                    </div>
                    <span style="color: var(--green); font-weight: 700; background: white; padding: 0.5rem 1.5rem; border-radius: 50px; border: 2px solid var(--gold);">
                        ${currentQuestion + 1}/10
                    </span>
                </div>
                
                <!-- Question with big emoji -->
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 5rem; display: block; margin-bottom: 1rem;">${q.emoji}</span>
                    <h4 style="font-size: 1.8rem; color: var(--green); background: white; padding: 1.5rem; border-radius: 60px; border: 3px dashed var(--gold);">
                        ${q.question}
                    </h4>
                </div>
                
                <div id="quiz-options">
                    ${optionsHtml}
                </div>
                
                <div style="display: flex; justify-content: center; margin-top: 2.5rem;">
                    <button id="next-btn" class="btn btn-primary" style="font-size: 1.5rem; padding: 1rem 4rem;">
                        ${currentQuestion === questions.length - 1 ? '🎉 Finish!' : 'Next →'}
                    </button>
                </div>
            </div>
        `;

        document.getElementById('next-btn').addEventListener('click', nextQuestion);
    }

    // Go to next question
    function nextQuestion() {
        const selected = document.querySelector('input[name="question"]:checked');
        if (!selected) {
            alert('Pick an answer! 🤗');
            return;
        }

        const answer = parseInt(selected.value);
        userAnswers[currentQuestion] = answer;
        
        if (answer === questions[currentQuestion].correct) {
            score++;
        }

        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            showQuestion();
        } else {
            // Quiz completed - show email form for parent
            showEmailForm();
        }
    }

    // Show email form for parent
    function showEmailForm() {
        document.getElementById('quiz-content').style.display = 'none';
        const emailDiv = document.getElementById('quiz-email');
        emailDiv.style.display = 'block';

        emailDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 40px;">
                <span style="font-size: 5rem;">🎈</span>
                <h3 style="color: var(--green); font-size: 2.5rem; margin: 1rem 0;">Great job!</h3>
                <p style="color: var(--gray); font-size: 1.3rem; margin-bottom: 2rem;">Parent, enter your email to see how your child did and get more fun Twi activities! 📧</p>
                
                <form id="quiz-email-form" style="max-width: 500px; margin: 0 auto;">
                    <div style="margin-bottom: 1.5rem;">
                        <input type="email" id="quiz-email-input" placeholder="parent@email.com" required 
                               style="width: 100%; padding: 1.2rem 2rem; border: 3px solid var(--cream); border-radius: 60px; font-size: 1.2rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <input type="text" id="quiz-name-input" placeholder="Your child's name (optional)" 
                               style="width: 100%; padding: 1.2rem 2rem; border: 3px solid var(--cream); border-radius: 60px; font-size: 1.2rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-size: 1.5rem;">See Results →</button>
                </form>
                
                <p style="margin-top: 1.5rem; font-size: 1rem; color: var(--gray);">We'll send you free kids' Twi activities! No spam ever.</p>
            </div>
        `;

        document.getElementById('quiz-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('quiz-email-input').value;
            const childName = document.getElementById('quiz-name-input').value;
            
            // Send to Google Analytics
            gtag('event', 'kids_quiz_completed', {
                'event_category': 'kids',
                'event_label': 'twi_kids_quiz',
                'value': score
            });

            // Show results immediately
            showResults(email, childName);
            
            // Send to MailerLite in the background
            addToMailerLite(email, childName, score);
        });
    }

    // Send to MailerLite
    function addToMailerLite(email, childName, score) {
        
        // Prepare subscriber data
        const subscriberData = {
            email: email,
            fields: {
                name: childName || 'Kids Quiz Parent',
                child_name: childName || '',
                quiz_type: 'Kids Twi Quiz',
                kids_score: score.toString()
            },
            groups: KIDS_GROUP_ID ? [KIDS_GROUP_ID] : [],
            status: 'active'
        };

        // Send to MailerLite API
        fetch('https://connect.mailerlite.com/api/subscribers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${MAILERLITE_API_KEY}`
            },
            body: JSON.stringify(subscriberData)
        })
        .then(response => {
            if (!response.ok) {
                console.error('MailerLite API error:', response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Added to MailerLite:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    // Show results with fun animations
    function showResults(email, childName) {
        document.getElementById('quiz-email').style.display = 'none';
        const resultsDiv = document.getElementById('quiz-results');
        resultsDiv.style.display = 'block';

        // Fun messages based on score
        let funMessage = '';
        let funEmoji = '';
        
        if (score === 10) {
            funMessage = 'PERFECT! You're a Twi superstar! ⭐';
            funEmoji = '🏆';
        } else if (score >= 8) {
            funMessage = 'Great job! You're really good at this! 🌟';
            funEmoji = '🎉';
        } else if (score >= 5) {
            funMessage = 'Good work! Keep practicing! 📚';
            funEmoji = '🌱';
        } else {
            funMessage = 'You tried! Let's learn more together! 💪';
            funEmoji = '🎈';
        }

        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem; background: white; border-radius: 40px;">
                <span style="font-size: 6rem;">${funEmoji}</span>
                <h3 style="color: var(--green); font-size: 3rem; margin: 1rem 0;">${score}/10</h3>
                <p style="font-size: 1.5rem; color: var(--black); margin-bottom: 2rem;">${funMessage}</p>
                
                <div style="background: var(--cream); border-radius: 30px; padding: 2rem; margin: 2rem 0;">
                    <h4 style="color: var(--gold); font-size: 1.5rem; margin-bottom: 1rem;">🎁 Free Kids Activities</h4>
                    <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">We'll send coloring pages and more Twi games to your email!</p>
                    <p style="font-size: 1rem; color: var(--gray);">✓ Sent to: ${email}</p>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
                    <button id="play-again-btn" class="btn btn-primary" style="font-size: 1.3rem; padding: 1rem 3rem;">Play Again! 🔄</button>
                    <a href="kids-teens.html" class="btn btn-gold" style="font-size: 1.3rem; padding: 1rem 3rem;">Kids Programs →</a>
                </div>
            </div>
        `;

        document.getElementById('play-again-btn').addEventListener('click', function() {
            document.getElementById('quiz-results').style.display = 'none';
            document.getElementById('quiz-start').style.display = 'block';
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
        });
    }

    // Initialize quiz on the page
    createQuizContainer();
});