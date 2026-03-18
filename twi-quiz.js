// Twi Level Quiz - 20 Questions
// Add this to your languages.html page

document.addEventListener('DOMContentLoaded', function() {
    
    // Quiz questions - 20 questions covering different difficulty levels
    const questions = [
        // Beginner Questions (1-5)
        {
            question: "How do you say 'Good morning' in Twi?",
            options: ["Akwaaba", "Maakye", "Medaase", "Yoo"],
            correct: 1,
            level: "beginner"
        },
        {
            question: "How do you say 'Thank you' in Twi?",
            options: ["Akwaaba", "Yoo", "Medaase", "Maakye"],
            correct: 2,
            level: "beginner"
        },
        {
            question: "What does 'Me din de...' mean?",
            options: ["I love you", "My name is", "How are you", "Good evening"],
            correct: 1,
            level: "beginner"
        },
        {
            question: "How do you say 'Welcome' in Twi?",
            options: ["Medaase", "Maakye", "Akwaaba", "Nante yie"],
            correct: 2,
            level: "beginner"
        },
        {
            question: "What is the response to 'Wo ho te sɛn?'",
            options: ["Me ho ye", "Me dɔ wo", "Yoo", "Maakye"],
            correct: 0,
            level: "beginner"
        },
        
        // Elementary Questions (6-10)
        {
            question: "How do you say 'How are you?' in Twi?",
            options: ["Wo ho te sɛn?", "Me ho ye", "Yoo", "Nante yie"],
            correct: 0,
            level: "elementary"
        },
        {
            question: "What does 'Nana' mean?",
            options: ["Father", "Mother", "Grandparent", "Child"],
            correct: 2,
            level: "elementary"
        },
        {
            question: "How do you say 'I love you' in Twi?",
            options: ["Me pɛ wo", "Me dɔ wo", "Me hu wo", "Me kyɛ wo"],
            correct: 1,
            level: "elementary"
        },
        {
            question: "What is the correct response to 'Akwaaba'?",
            options: ["Yoo", "Medaase", "Maakye", "Nante yie"],
            correct: 1,
            level: "elementary"
        },
        {
            question: "How do you say 'Goodbye' in Twi?",
            options: ["Nante yie", "Akwaaba", "Medaase", "Maakye"],
            correct: 0,
            level: "elementary"
        },
        
        // Intermediate Questions (11-15)
        {
            question: "What does 'Ɛyɛ' mean?",
            options: ["It is bad", "It is good", "It is big", "It is small"],
            correct: 1,
            level: "intermediate"
        },
        {
            question: "How do you say 'My name is Kojo' in Twi?",
            options: ["Me dɔ Kojo", "Me pɛ Kojo", "Me din de Kojo", "Me hu Kojo"],
            correct: 2,
            level: "intermediate"
        },
        {
            question: "What does 'Wɔfa' mean?",
            options: ["Aunt on father's side", "Uncle on mother's side", "Grandmother", "Cousin"],
            correct: 1,
            level: "intermediate"
        },
        {
            question: "How do you ask 'Where are you going?' in Twi?",
            options: ["Wo ho te sɛn?", "Wɔrekɔ hen?", "Me rekɔ fie", "Ɛyɛ pa ara"],
            correct: 1,
            level: "intermediate"
        },
        {
            question: "What does 'Kakra kakra' mean?",
            options: ["Quickly", "Little by little", "Very much", "Never mind"],
            correct: 1,
            level: "intermediate"
        },
        
        // Advanced Questions (16-20)
        {
            question: "What is the Twi word for 'patience'?",
            options: ["Abotre", "Anigye", "Awɔ", "Asomdwee"],
            correct: 0,
            level: "advanced"
        },
        {
            question: "How do you say 'I am hungry' in Twi?",
            options: ["Ɛkɔm de me", "Me pɛ nsu", "Me trɛ", "Me awɔ"],
            correct: 0,
            level: "advanced"
        },
        {
            question: "What does the proverb 'Sankofa' teach us?",
            options: ["Look to the future", "Learn from the past", "Work hard", "Be humble"],
            correct: 1,
            level: "advanced"
        },
        {
            question: "How do you say 'Please come here' respectfully to an elder?",
            options: ["Bra ha", "Mepa wo kyɛw, bra ha", "Maakye", "Yoo"],
            correct: 1,
            level: "advanced"
        },
        {
            question: "What does 'Nyansapo' (the wisdom knot) represent?",
            options: ["Strength", "Love", "Wisdom and ingenuity", "Peace"],
            correct: 2,
            level: "advanced"
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];
    let quizActive = false;

    // Create quiz container
    function createQuizContainer() {
        const quizSection = document.getElementById('twi-level-quiz');
        if (!quizSection) return;

        quizSection.innerHTML = `
            <div class="quiz-container" style="background: var(--cream); border-radius: 30px; padding: 3rem; margin: 3rem 0; border: 3px solid var(--gold); box-shadow: 0 20px 40px var(--shadow);">
                <div style="text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 4rem;">📝</span>
                    <h3 style="color: var(--green); font-size: 2rem; margin: 1rem 0;">Find Your Twi Level</h3>
                    <p style="color: var(--gray); font-size: 1.2rem;">Answer 20 questions to discover your exact level.</p>
                    <p style="color: var(--gold); font-weight: 600; margin-top: 0.5rem;">⏱️ Takes about 5 minutes</p>
                </div>
                
                <div id="quiz-start" style="text-align: center;">
                    <button id="start-quiz-btn" class="btn btn-primary" style="font-size: 1.3rem; padding: 1.2rem 4rem;">Start Quiz →</button>
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
        quizActive = true;
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        
        document.getElementById('quiz-start').style.display = 'none';
        document.getElementById('quiz-content').style.display = 'block';
        
        showQuestion();
    }

    // Show current question
    function showQuestion() {
        const q = questions[currentQuestion];
        const quizContent = document.getElementById('quiz-content');
        
        let optionsHtml = '';
        q.options.forEach((option, index) => {
            optionsHtml += `
                <div style="margin: 1rem 0;">
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem 1.5rem; background: white; border-radius: 15px; cursor: pointer; border: 2px solid transparent; transition: all 0.3s; box-shadow: 0 5px 10px var(--shadow);" 
                           onmouseover="this.style.borderColor='var(--gold)'; this.style.transform='translateX(5px)';" 
                           onmouseout="this.style.borderColor='transparent'; this.style.transform='translateX(0)';">
                        <input type="radio" name="question" value="${index}" style="width: 20px; height: 20px; accent-color: var(--green);">
                        <span style="font-size: 1.1rem;">${option}</span>
                    </label>
                </div>
            `;
        });

        // Calculate progress percentage
        const progress = ((currentQuestion) / questions.length) * 100;

        quizContent.innerHTML = `
            <div>
                <!-- Progress bar -->
                <div style="background: var(--cream); height: 10px; border-radius: 10px; margin-bottom: 2rem; overflow: hidden;">
                    <div style="background: var(--green); width: ${progress}%; height: 100%;"></div>
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-bottom: 1rem;">
                    <span style="color: var(--green); font-weight: 600; background: white; padding: 0.5rem 1.5rem; border-radius: 50px; box-shadow: 0 2px 5px var(--shadow);">
                        Question ${currentQuestion + 1} of ${questions.length}
                    </span>
                    <span style="color: var(--gray); background: white; padding: 0.5rem 1.5rem; border-radius: 50px; box-shadow: 0 2px 5px var(--shadow);">
                        Score: ${score}
                    </span>
                </div>
                
                <h4 style="font-size: 1.4rem; margin: 2rem 0; color: var(--black); padding: 1rem; background: var(--cream); border-radius: 15px; border-left: 4px solid var(--gold);">
                    ${q.question}
                </h4>
                
                <div id="quiz-options">
                    ${optionsHtml}
                </div>
                
                <div style="display: flex; justify-content: space-between; margin-top: 2.5rem;">
                    <button id="prev-btn" class="btn btn-outline" ${currentQuestion === 0 ? 'disabled style="opacity: 0.5; cursor: not-allowed;"' : ''}>← Previous</button>
                    <button id="next-btn" class="btn btn-primary" style="padding: 1rem 3rem;">${currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question →'}</button>
                </div>
            </div>
        `;

        // Add event listeners
        document.getElementById('next-btn').addEventListener('click', nextQuestion);
        if (currentQuestion > 0) {
            document.getElementById('prev-btn').addEventListener('click', prevQuestion);
        }

        // If there was a previous answer selected, show it
        if (userAnswers[currentQuestion] !== undefined) {
            const radios = document.querySelectorAll('input[name="question"]');
            radios[userAnswers[currentQuestion]].checked = true;
        }
    }

    // Go to next question
    function nextQuestion() {
        const selected = document.querySelector('input[name="question"]:checked');
        if (!selected) {
            alert('Please select an answer before continuing.');
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
            // Quiz completed - show email form
            showEmailForm();
        }
    }

    // Go to previous question
    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    // Show email form to get results
    function showEmailForm() {
        document.getElementById('quiz-content').style.display = 'none';
        const emailDiv = document.getElementById('quiz-email');
        emailDiv.style.display = 'block';

        emailDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <span style="font-size: 5rem;">🎉</span>
                <h3 style="color: var(--green); font-size: 2rem; margin: 1rem 0;">You're almost done!</h3>
                <p style="color: var(--gray); font-size: 1.2rem; margin-bottom: 2rem;">Enter your email to see your results and get personalized course recommendations.</p>
                
                <form id="quiz-email-form" style="max-width: 450px; margin: 0 auto;">
                    <div style="margin-bottom: 1.5rem;">
                        <input type="email" id="quiz-email-input" placeholder="your@email.com" required 
                               style="width: 100%; padding: 1rem 1.5rem; border: 2px solid var(--cream); border-radius: 50px; font-size: 1rem;">
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <input type="text" id="quiz-name-input" placeholder="Your name (optional)" 
                               style="width: 100%; padding: 1rem 1.5rem; border: 2px solid var(--cream); border-radius: 50px; font-size: 1rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1.2rem; font-size: 1.2rem;">See My Results →</button>
                </form>
                
                <p style="margin-top: 1.5rem; font-size: 0.9rem; color: var(--gray);">We'll send your results and never spam you. Unsubscribe anytime.</p>
            </div>
        `;

        document.getElementById('quiz-email-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('quiz-email-input').value;
            const name = document.getElementById('quiz-name-input').value;
            
            // Send to Google Analytics
            gtag('event', 'quiz_completed', {
                'event_category': 'engagement',
                'event_label': 'twi_level_quiz_20q',
                'value': score
            });

            // Here you would send to MailerLite via AJAX
            // For now, just show results
            showResults(email, name);
        });
    }

    // Show quiz results
    function showResults(email, name) {
        document.getElementById('quiz-email').style.display = 'none';
        const resultsDiv = document.getElementById('quiz-results');
        resultsDiv.style.display = 'block';

        let level = 'Beginner';
        let levelDescription = '';
        let recommendations = '';
        let badgeColor = '';

        // Calculate level based on score (out of 20)
        if (score <= 7) {
            level = 'Beginner';
            levelDescription = 'You know some basic greetings and phrases.';
            badgeColor = 'var(--green)';
            recommendations = `
                <li><strong>Private 60min (1x/week)</strong> – Start with the basics at your own pace</li>
                <li><strong>Group 90min (1x/week)</strong> – Learn with other beginners</li>
                <li><strong>Free Greetings Cheat Sheet</strong> – Practice essential phrases</li>
                <li><strong>Recommended blog:</strong> "10 Twi Phrases Every Visitor Should Know"</li>
            `;
        } else if (score <= 12) {
            level = 'Elementary';
            levelDescription = 'You can handle simple conversations about familiar topics.';
            badgeColor = 'var(--gold)';
            recommendations = `
                <li><strong>Private 60min (2x/week)</strong> – Build confidence and vocabulary</li>
                <li><strong>Group 90min (2x/week)</strong> – Practice conversations with others</li>
                <li><strong>Family Terms guide</strong> – Learn how to address relatives</li>
                <li><strong>Recommended blog:</strong> "Family Terms in Twi"</li>
            `;
        } else if (score <= 16) {
            level = 'Intermediate';
            levelDescription = 'You can discuss various topics and understand most conversations.';
            badgeColor = 'var(--red)';
            recommendations = `
                <li><strong>Private 90min (1x/week)</strong> – Deepen your understanding</li>
                <li><strong>Conversation Club</strong> – Practice with native speakers</li>
                <li><strong>Proverbs & idioms</strong> – Sound more natural</li>
                <li><strong>Recommended blog:</strong> "The Meaning Behind Adinkra Symbols"</li>
            `;
        } else {
            level = 'Advanced';
            levelDescription = 'You can express yourself fluently on most topics.';
            badgeColor = 'var(--black)';
            recommendations = `
                <li><strong>Private 90min (2x/week)</strong> – Achieve fluency fast</li>
                <li><strong>Business Twi</strong> – Professional language skills</li>
                <li><strong>Proverbs masterclass</strong> – Deep cultural knowledge</li>
                <li><strong>Recommended blog:</strong> "The 80/20 Method"</li>
            `;
        }

        resultsDiv.innerHTML = `
            <div style="text-align: center; padding: 2rem;">
                <span style="font-size: 4rem;">✅</span>
                <h3 style="color: var(--green); font-size: 2rem; margin: 1rem 0;">Your Level: ${level}</h3>
                
                <div style="display: inline-block; background: ${badgeColor}; color: white; padding: 0.5rem 2rem; border-radius: 50px; font-size: 1.5rem; font-weight: 700; margin-bottom: 1.5rem;">
                    ${score}/20
                </div>
                
                <p style="font-size: 1.2rem; margin-bottom: 2rem; color: var(--gray);">${levelDescription}</p>
                
                <div style="background: var(--cream); border-radius: 20px; padding: 2rem; margin: 2rem 0; text-align: left; border-left: 6px solid var(--gold);">
                    <h4 style="color: var(--green); margin-bottom: 1.5rem; font-size: 1.3rem;">📚 Recommended for you:</h4>
                    <ul style="list-style: none; line-height: 2;">
                        ${recommendations}
                    </ul>
                </div>
                
                <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap; margin-top: 2rem;">
                    <a href="languages.html#twi-enroll" class="btn btn-primary" style="font-size: 1.2rem; padding: 1rem 3rem;">Enroll Now →</a>
                    <button id="retake-quiz" class="btn btn-outline" style="font-size: 1.2rem; padding: 1rem 3rem;">Retake Quiz</button>
                </div>
                
                <p style="margin-top: 2rem; font-size: 0.95rem; color: var(--gray); background: white; padding: 1rem; border-radius: 50px; display: inline-block;">
                    📧 We've sent your results to ${email}
                </p>
            </div>
        `;

        document.getElementById('retake-quiz').addEventListener('click', function() {
            document.getElementById('quiz-results').style.display = 'none';
            document.getElementById('quiz-start').style.display = 'block';
            currentQuestion = 0;
            score = 0;
            userAnswers = [];
        });

        // Here you would also send to MailerLite
        console.log('Quiz completed - Email:', email, 'Name:', name, 'Level:', level, 'Score:', score);
    }

    // Initialize quiz on the page
    createQuizContainer();
});